import { mkdtemp, readFile, rm, writeFile } from "node:fs/promises";
import { tmpdir } from "node:os";
import { join } from "node:path";
import { describe, expect, it } from "vitest";
import { collectBundleFiles, computeBundleSummary } from "../../bench/lib/bundle-metrics.js";

describe("bundle metrics", () => {
  it("collects bundle file sizes and computes diffs", async () => {
    const dir = await mkdtemp(join(tmpdir(), "h2m-bundle-"));
    try {
      const filesOnDisk = [
        { name: "index.mjs", path: join(dir, "index.mjs"), contents: "export const x = 1;" },
        { name: "cli.cjs", path: join(dir, "cli.cjs"), contents: "module.exports = {};" },
      ];
      await Promise.all(filesOnDisk.map((file) => writeFile(file.path, file.contents, "utf8")));

      const collected = await collectBundleFiles(
        filesOnDisk.map(({ name, path }) => ({ name, path })),
        (path) => readFile(path),
      );

      expect(collected).toHaveLength(2);
      const [first, second] = collected;
      expect(first?.name).toBe("cli.cjs");
      expect(second?.name).toBe("index.mjs");

      const previous = {
        files: first
          ? [{ name: first.name, size: first.size - 5, gzipSize: first.gzipSize - 3 }]
          : [],
      };

      const summary = computeBundleSummary(collected, previous);
      expect(summary.files[0]).toMatchObject({ name: "cli.cjs", sizeDiff: 5, gzipDiff: 3 });
      expect(summary.files[1]?.sizeDiff).toBeNull();
      expect(typeof summary.generatedAt).toBe("string");
    } finally {
      await rm(dir, { recursive: true, force: true });
    }
  });
});
