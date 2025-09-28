#!/usr/bin/env node

/**
 * Fetch a remote page and run end-to-end conversion using h2m-parser and mdream.
 */

import { mkdir, writeFile } from "node:fs/promises";
import { join } from "node:path";
import { performance } from "node:perf_hooks";
import { htmlToMarkdown as mdreamHtmlToMarkdown, streamHtmlToMarkdown } from "mdream";
import { loadH2MParser } from "./utils/h2m-loader.js";

const DEFAULT_URL = process.env.FETCH_URL ?? "https://en.wikipedia.org/wiki/Markdown";
const ITERATIONS = Number.parseInt(process.env.FETCH_ITERATIONS ?? "1", 10);

async function fetchHtml(url) {
  const response = await fetch(url);
  if (!response.ok) {
    throw new Error(`Failed to fetch ${url}: ${response.status} ${response.statusText}`);
  }
  return await response.text();
}

const H2MParser = await loadH2MParser();

async function runH2M(html, url) {
  const parser = new H2MParser();
  const start = performance.now();
  const result = await parser.process(html, url);
  const duration = performance.now() - start;
  return { duration, markdown: result.markdown };
}

async function runMdreamAwait(html, url) {
  const start = performance.now();
  const markdown = mdreamHtmlToMarkdown(html, { origin: url });
  const duration = performance.now() - start;
  return { duration, markdown };
}

async function runMdreamStream(url) {
  const controller = new AbortController();
  try {
    const response = await fetch(url, { signal: controller.signal });
    if (!response.ok || !response.body) {
      throw new Error(
        `Streaming fetch failed for ${url}: ${response.status} ${response.statusText}`,
      );
    }
    const start = performance.now();
    let total = 0;
    for await (const chunk of streamHtmlToMarkdown(response.body, { origin: url })) {
      total += chunk.length;
    }
    const duration = performance.now() - start;
    return { duration, emitted: total };
  } finally {
    controller.abort();
  }
}

async function main() {
  const url = DEFAULT_URL;
  console.log(`Fetching ${url} (${ITERATIONS} iteration${ITERATIONS === 1 ? "" : "s"})`);

  const html = await fetchHtml(url);

  const h2mRuns = [];
  const mdreamAwaitRuns = [];
  const mdreamStreamRuns = [];

  for (let i = 0; i < ITERATIONS; i += 1) {
    h2mRuns.push(await runH2M(html, url));
    mdreamAwaitRuns.push(await runMdreamAwait(html, url));
    mdreamStreamRuns.push(await runMdreamStream(url));
  }

  const summarise = (label, runs, extraFormatter) => {
    const durations = runs.map((run) => run.duration);
    const mean = durations.reduce((sum, d) => sum + d, 0) / durations.length;
    console.log(`\n${label}`);
    console.log(`  Mean: ${mean.toFixed(2)} ms`);
    console.log(`  Min:  ${Math.min(...durations).toFixed(2)} ms`);
    console.log(`  Max:  ${Math.max(...durations).toFixed(2)} ms`);
    if (extraFormatter) {
      extraFormatter(runs);
    }
  };

  summarise("h2m-parser", h2mRuns, (runs) => {
    console.log(`  Markdown length: ${runs[0].markdown.length} characters`);
  });

  summarise("mdream (await)", mdreamAwaitRuns, (runs) => {
    console.log(`  Markdown length: ${runs[0].markdown.length} characters`);
  });

  summarise("mdream (stream)", mdreamStreamRuns, (runs) => {
    const emitted = runs.map((run) => run.emitted);
    console.log(
      `  Emitted chars:  mean=${(emitted.reduce((a, b) => a + b, 0) / emitted.length).toFixed(0)}`,
    );
  });

  console.log("\nTip: set FETCH_URL or FETCH_ITERATIONS env vars to customise the run.");

  const stats = (runs) => {
    const durations = runs.map((run) => run.duration);
    return {
      mean: durations.reduce((sum, d) => sum + d, 0) / durations.length,
      min: Math.min(...durations),
      max: Math.max(...durations),
      samples: durations,
    };
  };

  const resultsDir = join(process.cwd(), "bench", ".results");
  await mkdir(resultsDir, { recursive: true });
  const summary = {
    generatedAt: new Date().toISOString(),
    url,
    iterations: ITERATIONS,
    h2m: {
      stats: stats(h2mRuns),
      markdownLength: h2mRuns[0]?.markdown.length ?? 0,
    },
    mdreamAwait: {
      stats: stats(mdreamAwaitRuns),
      markdownLength: mdreamAwaitRuns[0]?.markdown.length ?? 0,
    },
    mdreamStream: {
      stats: stats(mdreamStreamRuns),
      emittedChars: mdreamStreamRuns.map((run) => run.emitted),
    },
  };

  await writeFile(
    join(resultsDir, "fetch-e2e-latest.json"),
    JSON.stringify(summary, null, 2),
    "utf8",
  );
}

await main();
