#!/usr/bin/env bun

/**
 * Memory-oriented microbenchmarks for different conversion modes.
 *
 * Examples:
 *   node bench/microbench/memory.js --mode h2m-reuse --iterations 25
 *   node bench/microbench/memory.js --mode mdream-stream --iterations 5
 */

import { createReadStream } from "node:fs";
import { mkdir, readFile, writeFile } from "node:fs/promises";
import { join, resolve } from "node:path";
import { performance } from "node:perf_hooks";
import { Readable } from "node:stream";
import { htmlToMarkdown as mdreamHtmlToMarkdown, streamHtmlToMarkdown } from "mdream";
import { loadH2MParser } from "../utils/h2m-loader.js";

const MODES = new Set(["h2m-reuse", "h2m-fresh", "mdream-await", "mdream-stream"]);

function parseArgs(argv) {
  const opts = {
    mode: "h2m-reuse",
    iterations: 10,
    fixture: resolve(
      join(
        process.cwd(),
        "tests",
        "fixtures",
        "039c4b966d1f2a0c589ac0aad211fe65500ad1cb58c7f45b34251db7056803ec.html",
      ),
    ),
  };

  for (let i = 0; i < argv.length; i += 1) {
    const arg = argv[i];
    switch (arg) {
      case "--mode":
      case "-m":
        opts.mode = argv[++i] ?? opts.mode;
        break;
      case "--iterations":
      case "-i":
        opts.iterations =
          Number.parseInt(argv[++i] ?? String(opts.iterations), 10) || opts.iterations;
        break;
      case "--fixture":
      case "-f":
        opts.fixture = resolve(argv[++i] ?? opts.fixture);
        break;
      case "--help":
      case "-h": {
        console.log(`
Usage: node bench/microbench/memory.js [options]

Options:
  --mode, -m         One of: h2m-reuse, h2m-fresh, mdream-await, mdream-stream
  --iterations, -i   Number of conversions to run (default: 10)
  --fixture, -f      Path to an HTML file (default: tests/fixtures/<checksum>.html)
  --help, -h         Show this message
`);
        process.exit(0);
        break;
      }
      default:
        throw new Error(`Unknown flag: ${arg}`);
    }
  }

  if (!MODES.has(opts.mode)) {
    throw new Error(`Unsupported mode "${opts.mode}". Expected one of: ${[...MODES].join(", ")}`);
  }

  return opts;
}

function logMemoryUsage(label, store) {
  const usage = process.memoryUsage();
  const format = (bytes) => `${(bytes / 1024 / 1024).toFixed(2)} MB`;
  console.log(`Memory usage (${label}):`);
  console.log(`  RSS:          ${format(usage.rss)}`);
  console.log(`  Heap Total:   ${format(usage.heapTotal)}`);
  console.log(`  Heap Used:    ${format(usage.heapUsed)}`);
  console.log(`  External:     ${format(usage.external)}`);
  console.log(`  ArrayBuffers: ${format(usage.arrayBuffers)}`);
  if (store) {
    store.push({
      label,
      rss: usage.rss,
      heapTotal: usage.heapTotal,
      heapUsed: usage.heapUsed,
      external: usage.external,
      arrayBuffers: usage.arrayBuffers,
    });
  }
}

const H2MParser = await loadH2MParser();

async function runH2M({ iterations, fixture, reuse, memoryStore }) {
  const baseUrl = `file://${fixture}`;
  const html = await readFile(fixture, "utf8");
  const parser = reuse ? new H2MParser() : null;

  const durations = [];
  for (let i = 0; i < iterations; i += 1) {
    const instance = reuse ? parser : new H2MParser();
    logMemoryUsage(`before iteration ${i + 1}`, memoryStore);
    const start = performance.now();
    await instance.process(html, baseUrl);
    const end = performance.now();
    durations.push(end - start);
    logMemoryUsage(`after iteration ${i + 1}`, memoryStore);
  }

  return durations;
}

async function runMdreamAwait({ iterations, fixture, memoryStore }) {
  const html = await readFile(fixture, "utf8");
  const baseUrl = `file://${fixture}`;
  const durations = [];

  for (let i = 0; i < iterations; i += 1) {
    logMemoryUsage(`before iteration ${i + 1}`, memoryStore);
    const start = performance.now();
    mdreamHtmlToMarkdown(html, { origin: baseUrl });
    const end = performance.now();
    durations.push(end - start);
    logMemoryUsage(`after iteration ${i + 1}`, memoryStore);
  }

  return durations;
}

async function runMdreamStream({ iterations, fixture, memoryStore }) {
  const baseUrl = `file://${fixture}`;
  const durations = [];

  for (let i = 0; i < iterations; i += 1) {
    logMemoryUsage(`before iteration ${i + 1}`, memoryStore);
    const start = performance.now();
    const readStream = createReadStream(fixture, { encoding: "utf8" });
    let emittedBytes = 0;
    try {
      for await (const chunk of streamHtmlToMarkdown(Readable.toWeb(readStream), {
        origin: baseUrl,
      })) {
        emittedBytes += chunk.length;
        // sink chunks to /dev/null equivalent by doing nothing
      }
    } finally {
      readStream.close();
    }
    const end = performance.now();
    durations.push(end - start);
    logMemoryUsage(`after iteration ${i + 1} (emitted ${emittedBytes} chars)`, memoryStore);
  }

  return durations;
}

function percentile(values, p) {
  if (!values.length) {
    return 0;
  }
  const sorted = [...values].sort((a, b) => a - b);
  const idx = Math.min(sorted.length - 1, Math.round((sorted.length - 1) * p));
  return sorted[idx];
}

function summarise(label, durations) {
  const mean = durations.reduce((sum, value) => sum + value, 0) / durations.length;
  const max = Math.max(...durations);
  const min = Math.min(...durations);
  const p95 = percentile(durations, 0.95);
  console.log(`\n${label}:`);
  console.log(`  Iterations: ${durations.length}`);
  console.log(`  Mean:       ${mean.toFixed(2)} ms`);
  console.log(`  Min:        ${min.toFixed(2)} ms`);
  console.log(`  Max:        ${max.toFixed(2)} ms`);
  console.log(`  p95:        ${p95.toFixed(2)} ms`);
  return { mean, min, max, p95 };
}

async function persistSummary(summary) {
  const resultsDir = join(process.cwd(), "bench", ".results");
  await mkdir(resultsDir, { recursive: true });
  const outputPath = join(resultsDir, "memory-latest.json");
  await writeFile(outputPath, JSON.stringify(summary, null, 2), "utf8");
}

async function main() {
  const opts = parseArgs(process.argv.slice(2));
  console.log(
    `Running memory microbench: mode=${opts.mode}, iterations=${opts.iterations}, fixture=${opts.fixture}`,
  );

  const memorySamples = [];

  let durations;
  let stats;
  switch (opts.mode) {
    case "h2m-reuse":
      durations = await runH2M({
        iterations: opts.iterations,
        fixture: opts.fixture,
        reuse: true,
        memoryStore: memorySamples,
      });
      stats = summarise("h2m-parser (reused instance)", durations);
      break;
    case "h2m-fresh":
      durations = await runH2M({
        iterations: opts.iterations,
        fixture: opts.fixture,
        reuse: false,
        memoryStore: memorySamples,
      });
      stats = summarise("h2m-parser (fresh instance)", durations);
      break;
    case "mdream-await":
      durations = await runMdreamAwait({
        iterations: opts.iterations,
        fixture: opts.fixture,
        memoryStore: memorySamples,
      });
      stats = summarise("mdream (await htmlToMarkdown)", durations);
      break;
    case "mdream-stream":
      durations = await runMdreamStream({
        iterations: opts.iterations,
        fixture: opts.fixture,
        memoryStore: memorySamples,
      });
      stats = summarise("mdream (streamHtmlToMarkdown)", durations);
      break;
    default:
      throw new Error(`Unhandled mode: ${opts.mode}`);
  }

  await persistSummary({
    generatedAt: new Date().toISOString(),
    mode: opts.mode,
    iterations: opts.iterations,
    fixture: opts.fixture,
    durations,
    stats,
    memorySamples,
  });
}

await main();
