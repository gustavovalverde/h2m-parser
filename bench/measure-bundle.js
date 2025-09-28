#!/usr/bin/env node

import { mkdir, readdir, readFile, stat, writeFile } from "node:fs/promises";
import { join } from "node:path";
import { collectBundleFiles, computeBundleSummary } from "./lib/bundle-metrics.js";
import { loadH2MModule } from "./utils/h2m-loader.js";

const DIST_DIR = join(process.cwd(), "dist");
const RESULTS_DIR = join(process.cwd(), "bench", ".results");
const PREVIOUS_PATH = join(RESULTS_DIR, "bundle-size-last.json");
const OUTPUT_PATH = join(RESULTS_DIR, "bundle-size-latest.json");

async function fileExists(path) {
  try {
    await stat(path);
    return true;
  } catch (error) {
    if (error.code === "ENOENT") {
      return false;
    }
    throw error;
  }
}

async function loadPrevious() {
  if (!(await fileExists(PREVIOUS_PATH))) {
    return null;
  }
  const contents = await readFile(PREVIOUS_PATH, "utf8");
  return JSON.parse(contents);
}

async function measureFiles() {
  await loadH2MModule();

  const distEntries = await readdir(DIST_DIR, { withFileTypes: true });
  const previous = await loadPrevious();
  const filePaths = distEntries
    .filter((entry) => entry.isFile() && /\.(cjs|mjs)$/i.test(entry.name))
    .map((entry) => ({ name: entry.name, path: join(DIST_DIR, entry.name) }));

  const files = await collectBundleFiles(filePaths, (path) => readFile(path));

  const summary = computeBundleSummary(files, previous);

  await mkdir(RESULTS_DIR, { recursive: true });
  await writeFile(OUTPUT_PATH, JSON.stringify(summary, null, 2), "utf8");
  await writeFile(PREVIOUS_PATH, JSON.stringify(summary, null, 2), "utf8");

  const fmt = (bytes) => `${(bytes / 1024).toFixed(1)} KB`;
  console.log("Bundle size summary:\n");
  for (const file of summary.files) {
    const diffStr =
      file.sizeDiff == null
        ? "(new baseline)"
        : `${file.sizeDiff >= 0 ? "+" : ""}${file.sizeDiff} B (${file.sizeDiffPct?.toFixed(2) ?? "N/A"}%)`;
    console.log(`- ${file.name}: ${fmt(file.size)} gz=${fmt(file.gzipSize)} ${diffStr}`);
  }
}

await measureFiles();
