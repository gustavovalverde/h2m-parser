#!/usr/bin/env node

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

async function aggregateResults() {
  const comparison = await readJsonIfExists(join(RESULTS_DIR, "comparison-latest.json"));
  const workflows = await readJsonIfExists(join(RESULTS_DIR, "workflows-latest.json"));
  const memory = await readJsonIfExists(join(RESULTS_DIR, "memory-latest.json"));
  const tokenUsage = await readJsonIfExists(join(RESULTS_DIR, "token-usage-latest.json"));
  const fetchE2E = await readJsonIfExists(join(RESULTS_DIR, "fetch-e2e-latest.json"));
  const bundleSize = await readJsonIfExists(join(RESULTS_DIR, "bundle-size-latest.json"));

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

  await mkdir(RESULTS_DIR, { recursive: true });
  const outputPath = join(RESULTS_DIR, "summary-latest.json");
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
