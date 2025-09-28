#!/usr/bin/env node

/**
 * Captures performance baseline for regression detection.
 * Run this on main branch to establish baseline metrics.
 */

import { execSync } from "node:child_process";
import { mkdir, writeFile } from "node:fs/promises";
import { join } from "node:path";
import { aggregateResults } from "./aggregate-results.js";
import { runBenchmark } from "./utils/run-benchmark.js";

const BASELINE_DIR = join(process.cwd(), "bench", ".baseline");
const BASELINE_FILE = join(BASELINE_DIR, "performance-baseline.json");

function safeGit(command, fallback = "unknown") {
  try {
    return execSync(command, { encoding: "utf8" }).trim();
  } catch (_error) {
    return fallback;
  }
}

async function captureBaseline() {
  console.log("📊 Capturing Performance Baseline\n");

  // Ensure baseline directory exists
  await mkdir(BASELINE_DIR, { recursive: true });

  // Get current branch
  const currentBranch = safeGit("git rev-parse --abbrev-ref HEAD");
  const currentCommit = safeGit("git rev-parse HEAD");

  console.log(`Branch: ${currentBranch}`);
  console.log(`Commit: ${currentCommit}\n`);

  // Run benchmark with consistent settings
  console.log("Running benchmark (this may take a minute)...\n");
  const results = await runBenchmark();
  let aggregatedSummary = null;
  try {
    const { summary } = await aggregateResults();
    aggregatedSummary = summary;
  } catch (error) {
    console.warn("Warning: unable to aggregate extended benchmark data:", error.message);
  }

  // Extract key metrics for baseline
  const baseline = {
    capturedAt: new Date().toISOString(),
    branch: currentBranch,
    commit: currentCommit,
    nodeVersion: process.version,
    platform: process.platform,
    metrics: {
      h2mParserNoReadability: {
        mean: results.summary.averages.h2mParserNoReadability,
        files: {},
      },
      h2mParserWithReadability: {
        mean: results.summary.averages.h2mParserWithReadability,
        files: {},
      },
      comparisons: {
        vsTurndown: results.summary.comparisons.vsTurndown,
        vsNodeHtmlMarkdown: results.summary.comparisons.vsNodeHtmlMarkdown,
        vsMdream: results.summary.comparisons.vsMdream,
      },
      mdream: {
        mean: results.summary.averages.mdream,
        files: {},
      },
    },
    fileResults: [],
    extras: {
      workflows: aggregatedSummary?.workflows ?? null,
      tokenUsage: aggregatedSummary?.tokenUsage ?? null,
      memory: aggregatedSummary?.memory ?? null,
      fetchE2E: aggregatedSummary?.fetchE2E ?? null,
    },
  };

  // Capture per-file baselines for regression detection
  for (const fileResult of results.results.slice(0, 10)) {
    // Top 10 files as representatives
    baseline.fileResults.push({
      name: fileResult.name,
      size: fileResult.size,
      h2mParserNoReadability: fileResult.benchmarks["h2m-parser_no_readability"]?.mean,
      h2mParserWithReadability: fileResult.benchmarks["h2m-parser_with_readability"]?.mean,
      turndown: fileResult.benchmarks.turndown?.mean,
      nodeHtmlMarkdown: fileResult.benchmarks.node_html_markdown?.mean,
      mdream: fileResult.benchmarks.mdream?.mean,
    });
  }

  // Save baseline
  await writeFile(BASELINE_FILE, JSON.stringify(baseline, null, 2));

  console.log("\n✅ Baseline captured successfully!");
  console.log(`📁 Saved to: ${BASELINE_FILE}`);
  console.log("\nKey metrics:");
  console.log(
    `  h2m-parser (no Readability): ${baseline.metrics.h2mParserNoReadability.mean.toFixed(3)}ms`,
  );
  console.log(
    `  h2m-parser (with Readability): ${baseline.metrics.h2mParserWithReadability.mean.toFixed(3)}ms`,
  );
  console.log(`  vs Turndown: ${baseline.metrics.comparisons.vsTurndown.toFixed(2)}x`);
  console.log(
    `  vs node-html-markdown: ${baseline.metrics.comparisons.vsNodeHtmlMarkdown.toFixed(2)}x`,
  );
  console.log(`  vs mdream: ${baseline.metrics.comparisons.vsMdream.toFixed(2)}x`);

  return baseline;
}

// CLI
if (import.meta.url === `file://${process.argv[1]}`) {
  captureBaseline().catch(console.error);
}

export { captureBaseline };
