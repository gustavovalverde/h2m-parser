import { spawnSync } from "node:child_process";
import { readFile } from "node:fs/promises";
import { join } from "node:path";

const RESULTS_PATH = join(process.cwd(), "bench", ".results", "comparison-latest.json");

/**
 * Runs the comparison benchmark with a consistent configuration and returns the parsed results.
 * By funnelling all baseline/regression scripts through this helper we avoid duplicating the
 * "spawn compare + read JSON" boilerplate and keep the configuration in one place.
 */
export async function runBenchmark({
  iterations = 50,
  maxFiles = 20,
  dataset,
  readability,
  output,
  extraArgs = [],
} = {}) {
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
