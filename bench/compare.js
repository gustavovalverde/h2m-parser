#!/usr/bin/env node
/**
 * Comprehensive comparison of h2m-parser against competitor libraries.
 * Uses shared benchmark runner for consistency across all benchmark scripts.
 */

import { readdir, readFile, writeFile } from "node:fs/promises";
import { join } from "node:path";
import { batchBenchmark, generateSummary, saveBenchmarkResults } from "./lib/benchmark-runner.js";
import { describeHtml } from "./utils/fixture-metadata.js";

const DEFAULT_DATASET = join(process.cwd(), "tests", "fixtures");
const DEFAULT_ITERATIONS = 100;
const DEFAULT_WARMUP_ITERATIONS = 10;
const DEFAULT_MAX_FILE_SIZE = 512 * 1024; // 512KB limit keeps comparisons snappy by default

// Test configurations
const TEST_SIZES = {
  tiny: "<p>Hello world</p>",
  small: "<p>Paragraph with <strong>bold</strong>, <em>italic</em>, and <code>code</code>.</p>",
  medium: `<article>${"<p>Test paragraph with content.</p>".repeat(10)}</article>`,
};

function truncate(text, maxLength) {
  if (!text) {
    return "";
  }
  if (text.length <= maxLength) {
    return text;
  }
  return `${text.slice(0, Math.max(0, maxLength - 1))}…`;
}

class ComparisonBenchmark {
  constructor(options = {}) {
    this.dataset = options.dataset || DEFAULT_DATASET;
    this.iterations = options.iterations || DEFAULT_ITERATIONS;
    this.outputFormat = options.output || "console";
    this.testReadability = options.readability !== false;
    this.maxFiles = options.maxFiles || Infinity;
    this.maxFileSize =
      typeof options.maxFileSize === "number" ? options.maxFileSize : DEFAULT_MAX_FILE_SIZE;
    this.warmupIterations =
      typeof options.warmupIterations === "number" && options.warmupIterations >= 0
        ? options.warmupIterations
        : DEFAULT_WARMUP_ITERATIONS;
  }

  async loadTestFiles() {
    const files = [];

    // Add predefined test sizes
    for (const [name, html] of Object.entries(TEST_SIZES)) {
      if (html !== null) {
        files.push({
          name,
          html,
          size: Buffer.byteLength(html, "utf8"),
          metadata: describeHtml(html),
        });
      }
    }

    // Load files from dataset with configurable limits
    try {
      const entries = await readdir(this.dataset, { withFileTypes: true });
      const htmlFiles = entries.filter((entry) => entry.isFile() && /\.x?html?$/i.test(entry.name));

      // Apply max files limit if specified
      const filesToProcess =
        this.maxFiles < Infinity ? htmlFiles.slice(0, this.maxFiles) : htmlFiles;

      let filesLoaded = 0;
      let skippedFiles = 0;

      // Load HTML files from the dataset
      for (let i = 0; i < filesToProcess.length; i++) {
        const entry = filesToProcess[i];
        const path = join(this.dataset, entry.name);
        const html = await readFile(path, "utf8");
        const size = Buffer.byteLength(html, "utf8");

        // Apply file size limit if specified
        if (size <= this.maxFileSize) {
          files.push({
            name: `file_${filesLoaded + 1}`,
            html,
            size,
            filename: entry.name,
            label: entry.name.length > 40 ? `${entry.name.substring(0, 37)}...` : entry.name,
            metadata: describeHtml(html),
          });
          filesLoaded++;
        } else {
          skippedFiles++;
        }
      }

      console.log(`Loaded ${filesLoaded} real files from ${this.dataset}`);
      if (skippedFiles > 0) {
        console.log(
          `Skipped ${skippedFiles} files exceeding size limit (${this.maxFileSize} bytes)`,
        );
      }
      if (this.maxFiles < Infinity && htmlFiles.length > this.maxFiles) {
        console.log(
          `Limited to ${this.maxFiles} files (${htmlFiles.length - this.maxFiles} more available)`,
        );
      }
    } catch (e) {
      console.error("Warning: Could not load files from dataset:", e.message);
    }

    return files;
  }

  async run() {
    const startTime = Date.now();
    console.log(`=${"=".repeat(79)}`);
    console.log("h2m-parser COMPREHENSIVE COMPARISON BENCHMARK");
    console.log("Testing with and without Readability");
    console.log(`=${"=".repeat(79)}`);

    const files = await this.loadTestFiles();
    console.log(`\nLoaded ${files.length} test files`);
    console.log(`Iterations per test: ${this.iterations}\n`);

    // Determine which converters to test
    const converterTypes = ["h2m-parser_no_readability"];
    if (this.testReadability) {
      converterTypes.push("h2m-parser_with_readability");
    }
    converterTypes.push("turndown", "node_html_markdown", "mdream");

    // Run benchmarks using shared runner
    const results = await batchBenchmark(files, converterTypes, {
      iterations: this.iterations,
      warmupIterations: this.warmupIterations,
      datasetDir: this.dataset,
      onProgress: (fileResult) => {
        this.printFileResults(fileResult);
      },
    });

    // Generate summary
    const summary = generateSummary(results, { testReadability: this.testReadability });
    this.printSummary(results, summary);

    // Save results to JSON
    const benchmarkMeta = {
      timestamp: new Date().toISOString(),
      fileCount: files.length,
      iterations: this.iterations,
      dataset: this.dataset,
      testReadability: this.testReadability,
    };

    const jsonResults = {
      meta: benchmarkMeta,
      results: results,
      summary: summary,
      totalTime: ((Date.now() - startTime) / 1000).toFixed(1),
    };

    // Always save to latest.json
    const latestPath = join(process.cwd(), "bench", ".results", "comparison-latest.json");
    await saveBenchmarkResults(latestPath, jsonResults);
    console.log(`\n📊 Results saved to: ${latestPath}`);

    if (this.outputFormat === "markdown") {
      await this.exportMarkdown(results);
    } else if (this.outputFormat === "json") {
      const outputPath = join(process.cwd(), "bench", `comparison-${Date.now()}.json`);
      await saveBenchmarkResults(outputPath, jsonResults);
      console.log(`📄 Results exported to: ${outputPath}`);
    }

    const totalTime = ((Date.now() - startTime) / 1000).toFixed(1);
    console.log(`\nTotal benchmark time: ${totalTime}s`);
  }

  printFileResults(result) {
    const label = result.label ?? result.filename ?? result.name;
    const sizeKb = Math.round(result.size / 102.4) / 10;
    const meta = result.metadata;
    const domain = meta?.domain ? ` – ${meta.domain}` : "";
    const title = meta?.title ? ` – ${truncate(meta.title, 80)}` : "";
    const structure = meta
      ? ` [links:${meta.links ?? 0}, scripts:${meta.scripts ?? 0}, tables:${meta.tables ?? 0}]`
      : "";

    console.log(`Testing: ${label} (${sizeKb} KB)${domain}${title}${structure}`);

    const benchmarks = result.benchmarks;
    if (benchmarks["h2m-parser_no_readability"]) {
      console.log(
        `  h2m-parser (no Readability):  ${benchmarks["h2m-parser_no_readability"].mean.toFixed(3)}ms`,
      );
    }
    if (benchmarks["h2m-parser_with_readability"]) {
      console.log(
        `  h2m-parser (with Readability): ${benchmarks["h2m-parser_with_readability"].mean.toFixed(3)}ms`,
      );
    }
    if (benchmarks.turndown) {
      console.log(`  Turndown:                ${benchmarks.turndown.mean.toFixed(3)}ms`);
    }
    if (benchmarks.node_html_markdown) {
      console.log(`  node-html-markdown:      ${benchmarks.node_html_markdown.mean.toFixed(3)}ms`);
    }
    if (benchmarks.mdream) {
      console.log(`  mdream:                  ${benchmarks.mdream.mean.toFixed(3)}ms`);
    }

    // Calculate ratio
    const h2mParserTime = benchmarks["h2m-parser_no_readability"]?.mean ?? Infinity;
    const competitors = [
      { name: "h2m-parser", mean: h2mParserTime },
      { name: "Turndown", mean: benchmarks.turndown?.mean ?? Infinity },
      {
        name: "node-html-markdown",
        mean: benchmarks.node_html_markdown?.mean ?? Infinity,
      },
      { name: "mdream", mean: benchmarks.mdream?.mean ?? Infinity },
    ].filter((entry) => Number.isFinite(entry.mean));

    if (!competitors.length || !Number.isFinite(h2mParserTime)) {
      console.log("  → h2m-parser timing unavailable\n");
      return;
    }

    let fastestEntry = competitors[0];
    for (const entry of competitors) {
      if (entry.mean < fastestEntry.mean) {
        fastestEntry = entry;
      }
    }

    const ratio = h2mParserTime / fastestEntry.mean;
    const delta = h2mParserTime - fastestEntry.mean;
    const deltaText = Number.isFinite(delta)
      ? `${delta >= 0 ? "+" : "-"}${Math.abs(delta).toFixed(3)}ms`
      : "n/a";

    let verdict;
    if (ratio <= 1.1) {
      verdict = "✅ competitive";
    } else if (ratio <= 2) {
      verdict = "⚠️ slower";
    } else {
      verdict = "❌ much slower";
    }

    const fastestLabel = fastestEntry.name === "h2m-parser" ? "itself" : fastestEntry.name;
    console.log(
      `  → h2m-parser is ${verdict} (${ratio.toFixed(2)}x, Δ ${deltaText} vs ${fastestLabel})\n`,
    );
  }

  printSummary(_results, summary) {
    console.log(`=${"=".repeat(79)}`);
    console.log("SUMMARY");
    console.log(`=${"=".repeat(79)}`);

    console.log("\nAverage processing time:");
    console.log(
      `  h2m-parser (no Readability):  ${summary.averages.h2mParserNoReadability.toFixed(3)}ms`,
    );

    if (this.testReadability && summary.averages.h2mParserWithReadability) {
      console.log(
        `  h2m-parser (with Readability): ${summary.averages.h2mParserWithReadability.toFixed(3)}ms`,
      );
      console.log(
        `  Readability overhead:    +${summary.averages.readabilityOverhead.toFixed(3)}ms`,
      );
    }

    console.log(`  Turndown:                ${summary.averages.turndown.toFixed(3)}ms`);
    console.log(`  node-html-markdown:      ${summary.averages.nodeHtmlMarkdown.toFixed(3)}ms`);
    console.log(`  mdream:                  ${summary.averages.mdream.toFixed(3)}ms`);

    console.log("\nPerformance comparison (without Readability):");
    console.log(
      "  h2m-parser vs Turndown:        " +
        summary.comparisons.vsTurndown.toFixed(2) +
        "x " +
        (summary.comparisons.vsTurndown > 1 ? "faster" : "slower"),
    );
    console.log(
      "  h2m-parser vs node-html-markdown: " +
        summary.comparisons.vsNodeHtmlMarkdown.toFixed(2) +
        "x " +
        (summary.comparisons.vsNodeHtmlMarkdown > 1 ? "faster" : "slower"),
    );
    console.log(
      "  h2m-parser vs mdream:           " +
        summary.comparisons.vsMdream.toFixed(2) +
        "x " +
        (summary.comparisons.vsMdream > 1 ? "faster" : "slower"),
    );

    if (summary.verdict === "fastest") {
      console.log("\n🏆 h2m-parser is the FASTEST converter!");
    } else if (summary.verdict === "competitive") {
      console.log("\n✅ h2m-parser performance is competitive");
    } else if (summary.verdict === "slower") {
      console.log("\n⚠️ h2m-parser is slower but has more features");
    } else {
      console.log("\n❌ h2m-parser performance needs improvement");
    }

    // Feature comparison
    console.log("\n📊 Feature Comparison:");
    console.log("                     h2m-parser   Turndown  node-html-markdown  mdream");
    const h2mParserAvg = summary.averages.h2mParserNoReadability;
    const turndownAvg = summary.averages.turndown;
    const nhmAvg = summary.averages.nodeHtmlMarkdown;
    const mdreamAvg = summary.averages.mdream;
    const fastest = Math.min(h2mParserAvg, turndownAvg, nhmAvg, mdreamAvg);
    console.log(
      "  Performance         " +
        (h2mParserAvg === fastest ? "✅" : h2mParserAvg / fastest < 2 ? "⚠️" : "❌") +
        "      " +
        (turndownAvg === fastest ? "✅" : turndownAvg / fastest < 2 ? "⚠️" : "❌") +
        "        " +
        (nhmAvg === fastest ? "✅" : nhmAvg / fastest < 2 ? "⚠️" : "❌") +
        "        " +
        (mdreamAvg === fastest ? "✅" : mdreamAvg / fastest < 2 ? "⚠️" : "❌"),
    );
    console.log("  Readability opts    ✅      ❌        ❌        ⚠️");
    console.log("  Plugin system       ✅      ❌        ❌        ✅");
    console.log("  Front matter        ✅      ❌        ❌        ✅");
    console.log("  TypeScript          ✅      ❌        ✅        ✅");
    console.log("  Streaming           ✅      ❌        ❌        ✅");
  }

  async exportMarkdown(results) {
    let markdown = "# h2m-parser Benchmark Results\n\n";
    markdown += `Generated: ${new Date().toISOString()}\n\n`;
    markdown += `## Test Configuration\n\n`;
    markdown += `- Iterations: ${this.iterations}\n`;
    markdown += `- Dataset: ${this.dataset}\n`;
    markdown += `- Readability tested: ${this.testReadability ? "Yes" : "No"}\n\n`;

    markdown += "## Results by File\n\n";

    for (const result of results) {
      markdown += `### ${result.name}\n\n`;
      markdown += `- Size: ${result.size} bytes\n`;
      if (result.filename) {
        markdown += `- File: ${result.filename}\n`;
      }
      markdown += "\n";

      markdown += "| Library | Mean (ms) | P95 (ms) | P99 (ms) |\n";
      markdown += "|---------|-----------|----------|----------|\n";

      for (const [name, stats] of Object.entries(result.benchmarks)) {
        if (stats) {
          const displayName = name.replace(/_/g, " ").replace(/h2m-parser/i, "h2m-parser");
          markdown += `| ${displayName} | ${stats.mean.toFixed(3)} | ${stats.p95.toFixed(3)} | ${stats.p99.toFixed(3)} |\n`;
        }
      }
      markdown += "\n";
    }

    const outputPath = join(process.cwd(), "bench", "comparison-results.md");
    await writeFile(outputPath, markdown);
    console.log(`📄 Results exported to: ${outputPath}`);
  }
}

// CLI
async function main() {
  const args = process.argv.slice(2);
  const options = {
    dataset: DEFAULT_DATASET,
    iterations: DEFAULT_ITERATIONS,
    output: "console",
    readability: true,
    maxFiles: Infinity,
    maxFileSize: undefined,
  };

  for (let i = 0; i < args.length; i++) {
    switch (args[i]) {
      case "--dataset":
      case "-d":
        options.dataset = args[++i];
        break;
      case "--iterations":
      case "-i":
        options.iterations = parseInt(args[++i], 10);
        break;
      case "--output":
      case "-o":
        options.output = args[++i];
        break;
      case "--no-readability":
        options.readability = false;
        break;
      case "--max-files":
      case "-mf":
        options.maxFiles = parseInt(args[++i], 10);
        break;
      case "--max-file-size":
      case "-ms": {
        const sizeArg = args[++i];
        // Support human-readable sizes like 500KB, 1MB, etc.
        if (sizeArg.endsWith("KB")) {
          options.maxFileSize = parseInt(sizeArg, 10) * 1024;
        } else if (sizeArg.endsWith("MB")) {
          options.maxFileSize = parseInt(sizeArg, 10) * 1024 * 1024;
        } else {
          options.maxFileSize = parseInt(sizeArg, 10);
        }
        break;
      }
      case "--warmup":
      case "--warmup-iterations":
      case "-w":
        options.warmupIterations = parseInt(args[++i], 10);
        break;
      case "--help":
      case "-h":
        console.log(`
Usage: node bench/compare.js [options]

Options:
  --dataset, -d <path>     Path to HTML test files (default: tests/fixtures)
  --iterations, -i <n>     Number of iterations per test (default: 100)
  --output, -o <format>    Output format: console, markdown, json (default: console)
  --no-readability         Skip Readability tests
  --max-files, -mf <n>     Maximum number of files to process (default: unlimited)
  --max-file-size, -ms <size>  Maximum file size in bytes or with KB/MB suffix (default: 512KB)
  --warmup, -w <n>         Warmup iterations per benchmark (default: 10)
  --help, -h               Show this help message

Examples:
  node bench/compare.js
  node bench/compare.js --output markdown
  node bench/compare.js --iterations 1000 --no-readability
  node bench/compare.js --max-files 20 --max-file-size 500KB
  node bench/compare.js --max-file-size 1MB --iterations 50
`);
        process.exit(0);
    }
  }

  const benchmark = new ComparisonBenchmark(options);
  await benchmark.run();
}

main().catch(console.error);
