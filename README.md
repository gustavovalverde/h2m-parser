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
<!-- Last updated: 2025-09-28T15:53:58.306Z -->

## Performance

**Runtime ranking (lower is better):**
1. h2m-parser — 1.488ms
2. mdream — 1.519ms
3. Turndown — 7.527ms
4. node-html-markdown — 154.666ms

<details>
<summary>📊 Benchmark Results (click to expand)</summary>

### Benchmark Methodology

- **Dataset:** 93 files (4 synthetic + 89 real HTML documents)
- **Dataset path:** tests/fixtures
- **File sizes:** 21KB to 1771KB (mean: ~119KB)
- **Iterations:** 100 per file for statistical significance
- **Total runtime:** 737.2 seconds
- **Environment:** Node.js with standard V8 optimizations

### Average Processing Time

Tested across 93 files in tests/fixtures (up to 1771KB):

| Library | Without Readability | With Readability | Relative |
|---------|---------------------|------------------|----------|
| **h2m-parser** ✅ | **1.488ms** | 14.199ms | **Fastest** |
| mdream | 1.519ms | ❌ Not supported | 1.02x slower |
| Turndown | 7.527ms | ❌ Not supported | 5.06x slower |
| node-html-markdown | 154.666ms | ❌ Not supported | 103.94x slower |

**Readability overhead (h2m-parser):** +12.711ms (enables article extraction + content cleaning)

### Performance Analysis

- **Fastest baseline:** h2m-parser averages 1.488ms per document without Readability.
- **h2m-parser vs Turndown:** 5.06x faster (7.527ms → 1.488ms)
- **h2m-parser vs node-html-markdown:** 103.94x faster (154.666ms → 1.488ms)
- **h2m-parser vs mdream:** 1.02x faster (1.519ms → 1.488ms)
- **Readability impact:** 9.5x slower when enabled (1.488ms → 14.199ms)
- **Token savings vs raw HTML:** 24051 tokens saved (95.63%) on tests/fixtures/039c4b966d1f2a0c589ac0aad211fe65500ad1cb58c7f45b34251db7056803ec.html.
- **Algorithmic complexity:** O(n) linear scaling confirmed across file sizes

### Performance Projections

Estimated processing times for different file sizes (without Readability):

```
  100KB  1ms
  1MB    13ms
  10MB   128ms
  100MB  1.3s
```

*Based on linear scaling from 119KB average file size at 1.488ms*

### Detailed Results by File Size

#### tiny (18 bytes)

| Library | Mean (ms) | P95 (ms) | P99 (ms) |
|---------|-----------|----------|----------|
| h2m-parser (no Readability) | 0.021 | 0.032 | 0.034 |
| h2m-parser (with Readability) | 0.264 | 0.416 | 0.456 |
| Turndown | 0.023 | 0.043 | 0.049 |
| node-html-markdown | 0.011 | 0.017 | 0.020 |
| Mdream | 0.005 | 0.010 | 0.014 |

#### small (84 bytes)

| Library | Mean (ms) | P95 (ms) | P99 (ms) |
|---------|-----------|----------|----------|
| h2m-parser (no Readability) | 0.016 | 0.025 | 0.027 |
| h2m-parser (with Readability) | 0.195 | 0.279 | 0.295 |
| Turndown | 0.039 | 0.051 | 0.057 |
| node-html-markdown | 0.021 | 0.028 | 0.030 |
| Mdream | 0.013 | 0.016 | 0.017 |

#### medium (369 bytes)

| Library | Mean (ms) | P95 (ms) | P99 (ms) |
|---------|-----------|----------|----------|
| h2m-parser (no Readability) | 0.013 | 0.016 | 0.017 |
| h2m-parser (with Readability) | 0.233 | 0.266 | 0.274 |
| Turndown | 0.048 | 0.055 | 0.055 |
| node-html-markdown | 0.022 | 0.026 | 0.026 |
| Mdream | 0.022 | 0.041 | 0.041 |

#### file_42 (21KB)

| Library | Mean (ms) | P95 (ms) | P99 (ms) |
|---------|-----------|----------|----------|
| h2m-parser (no Readability) | 0.271 | 0.298 | 0.313 |
| h2m-parser (with Readability) | 1.802 | 1.928 | 1.972 |
| Turndown | 1.391 | 1.494 | 1.545 |
| node-html-markdown | 0.405 | 0.431 | 0.444 |
| Mdream | 0.350 | 0.411 | 0.413 |

#### file_33 (88KB)

| Library | Mean (ms) | P95 (ms) | P99 (ms) |
|---------|-----------|----------|----------|
| h2m-parser (no Readability) | 1.042 | 1.155 | 1.168 |
| h2m-parser (with Readability) | 5.941 | 6.381 | 8.880 |
| Turndown | 5.847 | 7.082 | 7.125 |
| node-html-markdown | 3.068 | 3.367 | 3.436 |
| Mdream | 1.904 | 1.973 | 2.011 |

#### file_89 (1771KB)

| Library | Mean (ms) | P95 (ms) | P99 (ms) |
|---------|-----------|----------|----------|
| h2m-parser (no Readability) | 33.908 | 37.195 | 38.000 |
| h2m-parser (with Readability) | 645.631 | 916.483 | 938.031 |
| Turndown | 192.002 | 198.932 | 199.174 |
| node-html-markdown | 14049.153 | 14410.806 | 14431.159 |
| Mdream | 49.764 | 50.351 | 50.357 |

*See [`bench/comparison-results.md`](bench/comparison-results.md) for complete results across all 93 files*

### Workflow Comparison (Await vs Stream)

| Mode | Iterations | Mean (ms) | p95 (ms) | Min (ms) | Max (ms) |
|------|------------|-----------|----------|----------|----------|
| h2m-parser (await) | 10 | 14.74 | 66.10 | 7.11 | 66.10 |
| mdream (await) | 10 | 4.20 | 13.95 | 1.87 | 13.95 |
| mdream (stream) | 10 | 14.89 | 118.69 | 2.15 | 118.69 |

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
- RSS change: 47.08 MB

### Bundle Size Snapshot

Generated: 2025-09-28T15:53:59.056Z

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
| h2m-parser | 51.74ms | 44.38ms | 65.76ms |
| mdream (await) | 6.48ms | 3.99ms | 10.85ms |
| mdream (stream) | 13.04ms | 11.51ms | 15.98ms |

### Feature Comparison

| Feature | h2m-parser | Turndown | node-html-markdown | mdream |
|---------|------------|----------|--------------------|--------|
| **Performance** | ✅ Fastest | ❌ +406% slower | ❌ +10294% slower | ⚠️ +2% slower |
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
