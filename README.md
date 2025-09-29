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
<!-- Last updated: 2025-09-29T08:44:59.546Z -->

## Performance

**Runtime ranking (lower is better):**
1. mdream — 1.133ms
2. h2m-parser — 1.193ms
3. node-html-markdown — 3.894ms
4. Turndown — 5.830ms

<details>
<summary>📊 Benchmark Results (click to expand)</summary>

### Benchmark Methodology

- **Dataset:** 94 files (5 synthetic + 89 real HTML documents)
- **Dataset path:** tests/fixtures
- **File sizes:** 21KB to 420KB (mean: ~104KB)
- **Iterations:** 10 per file for statistical significance
- **Total runtime:** 41.3 seconds
- **Environment:** Node.js with standard V8 optimizations

### Average Processing Time

Tested across 94 files in tests/fixtures (up to 420KB):

| Library | Without Readability | With Readability | Relative |
|---------|---------------------|------------------|----------|
| mdream | 1.133ms | ❌ Not supported | Fastest |
| **h2m-parser** ✅ | **1.193ms** | 7.707ms | **1.05x slower** |
| node-html-markdown | 3.894ms | ❌ Not supported | 3.44x slower |
| Turndown | 5.830ms | ❌ Not supported | 5.15x slower |

**Readability overhead (h2m-parser):** +6.513ms (enables article extraction + content cleaning)

### Performance Analysis

- **Fastest baseline:** mdream averages 1.133ms per document without Readability.
- **h2m-parser gap to mdream:** 1.05× slower ( mdream: 1.133ms → h2m-parser: 1.193ms ).
- **h2m-parser vs Turndown:** 4.89x faster (5.830ms → 1.193ms)
- **h2m-parser vs node-html-markdown:** 3.26x faster (3.894ms → 1.193ms)
- **h2m-parser vs mdream:** 0.95x slower (1.133ms → 1.193ms)
- **Readability impact:** 6.5x slower when enabled (1.193ms → 7.707ms)
- **Token savings vs raw HTML:** 24051 tokens saved (95.63%) on tests/fixtures/039c4b966d1f2a0c589ac0aad211fe65500ad1cb58c7f45b34251db7056803ec.html.
- **Algorithmic complexity:** O(n) linear scaling confirmed across file sizes

### Performance Projections

Estimated processing times for different file sizes (without Readability):

```
  100KB  1ms
  1MB    12ms
  10MB   117ms
  100MB  1.2s
```

*Based on linear scaling from 104KB average file size at 1.193ms*

### Detailed Results by File Size

#### tiny (18 bytes)

| Library | Mean (ms) | P95 (ms) | P99 (ms) |
|---------|-----------|----------|----------|
| h2m-parser (no Readability) | 0.014 | 0.018 | 0.018 |
| h2m-parser (with Readability) | 0.253 | 0.341 | 0.341 |
| Turndown | 0.033 | 0.047 | 0.047 |
| node-html-markdown | 0.013 | 0.018 | 0.018 |
| Mdream | 0.007 | 0.011 | 0.011 |

#### small (84 bytes)

| Library | Mean (ms) | P95 (ms) | P99 (ms) |
|---------|-----------|----------|----------|
| h2m-parser (no Readability) | 0.026 | 0.029 | 0.029 |
| h2m-parser (with Readability) | 0.225 | 0.261 | 0.261 |
| Turndown | 0.064 | 0.079 | 0.079 |
| node-html-markdown | 0.035 | 0.045 | 0.045 |
| Mdream | 0.017 | 0.020 | 0.020 |

#### medium (369 bytes)

| Library | Mean (ms) | P95 (ms) | P99 (ms) |
|---------|-----------|----------|----------|
| h2m-parser (no Readability) | 0.025 | 0.039 | 0.039 |
| h2m-parser (with Readability) | 0.371 | 0.474 | 0.474 |
| Turndown | 0.078 | 0.088 | 0.088 |
| node-html-markdown | 0.046 | 0.065 | 0.065 |
| Mdream | 0.048 | 0.056 | 0.056 |

#### file_42 (21KB)

| Library | Mean (ms) | P95 (ms) | P99 (ms) |
|---------|-----------|----------|----------|
| h2m-parser (no Readability) | 0.270 | 0.307 | 0.307 |
| h2m-parser (with Readability) | 1.930 | 2.146 | 2.146 |
| Turndown | 1.374 | 1.502 | 1.502 |
| node-html-markdown | 0.420 | 0.465 | 0.465 |
| Mdream | 0.352 | 0.405 | 0.405 |

#### file_33 (88KB)

| Library | Mean (ms) | P95 (ms) | P99 (ms) |
|---------|-----------|----------|----------|
| h2m-parser (no Readability) | 1.040 | 1.169 | 1.169 |
| h2m-parser (with Readability) | 5.909 | 6.208 | 6.208 |
| Turndown | 6.228 | 7.849 | 7.849 |
| node-html-markdown | 3.644 | 4.039 | 4.039 |
| Mdream | 2.001 | 2.194 | 2.194 |

#### file_88 (420KB)

| Library | Mean (ms) | P95 (ms) | P99 (ms) |
|---------|-----------|----------|----------|
| h2m-parser (no Readability) | 3.264 | 3.406 | 3.406 |
| h2m-parser (with Readability) | 28.608 | 32.022 | 32.022 |
| Turndown | 13.271 | 15.061 | 15.061 |
| node-html-markdown | 7.431 | 7.629 | 7.629 |
| Mdream | 9.212 | 9.926 | 9.926 |

*See [`bench/comparison-results.md`](bench/comparison-results.md) for complete results across all 94 files*

### Workflow Comparison (Await vs Stream)

| Mode | Iterations | Mean (ms) | p95 (ms) | Min (ms) | Max (ms) |
|------|------------|-----------|----------|----------|----------|
| h2m-parser (await) | 10 | 13.71 | 60.63 | 6.99 | 60.63 |
| mdream (await) | 10 | 3.38 | 15.12 | 1.59 | 15.12 |
| mdream (stream) | 10 | 13.63 | 105.06 | 2.00 | 105.06 |

### Token Savings

- Model: gpt-4o-mini
- HTML tokens: 25151
- Markdown tokens: 1100
- Savings: 24051 tokens (95.63%)
- Estimated cost delta per document: $0.003608
- Markdown length: 4869 characters

### Memory Snapshot

- Mode: h2m-reuse
- Iterations: 10
- RSS change: 47.72 MB

### Bundle Size Snapshot

Generated: 2025-09-28T17:49:58.314Z

| File | Size | Gzipped | Δ Size | Δ Gzipped |
|------|------|---------|--------|-----------|
| cli.cjs | 22KB | 8KB | +0 B (+0.00%) | +0 B (+0.00%) |
| cli.mjs | 22KB | 8KB | +0 B (+0.00%) | +0 B (+0.00%) |
| index.cjs | 19KB | 7KB | +0 B (+0.00%) | +0 B (+0.00%) |
| index.mjs | 19KB | 7KB | +0 B (+0.00%) | +0 B (+0.00%) |

### Live Fetch Results

Fetched: https://en.wikipedia.org/wiki/Markdown

| Tool | Mean | Min | Max |
|------|------|-----|-----|
| h2m-parser | 51.89ms | 44.27ms | 66.55ms |
| mdream (await) | 6.54ms | 3.98ms | 11.20ms |
| mdream (stream) | 12.89ms | 11.85ms | 14.91ms |

### Feature Comparison

| Feature | h2m-parser | Turndown | node-html-markdown | mdream |
|---------|------------|----------|--------------------|--------|
| **Performance** | ⚠️ +5% slower | ❌ +415% slower | ❌ +244% slower | ✅ Fastest |
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
