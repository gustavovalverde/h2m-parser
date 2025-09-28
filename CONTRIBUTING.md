# Contributing

Thanks for your interest in improving h2m-parser! Keeping cognitive load low is the primary goal—prefer straightforward solutions and resist clever abstractions unless they demonstrably reduce maintenance overhead.

## Development setup

1. Ensure Node.js 20.11+ and pnpm 10+ are installed.
2. Install dependencies: `pnpm install`.
3. Build and verify: `pnpm verify` or run scripts individually (`pnpm lint`, `pnpm typecheck`, `pnpm test`).

## Coding standards

- Write TypeScript in `src/` and keep exports explicit in `src/index.ts`.
- Favor early returns and descriptive helper functions to keep cognitive load low—see [`cognitive-load.md`](cognitive-load.md) for the philosophy behind our style.
- Prefer pure functions; when mutating shared state, encapsulate the mutation and document it.
- Keep custom translators compact—wrap individual tags with clear helpers instead of adding deep inheritance or cross-cutting state.
- Use Biome for formatting and linting (`pnpm lint:fix`, `pnpm format:fix`).
- Maintain exhaustive unit tests alongside new functionality (`tests/`). When adding HTML fixtures, store inputs under `tests/fixtures/` with matching Markdown expectations.

## Commit & release workflow

- Husky runs `lint-staged` to format/lint staged files. Make sure your commits are clean.
- Use [Changesets](https://github.com/changesets/changesets) for release notes. After feature work, run `pnpm changeset` to document changes and version bumps.
- When the release PR opens, review the changelog and, after merging, approve the pending run in the `release` environment to publish.
- CI runs `pnpm lint`, `pnpm typecheck`, `pnpm test`, and `pnpm build`. Keep the `verify` script green locally before pushing.

## Reporting issues

Open GitHub issues with:
- A minimal reproduction (HTML snippet, options used).
- Expected Markdown output and actual output.
- Environment details (Node.js version, operating system).

## Code review checklist

- Is the implementation linear and searchable without jumping across many files?
- Are edge cases covered by unit tests or documented assumptions?
- Does new configuration default to sensible values to minimize user surprise?

Thanks for helping keep h2m-parser simple and reliable!

## Maintainer Scripts

### High-Frequency Commands

```bash
# Quick quality checks (10 seconds)
pnpm qa:quick

# Full regression test (30 seconds)
pnpm regression

# Complete QA with validation (2-3 minutes)
pnpm qa

# Development watch mode
pnpm build:watch    # Terminal 1
pnpm test:watch     # Terminal 2
```

### Script Reference

#### Quality Assurance

| Script | Purpose | Duration | When to Use |
|--------|---------|----------|-------------|
| `pnpm qa:quick` | Quick validation: lint, types, tests, export | ~10s | Before commits |
| `pnpm qa` | Full QA with markdown validation | ~2-3min | Before PRs |
| `pnpm regression` | Basic regression test | ~30s | After changes |
| `pnpm regression:full` | Complete regression suite | ~1-2min | Before releases |

#### Benchmarking

| Script | Purpose | Duration | When to Use |
|--------|---------|----------|-------------|
| `pnpm bench:quick` | Quick performance check | ~5s | During development |
| `pnpm bench:compare:quick` | Fast comparison with competitors | ~10s | After optimizations |
| `pnpm bench:compare` | Full comparison benchmark | ~2min | Before releases |
| `pnpm bench:profile` | Detailed performance profiling | ~30s | Performance debugging |
| `pnpm bench:analyze` | Pipeline analysis | ~30s | Optimization work |

#### Output Generation

| Script | Purpose | Duration | When to Use |
|--------|---------|----------|-------------|
| `pnpm bench:export` | Generate markdown outputs | ~5s | Testing conversions |
| `pnpm bench:export:validate` | Export + validate with markdownlint | ~10s | Quality checks |
| `pnpm bench:readme:generate` | Generate all benchmark reports | ~3min | Before releases |

### Typical Workflows

#### Making Changes

```bash
# Start development
pnpm build:watch     # In terminal 1
pnpm test:watch     # In terminal 2

# After making changes
pnpm qa:quick       # Quick validation
pnpm bench:export   # Check output quality
```

#### Before Committing

```bash
# Standard pre-commit check
pnpm regression

# Or if you want to be thorough
pnpm qa
```

#### Performance Work

```bash
# Before optimization
pnpm bench:compare:quick > before.txt

# After optimization
pnpm bench:compare:quick > after.txt

# Detailed analysis
pnpm bench:profile
pnpm bench:analyze
```

#### Release Preparation

```bash
# Full validation
pnpm regression:full

# Generate all reports
pnpm bench:readme:generate

# Update changelog
pnpm changeset

# Release
pnpm release
```

## Output Validation

The `bench/output/` directory contains markdown outputs from different converters:

- `bench/output/h2m-parser/` - Our outputs
- `bench/output/turndown/` - Turndown outputs
- `bench/output/node-html-markdown/` - node-html-markdown outputs

To validate output quality:

```bash
# Generate fresh outputs and validate
pnpm bench:export:validate

# Check specific issues
npx markdownlint bench/output/h2m-parser/*.md

# Compare with competitors
npx markdownlint bench/output/*/*.md 2>&1 | grep -c "^bench"
```

## Performance Baselines

Current performance targets (from benchmarks):

- **Without Readability**: ~1-3ms for typical web pages
- **With Readability**: ~5-10ms for typical web pages
- **vs Turndown**: Should be within 1-2x
- **vs node-html-markdown**: Should be competitive or faster

## Troubleshooting

### Tests Failing

```bash
# Run specific test
pnpm test -- htmlparser2-default-tags.test.ts

# Update snapshots if needed
pnpm test -- -u
```

### Performance Regression

```bash
# Quick comparison
pnpm bench:compare:quick

# Detailed profiling
node --expose-gc bench/profile.js --memory
```

### Markdown Quality Issues

```bash
# Check specific file
npx markdownlint bench/output/h2m-parser/[filename].md

# See all issues
pnpm bench:export:validate
```
