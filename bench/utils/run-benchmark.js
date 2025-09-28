import { spawnSync } from "node:child_process";
import { readFile } from "node:fs/promises";
import { join } from "node:path";

const RESULTS_PATH = join(process.cwd(), "bench", ".results", "comparison-latest.json");
const DEFAULT_DATASET = join(process.cwd(), "tests", "fixtures");

export const DEFAULT_BENCHMARK_OPTIONS = {
  iterations: 100,
  maxFiles: null,
  maxFileSize: "5MB",
  warmupIterations: 3,
  dataset: DEFAULT_DATASET,
  readability: undefined,
  output: undefined,
  extraArgs: [],
};

/**
 * Runs the comparison benchmark with a consistent configuration and returns the parsed results.
 * By funnelling all baseline/regression scripts through this helper we avoid duplicating the
 * "spawn compare + read JSON" boilerplate and keep the configuration in one place.
 */
export async function runBenchmark(options = {}) {
  const {
    iterations,
    maxFiles,
    maxFileSize,
    warmupIterations,
    dataset,
    readability,
    output,
    extraArgs,
  } = { ...DEFAULT_BENCHMARK_OPTIONS, ...options };

  const args = ["bench/compare.js", "--iterations", String(iterations)];

  if (Number.isFinite(maxFiles)) {
    args.push("--max-files", String(maxFiles));
  }

  if (dataset) {
    args.push("--dataset", dataset);
  }

  if (output) {
    args.push("--output", output);
  }

  if (typeof maxFileSize !== "undefined" && maxFileSize !== null) {
    args.push("--max-file-size", String(maxFileSize));
  }

  if (Number.isFinite(warmupIterations) && warmupIterations >= 0) {
    args.push("--warmup", String(warmupIterations));
  }

  if (readability === false) {
    args.push("--no-readability");
  }

  args.push(...extraArgs);

  const result = spawnSync("node", args, { stdio: "inherit" });
  if (result.status !== 0) {
    throw new Error(`Benchmark process exited with code ${result.status}`);
  }

  const contents = await readFile(RESULTS_PATH, "utf8");
  return JSON.parse(contents);
}
