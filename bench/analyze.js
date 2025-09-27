#!/usr/bin/env node
/**
 * Deep analysis tool for h2m-parser conversion pipeline.
 * Uses shared benchmark runner for consistency.
 * Analyzes bottlenecks, algorithmic complexity, and micro-benchmarks.
 */

import { readFile, writeFile } from "node:fs/promises";
import { join } from "node:path";
import { performance } from "node:perf_hooks";
import { DomHandler } from "domhandler";
import * as htmlparser2 from "htmlparser2";
import {
  converterManager,
  runComparison,
  runSingleBenchmark,
  saveBenchmarkResults
} from "./lib/benchmark-runner.js";

class ConversionAnalyzer {
  constructor(options = {}) {
    this.iterations = options.iterations || 100;
    this.verbose = options.verbose || false;
    this.outputFormat = options.output || 'console';
  }

  /**
   * Analyze htmlparser2 conversion pipeline steps
   */
  async analyzePipelineSteps() {
    console.log('\n🔬 CONVERSION PIPELINE ANALYSIS\n');

    const testHtml = `
      <article>
        <h1>Test Article</h1>
        <p>Paragraph with <strong>bold</strong> and <em>italic</em> text.</p>
        <ul>
          <li>List item 1</li>
          <li>List item 2</li>
        </ul>
      </article>
    `;

    const steps = [];

    // Step 1: Parse HTML to DOM
    const parseTimes = [];
    for (let i = 0; i < this.iterations; i++) {
      const start = performance.now();
      const handler = new DomHandler();
      const parser = new htmlparser2.Parser(handler);
      parser.write(testHtml);
      parser.end();
      parseTimes.push(performance.now() - start);
    }
    steps.push({
      name: 'HTML Parsing',
      time: this.average(parseTimes.slice(10))
    });

    // Step 2: Tree traversal
    const handler = new DomHandler();
    const parser = new htmlparser2.Parser(handler);
    parser.write(testHtml);
    parser.end();
    const dom = handler.dom;

    const traversalTimes = [];
    for (let i = 0; i < this.iterations; i++) {
      const start = performance.now();
      let nodeCount = 0;
      const traverse = (nodes) => {
        for (const node of nodes) {
          nodeCount++;
          if (node.type === 'tag' && node.children) {
            traverse(node.children);
          }
        }
      };
      traverse(dom);
      traversalTimes.push(performance.now() - start);
    }
    steps.push({
      name: 'DOM Traversal',
      time: this.average(traversalTimes.slice(10))
    });

    // Step 3: String building
    const buildTimes = [];
    for (let i = 0; i < this.iterations; i++) {
      const start = performance.now();
      const parts = [];
      for (let j = 0; j < 100; j++) {
        parts.push('test content ');
      }
      const result = parts.join('');
      buildTimes.push(performance.now() - start);
    }
    steps.push({
      name: 'String Building',
      time: this.average(buildTimes.slice(10))
    });

    // Display results
    console.log('Pipeline Step Breakdown:');
    const total = steps.reduce((sum, s) => sum + s.time, 0);
    for (const step of steps) {
      const percent = (step.time / total * 100).toFixed(1);
      console.log(`  ${step.name.padEnd(20)} ${step.time.toFixed(4)}ms (${percent}%)`);
    }

    return steps;
  }

  /**
   * Analyze algorithmic complexity using shared runner
   */
  async analyzeComplexity() {
    console.log('\n📈 ALGORITHMIC COMPLEXITY ANALYSIS\n');

    const sizes = [1, 2, 4, 8, 16, 32];
    const baseElement = '<p>Test paragraph with <strong>bold</strong> text.</p>';
    const results = [];

    for (const size of sizes) {
      const html = `<div>${baseElement.repeat(size)}</div>`;
      const htmlSize = Buffer.byteLength(html, 'utf8');

      // Use shared runner for consistency
      const result = await runSingleBenchmark(html, 'h2m-parser_no_readability', {
        iterations: this.iterations,
        warmupIterations: 10
      });

      const timePerUnit = result.mean / size;
      results.push({ size, htmlSize, time: result.mean, timePerUnit });

      console.log(`  ${size}x elements (${htmlSize} bytes): ${result.mean.toFixed(3)}ms (${timePerUnit.toFixed(4)}ms/unit)`);
    }

    // Determine complexity
    const first = results[0].timePerUnit;
    const last = results[results.length - 1].timePerUnit;
    const ratio = last / first;

    console.log('\n  Complexity Assessment:');
    if (ratio < 1.5) {
      console.log('  ✅ O(n) - Linear complexity');
    } else if (ratio < 3) {
      console.log('  ⚠️ O(n log n) - Slightly superlinear');
    } else {
      console.log('  ❌ O(n²) or worse - Needs optimization');
    }
    console.log(`  Scaling factor: ${ratio.toFixed(2)}x`);

    return results;
  }

  /**
   * Micro-benchmarks for specific operations
   */
  async runMicroBenchmarks() {
    console.log('\n⚡ MICRO-BENCHMARKS\n');

    const benchmarks = [
      {
        name: 'String concatenation (1000x)',
        fn: () => {
          let result = '';
          for (let i = 0; i < 1000; i++) {
            result += 'test ';
          }
        }
      },
      {
        name: 'Array.join (1000x)',
        fn: () => {
          const parts = [];
          for (let i = 0; i < 1000; i++) {
            parts.push('test ');
          }
          const result = parts.join('');
        }
      },
      {
        name: 'Map lookup (10000x)',
        fn: () => {
          const map = new Map();
          for (let i = 0; i < 50; i++) {
            map.set(`key${i}`, i);
          }
          for (let i = 0; i < 10000; i++) {
            map.get('key25');
          }
        }
      },
      {
        name: 'Object lookup (10000x)',
        fn: () => {
          const obj = {};
          for (let i = 0; i < 50; i++) {
            obj[`key${i}`] = i;
          }
          for (let i = 0; i < 10000; i++) {
            obj['key25'];
          }
        }
      },
      {
        name: 'Regex replace (1000x)',
        fn: () => {
          const text = 'This is a test string with multiple words';
          const regex = /\s+/g;
          for (let i = 0; i < 1000; i++) {
            text.replace(regex, ' ');
          }
        }
      }
    ];

    const results = [];

    for (const benchmark of benchmarks) {
      const times = [];
      for (let i = 0; i < this.iterations; i++) {
        const start = performance.now();
        benchmark.fn();
        times.push(performance.now() - start);
      }

      const avg = this.average(times.slice(10));
      results.push({ name: benchmark.name, time: avg });

      console.log(`  ${benchmark.name.padEnd(30)} ${avg.toFixed(3)}ms`);
    }

    return results;
  }

  /**
   * Compare conversion strategies using shared runner
   */
  async compareStrategies() {
    console.log('\n🔄 CONVERSION STRATEGY COMPARISON\n');

    const testCases = [
      { name: 'Simple', html: '<p>Hello world</p>' },
      { name: 'Nested', html: '<div><p>Nested <strong>content</strong></p></div>' },
      { name: 'List', html: '<ul><li>Item 1</li><li>Item 2</li></ul>' },
      { name: 'Mixed', html: '<article><h1>Title</h1><p>Text</p><ul><li>Item</li></ul></article>' }
    ];

    const converterTypes = ['h2m-parser_no_readability', 'turndown', 'node_html_markdown'];

    for (const testCase of testCases) {
      console.log(`  ${testCase.name}:`);

      // Use shared runner for all converters
      const results = await runComparison(testCase.html, converterTypes, {
        iterations: this.iterations,
        warmupIterations: 10
      });

      for (const [type, result] of Object.entries(results)) {
        const displayName = type === 'h2m-parser_no_readability' ? 'h2m-parser' :
                           type === 'node_html_markdown' ? 'node-html-markdown' :
                           type.charAt(0).toUpperCase() + type.slice(1);
        console.log(`    ${displayName.padEnd(20)} ${result.mean.toFixed(3)}ms`);
      }
      console.log();
    }
  }

  /**
   * Memory allocation analysis using shared runner
   */
  async analyzeMemory() {
    console.log('\n💾 MEMORY ALLOCATION ANALYSIS\n');

    if (!global.gc) {
      console.log('  Run with --expose-gc flag for accurate memory analysis');
      return;
    }

    const testHtml = '<article>' + '<p>Test paragraph</p>'.repeat(100) + '</article>';

    // Test current implementation using shared runner
    global.gc();
    const beforeCurrent = process.memoryUsage();

    const converter = converterManager.getConverter('h2m-parser_no_readability');
    for (let i = 0; i < 100; i++) {
      await converter.process(testHtml, 'https://example.com');
    }

    const afterCurrent = process.memoryUsage();
    const currentHeap = (afterCurrent.heapUsed - beforeCurrent.heapUsed) / 1024 / 1024;

    console.log(`  Current implementation:`);
    console.log(`    Total heap growth: ${currentHeap.toFixed(2)}MB`);
    console.log(`    Per conversion:    ${(currentHeap / 100).toFixed(3)}MB`);

    if (currentHeap / 100 > 0.5) {
      console.log('    ⚠️ High memory usage - possible memory leak');
    } else if (currentHeap / 100 > 0.1) {
      console.log('    ⚠️ Moderate memory usage');
    } else {
      console.log('    ✅ Memory usage is efficient');
    }
  }

  /**
   * Run all analyses
   */
  async runAll() {
    console.log('=' + '='.repeat(79));
    console.log('h2m-parser CONVERSION PIPELINE DEEP ANALYSIS');
    console.log('=' + '='.repeat(79));

    const results = {
      pipeline: await this.analyzePipelineSteps(),
      complexity: await this.analyzeComplexity(),
      microbenchmarks: await this.runMicroBenchmarks(),
      strategies: await this.compareStrategies(),
      memory: await this.analyzeMemory()
    };

    this.printSummary(results);

    if (this.outputFormat === 'json') {
      const outputPath = join(process.cwd(), 'bench', '.results', 'analysis-results.json');
      await saveBenchmarkResults(outputPath, results);
      console.log(`\n📄 Results exported to: ${outputPath}`);
    }

    return results;
  }

  printSummary(results) {
    console.log('\n' + '=' + '='.repeat(79));
    console.log('ANALYSIS SUMMARY');
    console.log('=' + '='.repeat(79));

    console.log('\n🎯 Key Findings:');

    // Pipeline findings
    if (results.pipeline) {
      const slowest = results.pipeline.reduce((max, s) => s.time > max.time ? s : max);
      console.log(`  1. Slowest pipeline step: ${slowest.name} (${slowest.time.toFixed(3)}ms)`);
    }

    // Complexity findings
    if (results.complexity && results.complexity.length > 0) {
      const first = results.complexity[0].timePerUnit;
      const last = results.complexity[results.complexity.length - 1].timePerUnit;
      const ratio = last / first;
      console.log(`  2. Algorithm complexity: ${ratio < 1.5 ? 'O(n) Linear' : ratio < 3 ? 'O(n log n)' : 'O(n²) or worse'}`);
    }

    // Micro-benchmark findings
    if (results.microbenchmarks) {
      const fastest = results.microbenchmarks.reduce((min, b) => b.time < min.time ? b : min);
      console.log(`  3. Fastest operation: ${fastest.name} (${fastest.time.toFixed(3)}ms)`);
    }

    console.log('\n💡 Optimization Recommendations:');
    console.log('  - Use array.join() for string building');
    console.log('  - Cache parsed DOM for repeated conversions');
    console.log('  - Pre-compile regex patterns at module level');
    console.log('  - Consider streaming for large documents');
  }

  average(numbers) {
    return numbers.reduce((a, b) => a + b, 0) / numbers.length;
  }
}

// CLI
async function main() {
  const args = process.argv.slice(2);
  const options = {
    iterations: 100,
    output: 'console',
    verbose: false
  };

  for (let i = 0; i < args.length; i++) {
    switch (args[i]) {
      case '--iterations':
      case '-i':
        options.iterations = parseInt(args[++i], 10);
        break;
      case '--output':
      case '-o':
        options.output = args[++i];
        break;
      case '--verbose':
      case '-v':
        options.verbose = true;
        break;
      case '--help':
      case '-h':
        console.log(`
Usage: node bench/analyze.js [options]

Options:
  --iterations, -i <n>     Number of iterations per test (default: 100)
  --output, -o <format>    Output format: console, json (default: console)
  --verbose, -v            Show detailed output
  --help, -h               Show this help message

Examples:
  node bench/analyze.js
  node bench/analyze.js --iterations 1000 --output json
  node --expose-gc bench/analyze.js  # For memory analysis
`);
        process.exit(0);
    }
  }

  const analyzer = new ConversionAnalyzer(options);
  await analyzer.runAll();
}

main().catch(console.error);