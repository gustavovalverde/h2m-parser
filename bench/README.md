# h2m-parser Benchmarks

This folder contains the benchmarking harness described in `performance-implementation.md`. Run it after building the library to capture throughput, latency, and memory metrics across a set of HTML fixtures.

## Quick start

```bash
bun run build
bun bench quick
```

`bun bench` launches an interactive menu that wraps the common benchmark flows (quick suite, README refresh, regression checks, etc.). Every entry prints the underlying command so you can copy/paste it for automation.

For ad-hoc runs against a custom dataset you can still drop down to the raw runner:

```bash
node bench/runner.js --dataset tests/fixtures --repeats 2 --concurrency 4
```

Key flags accepted by `bench/runner.js`:

- `--dataset <path>` — directory of `*.html` files or a manifest file (one path per line). Defaults to `tests/fixtures`.
- `--repeats <n>` — number of passes over the dataset (use ≥2 to smooth out warm-up noise). Defaults to `1`.
- `--concurrency <n>` — worker thread count. Defaults to the number of logical CPUs.
- `--chunk` — enable chunking telemetry (uses default target/overlap values).
- `--chunk-size <tokens>` / `--chunk-overlap <tokens>` — tweak chunking targets.
- `--no-shuffle` — process files in a stable order instead of shuffling each repeat.

Results are written to `bench/.results/latest.json` and summarised on stdout. The JSON contains throughput, latency quantiles, peak RSS, event loop lag and per-stage averages (extract/convert/post/chunk).

## Dataset notes

- Keep larger corpora (e.g. crawled datasets or generated stress fixtures) outside the repo and point the harness at them via `--dataset`.
- For quick smoke tests, the default `tests/fixtures` directory is adequate but small.
- Baselines can be committed under `bench/baselines/` once the harness stabilises.
- Fixtures in `tests/fixtures/` are tracked with Git LFS. After cloning, run `git lfs install` once and `git lfs pull tests/fixtures` only when you actually need to process the shared dataset. For bespoke corpora, prefer packaging them via `bench/scripts/pack-fixtures.js` or hosting them externally instead of committing raw HTML blobs.

## Specialized Analysis Tools

### compare.js - Library Comparison

Comprehensive comparison against competing libraries (Turndown, node-html-markdown, mdream):

```bash
node bench/compare.js --iterations 100 --output markdown
```

Options:

- `--dataset <path>` - Test file directory (default: tests/fixtures)
- `--iterations <n>` - Iterations per test (default: 100)
- `--output <format>` - Output format: console or markdown
- `--no-readability` - Skip Readability tests
- `--max-file-size <size>` - Raise the default 512KB per-file limit (use e.g. `2MB` to include large Wikipedia fixtures)

### profile.js - Performance Profiling

Deep performance analysis with component breakdown:

```bash
node bench/profile.js --iterations 100
```

Options:

- `--iterations <n>` - Iterations per test (default: 100)
- `--output <format>` - Output format: console or json
- `--memory` - Include memory analysis (requires --expose-gc)

With garbage collection exposed you can collect heap snapshots:

```bash
node --expose-gc bench/profile.js --memory
```

### Microbenchmarks & Workflow Tools

- `node bench/microbench/memory.js` – Inspect memory usage for individual conversions across modes (`--mode h2m-reuse|h2m-fresh|mdream-await|mdream-stream`).
- `node bench/workflows.js` – Compare awaited vs streaming pipelines; override `WORKFLOW_ITERATIONS` or `WORKFLOW_FIXTURE` to tweak runs.
- `node bench/token-usage.js` – Estimate token savings between raw HTML and generated Markdown (`TOKEN_MODEL` env var supported).
- `node bench/fetch-e2e.js` – Fetch a live document and exercise end-to-end conversion (`FETCH_URL`, `FETCH_ITERATIONS`).

### Automation Helpers

- `bun bench:quick:full` – Run a fast smoke suite (small iteration counts) and aggregate the results into `bench/.results/summary-latest.json`.
- `bun bench:baseline` / `bun bench:regression` – 100-iteration comparison over `tests/fixtures` (5MB per-file cap) for baseline capture and regression checks.
- `bun bench:readme --fresh` – Regenerate README metrics with 100 iterations and a 5MB file cap.
- `bun bench:refresh:all` – Regenerate the full comparison assets (JSON + Markdown), export Markdown for every fixture, refresh the aggregated summary, and update the README in one go.
- `bun bench:readme:generate` – Alias for building the library and running `bench:refresh:all`.

## Profiling helpers

Combine the harness with tools like `0x` or `clinic flame` when deeper analysis is required:

```bash
npx 0x -- node bench/runner.js --dataset datasets/news --repeats 1
```

Refer back to `performance-analysis.md` for advanced scenarios and profiling tips.
