import { mkdtemp, readFile, rm, writeFile } from "node:fs/promises";
import { tmpdir } from "node:os";
import { join } from "node:path";
import { aggregateResults } from "./aggregate-results.js";
import { commandTask, customTask, runTaskSequence } from "./lib/task-runner.js";

const DEFAULT_FIXTURE = join(
  process.cwd(),
  "tests",
  "fixtures",
  "039c4b966d1f2a0c589ac0aad211fe65500ad1cb58c7f45b34251db7056803ec.html",
);

export const SUITES = {
  full: {
    description: "Full regression-style benchmark suite",
    tasks: [
      commandTask("Comparison benchmark (full)", [
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
      ]),
      commandTask("Workflow comparison", ["bun", "bench/workflows.js"], {
        env: { WORKFLOW_ITERATIONS: "10" },
      }),
      commandTask("Memory microbench", [
        "bun",
        "bench/microbench/memory.js",
        "--mode",
        "h2m-reuse",
        "--iterations",
        "10",
      ]),
      commandTask("Bundle size snapshot", ["bun", "bench/measure-bundle.js"]),
      commandTask("Token usage estimator", ["bun", "bench/token-usage.js"]),
      commandTask("Fetch end-to-end sample", ["bun", "bench/fetch-e2e.js"], {
        env: { FETCH_ITERATIONS: "3" },
      }),
      commandTask("Export markdown (full dataset)", ["bun", "bench/export-markdown.js"]),
      customTask("Aggregate benchmark results", async (ctx) => {
        const { outputPath } = await aggregateResults();
        ctx.summaryPath = outputPath;
        console.log(`📦 Summary written to ${outputPath}`);
      }),
      commandTask("Update README", ["bun", "bench/update-readme.js", "--cached"]),
    ],
  },
  quick: {
    description: "Fast sanity suite (~1 minute)",
    setup: async (ctx) => {
      const dir = await mkdtemp(join(tmpdir(), "h2m-bench-"));
      const contents = await readFile(DEFAULT_FIXTURE, "utf8");
      await writeFile(join(dir, "fixture.html"), contents, "utf8");
      ctx.datasetDir = dir;
      console.log(`📂 Prepared temporary dataset at ${dir}`);
    },
    tasks: [
      commandTask("Comparison benchmark (quick)", [
        "bun",
        "bench/compare.js",
        "--iterations",
        "3",
        "--max-files",
        "3",
      ]),
      commandTask("Workflow comparison", ["bun", "bench/workflows.js"], {
        env: { WORKFLOW_ITERATIONS: "3" },
      }),
      commandTask("Token usage estimator", ["bun", "bench/token-usage.js"]),
      commandTask("Memory microbench", [
        "bun",
        "bench/microbench/memory.js",
        "--mode",
        "h2m-reuse",
        "--iterations",
        "1",
      ]),
      commandTask("Fetch end-to-end sample", ["bun", "bench/fetch-e2e.js"], {
        env: { FETCH_ITERATIONS: "1" },
      }),
      commandTask("Export markdown sample", (ctx) => [
        "bun",
        "bench/export-markdown.js",
        "--dataset",
        ctx.datasetDir ?? DEFAULT_FIXTURE,
      ]),
      customTask("Aggregate benchmark results", async (ctx) => {
        const { outputPath } = await aggregateResults();
        ctx.summaryPath = outputPath;
        console.log(`📦 Summary written to ${outputPath}`);
      }),
    ],
    teardown: async (ctx) => {
      if (ctx.datasetDir) {
        await rm(ctx.datasetDir, { recursive: true, force: true });
        console.log(`🧹 Removed temporary dataset ${ctx.datasetDir}`);
      }
    },
  },
};

export async function runSuite(name) {
  const suite = SUITES[name];
  if (!suite) {
    throw new Error(`Unknown suite: ${name}`);
  }

  const context = {};
  if (suite.setup) {
    await suite.setup(context);
  }

  try {
    await runTaskSequence(suite.tasks, context);
  } finally {
    if (suite.teardown) {
      await suite.teardown(context);
    }
  }
}
