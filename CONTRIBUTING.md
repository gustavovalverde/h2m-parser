# Contributing

Thanks for your interest in improving h2m-parser! Keeping cognitive load low is the primary goal—prefer straightforward solutions and resist clever abstractions unless they demonstrably reduce maintenance overhead.

## Development setup

1. Ensure Node.js 20.11+ and pnpm 10+ are installed.
2. Install dependencies: `pnpm install`.
3. Build and verify: `pnpm verify` or run scripts individually (`pnpm lint`, `pnpm typecheck`, `pnpm test`).

## Coding standards

- Write TypeScript in `src/` and keep exports explicit in `src/index.ts`.
- Favor early returns and descriptive helper functions to keep cognitive load low—see `/Users/gustavovalverde/dev/personal/micro-play/cognitive-load.md` for the philosophy behind our style.
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
