# h2m-parser

[![npm version](https://img.shields.io/npm/v/h2m-parser.svg)](https://www.npmjs.com/package/h2m-parser)
[![npm downloads](https://img.shields.io/npm/dm/h2m-parser.svg)](https://www.npmjs.com/package/h2m-parser)
[![License: MIT](https://img.shields.io/badge/License-MIT-blue.svg)](https://opensource.org/licenses/MIT)
[![TypeScript](https://img.shields.io/badge/TypeScript-Ready-blue.svg)](https://www.typescriptlang.org/)

> LLM-friendly HTML → Markdown parser with Readability extraction, a streaming renderer, and opinionated post-processing.

## Why h2m-parser?

- **Article aware** – runs Mozilla Readability atop Linkedom for fast, script-free DOM extraction.
- **Deterministic Markdown** – single-pass htmlparser2 renderer with stable spacing, link styling, figures, and GFM-friendly tables.
- **Built for pipelines** – YAML front matter, optional chunking, content hashing, and NDJSON transform helpers.
- **Customisable** – per-tag translators, ignore/block lists, regex replacements, and telemetry hooks.
- **DX-first** – TypeScript types, Biome lint/format, Vitest coverage, tsup dual outputs, Changesets releases.

### Requirements

- Node.js **20.11** or newer.

## Installation

```bash
pnpm add h2m-parser
# or
yarn add h2m-parser
# or
npm install h2m-parser
```

## Quick Start

### Minimal conversion

```ts
import { H2MParser } from "h2m-parser";

const markdown = await H2MParser.processHtml(
  '<h1>Hello</h1><p>World</p>',
  'https://example.com',
);

console.log(markdown.markdown);
```

### End-to-end pipeline with Readability

```ts
const converter = new H2MParser({
  extract: { readability: true },
  markdown: { linkStyle: "inline" },
  llm: { frontMatter: true, addHash: true },
});

const result = await converter.process(articleHtml, 'https://example.com');
console.log(result.markdown);
console.log(result.meta); // title, byline, lang, hash, etc.
```

### CLI

```bash
# stdin → stdout
h2m --url https://example.com < article.html > article.md

# enable Readability extraction
h2m --readability < raw.html > main-content.md
```

## Pipeline overview

1. **Extract** – normalise HTML with Linkedom + Readability (configurable figure retention, URL resolution, tracking-parameter stripping, data URI policy).
2. **Convert** – stream nodes through the htmlparser2-based renderer (custom translators, footnotes, reference links, table handling).
3. **Post-process** – add optional front matter, hash, chunking, and attach telemetry for observability.

## Configuration highlights

```ts
import type { Options } from "h2m-parser";

const options: Options = {
  extract: {
    readability: true,
    resolveRelativeUrls: true,
    stripTrackingParams: true,
  },
  markdown: {
    linkStyle: "inline",
    ignoreTags: ["aside"],
    textReplacements: [{ pattern: /foo@example.com/g, replacement: "[redacted]" }],
  },
  llm: {
    frontMatter: true,
    addHash: false,
    chunk: { targetTokens: 500, overlapTokens: 60 },
  },
};
```

## Benchmarks

<!-- BENCHMARK:START -->
<!-- Last updated: 2025-09-27T19:41:03.406Z -->

## Performance

🏆 **h2m-parser is the FASTEST converter!**

<details>
<summary>📊 Benchmark Results (click to expand)</summary>

### Benchmark Methodology

- **Dataset:** 91 files (4 synthetic + 87 real HTML documents)
- **File sizes:** 21KB to 380KB (mean: ~100KB)
- **Iterations:** 30 per file for statistical significance
- **Total runtime:** 70.7 seconds
- **Environment:** Node.js with standard V8 optimizations

### Average Processing Time

Tested across 91 files in tests/fixtures (up to 380KB):

| Library | Without Readability | With Readability | Performance |
|---------|---------------------|------------------|-------------|
| **h2m-parser** | **1.464ms** ✅ | 7.094ms | **Fastest** |
| Turndown | 5.430ms | ❌ Not supported | 3.71x slower |
| node-html-markdown | 3.547ms | ❌ Not supported | 2.42x slower |

**Readability overhead:** +5.630ms (enables article extraction + content cleaning)

### Performance Analysis

- **h2m-parser vs Turndown:** 3.71x faster (5.430ms → 1.464ms)
- **h2m-parser vs node-html-markdown:** 2.42x faster (3.547ms → 1.464ms)
- **Readability impact:** 4.8x slower when enabled (1.464ms → 7.094ms)
- **Algorithmic complexity:** O(n) linear scaling confirmed across file sizes

### Performance Projections

Estimated processing times for different file sizes (without Readability):

```
  100KB  1ms
  1MB    15ms
  10MB   150ms
  100MB  1.5s
```

*Based on linear scaling from 100KB average file size at 1.464ms*

### Detailed Results by File Size

Sample results showing performance across different file types and sizes:

#### tiny (18 bytes)

| Library | Mean (ms) | P95 (ms) | P99 (ms) |
|---------|-----------|----------|----------|
| h2m-parser (no Readability) | 0.017 | 0.022 | 0.025 |
| h2m-parser (with Readability) | 0.221 | 0.254 | 0.263 |
| Turndown | 0.024 | 0.029 | 0.030 |
| node-html-markdown | 0.013 | 0.019 | 0.020 |

#### small (84 bytes)

| Library | Mean (ms) | P95 (ms) | P99 (ms) |
|---------|-----------|----------|----------|
| h2m-parser (no Readability) | 0.028 | 0.037 | 0.046 |
| h2m-parser (with Readability) | 0.213 | 0.262 | 0.271 |
| Turndown | 0.049 | 0.065 | 0.071 |
| node-html-markdown | 0.029 | 0.035 | 0.036 |

#### medium (369 bytes)

| Library | Mean (ms) | P95 (ms) | P99 (ms) |
|---------|-----------|----------|----------|
| h2m-parser (no Readability) | 0.017 | 0.021 | 0.022 |
| h2m-parser (with Readability) | 0.238 | 0.285 | 0.291 |
| Turndown | 0.050 | 0.062 | 0.063 |
| node-html-markdown | 0.028 | 0.033 | 0.035 |

#### file_1 (88KB)

| Library | Mean (ms) | P95 (ms) | P99 (ms) |
|---------|-----------|----------|----------|
| h2m-parser (no Readability) | 1.544 | 1.785 | 1.808 |
| h2m-parser (with Readability) | 7.220 | 10.383 | 11.360 |
| Turndown | 6.053 | 7.549 | 7.699 |
| node-html-markdown | 3.387 | 3.854 | 3.880 |

#### file_2 (69KB)

| Library | Mean (ms) | P95 (ms) | P99 (ms) |
|---------|-----------|----------|----------|
| h2m-parser (no Readability) | 1.228 | 1.354 | 1.361 |
| h2m-parser (with Readability) | 5.250 | 5.967 | 7.073 |
| Turndown | 4.365 | 4.597 | 5.881 |
| node-html-markdown | 2.017 | 2.233 | 2.236 |

#### file_3 (157KB)

| Library | Mean (ms) | P95 (ms) | P99 (ms) |
|---------|-----------|----------|----------|
| h2m-parser (no Readability) | 3.117 | 3.348 | 3.412 |
| h2m-parser (with Readability) | 12.775 | 17.030 | 17.198 |
| Turndown | 9.051 | 11.514 | 11.553 |
| node-html-markdown | 3.901 | 4.036 | 4.079 |

*See [`bench/comparison-results.md`](bench/comparison-results.md) for complete results across all 91 files*

### Feature Comparison

| Feature | h2m-parser | Turndown | node-html-markdown |
|---------|------|----------|--------------------|
| **Performance** | ✅ Fastest | ❌ | ⚠️ |
| **Readability** | ✅ | ❌ | ❌ |
| **Link cleanup** | ✅ | ❌ | ❌ |
| **Front matter** | ✅ | ❌ | ❌ |
| **Chunking** | ✅ | ❌ | ❌ |
| **TypeScript** | ✅ | ❌ | ✅ |
| **Streaming** | ✅ | ❌ | ❌ |

### Benchmark Transparency

- **Raw results:** [`bench/.results/comparison-latest.json`](bench/.results/comparison-latest.json)
- **Benchmark runner:** [`bench/compare.js`](bench/compare.js)
- **Test dataset:** [`tests/fixtures/`](tests/fixtures/) (87 real HTML files)
- **Statistical data:** Includes mean, median, P95, P99, min/max for each test
- **Reproducible:** Run `pnpm bench:compare:full` to verify results

</details>

Run benchmarks yourself:

```bash
# Quick comparison (10 iterations)
pnpm bench:compare:quick

# Full comparison (1000 iterations)
pnpm bench:compare:full

# Update README with fresh results
pnpm bench:readme
```

<!-- BENCHMARK:END -->

## Development

```bash
pnpm install
pnpm verify
```

## Contributing

We welcome improvements! See [CONTRIBUTING.md](CONTRIBUTING.md) for:

- Development setup and coding standards
- Commit conventions and release workflow
- Maintainer scripts and workflows
- Performance baselines and troubleshooting

## License

MIT © 2025 h2m-parser maintainers.
