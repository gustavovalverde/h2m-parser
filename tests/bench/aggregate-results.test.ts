import { mkdtemp, readFile, rm, writeFile } from "node:fs/promises";
import { tmpdir } from "node:os";
import { join } from "node:path";
import { afterEach, describe, expect, it } from "vitest";

import { aggregateResults } from "../../bench/aggregate-results.js";

describe("aggregateResults", () => {
  const tempDirs: string[] = [];

  afterEach(async () => {
    await Promise.all(tempDirs.splice(0).map((dir) => rm(dir, { recursive: true, force: true })));
  });

  it("combines available benchmark artifacts", async () => {
    const dir = await mkdtemp(join(tmpdir(), "h2m-aggregate-"));
    tempDirs.push(dir);

    const comparison = {
      summary: {
        verdict: "✅ PERFORMANCE IMPROVED",
        averages: {
          h2mParserNoReadability: 1.23,
          h2mParserWithReadability: 4.56,
        },
        comparisons: {
          vsTurndown: 3.21,
          vsNodeHtmlMarkdown: 2.34,
          vsMdream: 0.98,
        },
      },
      meta: {
        fileCount: 5,
        iterations: 50,
        dataset: "tests/fixtures",
      },
    };

    const workflows = { generatedAt: "now", modes: [] };
    const bundleSize = { files: [] };

    await writeFile(join(dir, "comparison-latest.json"), JSON.stringify(comparison));
    await writeFile(join(dir, "workflows-latest.json"), JSON.stringify(workflows));
    await writeFile(join(dir, "bundle-size-latest.json"), JSON.stringify(bundleSize));

    const { summary, outputPath } = await aggregateResults({ resultsDir: dir });

    expect(summary.comparison).toEqual({
      verdict: "✅ PERFORMANCE IMPROVED",
      averages: comparison.summary.averages,
      comparisons: comparison.summary.comparisons,
      meta: comparison.meta,
    });
    expect(summary.workflows).toEqual(workflows);
    expect(summary.bundleSize).toEqual(bundleSize);
    expect(summary.memory).toBeNull();

    const written = JSON.parse(await readFile(outputPath, "utf8"));
    expect(written).toEqual(summary);
  });

  it("handles missing files gracefully", async () => {
    const dir = await mkdtemp(join(tmpdir(), "h2m-aggregate-missing-"));
    tempDirs.push(dir);

    const { summary } = await aggregateResults({ resultsDir: dir });

    expect(summary.comparison).toBeNull();
    expect(summary.workflows).toBeNull();
    expect(summary.memory).toBeNull();
    expect(summary.tokenUsage).toBeNull();
    expect(summary.fetchE2E).toBeNull();
    expect(summary.bundleSize).toBeNull();
  });
});
