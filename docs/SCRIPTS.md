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

The benchmarking utilities live under `bench/` and expect a fresh build (`pnpm build`) before running because they import from the compiled bundles. The `pnpm bench` command opens an interactive menu that wraps the most common flows; every entry has a matching script for CI usage.

### Everyday commands

| Script | Description |
|--------|-------------|
| `pnpm bench` | Interactive menu for quick benchmarks, README refresh, and regression checks. |
| `pnpm bench:quick` | Non-interactive quick suite (~1 minute) using a trimmed dataset. |
| `pnpm bench:quick:full` | Headless quick suite runner (used in CI smoke checks). |

### Comparator & suite helpers

| Script | Description |
|--------|-------------|
| `pnpm bench:compare:quick` | 10 iterations across 10 files; prints a console summary. |
| `pnpm bench:compare` | 100 iterations across the full dataset; emits Markdown. |
| `pnpm bench:compare:full` | Release-grade run (1000 iterations, Markdown output). |
| `pnpm bench:compare:json` | Emit comparison results as JSON for downstream tooling. |
| `pnpm bench:refresh:all` | Full suite pipeline (comparison, microbenches, exports, README update). |
| `pnpm bench:readme` | Update `README.md`; pass `--fresh` for a 100-iteration run (5MB file cap). |
| `pnpm bench:readme:fresh` | Force a fresh benchmark run before updating the README. |
| `pnpm bench:readme:cached` | Re-render README content using existing JSON output. |
| `pnpm bench:readme:generate` | Build and run the full suite, then refresh the README. |

### Telemetry & regression tooling

| Script | Description |
|--------|-------------|
| `pnpm bench:baseline` | Capture a new baseline in `bench/.baseline/performance-baseline.json` (100 iterations, 5MB cap, full fixtures). |
| `pnpm bench:regression` | Compare current metrics to the stored baseline using the same configuration (fails on regression). |
| `pnpm bench:track` | Append metrics to the historical log for trend analysis. |
| `pnpm bench:profile` | Component-level CPU profiling across the benchmark dataset. |
| `pnpm bench:profile:memory` | Memory profiling variant (runs with `--expose-gc`). |
| `pnpm bench:analyze` | Comprehensive profile summary integrating telemetry sub-stages. |

### Export utilities

- `pnpm bench:export` – Dump Markdown outputs for each converter into `bench/output/`.
- `pnpm bench:export:validate` – Export Markdown and run `markdownlint` for quick validation.

## Quick Reference

```bash
pnpm install        # bootstrap
pnpm verify         # lint + typecheck + tests
pnpm build          # produce dist/ bundles
pnpm bench          # open interactive benchmark menu
pnpm bench quick    # run quick benchmark via CLI shortcut
pnpm bench:compare  # compare h2m-parser vs. other converters (Markdown output)
```

If you add a new script, update this document in the same pull request so our onboarding experience stays current.
