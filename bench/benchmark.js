#!/usr/bin/env node
/**
 * Benchmark wrapper that provides process isolation for each benchmark run
 * This ensures clean memory state between benchmark configurations
 */
import { spawn } from "node:child_process";
import { join } from "node:path";

const RUNNER_PATH = join(process.cwd(), "bench", "runner.js");

/**
 * Run benchmark in isolated process
 * @param {string[]} args - Command line arguments
 * @returns {Promise<void>}
 */
async function runBenchmarkInProcess(args) {
  return new Promise((resolve, reject) => {
    const child = spawn("node", [RUNNER_PATH, ...args], {
      stdio: "inherit",
      env: { ...process.env },
    });

    child.on("error", reject);
    child.on("exit", (code) => {
      if (code === 0) {
        resolve();
      } else {
        reject(new Error(`Benchmark process exited with code ${code}`));
      }
    });
  });
}

/**
 * Run comparison benchmarks for fresh vs reused instances
 */
async function runComparison() {
  const baseArgs = process.argv.slice(2).filter(arg => !arg.startsWith("--compare"));

  console.log("\n" + "=".repeat(60));
  console.log("Running benchmark comparison: REUSED vs FRESH instances");
  console.log("=".repeat(60) + "\n");

  console.log("1. Running with REUSED instance mode...");
  console.log("-".repeat(40));
  await runBenchmarkInProcess([...baseArgs, "--instance-mode", "reuse"]);

  console.log("\n2. Running with FRESH instance mode...");
  console.log("-".repeat(40));
  await runBenchmarkInProcess([...baseArgs, "--instance-mode", "fresh"]);

  console.log("\n" + "=".repeat(60));
  console.log("Comparison complete! Check the results above.");
  console.log("=".repeat(60) + "\n");
}

/**
 * Main entry point
 */
async function main() {
  try {
    const args = process.argv.slice(2);

    if (args.includes("--compare")) {
      await runComparison();
    } else {
      // Run single benchmark in isolated process
      await runBenchmarkInProcess(args);
    }
  } catch (error) {
    console.error("Benchmark failed:", error.message);
    process.exitCode = 1;
  }
}

main();