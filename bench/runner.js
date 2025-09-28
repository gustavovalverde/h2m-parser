#!/usr/bin/env node
import { mkdir, readdir, readFile, stat, writeFile } from "node:fs/promises";
import os from "node:os";
import { join, resolve } from "node:path";
import { monitorEventLoopDelay, performance } from "node:perf_hooks";
import { Worker } from "node:worker_threads";
import { ProgressBar } from "./progress.js";

const DEFAULT_DATASET = join(process.cwd(), "tests", "fixtures");
const DEFAULT_CONCURRENCY = Math.max(1, os.cpus().length);
const DEFAULT_REPEATS = 1;
const DEFAULT_TIMEOUT_MS = 120_000;
const RESULTS_DIR = join(process.cwd(), "bench", ".results");

function parseArgs(argv) {
  const opts = {
    dataset: DEFAULT_DATASET,
    concurrency: DEFAULT_CONCURRENCY,
    repeats: DEFAULT_REPEATS,
    shuffle: true,
    chunk: false,
    chunkSize: 500,
    chunkOverlap: 80,
    timeoutMs: DEFAULT_TIMEOUT_MS,
    quick: false,
    maxFiles: 0,
    instanceMode: "reuse", // "reuse" or "fresh"
    showProgress: true,
  };

  for (let i = 0; i < argv.length; i += 1) {
    const arg = argv[i];
    if (arg === "--") {
      continue;
    }
    switch (arg) {
      case "--dataset":
        opts.dataset = resolve(argv[++i] ?? "");
        break;
      case "--concurrency":
        opts.concurrency = Number.parseInt(argv[++i] ?? "", 10) || DEFAULT_CONCURRENCY;
        break;
      case "--repeats":
        opts.repeats = Math.max(1, Number.parseInt(argv[++i] ?? "1", 10));
        break;
      case "--chunk":
        opts.chunk = true;
        break;
      case "--chunk-size":
        opts.chunk = true;
        opts.chunkSize = Math.max(1, Number.parseInt(argv[++i] ?? "500", 10));
        break;
      case "--chunk-overlap":
        opts.chunk = true;
        opts.chunkOverlap = Math.max(0, Number.parseInt(argv[++i] ?? "80", 10));
        break;
      case "--timeout":
      case "--timeout-ms":
        opts.timeoutMs = Math.max(
          1_000,
          Number.parseInt(argv[++i] ?? String(DEFAULT_TIMEOUT_MS), 10),
        );
        break;
      case "--no-shuffle":
        opts.shuffle = false;
        break;
      case "--quick":
        opts.quick = true;
        opts.maxFiles = 25;
        break;
      case "--max-files":
        opts.maxFiles = Math.max(0, Number.parseInt(argv[++i] ?? "0", 10));
        break;
      case "--instance-mode":
        opts.instanceMode = argv[++i] ?? "reuse";
        if (!["reuse", "fresh"].includes(opts.instanceMode)) {
          throw new Error(
            `Invalid instance mode: ${opts.instanceMode}. Must be 'reuse' or 'fresh'`,
          );
        }
        break;
      case "--no-progress":
        opts.showProgress = false;
        break;
      default:
        throw new Error(`Unknown flag: ${arg}`);
    }
  }

  return opts;
}

async function collectHtmlFiles(entry) {
  const resolved = resolve(entry);
  const info = await stat(resolved);
  if (info.isFile()) {
    const contents = await readFile(resolved, "utf8");
    return contents
      .split(/\r?\n/)
      .map((line) => line.trim())
      .filter(Boolean)
      .map((line) => resolve(line));
  }

  const files = [];
  async function walk(dir) {
    const entries = await readdir(dir, { withFileTypes: true });
    for (const entry of entries) {
      const entryPath = join(dir, entry.name);
      if (entry.isDirectory()) {
        await walk(entryPath);
        continue;
      }
      if (/\.x?html?$/i.test(entry.name)) {
        files.push(resolve(entryPath));
      }
    }
  }
  await walk(resolved);
  return files;
}

function shuffleInPlace(arr) {
  for (let i = arr.length - 1; i > 0; i -= 1) {
    const j = Math.floor(Math.random() * (i + 1));
    [arr[i], arr[j]] = [arr[j], arr[i]];
  }
  return arr;
}

function percentile(values, p) {
  if (!values.length) {
    return 0;
  }
  const sorted = values.slice().sort((a, b) => a - b);
  const idx = Math.floor((sorted.length - 1) * p);
  return sorted[idx];
}

function mean(values) {
  if (!values.length) {
    return 0;
  }
  return values.reduce((sum, v) => sum + v, 0) / values.length;
}

function stdDev(values) {
  if (values.length < 2) {
    return 0;
  }
  const avg = mean(values);
  const squareDiffs = values.map((v) => (v - avg) ** 2);
  return Math.sqrt(mean(squareDiffs));
}

async function run() {
  const opts = parseArgs(process.argv.slice(2));
  const distPath = resolve("dist", "index.mjs");
  try {
    await stat(distPath);
  } catch (_error) {
    throw new Error("dist/index.mjs not found. Run `pnpm build` before executing the benchmark.");
  }

  let files = await collectHtmlFiles(opts.dataset);
  if (files.length === 0) {
    throw new Error(`No HTML files found under ${opts.dataset}`);
  }

  if (opts.maxFiles > 0 && files.length > opts.maxFiles) {
    console.log(`[bench] Quick mode: limiting to ${opts.maxFiles} files (out of ${files.length})`);
    files = files.slice(0, opts.maxFiles);
  }

  const h2mParserOptions = opts.chunk
    ? {
        llm: {
          frontMatter: true,
          addHash: false,
          chunk: { targetTokens: opts.chunkSize, overlapTokens: opts.chunkOverlap },
        },
      }
    : {
        llm: { frontMatter: true, addHash: false, chunk: false },
      };

  const tasks = [];
  for (let r = 0; r < opts.repeats; r += 1) {
    const batch = opts.shuffle ? shuffleInPlace(files.slice()) : files;
    for (const path of batch) {
      tasks.push({ path, baseUrl: `file://${path}`, h2mParserOptions });
    }
  }

  const stageTotals = new Map();
  const latencies = [];
  let totalBytesIn = 0;
  let totalBytesOut = 0;
  let maxRssKB = 0;
  const failures = [];

  const histogram = monitorEventLoopDelay({ resolution: 10 });
  histogram.enable();

  const start = performance.now();
  let sent = 0;
  let completed = 0;
  const workerScript = new URL("./worker.js", import.meta.url);
  const workerOptions = { type: "module" };
  const workerCount = Math.max(1, Math.min(opts.concurrency, tasks.length));
  const workers = Array.from(
    { length: workerCount },
    () => new Worker(workerScript, workerOptions),
  );

  // Set instance mode for all workers
  if (opts.instanceMode) {
    console.log(`[bench] Using ${opts.instanceMode} instance mode`);
    for (const worker of workers) {
      worker.postMessage({ setInstanceMode: opts.instanceMode });
    }
  }

  // Create progress bar
  let progressBar = null;
  if (opts.showProgress) {
    progressBar = new ProgressBar(tasks.length, {
      complete: "█",
      incomplete: "░",
      width: 40,
      renderThrottle: 100,
    });
  }

  const pending = new Set(workers);
  const inFlight = new Map();

  const dispatch = (worker) => {
    if (sent >= tasks.length) {
      return;
    }
    const job = tasks[sent];
    sent += 1;
    if (!opts.showProgress) {
      console.log(`[bench] starting: ${job.path} (task ${sent}/${tasks.length})`);
    }
    inFlight.set(worker.threadId, { path: job.path, start: performance.now() });
    worker.postMessage(job);
  };

  let timeoutHandle;
  let progressHandle;
  let aborted = false;

  await new Promise((resolveDone) => {
    timeoutHandle = setTimeout(() => {
      aborted = true;
      if (progressBar) {
        progressBar.terminate();
      }
      console.error(`Benchmark timed out after ${opts.timeoutMs}ms. Aborting...`);
      for (const worker of workers) {
        worker.terminate().catch(() => {});
      }
      resolveDone();
    }, opts.timeoutMs);

    progressHandle = setInterval(() => {
      if (!opts.showProgress) {
        console.log(`[bench] processed ${completed}/${tasks.length} documents...`);
      }
      const now = performance.now();
      const stuck = [];
      for (const [threadId, info] of inFlight.entries()) {
        const age = (now - info.start) / 1000;
        if (age > 3) {
          stuck.push({ threadId, path: info.path, age });
        }
      }
      if (stuck.length > 0 && !opts.showProgress) {
        console.log(`[bench] ${stuck.length} file(s) taking longer than expected:`);
        for (const { threadId, path, age } of stuck) {
          console.log(`  - Worker ${threadId}: ${path} (${age.toFixed(1)}s elapsed)`);
        }
      }
    }, 2_000);

    for (const worker of workers) {
      worker.on("message", (msg) => {
        if (msg?.done) {
          pending.delete(worker);
          if (pending.size === 0) {
            resolveDone();
          }
          return;
        }

        completed += 1;
        inFlight.delete(worker.threadId);
        if (msg.ok) {
          if (!opts.showProgress) {
            console.log(
              `[bench] completed: ${msg.path} (${msg.ms.toFixed(0)}ms, ${msg.chunks ?? 0} chunks)`,
            );
          } else if (progressBar) {
            progressBar.tick();
          }
          latencies.push(msg.ms);
          totalBytesIn += msg.bytesIn ?? 0;
          totalBytesOut += msg.bytesOut ?? 0;
          if (typeof msg.rssKB === "number") {
            maxRssKB = Math.max(maxRssKB, msg.rssKB);
          }
          for (const timing of msg.timings ?? []) {
            const bucket = stageTotals.get(timing.stage) ?? {
              count: 0,
              totalMs: 0,
              totalBytesIn: 0,
              totalBytesOut: 0,
            };
            bucket.count += 1;
            bucket.totalMs += timing.durationMs;
            if (typeof timing.bytesIn === "number") {
              bucket.totalBytesIn += timing.bytesIn;
            }
            if (typeof timing.bytesOut === "number") {
              bucket.totalBytesOut += timing.bytesOut;
            }
            stageTotals.set(timing.stage, bucket);
          }
        } else {
          if (progressBar) {
            progressBar.tick(); // Still tick progress even on failure
          }
          if (!opts.showProgress) {
            console.error(`[bench] FAILED: ${msg.path} - ${msg.error}`);
          }
          failures.push({ path: msg.path, error: msg.error });
        }

        if (aborted) {
          return;
        }

        if (sent < tasks.length) {
          dispatch(worker);
        } else if (completed >= tasks.length) {
          console.log(`[bench] All tasks completed (${completed}/${tasks.length})`);
          resolveDone();
        }
      });

      worker.on("error", (error) => {
        const inFlightTask = inFlight.get(worker.threadId);
        console.error(
          `[bench] WORKER ERROR: ${inFlightTask?.path ?? "<unknown>"} - ${error.message}`,
        );
        failures.push({ path: inFlightTask?.path ?? "<worker>", error: error.message });
        inFlight.delete(worker.threadId);
        if (sent >= tasks.length && pending.has(worker)) {
          pending.delete(worker);
          if (pending.size === 0) {
            resolveDone();
          }
        }
      });

      dispatch(worker);
    }
  });

  clearTimeout(timeoutHandle);
  clearInterval(progressHandle);

  console.log(`[bench] Terminating ${workers.length} workers...`);
  for (const worker of workers) {
    worker.postMessage("die");
  }

  await Promise.all(
    workers.map(
      (worker) =>
        new Promise((resolveWorker) => {
          const timeoutId = setTimeout(() => {
            console.log(`[bench] Force terminating worker ${worker.threadId}`);
            worker.terminate();
            resolveWorker();
          }, 2000);

          worker.once("exit", () => {
            clearTimeout(timeoutId);
            resolveWorker();
          });
        }),
    ),
  );
  console.log(`[bench] All workers terminated`);

  histogram.disable();

  const durationSeconds = (performance.now() - start) / 1000;
  const docs = latencies.length;
  const throughputMBps = docs === 0 ? 0 : totalBytesIn / (1024 * 1024) / durationSeconds;
  const docsPerSec = docs === 0 ? 0 : docs / durationSeconds;
  const meanLatency = mean(latencies);
  const stdDevLatency = stdDev(latencies);
  const p50 = percentile(latencies, 0.5);
  const p90 = percentile(latencies, 0.9);
  const p99 = percentile(latencies, 0.99);

  const stageSummary = Array.from(stageTotals.entries()).map(([stage, stats]) => ({
    stage,
    averageMs: stats.count ? stats.totalMs / stats.count : 0,
    averageBytesIn: stats.count ? stats.totalBytesIn / stats.count : 0,
    averageBytesOut: stats.count ? stats.totalBytesOut / stats.count : 0,
  }));

  const summary = {
    dataset: opts.dataset,
    concurrency: workerCount,
    repeats: opts.repeats,
    shuffle: opts.shuffle,
    chunk: opts.chunk ? { targetTokens: opts.chunkSize, overlapTokens: opts.chunkOverlap } : null,
    timeoutMs: opts.timeoutMs,
    aborted,
    documents: docs,
    durationSeconds,
    throughput: {
      mbPerSecond: Number.isFinite(throughputMBps) ? throughputMBps : 0,
      docsPerSecond: Number.isFinite(docsPerSec) ? docsPerSec : 0,
    },
    latencyMs: {
      mean: meanLatency,
      stdDev: stdDevLatency,
      p50,
      p90,
      p99,
    },
    bytes: {
      totalIn: totalBytesIn,
      totalOut: totalBytesOut,
      averageIn: docs ? totalBytesIn / docs : 0,
      averageOut: docs ? totalBytesOut / docs : 0,
    },
    peakRssMB: maxRssKB / 1024,
    eventLoopLagMs: {
      mean: histogram.mean / 1_000_000,
      p99: histogram.percentile(99) / 1_000_000,
    },
    stageSummary,
    failures,
    timestamp: new Date().toISOString(),
  };

  await mkdir(RESULTS_DIR, { recursive: true });
  await writeFile(
    join(RESULTS_DIR, "latest.json"),
    `${JSON.stringify(summary, null, 2)}\n`,
    "utf8",
  );

  console.log("\n=== h2m-parser Benchmark Summary ===");
  console.log(`Dataset: ${summary.dataset}`);
  console.log(`Files processed: ${docs}`);
  console.log(`Duration: ${durationSeconds.toFixed(2)} s`);
  console.log(
    `Throughput: ${summary.throughput.mbPerSecond.toFixed(2)} MB/s | ${summary.throughput.docsPerSecond.toFixed(1)} docs/s`,
  );
  console.log(
    `Latency mean=${summary.latencyMs.mean.toFixed(1)} ms  stdDev=${summary.latencyMs.stdDev.toFixed(1)} ms`,
  );
  console.log(
    `         p50=${summary.latencyMs.p50.toFixed(1)} ms  p90=${summary.latencyMs.p90.toFixed(1)} ms  p99=${summary.latencyMs.p99.toFixed(1)} ms`,
  );
  console.log(`Peak RSS: ${summary.peakRssMB.toFixed(2)} MiB`);
  console.log(
    `Event loop lag mean=${summary.eventLoopLagMs.mean.toFixed(2)} ms  p99=${summary.eventLoopLagMs.p99.toFixed(2)} ms`,
  );

  if (stageSummary.length) {
    console.log("\nStage averages (ms):");
    for (const stage of stageSummary) {
      console.log(
        `  ${stage.stage.padEnd(6)} ${stage.averageMs.toFixed(2)} ms | bytes in ${stage.averageBytesIn.toFixed(0)} | bytes out ${stage.averageBytesOut.toFixed(0)}`,
      );
    }
  }

  if (failures.length) {
    console.log("\nFailures:");
    for (const failure of failures) {
      console.log(`  ${failure.path}: ${failure.error}`);
    }
  }

  // Show estimated processing times for different file sizes
  if (docs > 0 && totalBytesIn > 0) {
    const bytesPerMs = totalBytesIn / latencies.reduce((sum, v) => sum + v, 0);
    console.log("\nEstimated processing times:");
    const sizes = [
      { label: "100 KB", bytes: 100 * 1024 },
      { label: "1 MB", bytes: 1024 * 1024 },
      { label: "10 MB", bytes: 10 * 1024 * 1024 },
      { label: "50 MB", bytes: 50 * 1024 * 1024 },
    ];
    for (const size of sizes) {
      const estimatedMs = size.bytes / bytesPerMs;
      if (estimatedMs < 1000) {
        console.log(`  ${size.label.padEnd(6)} ~${estimatedMs.toFixed(0)} ms`);
      } else {
        console.log(`  ${size.label.padEnd(6)} ~${(estimatedMs / 1000).toFixed(1)} s`);
      }
    }
  }
}

run().catch((error) => {
  console.error(error);
  process.exitCode = 1;
});
