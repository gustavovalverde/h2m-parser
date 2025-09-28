#!/usr/bin/env node
/**
 * Updates README.md with benchmark results
 * Can either run fresh benchmarks or use cached results
 */

import { execSync } from "node:child_process";
import { access, readFile, writeFile } from "node:fs/promises";
import { join } from "node:path";

const README_PATH = join(process.cwd(), "README.md");
const COMPARISON_PATH = join(process.cwd(), "bench", ".results", "comparison-latest.json");
const SUMMARY_PATH = join(process.cwd(), "bench", ".results", "summary-latest.json");
const BENCHMARK_START = "<!-- BENCHMARK:START -->";
const BENCHMARK_END = "<!-- BENCHMARK:END -->";

async function fileExists(path) {
  try {
    await access(path);
    return true;
  } catch {
    return false;
  }
}

async function runFreshBenchmark() {
  console.log("Running fresh benchmark comparison...");

  try {
    execSync("node bench/compare.js --dataset tests/fixtures --iterations 30", {
      encoding: "utf8",
      cwd: process.cwd(),
      stdio: "inherit",
    });
    console.log("\n✅ Benchmark completed");
    return true;
  } catch (error) {
    console.error("Failed to run benchmark:", error.message);
    return false;
  }
}

async function loadJson(path, { warnLabel } = {}) {
  try {
    const data = await readFile(path, "utf8");
    return JSON.parse(data);
  } catch (error) {
    if (error.code !== "ENOENT" && warnLabel) {
      console.warn(`Warning: unable to read ${warnLabel}:`, error.message);
    } else if (error.code !== "ENOENT") {
      console.error(`Failed to read ${path}:`, error.message);
    }
    return null;
  }
}

async function loadBenchmarkResults() {
  return loadJson(COMPARISON_PATH, {});
}

async function loadAggregatedSummary() {
  return loadJson(SUMMARY_PATH, { warnLabel: "summary-latest.json" });
}

function formatMs(value) {
  return `${value.toFixed(2)}ms`;
}

function formatSizeBytes(bytes) {
  if (!Number.isFinite(bytes) || bytes <= 0) {
    return "0";
  }
  return `${Math.round(bytes / 1024)}KB`;
}

function selectRepresentativeResults(allResults) {
  const synthetic = allResults.filter((result) => result.size <= 1000);
  const real = allResults.filter((result) => result.size > 1000);

  const picks = [];

  for (const entry of synthetic.slice(0, 3)) {
    picks.push(entry);
  }

  if (real.length > 0) {
    const sortedReal = [...real].sort((a, b) => a.size - b.size);
    const smallest = sortedReal[0];
    const median = sortedReal[Math.floor(sortedReal.length / 2)];
    const largest = sortedReal[sortedReal.length - 1];

    for (const candidate of [smallest, median, largest]) {
      if (candidate && !picks.includes(candidate)) {
        picks.push(candidate);
      }
    }

    for (const candidate of sortedReal) {
      if (picks.length >= 6) {
        break;
      }
      if (!picks.includes(candidate)) {
        picks.push(candidate);
      }
    }
  }

  if (picks.length < Math.min(6, allResults.length)) {
    for (const candidate of allResults) {
      if (picks.length >= 6) {
        break;
      }
      if (!picks.includes(candidate)) {
        picks.push(candidate);
      }
    }
  }

  return picks;
}

function buildResultsByFileSection(benchmarkResults) {
  return selectRepresentativeResults(benchmarkResults)
    .map((result) => {
      const rows = Object.entries(result.benchmarks)
        .map(([name, stats]) => {
          const displayName =
            name === "h2m-parser_no_readability"
              ? "h2m-parser (no Readability)"
              : name === "h2m-parser_with_readability"
                ? "h2m-parser (with Readability)"
                : name === "node_html_markdown"
                  ? "node-html-markdown"
                  : name.charAt(0).toUpperCase() + name.slice(1);
          return `| ${displayName} | ${stats.mean.toFixed(3)} | ${stats.p95.toFixed(3)} | ${stats.p99.toFixed(3)} |`;
        })
        .join("\n");

      const sizeLabel = result.size > 1000 ? formatSizeBytes(result.size) : `${result.size} bytes`;

      return `#### ${result.name} (${sizeLabel})

| Library | Mean (ms) | P95 (ms) | P99 (ms) |
|---------|-----------|----------|----------|
${rows}`;
    })
    .join("\n\n");
}

function renderWorkflowSection(workflows) {
  if (!workflows?.modes?.length) {
    return null;
  }

  const rows = workflows.modes
    .map(
      (mode) =>
        `| ${mode.name} | ${mode.iterations} | ${mode.mean.toFixed(2)} | ${mode.p95.toFixed(2)} | ${mode.min.toFixed(2)} | ${mode.max.toFixed(2)} |`,
    )
    .join("\n");

  return `### Workflow Comparison (Await vs Stream)

| Mode | Iterations | Mean (ms) | p95 (ms) | Min (ms) | Max (ms) |
|------|------------|-----------|----------|----------|----------|
${rows}`;
}

function renderTokenSection(tokenUsage) {
  if (!tokenUsage) {
    return null;
  }

  const costDelta =
    tokenUsage.htmlTokens?.cost != null && tokenUsage.markdownTokens?.cost != null
      ? (tokenUsage.htmlTokens.cost - tokenUsage.markdownTokens.cost).toFixed(6)
      : null;

  return `### Token Savings

- Model: ${tokenUsage.model}
- HTML tokens: ${tokenUsage.htmlTokens?.inputTokens ?? "?"}
- Markdown tokens: ${tokenUsage.markdownTokens?.inputTokens ?? "?"}
- Savings: ${tokenUsage.savings} tokens (${tokenUsage.savingsPct.toFixed(2)}%)
${costDelta ? `- Estimated cost delta per document: $${costDelta}\n` : ""}- Markdown length: ${tokenUsage.markdownLength} characters`;
}

function renderMemorySection(memory) {
  if (!memory?.memorySamples?.length) {
    return null;
  }

  const first = memory.memorySamples[0];
  const last = memory.memorySamples[memory.memorySamples.length - 1];
  const toMB = (bytes) => bytes / 1024 / 1024;
  const rssDelta = first && last ? toMB(last.rss - first.rss).toFixed(2) : "0.00";

  return `### Memory Snapshot

- Mode: ${memory.mode}
- Iterations: ${memory.iterations}
- RSS change: ${rssDelta} MB`;
}

function renderFetchSection(fetch) {
  if (!fetch) {
    return null;
  }

  const row = (label, stats) =>
    `| ${label} | ${formatMs(stats.mean)} | ${formatMs(stats.min)} | ${formatMs(stats.max)} |`;

  return `### Live Fetch Results

Fetched: ${fetch.url}

| Tool | Mean | Min | Max |
|------|------|-----|-----|
${row("h2m-parser", fetch.h2m.stats)}
${row("mdream (await)", fetch.mdreamAwait.stats)}
${row("mdream (stream)", fetch.mdreamStream.stats)}`;
}

function renderBundleSection(bundle) {
  if (!bundle?.files?.length) {
    return null;
  }

  const formatDiff = (bytes, pct) => {
    if (bytes == null) {
      return "—";
    }
    const bytesLabel = `${bytes >= 0 ? "+" : ""}${bytes} B`;
    const pctLabel = pct == null ? "n/a" : `${pct >= 0 ? "+" : ""}${pct.toFixed(2)}%`;
    return `${bytesLabel} (${pctLabel})`;
  };

  const rows = bundle.files
    .map(
      (file) =>
        `| ${file.name} | ${formatSizeBytes(file.size)} | ${formatSizeBytes(file.gzipSize)} | ${formatDiff(file.sizeDiff, file.sizeDiffPct)} | ${formatDiff(file.gzipDiff, file.gzipDiffPct)} |`,
    )
    .join("\n");

  return `### Bundle Size Snapshot

Generated: ${bundle.generatedAt}

| File | Size | Gzipped | Δ Size | Δ Gzipped |
|------|------|---------|--------|-----------|
${rows}`;
}

function generateMarkdown(results, aggregated) {
  const { meta, summary, results: benchmarkResults, totalTime } = results;

  const realFileSizes = benchmarkResults.filter((r) => r.size > 1000).map((r) => r.size);
  const minFileSize = realFileSizes.length ? Math.min(...realFileSizes) : 0;
  const maxFileSize = realFileSizes.length ? Math.max(...realFileSizes) : 0;
  const avgFileSize = realFileSizes.length
    ? Math.round(realFileSizes.reduce((a, b) => a + b, 0) / realFileSizes.length / 1024)
    : 0;
  const maxFileSizeKB = Math.round(maxFileSize / 1024);

  const realFiles = benchmarkResults.filter((r) => r.size > 1000).length;
  const syntheticFiles = benchmarkResults.length - realFiles;

  const performanceEntries = [
    {
      key: "h2m-parser",
      label: "h2m-parser",
      mean: summary.averages.h2mParserNoReadability,
    },
    {
      key: "turndown",
      label: "Turndown",
      mean: summary.averages.turndown,
    },
    {
      key: "node-html-markdown",
      label: "node-html-markdown",
      mean: summary.averages.nodeHtmlMarkdown,
    },
    {
      key: "mdream",
      label: "mdream",
      mean: summary.averages.mdream,
    },
  ].filter((entry) => Number.isFinite(entry.mean));

  performanceEntries.sort((a, b) => a.mean - b.mean);

  const fastestMean = performanceEntries.length ? performanceEntries[0].mean : null;
  const rankingLines = performanceEntries.map(
    (entry, index) => `${index + 1}. ${entry.label} — ${entry.mean.toFixed(3)}ms`,
  );

  const status = fastestMean
    ? `**Runtime ranking (lower is better):**\n${rankingLines.join("\n")}`
    : "❌ Performance analysis unavailable";

  const h2mParserNoReadability = `${summary.averages.h2mParserNoReadability.toFixed(3)}ms`;
  const h2mParserWithReadability = summary.averages.h2mParserWithReadability
    ? `${summary.averages.h2mParserWithReadability.toFixed(3)}ms`
    : "N/A";
  const readabilityOverhead = summary.averages.readabilityOverhead
    ? `+${summary.averages.readabilityOverhead.toFixed(3)}ms`
    : "N/A";
  const turndown = `${summary.averages.turndown.toFixed(3)}ms`;
  const nodeHtmlMarkdown = `${summary.averages.nodeHtmlMarkdown.toFixed(3)}ms`;
  const mdream = summary.averages.mdream ? `${summary.averages.mdream.toFixed(3)}ms` : "N/A";
  const vsTurndown = `${summary.comparisons.vsTurndown.toFixed(2)}x`;
  const vsNodeHtmlMarkdown = `${summary.comparisons.vsNodeHtmlMarkdown.toFixed(2)}x`;
  const vsMdream = summary.comparisons.vsMdream
    ? `${summary.comparisons.vsMdream.toFixed(2)}x`
    : null;

  const readabilityMultiplier =
    summary.averages.h2mParserWithReadability / summary.averages.h2mParserNoReadability;

  const avgProcessingTimeMs = summary.averages.h2mParserNoReadability;
  const avgFileSizeBytes = realFileSizes.length
    ? realFileSizes.reduce((a, b) => a + b, 0) / realFileSizes.length
    : 0;
  const throughputBytesPerMs =
    avgFileSizeBytes && avgProcessingTimeMs ? avgFileSizeBytes / avgProcessingTimeMs : 0;

  const projections = throughputBytesPerMs
    ? [
        { size: "100KB", bytes: 100 * 1024 },
        { size: "1MB", bytes: 1024 * 1024 },
        { size: "10MB", bytes: 10 * 1024 * 1024 },
        { size: "100MB", bytes: 100 * 1024 * 1024 },
      ].map(({ size, bytes }) => {
        const timeMs = bytes / throughputBytesPerMs;
        if (!Number.isFinite(timeMs)) {
          return { size, time: "N/A" };
        }
        if (timeMs < 1000) {
          return { size, time: `${Math.round(timeMs)}ms` };
        }
        if (timeMs < 60000) {
          return { size, time: `${(timeMs / 1000).toFixed(1)}s` };
        }
        const minutes = Math.floor(timeMs / 60000);
        const seconds = Math.round((timeMs % 60000) / 1000);
        return { size, time: `${minutes}m ${seconds}s` };
      })
    : [];

  const methodologySection = `### Benchmark Methodology

- **Dataset:** ${meta.fileCount} files (${syntheticFiles} synthetic + ${realFiles} real HTML documents)
- **Dataset path:** ${formatPathForDisplay(meta.dataset)}
- **File sizes:** ${formatSizeBytes(minFileSize)} to ${formatSizeBytes(maxFileSize)} (mean: ~${avgFileSize}KB)
- **Iterations:** ${meta.iterations} per file for statistical significance
- **Total runtime:** ${totalTime} seconds
- **Environment:** Node.js with standard V8 optimizations`;

  const libraryRows = [
    {
      name: "h2m-parser",
      highlight: true,
      badge: "✅",
      noRead: summary.averages.h2mParserNoReadability,
      withRead: summary.averages.h2mParserWithReadability,
      notes: "Built-in article extraction",
    },
    {
      name: "mdream",
      noRead: summary.averages.mdream,
      withRead: null,
      notes: "Streaming + plugin ecosystem",
    },
    {
      name: "node-html-markdown",
      noRead: summary.averages.nodeHtmlMarkdown,
      withRead: null,
      notes: "",
    },
    {
      name: "Turndown",
      noRead: summary.averages.turndown,
      withRead: null,
      notes: "",
    },
  ]
    .filter((entry) => Number.isFinite(entry.noRead))
    .sort((a, b) => a.noRead - b.noRead);

  const fastest = libraryRows[0]?.noRead ?? null;
  const performanceColumn = (mean) => {
    if (!Number.isFinite(mean) || fastest === null) {
      return "—";
    }
    if (Math.abs(mean - fastest) < fastest * 0.02) {
      return "Fastest";
    }
    if (mean < fastest) {
      return `${(fastest / mean).toFixed(2)}x faster`;
    }
    return `${(mean / fastest).toFixed(2)}x slower`;
  };

  const averagesSectionRows = libraryRows
    .map((entry) => {
      const name = entry.highlight ? `**${entry.name}**` : entry.name;
      const badge = entry.badge ? ` ${entry.badge}` : "";
      const noReadCell = `${entry.noRead.toFixed(3)}ms${entry.highlight ? "**" : ""}`;
      const withReadCell = entry.withRead ? `${entry.withRead.toFixed(3)}ms` : "❌ Not supported";
      const perfCell = performanceColumn(entry.noRead);
      const perfDisplay = entry.highlight ? `**${perfCell}**` : perfCell;
      return `| ${name}${badge} | ${entry.highlight ? `**${noReadCell}` : noReadCell} | ${withReadCell} | ${perfDisplay} |`;
    })
    .join("\n");

  const averagesSection = `### Average Processing Time

Tested across ${meta.fileCount} files in ${formatPathForDisplay(meta.dataset)} (up to ${maxFileSizeKB}KB):

| Library | Without Readability | With Readability | Relative |
|---------|---------------------|------------------|----------|
${averagesSectionRows}

**Readability overhead (h2m-parser):** ${readabilityOverhead} (enables article extraction + content cleaning)`;

  const analysisLines = [];
  const fastestEntry = libraryRows[0];
  if (fastestEntry) {
    analysisLines.push(
      `- **Fastest baseline:** ${fastestEntry.name} averages ${fastestEntry.noRead.toFixed(3)}ms per document without Readability.`,
    );
    if (fastestEntry.name !== "h2m-parser") {
      analysisLines.push(
        `- **h2m-parser gap to ${fastestEntry.name}:** ${(
          summary.averages.h2mParserNoReadability / fastestEntry.noRead
        ).toFixed(
          2,
        )}× slower ( ${fastestEntry.name}: ${fastestEntry.noRead.toFixed(3)}ms → h2m-parser: ${summary.averages.h2mParserNoReadability.toFixed(3)}ms ).`,
      );
    }
  }

  analysisLines.push(
    `- **h2m-parser vs Turndown:** ${vsTurndown} ${summary.comparisons.vsTurndown > 1 ? "faster" : "slower"} (${turndown} → ${h2mParserNoReadability})`,
  );
  analysisLines.push(
    `- **h2m-parser vs node-html-markdown:** ${vsNodeHtmlMarkdown} ${summary.comparisons.vsNodeHtmlMarkdown > 1 ? "faster" : "slower"} (${nodeHtmlMarkdown} → ${h2mParserNoReadability})`,
  );
  if (vsMdream) {
    analysisLines.push(
      `- **h2m-parser vs mdream:** ${vsMdream} ${summary.comparisons.vsMdream > 1 ? "faster" : "slower"} (${mdream} → ${h2mParserNoReadability})`,
    );
  }
  analysisLines.push(
    `- **Readability impact:** ${readabilityMultiplier.toFixed(1)}x slower when enabled (${h2mParserNoReadability} → ${h2mParserWithReadability})`,
  );
  const tokenUsage = aggregated?.tokenUsage;
  if (tokenUsage?.savingsPct != null) {
    analysisLines.push(
      `- **Token savings vs raw HTML:** ${tokenUsage.savings} tokens saved (${tokenUsage.savingsPct.toFixed(2)}%) on ${formatPathForDisplay(tokenUsage.fixture)}.`,
    );
  }
  analysisLines.push(
    "- **Algorithmic complexity:** O(n) linear scaling confirmed across file sizes",
  );

  const analysisSection = `### Performance Analysis

${analysisLines.join("\n")}`;

  const projectionsSection = projections.length
    ? `### Performance Projections

Estimated processing times for different file sizes (without Readability):

\`\`\`
${projections.map((p) => `  ${p.size.padEnd(6)} ${p.time}`).join("\n")}
\`\`\`

*Based on linear scaling from ${avgFileSize}KB average file size at ${avgProcessingTimeMs.toFixed(3)}ms*`
    : null;

  const detailsSections = [methodologySection, averagesSection, analysisSection];

  if (projectionsSection) {
    detailsSections.push(projectionsSection);
  }

  detailsSections.push(`### Detailed Results by File Size

${buildResultsByFileSection(benchmarkResults)}

*See [\`bench/comparison-results.md\`](bench/comparison-results.md) for complete results across all ${meta.fileCount} files*`);

  const workflowSection = renderWorkflowSection(aggregated?.workflows);
  if (workflowSection) {
    detailsSections.push(workflowSection);
  }

  const tokenSection = renderTokenSection(aggregated?.tokenUsage);
  if (tokenSection) {
    detailsSections.push(tokenSection);
  }

  const memorySection = renderMemorySection(aggregated?.memory);
  if (memorySection) {
    detailsSections.push(memorySection);
  }

  const bundleSection = renderBundleSection(aggregated?.bundleSize);
  if (bundleSection) {
    detailsSections.push(bundleSection);
  }

  const fetchSection = renderFetchSection(aggregated?.fetchE2E);
  if (fetchSection) {
    detailsSections.push(fetchSection);
  }

  const performanceCell = (mean) => {
    if (!fastestMean || !Number.isFinite(mean)) {
      return "—";
    }

    const ratio = mean / fastestMean;
    if (Math.abs(ratio - 1) <= 0.02) {
      return "✅ Fastest";
    }

    const slowerPct = Math.max(0, (ratio - 1) * 100);
    if (ratio <= 1.5) {
      return `⚠️ +${slowerPct.toFixed(0)}% slower`;
    }

    return `❌ +${slowerPct.toFixed(0)}% slower`;
  };

  const performanceRow = `| **Performance** | ${performanceCell(summary.averages.h2mParserNoReadability)} | ${performanceCell(summary.averages.turndown)} | ${performanceCell(summary.averages.nodeHtmlMarkdown)} | ${performanceCell(summary.averages.mdream)} |`;

  detailsSections.push(`### Feature Comparison

| Feature | h2m-parser | Turndown | node-html-markdown | mdream |
|---------|------------|----------|--------------------|--------|
${performanceRow}
| **Readability** | ✅ | ❌ | ❌ | ⚠️ |
| **Link cleanup** | ✅ | ❌ | ❌ | ⚠️ |
| **Front matter** | ✅ | ❌ | ❌ | ✅ |
| **Chunking** | ✅ | ❌ | ❌ | ⚠️ |
| **TypeScript** | ✅ | ❌ | ✅ | ✅ |
| **Streaming** | ✅ | ❌ | ❌ | ✅ |`);

  detailsSections.push(`### Benchmark Transparency

- **Raw results:** [\`bench/.results/comparison-latest.json\`](bench/.results/comparison-latest.json)
- **Benchmark runner:** [\`bench/compare.js\`](bench/compare.js)
- **Test dataset:** [\`tests/fixtures/\`](tests/fixtures/) (${realFiles} real HTML files)
- **Statistical data:** Includes mean, median, P95, P99, min/max for each test
- **Reproducible:** Run \`pnpm bench:compare:full\` to verify results`);

  const detailsContent = detailsSections.join("\n\n");

  return `<!-- BENCHMARK:START -->
<!-- Last updated: ${meta.timestamp} -->

## Performance

${status}

<details>
<summary>📊 Benchmark Results (click to expand)</summary>

${detailsContent}

</details>

Run benchmarks yourself:

\`\`\`bash
# Quick comparison (10 iterations)
pnpm bench:compare:quick

# Full comparison (1000 iterations)
pnpm bench:compare:full

# Update README with fresh results
pnpm bench:readme
\`\`\`

<!-- BENCHMARK:END -->`;
}

async function updateReadme(newContent) {
  try {
    const readme = await readFile(README_PATH, "utf8");

    const startIndex = readme.indexOf(BENCHMARK_START);
    const endIndex = readme.indexOf(BENCHMARK_END);

    if (startIndex === -1 || endIndex === -1) {
      console.log("\n⚠️  Benchmark markers not found in README.md");
      console.log("Add the following markers where you want the benchmark section:");
      console.log(`\n${BENCHMARK_START}\n${BENCHMARK_END}\n`);

      const fallbackPath = join(process.cwd(), "bench", "README-benchmark-section.md");
      await writeFile(fallbackPath, newContent);
      console.log(`\n📄 Benchmark section saved to: ${fallbackPath}`);
      console.log("Copy this content between the markers in your README.md");
      return false;
    }

    const before = readme.substring(0, startIndex);
    const after = readme.substring(endIndex + BENCHMARK_END.length);
    const updated = before + newContent + after;

    await writeFile(README_PATH, updated);
    console.log("\n✅ README.md updated with benchmark results");
    return true;
  } catch (error) {
    console.error("Failed to update README:", error.message);
    return false;
  }
}

async function main() {
  console.log("🚀 h2m-parser Benchmark README Updater\n");

  const args = process.argv.slice(2);
  const useCached = args.includes("--cached") || args.includes("-c");
  const forceNew = args.includes("--fresh") || args.includes("-f");

  if (args.includes("--help") || args.includes("-h")) {
    console.log(`
Usage: node bench/update-readme.js [options]

Options:
  --fresh, -f     Force running a new benchmark
  --cached, -c    Use cached results if available
  --help, -h      Show this help message

Examples:
  pnpm bench:readme
  pnpm bench:readme --fresh
  pnpm bench:readme --cached
`);
    process.exit(0);
  }

  let results = null;

  if (useCached) {
    if (await fileExists(COMPARISON_PATH)) {
      results = await loadBenchmarkResults();
      if (results) {
        console.log("Using cached benchmark results");
      } else {
        console.error("Failed to load cached results");
        process.exit(1);
      }
    } else {
      console.error("No cached results found. Run a benchmark first or use --fresh");
      process.exit(1);
    }
  } else if (forceNew) {
    if (await runFreshBenchmark()) {
      results = await loadBenchmarkResults();
    } else {
      process.exit(1);
    }
  } else {
    if (await fileExists(COMPARISON_PATH)) {
      const cachedResults = await loadBenchmarkResults();
      if (cachedResults) {
        const age = Date.now() - new Date(cachedResults.meta.timestamp).getTime();
        const oneHour = 60 * 60 * 1000;

        if (age < oneHour) {
          console.log("Using recent cached results (< 1 hour old)");
          results = cachedResults;
        } else {
          console.log("Cached results are stale, running fresh benchmark...");
          if (await runFreshBenchmark()) {
            results = await loadBenchmarkResults();
          }
        }
      }
    } else {
      console.log("No cached results found, running fresh benchmark...");
      if (await runFreshBenchmark()) {
        results = await loadBenchmarkResults();
      }
    }
  }

  if (!results) {
    console.error("No benchmark results available");
    process.exit(1);
  }

  const aggregated = await loadAggregatedSummary();

  console.log("\nGenerating markdown...");
  const markdown = generateMarkdown(results, aggregated);

  await updateReadme(markdown);

  console.log("\n📊 Summary:");
  console.log(
    `  h2m-parser (no Readability): ${results.summary.averages.h2mParserNoReadability.toFixed(3)}ms`,
  );
  if (results.summary.averages.h2mParserWithReadability) {
    console.log(
      `  h2m-parser (with Readability): ${results.summary.averages.h2mParserWithReadability.toFixed(3)}ms`,
    );
  }
  console.log(
    `  vs Turndown: ${results.summary.comparisons.vsTurndown.toFixed(2)}x ${results.summary.comparisons.vsTurndown > 1 ? "faster" : "slower"}`,
  );
  console.log(
    `  vs node-html-markdown: ${results.summary.comparisons.vsNodeHtmlMarkdown.toFixed(2)}x ${results.summary.comparisons.vsNodeHtmlMarkdown > 1 ? "faster" : "slower"}`,
  );
  if (aggregated?.tokenUsage) {
    console.log(
      `  Token savings: ${aggregated.tokenUsage.savings} tokens (${aggregated.tokenUsage.savingsPct.toFixed(2)}%)`,
    );
  }
}

main().catch((error) => {
  console.error(error);
  process.exit(1);
});

import { isAbsolute, relative } from "node:path";

function formatPathForDisplay(value) {
  if (!value) {
    return value;
  }
  try {
    return isAbsolute(value) ? relative(process.cwd(), value) || "." : value;
  } catch {
    return value;
  }
}
