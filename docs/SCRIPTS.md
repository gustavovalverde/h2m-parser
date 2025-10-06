# Script Reference

This document mirrors the scripts defined in `package.json` so newcomers can discover the supported workflows without guessing. All commands assume you run them from the repository root with Bun installed (we use Bun 1.2+).

## Build & Packaging

- `bun run build` – Build the distributable bundles in `dist/`.
- `bun run build:watch` – Rebuild bundles on file changes (handy while working on the CLI).
- `bun build:binary` – Compile standalone executable for current platform.
- `bun build:binary:all` – Build binaries for all platforms (Linux, macOS, Windows)
- `bun prepack` – Convenience alias used by npm when publishing; runs `bun run build`.

## Quality Gates

- `bun lint` / `bun lint:fix` – Biome check (read-only / apply fixes).
- `bun format` / `bun format:fix` – Biome formatter (dry run / write).
- `bun typecheck` – Strict TypeScript pass using the root `tsconfig.json`.
- `bun test` / `bun test:watch` – Vitest suite (CI mode / watch mode).
- `bun verify` – Bundled pre-flight (lint → typecheck → test).

## Documentation

- `bun docs` – Generate API documentation with TypeDoc (HTML format in `docs/api/`).
- `bun docs:watch` – Generate docs in watch mode for development.
- `bun docs:markdown` – Generate markdown API docs (in `docs/api-markdown/`).

## Publishing

- `bun changeset` – Create or edit Changesets.
- `bun release` – Build and publish using Changesets automation (calls `bun run build` internally).
- `bun prepare` – Husky hook installer (runs automatically after install).

## Benchmarking & Performance Tooling

The benchmarking utilities live under `bench/` and expect a fresh build (`bun run build`) before running because they import from the compiled bundles. The `bun bench` command opens an interactive menu that wraps the most common flows; every entry has a matching script for CI usage.

### Everyday commands

| Script | Description |
|--------|-------------|
| `bun bench` | Interactive menu for quick benchmarks, README refresh, and regression checks. |
| `bun bench:quick` | Non-interactive quick suite (~1 minute) using a trimmed dataset. |
| `bun bench:quick:full` | Headless quick suite runner (used in CI smoke checks). |

### Comparator & suite helpers

| Script | Description |
|--------|-------------|
| `bun bench:compare:quick` | 10 iterations across 10 files; prints a console summary. |
| `bun bench:compare` | 100 iterations across the full dataset; emits Markdown. |
| `bun bench:compare:full` | Release-grade run (1000 iterations, Markdown output). |
| `bun bench:compare:json` | Emit comparison results as JSON for downstream tooling. |
| `bun bench:refresh:all` | Full suite pipeline (comparison, microbenches, exports, README update). |
| `bun bench:readme` | Update `README.md`; pass `--fresh` for a 100-iteration run (5MB file cap). |
| `bun bench:readme:fresh` | Force a fresh benchmark run before updating the README. |
| `bun bench:readme:cached` | Re-render README content using existing JSON output. |
| `bun bench:readme:generate` | Build and run the full suite, then refresh the README. |

### Telemetry & regression tooling

| Script | Description |
|--------|-------------|
| `bun bench:baseline` | Capture a new baseline in `bench/.baseline/performance-baseline.json` (100 iterations, 5MB cap, full fixtures). |
| `bun bench:regression` | Compare current metrics to the stored baseline using the same configuration (fails on regression). |
| `bun bench:track` | Append metrics to the historical log for trend analysis. |
| `bun bench:profile` | Component-level CPU profiling across the benchmark dataset. |
| `bun bench:profile:memory` | Memory profiling variant (runs with `--expose-gc`). |
| `bun bench:analyze` | Comprehensive profile summary integrating telemetry sub-stages. |

### Export utilities

- `bun bench:export` – Dump Markdown outputs for each converter into `bench/output/`.
- `bun bench:export:validate` – Export Markdown and run `markdownlint` for quick validation.

## Quick Reference

```bash
bun install        # bootstrap
bun verify         # lint + typecheck + tests
bun run build      # produce dist/ bundles
bun bench          # open interactive benchmark menu
bun bench quick    # run quick benchmark via CLI shortcut
bun bench:compare  # compare h2m-parser vs. other converters (Markdown output)
```

If you add a new script, update this document in the same pull request so our onboarding experience stays current.
