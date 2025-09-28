import { gzipSync } from "node:zlib";

export async function collectBundleFiles(paths, readFile) {
  const files = [];
  for (const { name, path } of paths) {
    const content = await readFile(path);
    files.push({
      name,
      size: content.length,
      gzipSize: gzipSync(content).length,
    });
  }
  return files.sort((a, b) => a.name.localeCompare(b.name));
}

function computeDiff(current, previous) {
  if (!previous) {
    return {
      sizeDiff: null,
      gzipDiff: null,
      sizeDiffPct: null,
      gzipDiffPct: null,
    };
  }
  const sizeDiff = current.size - previous.size;
  const gzipDiff = current.gzipSize - previous.gzipSize;
  const pct = (delta, base) => (base === 0 ? null : (delta / base) * 100);
  return {
    sizeDiff,
    gzipDiff,
    sizeDiffPct: pct(sizeDiff, previous.size),
    gzipDiffPct: pct(gzipDiff, previous.gzipSize),
  };
}

export function computeBundleSummary(files, previousSummary) {
  const previousFiles = previousSummary?.files ?? [];
  const results = files.map((file) => {
    const prev = previousFiles.find((entry) => entry.name === file.name);
    return {
      name: file.name,
      size: file.size,
      gzipSize: file.gzipSize,
      ...computeDiff(file, prev ?? null),
    };
  });

  return {
    generatedAt: new Date().toISOString(),
    files: results,
  };
}
