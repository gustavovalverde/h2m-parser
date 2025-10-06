#!/usr/bin/env bun

import { spawn } from "node:child_process";
import { aggregateResults } from "./aggregate-results.js";

async function runCommand(name, command, options = {}) {
  console.log(`\n▶️  ${name}`);
  await new Promise((resolve, reject) => {
    const child = spawn(command[0], command.slice(1), {
      stdio: "inherit",
      env: { ...process.env, ...options.env },
    });
    child.on("error", reject);
    child.on("exit", (code) => {
      if (code === 0) {
        resolve();
      } else {
        reject(new Error(`${name} exited with code ${code}`));
      }
    });
  });
}

async function main() {
  const tasks = [
    {
      name: "Comparison benchmark (full)",
      command: [
        "bun",
        "bench/compare.js",
        "--iterations",
        "100",
        "--output",
        "markdown",
        "--max-file-size",
        "5MB",
        "--warmup",
        "3",
      ],
    },
    {
      name: "Workflow comparison",
      command: ["bun", "bench/workflows.js"],
      env: { WORKFLOW_ITERATIONS: "10" },
    },
    {
      name: "Memory microbench",
      command: ["bun", "bench/microbench/memory.js", "--mode", "h2m-reuse", "--iterations", "10"],
    },
    {
      name: "Bundle size snapshot",
      command: ["bun", "bench/measure-bundle.js"],
    },
    {
      name: "Token usage estimator",
      command: ["bun", "bench/token-usage.js"],
    },
    {
      name: "Fetch end-to-end sample",
      command: ["bun", "bench/fetch-e2e.js"],
      env: { FETCH_ITERATIONS: "3" },
    },
    {
      name: "Export markdown (full dataset)",
      command: ["bun", "bench/export-markdown.js"],
    },
  ];

  for (const task of tasks) {
    await runCommand(task.name, task.command, task);
  }

  const { outputPath } = await aggregateResults();
  console.log(`\n📦 Summary written to ${outputPath}`);

  await runCommand("Update README", ["bun", "bench/update-readme.js", "--cached"]);
}

main().catch((error) => {
  console.error("❌ Full benchmark suite failed:", error);
  process.exitCode = 1;
});
