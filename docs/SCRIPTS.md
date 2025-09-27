# Script Reference

This document mirrors the scripts defined in `package.json` so newcomers can discover the supported workflows without guessing. All commands assume you run them from the repository root with pnpm installed (we standardise on pnpm 10.x).

## Build & Packaging

- `pnpm build` – Build the distributable bundles in `dist/` via tsup.
- `pnpm build:watch` – Rebuild bundles on file changes (handy while working on the CLI).
- `pnpm prepack` – Convenience alias used by npm when publishing; runs `pnpm build`.

## Quality Gates

- `pnpm lint` / `pnpm lint:fix` – Biome check (read-only / apply fixes).
- `pnpm format` / `pnpm format:fix` – Biome formatter (dry run / write).
- `pnpm typecheck` – Strict TypeScript pass using the root `tsconfig.json`.
- `pnpm test` / `pnpm test:watch` – Vitest suite (CI mode / watch mode).
- `pnpm verify` – Bundled pre-flight (lint → typecheck → test).

## Documentation

- `pnpm docs` – Generate API documentation with TypeDoc (HTML format in `docs/api/`).
- `pnpm docs:watch` – Generate docs in watch mode for development.
- `pnpm docs:markdown` – Generate markdown API docs (in `docs/api-markdown/`).

## Publishing

- `pnpm changeset` – Create or edit Changesets.
- `pnpm release` – Build and publish using Changesets automation (calls `pnpm build` internally).
- `pnpm prepare` – Husky hook installer (runs automatically after install).

## Benchmarking & Performance Tooling

The benchmarking utilities live under `bench/` and expect a fresh build (`pnpm build`) before running because they import from `dist/index.mjs`.

### Core runners

| Script | Description |
|--------|-------------|
| `pnpm bench` | High-throughput benchmark over `tests/fixtures` (see `bench/runner.js` for flags like `--dataset`, `--repeats`, `--concurrency`). |
| `pnpm bench:quick` | Shortcut for `bench/runner.js --quick` (caps at 25 files). |
| `pnpm bench:fresh` | Forces new `H2MParser` instances between documents (`--instance-mode fresh`). |

### Comparator & analysis helpers

| Script | Description |
|--------|-------------|
| `pnpm bench:compare` | Compare h2m-parser against competitor libraries with default iterations. |
| `pnpm bench:compare:quick` | Faster comparison run (10 iterations, 10 files). |
| `pnpm bench:compare:full` | Extensive comparison (1000 iterations, Markdown report). |
| `pnpm bench:compare:json` | Emit comparison results as JSON for tooling. |
| `pnpm bench:analyze` | Aggregate stats for the latest benchmark run. |
| `pnpm bench:analyze:full` | Deeper analysis with high iteration counts. |
| `pnpm bench:isolated` | Low-level benchmark harness for individual stages. |
| `pnpm bench:profile` | CPU profiling wrapper (ideal for flamegraphs). |
| `pnpm bench:profile:memory` | Memory profiling variant (requires `--expose-gc`). |
| `pnpm bench:readme` | Refresh README performance tables. |
| `pnpm bench:readme:fresh` | Same as above but forces a new benchmark run. |
| `pnpm bench:readme:cached` | Reuse the last JSON results to regenerate Markdown. |

### Export utilities

- `pnpm export:markdown` – Runs `bench/export-markdown.js` to dump Markdown outputs for h2m-parser and comparison libraries into `bench/output/`.

### CI helpers (invoked manually or from workflows)

- `node bench/capture-baseline.js` – Capture baseline metrics for regression tracking.
- `node bench/check-regression.js --exit-on-regression` – Fail if performance drifts beyond configured thresholds.
- `node bench/track-performance.js` – Append metrics to the historical log.

## Quick Reference

```bash
pnpm install        # bootstrap
pnpm verify         # lint + typecheck + tests
pnpm build          # produce dist/ bundles
pnpm bench          # run full benchmark harness
pnpm bench -- --dataset path/to/htmls --repeats 3 --concurrency 8
pnpm bench:compare  # compare h2m-parser vs. other converters
```

If you add a new script, update this document in the same pull request so our onboarding experience stays current.
