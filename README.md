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
<!-- Last updated: 2025-09-28T17:49:57.461Z -->

## Performance

**Runtime ranking (lower is better):**
1. h2m-parser — 1.429ms
2. mdream — 1.535ms
3. Turndown — 7.618ms
4. node-html-markdown — 146.396ms

<details>
<summary>📊 Benchmark Results (click to expand)</summary>

### Benchmark Methodology

- **Dataset:** 93 files (4 synthetic + 89 real HTML documents)
- **Dataset path:** tests/fixtures
- **File sizes:** 21KB to 1771KB (mean: ~119KB)
- **Iterations:** 100 per file for statistical significance
- **Total runtime:** 710.6 seconds
- **Environment:** Node.js with standard V8 optimizations

### Average Processing Time

Tested across 93 files in tests/fixtures (up to 1771KB):

| Library | Without Readability | With Readability | Relative |
|---------|---------------------|------------------|----------|
| **h2m-parser** ✅ | **1.429ms** | 15.656ms | **Fastest** |
| mdream | 1.535ms | ❌ Not supported | 1.07x slower |
| Turndown | 7.618ms | ❌ Not supported | 5.33x slower |
| node-html-markdown | 146.396ms | ❌ Not supported | 102.48x slower |

**Readability overhead (h2m-parser):** +14.228ms (enables article extraction + content cleaning)

### Performance Analysis

- **Fastest baseline:** h2m-parser averages 1.429ms per document without Readability.
- **h2m-parser vs Turndown:** 5.33x faster (7.618ms → 1.429ms)
- **h2m-parser vs node-html-markdown:** 102.48x faster (146.396ms → 1.429ms)
- **h2m-parser vs mdream:** 1.07x faster (1.535ms → 1.429ms)
- **Readability impact:** 11.0x slower when enabled (1.429ms → 15.656ms)
- **Token savings vs raw HTML:** 24051 tokens saved (95.63%) on tests/fixtures/039c4b966d1f2a0c589ac0aad211fe65500ad1cb58c7f45b34251db7056803ec.html.
- **Algorithmic complexity:** O(n) linear scaling confirmed across file sizes

### Performance Projections

Estimated processing times for different file sizes (without Readability):

```
  100KB  1ms
  1MB    12ms
  10MB   123ms
  100MB  1.2s
```

*Based on linear scaling from 119KB average file size at 1.429ms*

### Detailed Results by File Size

#### tiny (18 bytes)

| Library | Mean (ms) | P95 (ms) | P99 (ms) |
|---------|-----------|----------|----------|
| h2m-parser (no Readability) | 0.013 | 0.026 | 0.029 |
| h2m-parser (with Readability) | 0.211 | 0.323 | 0.346 |
| Turndown | 0.024 | 0.045 | 0.054 |
| node-html-markdown | 0.012 | 0.018 | 0.022 |
| Mdream | 0.005 | 0.008 | 0.011 |

#### small (84 bytes)

| Library | Mean (ms) | P95 (ms) | P99 (ms) |
|---------|-----------|----------|----------|
| h2m-parser (no Readability) | 0.016 | 0.023 | 0.024 |
| h2m-parser (with Readability) | 0.174 | 0.209 | 0.211 |
| Turndown | 0.041 | 0.051 | 0.058 |
| node-html-markdown | 0.021 | 0.028 | 0.028 |
| Mdream | 0.014 | 0.020 | 0.021 |

#### medium (369 bytes)

| Library | Mean (ms) | P95 (ms) | P99 (ms) |
|---------|-----------|----------|----------|
| h2m-parser (no Readability) | 0.013 | 0.015 | 0.016 |
| h2m-parser (with Readability) | 0.220 | 0.249 | 0.276 |
| Turndown | 0.046 | 0.053 | 0.054 |
| node-html-markdown | 0.018 | 0.019 | 0.020 |
| Mdream | 0.020 | 0.038 | 0.038 |

#### file_42 (21KB)

| Library | Mean (ms) | P95 (ms) | P99 (ms) |
|---------|-----------|----------|----------|
| h2m-parser (no Readability) | 0.255 | 0.288 | 0.300 |
| h2m-parser (with Readability) | 1.848 | 2.020 | 2.041 |
| Turndown | 1.404 | 1.574 | 1.587 |
| node-html-markdown | 0.416 | 0.474 | 0.486 |
| Mdream | 0.359 | 0.419 | 0.422 |

#### file_33 (88KB)

| Library | Mean (ms) | P95 (ms) | P99 (ms) |
|---------|-----------|----------|----------|
| h2m-parser (no Readability) | 1.012 | 1.118 | 1.142 |
| h2m-parser (with Readability) | 6.122 | 6.449 | 9.356 |
| Turndown | 5.964 | 7.175 | 7.260 |
| node-html-markdown | 3.161 | 3.507 | 3.677 |
| Mdream | 1.946 | 2.035 | 2.090 |

#### file_89 (1771KB)

| Library | Mean (ms) | P95 (ms) | P99 (ms) |
|---------|-----------|----------|----------|
| h2m-parser (no Readability) | 31.259 | 32.395 | 32.627 |
| h2m-parser (with Readability) | 773.690 | 1022.269 | 1025.088 |
| Turndown | 194.083 | 200.565 | 201.472 |
| node-html-markdown | 13272.156 | 13570.330 | 13586.638 |
| Mdream | 49.983 | 50.678 | 50.773 |

*See [`bench/comparison-results.md`](bench/comparison-results.md) for complete results across all 93 files*

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
| **Performance** | ✅ Fastest | ❌ +433% slower | ❌ +10148% slower | ⚠️ +7% slower |
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
# Interactive menu with the common tasks
pnpm bench

# Quick comparison (10 iterations, 10 files)
pnpm bench:compare:quick

# Full comparison (1000 iterations)
pnpm bench:compare:full

# Refresh README from cached results (use --fresh for a 100-iteration rebuild)
pnpm bench:readme --cached
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
