import { readFile } from "node:fs/promises";
import { performance } from "node:perf_hooks";
import { parentPort } from "node:worker_threads";
import { H2MParser } from "../dist/index.mjs";

let h2mParserInstance = null;
let optionsKey = "";
let stageTimings = [];
let instanceMode = "reuse"; // "reuse" or "fresh"

const telemetryHandler = (event) => {
  stageTimings.push(event);
};

function getH2MParserInstance(options) {
  const key = JSON.stringify(options ?? {});

  if (instanceMode === "fresh") {
    // Always create a new instance
    return new H2MParser({ ...options, telemetry: telemetryHandler });
  } else {
    // Reuse instance if options haven't changed
    if (!h2mParserInstance || key !== optionsKey) {
      h2mParserInstance = new H2MParser({ ...options, telemetry: telemetryHandler });
      optionsKey = key;
    }
    return h2mParserInstance;
  }
}

async function withTimeout(promise, ms, path) {
  let timeoutId;
  const timeoutPromise = new Promise((_, reject) => {
    timeoutId = setTimeout(() => {
      reject(new Error(`Processing timeout after ${ms}ms for ${path}`));
    }, ms);
  });

  try {
    const result = await Promise.race([promise, timeoutPromise]);
    clearTimeout(timeoutId);
    return result;
  } catch (error) {
    clearTimeout(timeoutId);
    throw error;
  }
}

parentPort.on("message", async (job) => {
  if (job === "die") {
    parentPort.postMessage({ done: true });
    setTimeout(() => process.exit(0), 10);
    return;
  }

  // Handle instance mode changes
  if (job.setInstanceMode) {
    instanceMode = job.setInstanceMode;
    h2mParserInstance = null; // Clear cached instance
    return;
  }

  const { path, baseUrl, h2mParserOptions } = job;
  const WORKER_TIMEOUT_MS = 30_000; // 30 seconds per file

  try {
    stageTimings = [];

    const processFile = async () => {
      const html = await readFile(path, "utf8");
      const bytesIn = Buffer.byteLength(html, "utf8");
      const h2mParser = getH2MParserInstance(h2mParserOptions);
      const start = performance.now();
      const result = await h2mParser.process(html, baseUrl ?? "https://example.local/");
      const duration = performance.now() - start;
      const rssUsage =
        typeof process.resourceUsage === "function" ? process.resourceUsage().maxRSS : 0;

      return {
        ok: true,
        path,
        ms: duration,
        bytesIn,
        bytesOut: Buffer.byteLength(result.markdown, "utf8"),
        rssKB: rssUsage,
        timings: stageTimings,
        chunks: result.chunks?.length ?? 0,
      };
    };

    const result = await withTimeout(processFile(), WORKER_TIMEOUT_MS, path);
    parentPort.postMessage(result);
  } catch (error) {
    parentPort.postMessage({ ok: false, path, error: error?.message || String(error) });
  }
});
