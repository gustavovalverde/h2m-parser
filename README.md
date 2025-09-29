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
<!-- Last updated: 2025-09-29T07:21:48.642Z -->

## Performance

**Runtime ranking (lower is better):**
1. mdream — 1.054ms
2. h2m-parser — 1.074ms
3. node-html-markdown — 3.694ms
4. Turndown — 5.581ms

<details>
<summary>📊 Benchmark Results (click to expand)</summary>

### Benchmark Methodology

- **Dataset:** 94 files (5 synthetic + 89 real HTML documents)
- **Dataset path:** tests/fixtures
- **File sizes:** 21KB to 420KB (mean: ~104KB)
- **Iterations:** 1000 per file for statistical significance
- **Total runtime:** 2024.7 seconds
- **Environment:** Node.js with standard V8 optimizations

### Average Processing Time

Tested across 94 files in tests/fixtures (up to 420KB):

| Library | Without Readability | With Readability | Relative |
|---------|---------------------|------------------|----------|
| mdream | 1.054ms | ❌ Not supported | Fastest |
| **h2m-parser** ✅ | **1.074ms** | 7.639ms | **Fastest** |
| node-html-markdown | 3.694ms | ❌ Not supported | 3.50x slower |
| Turndown | 5.581ms | ❌ Not supported | 5.29x slower |

**Readability overhead (h2m-parser):** +6.565ms (enables article extraction + content cleaning)

### Performance Analysis

- **Fastest baseline:** mdream averages 1.054ms per document without Readability.
- **h2m-parser gap to mdream:** 1.02× slower ( mdream: 1.054ms → h2m-parser: 1.074ms ).
- **h2m-parser vs Turndown:** 5.20x faster (5.581ms → 1.074ms)
- **h2m-parser vs node-html-markdown:** 3.44x faster (3.694ms → 1.074ms)
- **h2m-parser vs mdream:** 0.98x slower (1.054ms → 1.074ms)
- **Readability impact:** 7.1x slower when enabled (1.074ms → 7.639ms)
- **Algorithmic complexity:** O(n) linear scaling confirmed across file sizes

### Performance Projections

Estimated processing times for different file sizes (without Readability):

```
  100KB  1ms
  1MB    11ms
  10MB   106ms
  100MB  1.1s
```

*Based on linear scaling from 104KB average file size at 1.074ms*

### Detailed Results by File Size

#### tiny (18 bytes)

| Library | Mean (ms) | P95 (ms) | P99 (ms) |
|---------|-----------|----------|----------|
| h2m-parser (no Readability) | 0.008 | 0.011 | 0.012 |
| h2m-parser (with Readability) | 0.105 | 0.141 | 0.151 |
| Turndown | 0.011 | 0.016 | 0.018 |
| node-html-markdown | 0.006 | 0.008 | 0.009 |
| Mdream | 0.002 | 0.004 | 0.004 |

#### small (84 bytes)

| Library | Mean (ms) | P95 (ms) | P99 (ms) |
|---------|-----------|----------|----------|
| h2m-parser (no Readability) | 0.009 | 0.012 | 0.012 |
| h2m-parser (with Readability) | 0.121 | 0.142 | 0.146 |
| Turndown | 0.023 | 0.028 | 0.030 |
| node-html-markdown | 0.012 | 0.015 | 0.016 |
| Mdream | 0.005 | 0.009 | 0.009 |

#### medium (369 bytes)

| Library | Mean (ms) | P95 (ms) | P99 (ms) |
|---------|-----------|----------|----------|
| h2m-parser (no Readability) | 0.011 | 0.012 | 0.012 |
| h2m-parser (with Readability) | 0.169 | 0.177 | 0.179 |
| Turndown | 0.032 | 0.034 | 0.035 |
| node-html-markdown | 0.017 | 0.020 | 0.025 |
| Mdream | 0.009 | 0.010 | 0.011 |

#### file_42 (21KB)

| Library | Mean (ms) | P95 (ms) | P99 (ms) |
|---------|-----------|----------|----------|
| h2m-parser (no Readability) | 0.246 | 0.259 | 0.264 |
| h2m-parser (with Readability) | 1.798 | 1.907 | 1.935 |
| Turndown | 1.362 | 1.444 | 1.475 |
| node-html-markdown | 0.396 | 0.414 | 0.422 |
| Mdream | 0.345 | 0.361 | 0.365 |

#### file_33 (88KB)

| Library | Mean (ms) | P95 (ms) | P99 (ms) |
|---------|-----------|----------|----------|
| h2m-parser (no Readability) | 0.983 | 1.059 | 1.081 |
| h2m-parser (with Readability) | 6.108 | 6.673 | 8.701 |
| Turndown | 5.762 | 6.988 | 7.064 |
| node-html-markdown | 2.975 | 3.206 | 3.241 |
| Mdream | 1.877 | 1.965 | 1.985 |

#### file_88 (420KB)

| Library | Mean (ms) | P95 (ms) | P99 (ms) |
|---------|-----------|----------|----------|
| h2m-parser (no Readability) | 3.002 | 3.292 | 3.375 |
| h2m-parser (with Readability) | 30.321 | 34.749 | 35.263 |
| Turndown | 13.106 | 14.789 | 14.968 |
| node-html-markdown | 7.384 | 7.854 | 7.921 |
| Mdream | 8.668 | 9.064 | 9.142 |

*See [`bench/comparison-results.md`](bench/comparison-results.md) for complete results across all 94 files*

### Feature Comparison

| Feature | h2m-parser | Turndown | node-html-markdown | mdream |
|---------|------------|----------|--------------------|--------|
| **Performance** | ✅ Fastest | ❌ +429% slower | ❌ +250% slower | ✅ Fastest |
| **Readability** | ✅ | ❌ | ❌ | ⚠️ |
| **Link cleanup** | ✅ | ❌ | ❌ | ⚠️ |
| **Front matter** | ✅ | ❌ | ❌ | ✅ |
| **Chunking** | ✅ | ❌ | ❌ | ⚠️ |
| **TypeScript** | ✅ | ❌ | ✅ | ✅ |
| **Streaming** | ✅ | ❌ | ❌ | ✅ |

### Benchmark Transparency

- **Raw results:** [`bench/.results/comparison-latest.json`](bench/.results/comparison-latest.json)
- **Benchmark runner:** [`bench/compare.js`](bench/compare.js)
- **Test dataset:** [`tests/fixtures/`](tests/fixtures/) (89 real HTML files)
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
