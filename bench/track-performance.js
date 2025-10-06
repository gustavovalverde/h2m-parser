#!/usr/bin/env bun

/**
 * Tracks performance over time and generates trend reports.
 * Stores historical data for long-term performance analysis.
 */

import { execSync } from "node:child_process";
import { existsSync } from "node:fs";
import { mkdir, readFile, writeFile } from "node:fs/promises";
import { join } from "node:path";

const HISTORY_DIR = join(process.cwd(), "bench", ".history");
const HISTORY_FILE = join(HISTORY_DIR, "performance-history.json");
const MAX_HISTORY_ENTRIES = 100;

async function trackPerformance() {
  console.log("📈 Performance Tracking System\n");

  // Ensure history directory exists
  await mkdir(HISTORY_DIR, { recursive: true });

  // Load existing history
  let history = { entries: [] };
  if (existsSync(HISTORY_FILE)) {
    history = JSON.parse(await readFile(HISTORY_FILE, "utf8"));
  }

  // Get current git info
  const branch = execSync("git rev-parse --abbrev-ref HEAD", { encoding: "utf8" }).trim();
  const commit = execSync("git rev-parse HEAD", { encoding: "utf8" }).trim();
  const commitMessage = execSync("git log -1 --pretty=%B", { encoding: "utf8" }).trim();
  const commitDate = execSync("git log -1 --pretty=%cI", { encoding: "utf8" }).trim();

  // Run benchmark
  console.log("Running benchmark...\n");
  execSync("bun bench/compare.js --iterations 30 --max-files 10", {
    encoding: "utf8",
    stdio: "inherit",
  });

  // Load results
  const resultsPath = join(process.cwd(), "bench", ".results", "comparison-latest.json");
  const results = JSON.parse(await readFile(resultsPath, "utf8"));

  // Create history entry
  const entry = {
    timestamp: new Date().toISOString(),
    commit: {
      hash: commit,
      branch: branch,
      message: commitMessage.split("\n")[0], // First line only
      date: commitDate,
    },
    metrics: {
      h2mParserNoReadability: results.summary.averages.h2mParserNoReadability,
      h2mParserWithReadability: results.summary.averages.h2mParserWithReadability,
      vsTurndown: results.summary.comparisons.vsTurndown,
      vsNodeHtmlMarkdown: results.summary.comparisons.vsNodeHtmlMarkdown,
      vsMdream: results.summary.comparisons.vsMdream,
      mdream: results.summary.averages.mdream,
      readabilityOverhead: results.summary.averages.readabilityOverhead,
    },
    environment: {
      nodeVersion: process.version,
      platform: process.platform,
      arch: process.arch,
    },
  };

  // Add to history
  history.entries.push(entry);

  // Keep only recent entries
  if (history.entries.length > MAX_HISTORY_ENTRIES) {
    history.entries = history.entries.slice(-MAX_HISTORY_ENTRIES);
  }

  // Save history
  await writeFile(HISTORY_FILE, JSON.stringify(history, null, 2));

  // Generate trend analysis
  await generateTrendReport(history);

  console.log("\n✅ Performance tracked successfully!");
}

async function generateTrendReport(history) {
  console.log("\n📊 Performance Trends (Last 10 entries)\n");

  const recent = history.entries.slice(-10);
  if (recent.length < 2) {
    console.log("Not enough data for trend analysis. Run benchmarks multiple times.");
    return;
  }

  // Calculate trends
  const calculateTrend = (values) => {
    if (values.length < 2) {
      return 0;
    }
    const first = values[0];
    const last = values[values.length - 1];
    return ((last - first) / first) * 100;
  };

  const h2mParserTrend = calculateTrend(recent.map((e) => e.metrics.h2mParserNoReadability));
  const _h2mParserReadabilityTrend = calculateTrend(
    recent.map((e) => e.metrics.h2mParserWithReadability),
  );
  const turndownTrend = calculateTrend(recent.map((e) => e.metrics.vsTurndown));
  const nodeHtmlMarkdownTrend = calculateTrend(recent.map((e) => e.metrics.vsNodeHtmlMarkdown));
  const mdreamTrend = calculateTrend(recent.map((e) => e.metrics.vsMdream));

  // Display table
  console.log(
    "Date       | Commit   | h2m-parser (ms) | w/Readability | vs Turndown | vs NHM | vs mdream",
  );
  console.log("-".repeat(80));

  for (const entry of recent) {
    const date = new Date(entry.timestamp).toISOString().split("T")[0];
    const commit = entry.commit.hash.substring(0, 8);
    const h2mParser = entry.metrics.h2mParserNoReadability.toFixed(3);
    const h2mParserR = entry.metrics.h2mParserWithReadability.toFixed(3);
    const vsT = entry.metrics.vsTurndown.toFixed(2);
    const vsN = entry.metrics.vsNodeHtmlMarkdown.toFixed(2);
    const vsM = entry.metrics.vsMdream.toFixed(2);

    console.log(
      `${date} | ${commit} | ${h2mParser.padStart(9)} | ${h2mParserR.padStart(13)} | ${vsT.padStart(11)}x | ${vsN.padStart(6)}x | ${vsM.padStart(8)}x`,
    );
  }

  console.log("\n📈 Trend Analysis:");
  console.log(`  h2m-parser Performance:        ${formatTrend(h2mParserTrend, true)}`);
  console.log(`  h2m-parser w/Readability:      ${formatTrend(_h2mParserReadabilityTrend, true)}`);
  console.log(`  vs Turndown Advantage:   ${formatTrend(turndownTrend, false)}`);
  console.log(`  vs NHM Advantage:        ${formatTrend(nodeHtmlMarkdownTrend, false)}`);
  console.log(`  vs mdream Advantage:     ${formatTrend(mdreamTrend, false)}`);

  // Generate chart (ASCII)
  console.log("\n📉 Performance Chart (h2m-parser no Readability):");
  generateAsciiChart(recent.map((e) => e.metrics.h2mParserNoReadability));

  // Save detailed report
  const reportPath = join(HISTORY_DIR, "trend-report.md");
  const report = generateMarkdownTrendReport(history);
  await writeFile(reportPath, report);
  console.log(`\n📄 Detailed report saved to: ${reportPath}`);
}

function formatTrend(trend, lowerIsBetter = true) {
  const symbol = lowerIsBetter
    ? trend < -5
      ? "🟢"
      : trend > 5
        ? "🔴"
        : "⚪"
    : trend > 5
      ? "🟢"
      : trend < -5
        ? "🔴"
        : "⚪";

  const direction = trend > 0 ? "↑" : trend < 0 ? "↓" : "→";
  return `${symbol} ${direction} ${Math.abs(trend).toFixed(1)}%`;
}

function generateAsciiChart(values) {
  if (values.length === 0) {
    return;
  }

  const max = Math.max(...values);
  const min = Math.min(...values);
  const range = max - min;
  const height = 10;
  const width = Math.min(values.length, 50);

  // Normalize values to 0-height range
  const normalized = values.slice(-width).map((v) => Math.round(((v - min) / range) * height));

  // Generate chart
  for (let row = height; row >= 0; row--) {
    let line = "";
    for (let col = 0; col < normalized.length; col++) {
      line += normalized[col] >= row ? "█" : " ";
    }
    if (row === height) {
      line += ` ${max.toFixed(2)}ms`;
    }
    if (row === 0) {
      line += ` ${min.toFixed(2)}ms`;
    }
    console.log(line);
  }
}

function generateMarkdownTrendReport(history) {
  const recent = history.entries.slice(-30);

  let report = `# Performance Trend Report

Generated: ${new Date().toISOString()}

## Recent Performance History (Last 30 commits)

| Date | Branch | Commit | h2m-parser | w/Readability | vs Turndown | vs NHM | vs mdream |
|------|--------|--------|-----------|---------------|-------------|--------|-----------|
`;

  for (const entry of recent.reverse()) {
    const date = new Date(entry.timestamp).toISOString().split("T")[0];
    const commit = entry.commit.hash.substring(0, 8);
    const branch = entry.commit.branch;
    const h2mParser = entry.metrics.h2mParserNoReadability.toFixed(3);
    const h2mParserR = entry.metrics.h2mParserWithReadability.toFixed(3);
    const vsT = entry.metrics.vsTurndown.toFixed(2);
    const vsN = entry.metrics.vsNodeHtmlMarkdown.toFixed(2);
    const vsM = entry.metrics.vsMdream.toFixed(2);

    report += `| ${date} | ${branch} | ${commit} | ${h2mParser}ms | ${h2mParserR}ms | ${vsT}x | ${vsN}x | ${vsM}x |\n`;
  }

  // Calculate statistics
  const h2mParserValues = recent.map((e) => e.metrics.h2mParserNoReadability);
  const mean = h2mParserValues.reduce((a, b) => a + b, 0) / h2mParserValues.length;
  const stdDev = Math.sqrt(
    h2mParserValues.reduce((sum, val) => sum + (val - mean) ** 2, 0) / h2mParserValues.length,
  );

  report += `
## Statistics

- **Mean Performance:** ${mean.toFixed(3)}ms
- **Std Deviation:** ${stdDev.toFixed(3)}ms
- **Best Performance:** ${Math.min(...h2mParserValues).toFixed(3)}ms
- **Worst Performance:** ${Math.max(...h2mParserValues).toFixed(3)}ms
- **Total Measurements:** ${history.entries.length}

## Performance Goals

- h2m-parser (no Readability): < 2ms average
- h2m-parser (with Readability): < 10ms average
- vs Turndown: > 3x faster
- vs node-html-markdown: > 2x faster
`;

  return report;
}

// CLI
if (import.meta.url === `file://${process.argv[1]}`) {
  trackPerformance().catch(console.error);
}

export { trackPerformance };
