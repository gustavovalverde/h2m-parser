/**
 * Shared benchmark runner for all benchmark scripts
 * Provides a single source of truth for converter initialization and benchmark execution
 */

import { performance } from "node:perf_hooks";
import { NodeHtmlMarkdown } from "node-html-markdown";
import TurndownService from "turndown";
import { H2MParser } from "../../dist/index.mjs";

/**
 * Singleton converter manager to ensure we reuse instances
 */
class ConverterManager {
  constructor() {
    this._converters = new Map();
  }

  /**
   * Get or create a converter instance
   * @param {string} type - 'h2m-parser', 'h2m-parser_no_readability', 'h2m-parser_with_readability', 'turndown', 'node_html_markdown'
   * @param {Object} options - Options for the converter
   */
  getConverter(type, options = {}) {
    const key = `${type}_${JSON.stringify(options)}`;

    if (!this._converters.has(key)) {
      let converter;

      switch (type) {
        case "h2m-parser":
        case "h2m-parser_custom":
          converter = new H2MParser(options);
          break;

        case "h2m-parser_no_readability":
          converter = new H2MParser({
            extract: { readability: false },
            llm: { frontMatter: false, addHash: false, chunk: false },
            ...options,
          });
          break;

        case "h2m-parser_with_readability":
          converter = new H2MParser({
            extract: { readability: true },
            llm: { frontMatter: false, addHash: false, chunk: false },
            ...options,
          });
          break;

        case "turndown":
          converter = new TurndownService(options);
          break;

        case "node_html_markdown":
          converter = new NodeHtmlMarkdown(options);
          break;

        default:
          throw new Error(`Unknown converter type: ${type}`);
      }

      this._converters.set(key, converter);
    }

    return this._converters.get(key);
  }

  /**
   * Clear all cached converters
   */
  clearCache() {
    this._converters.clear();
  }
}

// Singleton instance
export const converterManager = new ConverterManager();

/**
 * Run a benchmark for a single HTML input
 * @param {string} html - The HTML to convert
 * @param {string} converterType - Type of converter to use
 * @param {Object} options - Benchmark options
 * @returns {Promise<Object>} Benchmark results
 */
export async function runSingleBenchmark(html, converterType, options = {}) {
  const {
    iterations = 100,
    warmupIterations = 10,
    converterOptions = {},
    url = "https://example.com",
  } = options;

  const converter = converterManager.getConverter(converterType, converterOptions);

  // Warmup
  for (let i = 0; i < warmupIterations; i++) {
    await convertHtml(converter, converterType, html, url);
  }

  // Actual benchmark
  const times = [];
  for (let i = 0; i < iterations; i++) {
    const start = performance.now();
    await convertHtml(converter, converterType, html, url);
    times.push(performance.now() - start);
  }

  return calculateStats(times);
}

/**
 * Run benchmarks comparing multiple converters
 * @param {string} html - The HTML to convert
 * @param {Array<string>} converterTypes - Types of converters to compare
 * @param {Object} options - Benchmark options
 * @returns {Promise<Object>} Comparison results
 */
export async function runComparison(html, converterTypes, options = {}) {
  const results = {};

  for (const type of converterTypes) {
    results[type] = await runSingleBenchmark(html, type, options);
  }

  return results;
}

/**
 * Batch benchmark multiple HTML files
 * @param {Array<{name: string, html: string, size: number}>} files
 * @param {Array<string>} converterTypes
 * @param {Object} options
 * @returns {Promise<Array>} Results for all files
 */
export async function batchBenchmark(files, converterTypes, options = {}) {
  const results = [];

  for (const file of files) {
    const fileResults = {
      name: file.name,
      size: file.size,
      filename: file.filename,
      benchmarks: await runComparison(file.html, converterTypes, options),
    };

    results.push(fileResults);

    // Optional progress callback
    if (options.onProgress) {
      options.onProgress(fileResults);
    }
  }

  return results;
}

/**
 * Convert HTML using the appropriate method for each converter
 */
async function convertHtml(converter, converterType, html, url) {
  switch (converterType) {
    case "h2m-parser":
    case "h2m-parser_custom":
    case "h2m-parser_no_readability":
    case "h2m-parser_with_readability":
      return await converter.process(html, url);

    case "turndown":
      return converter.turndown(html);

    case "node_html_markdown":
      return converter.translate(html);

    default:
      throw new Error(`Unknown converter type: ${converterType}`);
  }
}

/**
 * Calculate statistics from timing data
 */
function calculateStats(times) {
  // Remove outliers (top and bottom 10%) only if we have enough samples
  const sorted = [...times].sort((a, b) => a - b);
  let trimmed = sorted;

  if (times.length >= 10) {
    const trimCount = Math.floor(times.length * 0.1);
    trimmed = sorted.slice(trimCount, -trimCount || undefined);
  }

  // Ensure we have at least one sample
  if (trimmed.length === 0) {
    trimmed = sorted;
  }

  return {
    mean: trimmed.reduce((a, b) => a + b, 0) / trimmed.length,
    median: trimmed[Math.floor(trimmed.length / 2)],
    p95: trimmed[Math.floor(trimmed.length * 0.95)] || trimmed[trimmed.length - 1],
    p99: trimmed[Math.floor(trimmed.length * 0.99)] || trimmed[trimmed.length - 1],
    min: trimmed[0],
    max: trimmed[trimmed.length - 1],
    samples: trimmed.length,
  };
}

/**
 * Generate summary statistics from benchmark results
 */
export function generateSummary(results, options = {}) {
  const { testReadability = true } = options;

  // Calculate averages across all files
  const avgTimes = {
    "h2m-parser_no_readability": 0,
    "h2m-parser_with_readability": 0,
    turndown: 0,
    node_html_markdown: 0,
  };

  let count = 0;
  for (const result of results) {
    if (result.benchmarks["h2m-parser_no_readability"]) {
      avgTimes["h2m-parser_no_readability"] += result.benchmarks["h2m-parser_no_readability"].mean;
    }
    if (result.benchmarks["h2m-parser_with_readability"]) {
      avgTimes["h2m-parser_with_readability"] +=
        result.benchmarks["h2m-parser_with_readability"].mean;
    }
    if (result.benchmarks.turndown) {
      avgTimes.turndown += result.benchmarks.turndown.mean;
    }
    if (result.benchmarks.node_html_markdown) {
      avgTimes.node_html_markdown += result.benchmarks.node_html_markdown.mean;
    }
    count++;
  }

  const h2mParserAvg = avgTimes["h2m-parser_no_readability"] / count;
  const h2mParserWithReadabilityAvg = avgTimes["h2m-parser_with_readability"] / count;
  const turndownAvg = avgTimes.turndown / count;
  const nhmAvg = avgTimes.node_html_markdown / count;
  const readabilityOverhead = h2mParserWithReadabilityAvg - h2mParserAvg;
  const fastest = Math.min(h2mParserAvg, turndownAvg, nhmAvg);

  return {
    averages: {
      h2mParserNoReadability: h2mParserAvg,
      h2mParserWithReadability: testReadability ? h2mParserWithReadabilityAvg : null,
      turndown: turndownAvg,
      nodeHtmlMarkdown: nhmAvg,
      readabilityOverhead: testReadability ? readabilityOverhead : null,
    },
    comparisons: {
      vsTurndown: turndownAvg / h2mParserAvg,
      vsNodeHtmlMarkdown: nhmAvg / h2mParserAvg,
    },
    verdict:
      h2mParserAvg === fastest
        ? "fastest"
        : h2mParserAvg / fastest < 1.5
          ? "competitive"
          : h2mParserAvg / fastest < 3
            ? "slower"
            : "needs_improvement",
  };
}

/**
 * Load benchmark results from JSON file
 */
export async function loadBenchmarkResults(path) {
  const { readFile } = await import("node:fs/promises");
  try {
    const data = await readFile(path, "utf8");
    return JSON.parse(data);
  } catch (error) {
    console.error("Failed to load benchmark results:", error.message);
    return null;
  }
}

/**
 * Save benchmark results to JSON file
 */
export async function saveBenchmarkResults(path, results) {
  const { writeFile, mkdir } = await import("node:fs/promises");
  const { dirname } = await import("node:path");

  try {
    await mkdir(dirname(path), { recursive: true });
    await writeFile(path, JSON.stringify(results, null, 2));
    return true;
  } catch (error) {
    console.error("Failed to save benchmark results:", error.message);
    return false;
  }
}
