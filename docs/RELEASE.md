# Release Process

This guide explains how we publish `@lgtm/htmltomd` with Changesets, GitHub Actions, and npm trusted publishing.

## What we use

- **Changesets** to stage version bumps and changelog entries.
- A single workflow, `.github/workflows/release.yml`, that both opens the release PR and publishes packages.
- An npm trusted publisher binding that issues ephemeral credentials through GitHub's OIDC provider.
- A GitHub environment named `release` that gates real publishes (require your approval before jobs run).

## One-time setup (already completed)

1. **Seed npm** – publish the very first version manually (`npm publish --tag alpha --access public`) so the package name exists.
2. **Configure trusted publishing** – on npm go to *Access → Add trusted publisher* and point it at `gustavovalverde/htmltomd`, workflow `.github/workflows/release.yml`, environment `release`.
3. **Create the GitHub environment** – in the repo settings add an environment called `release`, add yourself as a required reviewer, and optionally set the URL to `https://www.npmjs.com/package/@lgtm/htmltomd`.

With that in place the workflow no longer needs an `NPM_TOKEN`; it exchanges an id-token for publish credentials automatically.

## Normal release flow

1. **Author changesets** – whenever a PR needs a release entry run `pnpm changeset` and commit the generated file under `.changeset/`.
2. **Merge feature PRs** – once on `main`, the release workflow opens/updates a `chore(release): version packages` PR with the aggregated changelog.
3. **Review the release PR** – check the generated CHANGELOG and version bumps. When happy, merge it.
4. **Approve the publish run** – the merge triggers the `release` job; approve the pending run in the *Actions* tab (required reviewer on the `release` environment). The job builds, tests, publishes via Changesets, and creates the GitHub release notes.
5. **Verify** – confirm the new version on npm (`npm view @lgtm/htmltomd version`) and skim the release notes.

## Manual triggers

Need to kick a release outside of an automatic merge? Use **Actions → Release → Run workflow**, choose the branch, and approve the run when prompted. The workflow handles the rest.

## Troubleshooting

- *Publish fails with auth errors*: confirm the npm trusted publisher entry still points at `.github/workflows/release.yml` and the `release` environment exists. Re-run the job after fixing.
- *No release PR appears*: make sure there is at least one unpublished changeset file on `main`; otherwise the workflow exits early. You can run it manually via `workflow_dispatch`.
- *Need to bypass automation*: as a last resort you can run `pnpm verify && pnpm build && npm publish --access public`, but follow up by re-running `pnpm changeset version` so history stays in sync.

## Retired workflows

We removed `.github/workflows/publish-tag.yml`; tag pushes no longer publish separately. Keep releases flowing through the single Changesets-driven workflow to avoid duplicate logic.
