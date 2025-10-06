#!/usr/bin/env bun

import { constants } from "node:fs";
import { access, mkdir, readFile, writeFile } from "node:fs/promises";
import { join } from "node:path";

const RESULTS_DIR = join(process.cwd(), "bench", ".results");

async function readJsonIfExists(path) {
  try {
    await access(path, constants.F_OK);
    const contents = await readFile(path, "utf8");
    return JSON.parse(contents);
  } catch (error) {
    if (error.code === "ENOENT") {
      return null;
    }
    throw error;
  }
}

async function aggregateResults({ resultsDir = RESULTS_DIR } = {}) {
  const comparison = await readJsonIfExists(join(resultsDir, "comparison-latest.json"));
  const workflows = await readJsonIfExists(join(resultsDir, "workflows-latest.json"));
  const memory = await readJsonIfExists(join(resultsDir, "memory-latest.json"));
  const tokenUsage = await readJsonIfExists(join(resultsDir, "token-usage-latest.json"));
  const fetchE2E = await readJsonIfExists(join(resultsDir, "fetch-e2e-latest.json"));
  const bundleSize = await readJsonIfExists(join(resultsDir, "bundle-size-latest.json"));

  const summary = {
    generatedAt: new Date().toISOString(),
    comparison: comparison?.summary
      ? {
          verdict: comparison.summary.verdict,
          averages: comparison.summary.averages,
          comparisons: comparison.summary.comparisons,
          meta: comparison.meta,
        }
      : null,
    workflows,
    memory,
    tokenUsage,
    fetchE2E,
    bundleSize,
  };

  await mkdir(resultsDir, { recursive: true });
  const outputPath = join(resultsDir, "summary-latest.json");
  await writeFile(outputPath, JSON.stringify(summary, null, 2), "utf8");

  return { summary, outputPath };
}

if (import.meta.url === `file://${process.argv[1]}`) {
  aggregateResults()
    .then(({ outputPath }) => {
      console.log(`✅ Aggregated benchmark results written to ${outputPath}`);
    })
    .catch((error) => {
      console.error("❌ Failed to aggregate benchmark results:", error);
      process.exitCode = 1;
    });
}

export { aggregateResults };
