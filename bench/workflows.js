#!/usr/bin/env bun

/**
 * Compare awaited vs streaming workflows across the available converters.
 * Produces a small summary table with mean duration per mode.
 */

import { createReadStream } from "node:fs";
import { mkdir, readFile, writeFile } from "node:fs/promises";
import { join, resolve } from "node:path";
import { performance } from "node:perf_hooks";
import { Readable } from "node:stream";
import { htmlToMarkdown as mdreamHtmlToMarkdown, streamHtmlToMarkdown } from "mdream";
import { loadH2MParser } from "./utils/h2m-loader.js";

const DEFAULT_FIXTURE = resolve(
  join(
    process.cwd(),
    "tests",
    "fixtures",
    "039c4b966d1f2a0c589ac0aad211fe65500ad1cb58c7f45b34251db7056803ec.html",
  ),
);
const WORKFLOW_OUTPUT_DIR = join(process.cwd(), "bench", "output", "workflows");

function formatMs(ms) {
  return `${ms.toFixed(2)} ms`;
}

async function timed(fn) {
  const start = performance.now();
  await fn();
  return performance.now() - start;
}

const H2MParser = await loadH2MParser();

async function writeSampleOnce(filename, content, tracker) {
  if (tracker.written) {
    return;
  }
  await mkdir(WORKFLOW_OUTPUT_DIR, { recursive: true });
  await writeFile(join(WORKFLOW_OUTPUT_DIR, filename), content, "utf8");
  tracker.written = true;
}

function createValidator(name) {
  let expectedLength = null;
  return async (content, { filename, tracker }) => {
    if (typeof content !== "string") {
      throw new Error(`${name} produced a non-string result`);
    }
    if (content.length === 0) {
      throw new Error(`${name} produced empty output`);
    }
    if (expectedLength === null) {
      expectedLength = content.length;
      await writeSampleOnce(filename, content, tracker);
    } else if (content.length !== expectedLength) {
      throw new Error(
        `${name} output length changed between iterations (${content.length} vs ${expectedLength})`,
      );
    }
  };
}

async function runH2MAwait(html, origin, iterations) {
  const parser = new H2MParser();
  const durations = [];
  const tracker = { written: false };
  const validate = createValidator("h2m-parser (await)");

  for (let i = 0; i < iterations; i += 1) {
    const duration = await timed(async () => {
      const result = await parser.process(html, origin);
      await validate(result.markdown, { filename: "h2m-parser-await.md", tracker });
    });
    durations.push(duration);
  }

  return durations;
}

async function runMdreamAwait(html, origin, iterations) {
  const durations = [];
  const tracker = { written: false };
  const validate = createValidator("mdream (await)");

  for (let i = 0; i < iterations; i += 1) {
    const duration = await timed(async () => {
      const markdown = mdreamHtmlToMarkdown(html, { origin });
      await validate(markdown, { filename: "mdream-await.md", tracker });
    });
    durations.push(duration);
  }

  return durations;
}

async function runMdreamStream(fixturePath, origin, iterations) {
  const durations = [];
  const tracker = { written: false };
  const validate = createValidator("mdream (stream)");

  for (let i = 0; i < iterations; i += 1) {
    const duration = await timed(async () => {
      const readStream = createReadStream(fixturePath, { encoding: "utf8" });
      let buffered = "";
      try {
        for await (const chunk of streamHtmlToMarkdown(Readable.toWeb(readStream), { origin })) {
          buffered += chunk;
        }
      } finally {
        readStream.close();
      }
      await validate(buffered, { filename: "mdream-stream.md", tracker });
    });
    durations.push(duration);
  }

  return durations;
}

function average(values) {
  return values.reduce((sum, v) => sum + v, 0) / values.length;
}

function percentile(values, p) {
  const sorted = [...values].sort((a, b) => a - b);
  const idx = Math.min(sorted.length - 1, Math.round((sorted.length - 1) * p));
  return sorted[idx];
}

function printTable(rows) {
  const header = ["Mode", "Iterations", "Mean", "p95", "Min", "Max"];
  const lines = [header, ...rows];
  const widths = header.map((_, col) => Math.max(...lines.map((line) => String(line[col]).length)));
  const formatRow = (row) =>
    row.map((item, idx) => `${String(item).padEnd(widths[idx])}`).join("  ");

  console.log(formatRow(header));
  console.log(widths.map((w) => "-".repeat(w)).join("  "));
  for (const row of rows) {
    console.log(formatRow(row));
  }
}

function buildModeSummary(name, iterations, durations) {
  return {
    name,
    iterations,
    mean: average(durations),
    p95: percentile(durations, 0.95),
    min: Math.min(...durations),
    max: Math.max(...durations),
    samples: durations,
  };
}

async function persistSummary(summary) {
  const resultsDir = join(process.cwd(), "bench", ".results");
  await mkdir(resultsDir, { recursive: true });
  const outputPath = join(resultsDir, "workflows-latest.json");
  await writeFile(outputPath, JSON.stringify(summary, null, 2), "utf8");
}

async function main() {
  const iterations = Number.parseInt(process.env.WORKFLOW_ITERATIONS ?? "5", 10);
  const fixture = process.env.WORKFLOW_FIXTURE
    ? resolve(process.env.WORKFLOW_FIXTURE)
    : DEFAULT_FIXTURE;
  const origin = `file://${fixture}`;

  console.log(`Workflow comparison using fixture: ${fixture}`);
  console.log(`Iterations per mode: ${iterations}\n`);

  const html = await readFile(fixture, "utf8");

  const [h2mAwait, mdreamAwait, mdreamStream] = await Promise.all([
    runH2MAwait(html, origin, iterations),
    runMdreamAwait(html, origin, iterations),
    runMdreamStream(fixture, origin, iterations),
  ]);

  const modeSummaries = [
    buildModeSummary("h2m-parser (await)", iterations, h2mAwait),
    buildModeSummary("mdream (await)", iterations, mdreamAwait),
    buildModeSummary("mdream (stream)", iterations, mdreamStream),
  ];

  const rows = modeSummaries.map((summary) => [
    summary.name,
    summary.iterations,
    formatMs(summary.mean),
    formatMs(summary.p95),
    formatMs(summary.min),
    formatMs(summary.max),
  ]);

  printTable(rows);

  console.log(
    "\nTip: override WORKFLOW_ITERATIONS or WORKFLOW_FIXTURE env vars to customise the run.",
  );

  await persistSummary({
    generatedAt: new Date().toISOString(),
    iterations,
    fixture,
    origin,
    modes: modeSummaries,
  });
}

await main();
