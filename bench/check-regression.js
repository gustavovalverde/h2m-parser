#!/usr/bin/env node

/**
 * Checks for performance regressions against baseline.
 * Use in CI to fail builds that introduce performance regressions.
 */

import { existsSync } from "node:fs";
import { readFile, writeFile } from "node:fs/promises";
import { join } from "node:path";
import { aggregateResults } from "./aggregate-results.js";
import { runBenchmark } from "./utils/run-benchmark.js";

const BASELINE_FILE = join(process.cwd(), "bench", ".baseline", "performance-baseline.json");
const REGRESSION_THRESHOLD = 1.1; // 10% slower is considered regression
const IMPROVEMENT_THRESHOLD = 0.9; // 10% faster is considered improvement

async function checkRegression(options = {}) {
  const {
    threshold = REGRESSION_THRESHOLD,
    exitOnRegression = true,
    generateReport = true,
  } = options;

  console.log("🔍 Checking for Performance Regressions\n");

  // Check if baseline exists
  if (!existsSync(BASELINE_FILE)) {
    console.log("⚠️ No baseline found. Run 'pnpm bench:baseline' first.");
    console.log("   Skipping regression check.");
    return { status: "no-baseline" };
  }

  // Load baseline
  const baseline = JSON.parse(await readFile(BASELINE_FILE, "utf8"));
  console.log(`📊 Baseline from: ${baseline.capturedAt}`);
  console.log(`   Commit: ${baseline.commit.substring(0, 8)}\n`);

  // Run current benchmark
  console.log("Running benchmark on current code...\n");
  const current = await runBenchmark({ iterations: 50, maxFiles: 20 });
  let aggregatedSummary = null;
  try {
    const { summary } = await aggregateResults();
    aggregatedSummary = summary;
  } catch (error) {
    console.warn("Warning: unable to aggregate extended benchmark data:", error.message);
  }

  // Compare metrics
  const baselineExtras = baseline.extras ?? {};
  const currentExtras = {
    workflows: aggregatedSummary?.workflows ?? null,
    tokenUsage: aggregatedSummary?.tokenUsage ?? null,
    memory: aggregatedSummary?.memory ?? null,
    fetchE2E: aggregatedSummary?.fetchE2E ?? null,
  };

  const comparison = {
    h2mParserNoReadability: {
      baseline: baseline.metrics.h2mParserNoReadability.mean,
      current: current.summary.averages.h2mParserNoReadability,
      ratio:
        current.summary.averages.h2mParserNoReadability /
        baseline.metrics.h2mParserNoReadability.mean,
      status: "unchanged",
    },
    h2mParserWithReadability: {
      baseline: baseline.metrics.h2mParserWithReadability.mean,
      current: current.summary.averages.h2mParserWithReadability,
      ratio:
        current.summary.averages.h2mParserWithReadability /
        baseline.metrics.h2mParserWithReadability.mean,
      status: "unchanged",
    },
    vsTurndown: {
      baseline: baseline.metrics.comparisons.vsTurndown,
      current: current.summary.comparisons.vsTurndown,
      ratio: current.summary.comparisons.vsTurndown / baseline.metrics.comparisons.vsTurndown,
      status: "unchanged",
    },
    vsNodeHtmlMarkdown: {
      baseline: baseline.metrics.comparisons.vsNodeHtmlMarkdown,
      current: current.summary.comparisons.vsNodeHtmlMarkdown,
      ratio:
        current.summary.comparisons.vsNodeHtmlMarkdown /
        baseline.metrics.comparisons.vsNodeHtmlMarkdown,
      status: "unchanged",
    },
    vsMdream: {
      baseline: baseline.metrics.comparisons.vsMdream,
      current: current.summary.comparisons.vsMdream,
      ratio: current.summary.comparisons.vsMdream / baseline.metrics.comparisons.vsMdream,
      status: "unchanged",
    },
    extras: {
      baseline: baselineExtras,
      current: currentExtras,
    },
  };

  // Determine status for each metric
  let hasRegressionH2M = false;
  let hasRegressionCompetitor = false;
  let hasImprovement = false;

  for (const [key, metric] of Object.entries(comparison)) {
    if (key.startsWith("vs")) {
      // For comparison metrics, higher is better
      if (metric.ratio < 1 / threshold) {
        metric.status = "regression";
        hasRegressionCompetitor = true;
      } else if (metric.ratio > 1 / IMPROVEMENT_THRESHOLD) {
        metric.status = "improvement";
        hasImprovement = true;
      }
    } else {
      // For time metrics, lower is better
      if (metric.ratio > threshold) {
        metric.status = "regression";
        hasRegressionH2M = true;
      } else if (metric.ratio < IMPROVEMENT_THRESHOLD) {
        metric.status = "improvement";
        hasImprovement = true;
      }
    }
  }

  // Generate report
  console.log(`\n${"=".repeat(80)}`);
  console.log("PERFORMANCE REGRESSION REPORT");
  console.log(`${"=".repeat(80)}\n`);

  const formatChange = (ratio, isTimeMetric = true) => {
    const percent = Math.abs((ratio - 1) * 100).toFixed(1);
    if (isTimeMetric) {
      if (ratio > 1) {
        return `🔴 ${percent}% slower`;
      }
      if (ratio < 1) {
        return `🟢 ${percent}% faster`;
      }
    } else {
      if (ratio < 1) {
        return `🔴 ${percent}% worse`;
      }
      if (ratio > 1) {
        return `🟢 ${percent}% better`;
      }
    }
    return "⚪ unchanged";
  };

  console.log("📊 Performance Metrics:\n");
  console.log(`  h2m-parser (no Readability):`);
  console.log(`    Baseline: ${comparison.h2mParserNoReadability.baseline.toFixed(3)}ms`);
  console.log(`    Current:  ${comparison.h2mParserNoReadability.current.toFixed(3)}ms`);
  console.log(`    Change:   ${formatChange(comparison.h2mParserNoReadability.ratio)}\n`);

  console.log(`  h2m-parser (with Readability):`);
  console.log(`    Baseline: ${comparison.h2mParserWithReadability.baseline.toFixed(3)}ms`);
  console.log(`    Current:  ${comparison.h2mParserWithReadability.current.toFixed(3)}ms`);
  console.log(`    Change:   ${formatChange(comparison.h2mParserWithReadability.ratio)}\n`);

  console.log(`  vs Turndown:`);
  console.log(`    Baseline: ${comparison.vsTurndown.baseline.toFixed(2)}x`);
  console.log(`    Current:  ${comparison.vsTurndown.current.toFixed(2)}x`);
  console.log(`    Change:   ${formatChange(comparison.vsTurndown.ratio, false)}\n`);

  console.log(`  vs node-html-markdown:`);
  console.log(`    Baseline: ${comparison.vsNodeHtmlMarkdown.baseline.toFixed(2)}x`);
  console.log(`    Current:  ${comparison.vsNodeHtmlMarkdown.current.toFixed(2)}x`);
  console.log(`    Change:   ${formatChange(comparison.vsNodeHtmlMarkdown.ratio, false)}\n`);

  console.log(`  vs mdream:`);
  console.log(`    Baseline: ${comparison.vsMdream.baseline.toFixed(2)}x`);
  console.log(`    Current:  ${comparison.vsMdream.current.toFixed(2)}x`);
  console.log(`    Change:   ${formatChange(comparison.vsMdream.ratio, false)}\n`);

  // Overall status
  console.log("=".repeat(80));
  if (hasRegressionH2M) {
    console.log("❌ REGRESSION DETECTED!");
    console.log("   Performance has degraded beyond acceptable threshold.");
  } else if (hasImprovement) {
    console.log("✅ PERFORMANCE IMPROVED!");
    console.log("   Consider updating the baseline to capture improvements.");
  } else {
    console.log("✅ NO REGRESSION DETECTED");
    console.log("   Performance is within acceptable range.");
  }
  if (!hasRegressionH2M && hasRegressionCompetitor) {
    console.log(
      "ℹ️ NOTE: Competitor comparison metrics slowed down, but h2m performance stayed within the threshold.",
    );
  }
  console.log(`${"=".repeat(80)}\n`);

  // Generate markdown report for PR comments
  if (generateReport) {
    const report = generateMarkdownReport(comparison, baseline, current, {
      hasRegressionH2M,
      hasRegressionCompetitor,
      hasImprovement,
    });
    const reportPath = join(process.cwd(), "bench", ".results", "regression-report.md");
    await writeFile(reportPath, report);
    console.log(`📝 Detailed report saved to: ${reportPath}\n`);
  }

  // Exit with error if regression detected
  if (hasRegressionH2M && exitOnRegression) {
    process.exit(1);
  }

  return {
    status: hasRegressionH2M
      ? "regression"
      : hasImprovement
        ? "improvement"
        : hasRegressionCompetitor
          ? "competitor-regression"
          : "no-change",
    comparison,
    baseline,
    current,
    extras: currentExtras,
  };
}

function generateMarkdownReport(
  comparison,
  baseline,
  current,
  { hasRegressionH2M = false, hasRegressionCompetitor = false, hasImprovement = false } = {},
) {
  const formatChange = (ratio, isTimeMetric = true) => {
    const percent = Math.abs((ratio - 1) * 100).toFixed(1);
    if (isTimeMetric) {
      if (ratio > 1.05) {
        return `🔴 **${percent}% slower**`;
      }
      if (ratio < 0.95) {
        return `🟢 **${percent}% faster**`;
      }
    } else {
      if (ratio < 0.95) {
        return `🔴 **${percent}% worse**`;
      }
      if (ratio > 1.05) {
        return `🟢 **${percent}% better**`;
      }
    }
    return "⚪ No significant change";
  };

  let report = `## 📊 Performance Regression Report

### Summary

| Metric | Baseline | Current | Change |
|--------|----------|---------|--------|
| h2m-parser (no Readability) | ${comparison.h2mParserNoReadability.baseline.toFixed(3)}ms | ${comparison.h2mParserNoReadability.current.toFixed(3)}ms | ${formatChange(comparison.h2mParserNoReadability.ratio)} |
| h2m-parser (with Readability) | ${comparison.h2mParserWithReadability.baseline.toFixed(3)}ms | ${comparison.h2mParserWithReadability.current.toFixed(3)}ms | ${formatChange(comparison.h2mParserWithReadability.ratio)} |
| vs Turndown | ${comparison.vsTurndown.baseline.toFixed(2)}x | ${comparison.vsTurndown.current.toFixed(2)}x | ${formatChange(comparison.vsTurndown.ratio, false)} |
| vs node-html-markdown | ${comparison.vsNodeHtmlMarkdown.baseline.toFixed(2)}x | ${comparison.vsNodeHtmlMarkdown.current.toFixed(2)}x | ${formatChange(comparison.vsNodeHtmlMarkdown.ratio, false)} |
| vs mdream | ${comparison.vsMdream.baseline.toFixed(2)}x | ${comparison.vsMdream.current.toFixed(2)}x | ${formatChange(comparison.vsMdream.ratio, false)} |

### Details

- **Baseline captured:** ${baseline.capturedAt}
- **Baseline commit:** ${baseline.commit.substring(0, 8)}
- **Test files:** ${current.meta.fileCount}
- **Iterations:** ${current.meta.iterations}
`;

  if (comparison.extras?.baseline || comparison.extras?.current) {
    const workflowMean = (extras) =>
      extras?.workflows?.modes?.find((mode) => /h2m/i.test(mode.name))?.mean ?? null;
    const baselineWorkflow = workflowMean(comparison.extras.baseline);
    const currentWorkflow = workflowMean(comparison.extras.current);
    const tokenSavings = (extras) => extras?.tokenUsage?.savings ?? null;
    const baselineTokens = tokenSavings(comparison.extras.baseline);
    const currentTokens = tokenSavings(comparison.extras.current);

    report += `
### Additional Metrics (Informational)

- **Workflow h2m mean (ms):** ${baselineWorkflow ? baselineWorkflow.toFixed(2) : "N/A"} → ${currentWorkflow ? currentWorkflow.toFixed(2) : "N/A"}
- **Token savings (tokens):** ${baselineTokens ?? "N/A"} → ${currentTokens ?? "N/A"}`;

    const memorySamples = comparison.extras.current?.memory?.memorySamples;
    if (memorySamples?.length) {
      const first = memorySamples[0];
      const last = memorySamples[memorySamples.length - 1];
      const toMB = (bytes) => bytes / 1024 / 1024;
      const rssDelta = first && last ? toMB(last.rss - first.rss).toFixed(2) : "N/A";
      report += `
- **Memory RSS change (current run):** ${rssDelta} MB`;
    }

    report += "\n";
  }

  // Determine overall status
  if (hasRegressionH2M) {
    report += `
### ❌ Regression Detected

Performance has degraded beyond the acceptable threshold (10%). Please review your changes and consider:
1. Running profiling tools to identify bottlenecks
2. Reviewing algorithmic complexity of changes
3. Checking for unnecessary operations or memory allocations
`;
  } else if (hasImprovement) {
    report += `
### ✅ Performance Improved

Great work! Performance has improved. Consider:
1. Updating the baseline to capture these improvements
2. Documenting what optimizations were made
`;
  } else if (hasRegressionCompetitor) {
    report += `
### ⚠️ Competitor Comparison Slower

Our h2m benchmarks stayed within the acceptable threshold, but comparisons versus competitor libraries regressed. Review the results if maintaining a competitive advantage is important for this change.
`;
  } else {
    report += `
### ✅ No Regression

Performance is within acceptable range. No action needed.
`;
  }

  return report;
}

// CLI
if (import.meta.url === `file://${process.argv[1]}`) {
  checkRegression().catch((error) => {
    console.error("Error:", error.message);
    process.exit(1);
  });
}

export { checkRegression };
