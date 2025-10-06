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
bun add h2m-parser
# or
pnpm add h2m-parser
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
<!-- Last updated: 2025-10-06T08:36:12.395Z -->

## Performance

**Runtime ranking (lower is better):**
1. mdream — 1.571ms
2. h2m-parser — 1.793ms
3. Turndown — 7.181ms
4. node-html-markdown — 132.565ms

<details>
<summary>📊 Benchmark Results (click to expand)</summary>

### Benchmark Methodology

- **Dataset:** 95 files (5 synthetic + 90 real HTML documents)
- **Dataset path:** tests/fixtures
- **File sizes:** 21KB to 1771KB (mean: ~123KB)
- **Iterations:** 100 per file for statistical significance
- **Total runtime:** 675.0 seconds
- **Environment:** Node.js with standard V8 optimizations

### Average Processing Time

Tested across 95 files in tests/fixtures (up to 1771KB):

| Library | Without Readability | With Readability | Relative |
|---------|---------------------|------------------|----------|
| mdream | 1.571ms | ❌ Not supported | Fastest |
| **h2m-parser** ✅ | **1.793ms** | 13.927ms | **1.14x slower** |
| Turndown | 7.181ms | ❌ Not supported | 4.57x slower |
| node-html-markdown | 132.565ms | ❌ Not supported | 84.37x slower |

**Readability overhead (h2m-parser):** +12.134ms (enables article extraction + content cleaning)

### Performance Analysis

- **Fastest baseline:** mdream averages 1.571ms per document without Readability.
- **h2m-parser gap to mdream:** 1.14× slower ( mdream: 1.571ms → h2m-parser: 1.793ms ).
- **h2m-parser vs Turndown:** 4.00x faster (7.181ms → 1.793ms)
- **h2m-parser vs node-html-markdown:** 73.94x faster (132.565ms → 1.793ms)
- **h2m-parser vs mdream:** 0.88x slower (1.571ms → 1.793ms)
- **Readability impact:** 7.8x slower when enabled (1.793ms → 13.927ms)
- **Token savings vs raw HTML:** 24051 tokens saved (95.63%) on tests/fixtures/039c4b966d1f2a0c589ac0aad211fe65500ad1cb58c7f45b34251db7056803ec.html.
- **Algorithmic complexity:** O(n) linear scaling confirmed across file sizes

### Performance Projections

Estimated processing times for different file sizes (without Readability):

```
  100KB  1ms
  1MB    15ms
  10MB   150ms
  100MB  1.5s
```

*Based on linear scaling from 123KB average file size at 1.793ms*

### Detailed Results by File Size

#### tiny (18 bytes)

| Library | Mean (ms) | P95 (ms) | P99 (ms) |
|---------|-----------|----------|----------|
| h2m-parser (no Readability) | 0.022 | 0.033 | 0.035 |
| h2m-parser (with Readability) | 0.257 | 0.376 | 0.399 |
| Turndown | 0.021 | 0.037 | 0.041 |
| node-html-markdown | 0.011 | 0.017 | 0.018 |
| Mdream | 0.005 | 0.007 | 0.010 |

#### small (84 bytes)

| Library | Mean (ms) | P95 (ms) | P99 (ms) |
|---------|-----------|----------|----------|
| h2m-parser (no Readability) | 0.015 | 0.022 | 0.023 |
| h2m-parser (with Readability) | 0.180 | 0.262 | 0.280 |
| Turndown | 0.038 | 0.047 | 0.048 |
| node-html-markdown | 0.022 | 0.030 | 0.031 |
| Mdream | 0.013 | 0.018 | 0.018 |

#### medium (369 bytes)

| Library | Mean (ms) | P95 (ms) | P99 (ms) |
|---------|-----------|----------|----------|
| h2m-parser (no Readability) | 0.016 | 0.020 | 0.021 |
| h2m-parser (with Readability) | 0.216 | 0.255 | 0.284 |
| Turndown | 0.046 | 0.054 | 0.056 |
| node-html-markdown | 0.019 | 0.022 | 0.025 |
| Mdream | 0.022 | 0.040 | 0.040 |

#### file_42 (21KB)

| Library | Mean (ms) | P95 (ms) | P99 (ms) |
|---------|-----------|----------|----------|
| h2m-parser (no Readability) | 0.375 | 0.511 | 0.588 |
| h2m-parser (with Readability) | 2.208 | 3.243 | 4.079 |
| Turndown | 1.401 | 1.678 | 1.766 |
| node-html-markdown | 0.392 | 0.414 | 0.428 |
| Mdream | 0.328 | 0.337 | 0.341 |

#### file_57 (88KB)

| Library | Mean (ms) | P95 (ms) | P99 (ms) |
|---------|-----------|----------|----------|
| h2m-parser (no Readability) | 1.116 | 1.244 | 1.270 |
| h2m-parser (with Readability) | 6.270 | 6.814 | 7.168 |
| Turndown | 4.254 | 5.300 | 5.489 |
| node-html-markdown | 2.097 | 2.328 | 2.375 |
| Mdream | 1.110 | 1.200 | 1.245 |

#### file_91 (1771KB)

| Library | Mean (ms) | P95 (ms) | P99 (ms) |
|---------|-----------|----------|----------|
| h2m-parser (no Readability) | 40.421 | 43.418 | 43.590 |
| h2m-parser (with Readability) | 622.410 | 865.618 | 877.353 |
| Turndown | 184.309 | 189.178 | 192.011 |
| node-html-markdown | 12274.670 | 13276.637 | 13418.863 |
| Mdream | 50.946 | 51.870 | 51.987 |

*See [`bench/comparison-results.md`](bench/comparison-results.md) for complete results across all 95 files*

### Workflow Comparison (Await vs Stream)

| Mode | Iterations | Mean (ms) | p95 (ms) | Min (ms) | Max (ms) |
|------|------------|-----------|----------|----------|----------|
| h2m-parser (await) | 10 | 12.34 | 41.79 | 7.56 | 41.79 |
| mdream (await) | 10 | 11.57 | 97.94 | 1.65 | 97.94 |
| mdream (stream) | 10 | 14.06 | 110.91 | 1.94 | 110.91 |

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
- RSS change: 41.80 MB

### Bundle Size Snapshot

Generated: 2025-10-06T08:36:12.983Z

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
| h2m-parser | 51.53ms | 43.44ms | 65.47ms |
| mdream (await) | 6.70ms | 3.97ms | 11.96ms |
| mdream (stream) | 13.63ms | 11.98ms | 16.39ms |

### Feature Comparison

| Feature | h2m-parser | Turndown | node-html-markdown | mdream |
|---------|------------|----------|--------------------|--------|
| **Performance** | ⚠️ +14% slower | ❌ +357% slower | ❌ +8337% slower | ✅ Fastest |
| **Readability** | ✅ | ❌ | ❌ | ⚠️ |
| **Link cleanup** | ✅ | ❌ | ❌ | ⚠️ |
| **Front matter** | ✅ | ❌ | ❌ | ✅ |
| **Chunking** | ✅ | ❌ | ❌ | ⚠️ |
| **TypeScript** | ✅ | ❌ | ✅ | ✅ |
| **Streaming** | ✅ | ❌ | ❌ | ✅ |

### Benchmark Transparency

- **Raw results:** [`bench/.results/comparison-latest.json`](bench/.results/comparison-latest.json)
- **Benchmark runner:** [`bench/compare.js`](bench/compare.js)
- **Test dataset:** [`tests/fixtures/`](tests/fixtures/) (90 real HTML files)
- **Statistical data:** Includes mean, median, P95, P99, min/max for each test
- **Reproducible:** Run `bun bench:compare:full` to verify results

</details>

Run benchmarks yourself:

```bash
# Quick comparison (10 iterations)
bun bench:compare:quick

# Full comparison (1000 iterations)
bun bench:compare:full

# Update README with fresh results
bun bench:readme
```

<!-- BENCHMARK:END -->

## Development

```bash
bun install
bun verify
```

## Contributing

We welcome improvements! See [CONTRIBUTING.md](CONTRIBUTING.md) for:

- Development setup and coding standards
- Commit conventions and release workflow
- Maintainer scripts and workflows
- Performance baselines and troubleshooting

## License

MIT © 2025 h2m-parser maintainers.
