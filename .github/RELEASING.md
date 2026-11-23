# CI and releases

English | [简体中文](RELEASING.zh.md) | [Pipeline map](PIPELINES.md)

## Contribution and validation

Push feature branches to a fork and open PRs against `IDuxFE/idux-charts:main`. Main pushes run full CI through Release. Forks do not perform release writes.

For published-package behavior changes, run `pnpm changelog`, select affected packages and version impact, and commit a concise English changeset. Documentation, tests and tooling alone normally need none. Changesets manages versions, changelogs and internal dependencies; do not edit them manually. The three public packages (`@idux/charts-core`, `@idux/charts-plots`, `@idux/charts`) use one fixed version group; the highest requested bump applies to all three. Add new public library packages to this group.

| Validation      | Scope                                                                                                                  |
| --------------- | ---------------------------------------------------------------------------------------------------------------------- |
| `pnpm check:ci` | Lint, format, types, unit coverage and coverage-merge tests                                                            |
| Browser CI      | Shared site / fixture build; random disjoint thirds on WebKit, Firefox, Chromium; Intel macOS 15                       |
| Playgrounds     | Vue 2.6 / Vue 3 packed consumers on macOS Chromium                                                                     |
| Compatibility   | Vue 2.7.16 / 3.5.44 × ECharts 5.4.3 / 6.1.0, plus Vue 2.6.14 + ECharts 6.1.0; packed declarations and Chromium runtime |
| Documentation   | Domain `/` and project subpath `/idux-charts/` production-site smoke tests                                             |

`pnpm test:declarations --runtime` runs the compatibility checks after `pnpm build:lib`; `IDUX_DECLARATION_TARGET=2.7.16/5.4.3` selects one pair. Vue 2.7 / 3 use `skipLibCheck: false`; Vue 2.6 retains the adapter's `skipLibCheck: true` boundary.

Keep Playwright pinned to the same exact version in the root and both Playgrounds. For shared site-style changes, run `pnpm exec playwright test e2e/site-layout.spec.ts e2e/visual.spec.ts` in all three browsers. Review changed dimensions and images before updating affected baselines, then rerun without `--update-snapshots`; retain existing tolerances. See [E2E maintenance](../e2e/README.md) for retries, reports and focused commands, and [performance baseline](../e2e/PERFORMANCE.md) for benchmarks.

CI uses Node.js 22.14.0 and pnpm 11.8.0. Lockfiles are untracked; installs resolve declared ranges on every run. The pnpm store cache does not freeze resolution. Shared setup retains installation scripts / canvas for checks and versioning, while lightweight root installs skip them; consumer installs run their own scripts for vue-demi.

## Upstream setup

Configure `IDuxFE/idux-charts`:

1. Enable Actions and **Allow GitHub Actions to create and approve pull requests**. Repository permissions may remain read-only; jobs request writes explicitly.
2. Protect main with PR review and **CI result**. Maintainers merge PRs using rebase; do not require publish jobs for PR merging.
3. Create the **npm** environment, restrict it to main, and optionally require approval.
4. Set **RELEASE_GITHUB_TOKEN** to a repository-scoped PAT with Contents and Pull requests read/write so release PRs trigger CI. Without it, `GITHUB_TOKEN` creates the PR but a maintainer must close and reopen it to trigger checks.
5. Configure npm trusted publishing below, then set **RELEASE_ENABLED=true**. Until then, main validation still runs but planning and release writes are disabled.

For **each** public package, configure npm **Settings → Trusted publishing**:

| Field                     | Value                    |
| ------------------------- | ------------------------ |
| Provider                  | GitHub Actions           |
| Organization / repository | `IDuxFE` / `idux-charts` |
| Workflow / environment    | `release.yml` / `npm`    |
| Allowed action            | npm publish              |

Publishing uses OIDC (`id-token: write`), without `NPM_TOKEN` or `NODE_AUTH_TOKEN`. Follow npm's setup page for trust activation requirements.

## Release operation

1. Merge feature PRs with changesets. Inspect the plan with `pnpm exec changeset status --output /tmp/idux-charts-release-plan.json`.
2. Full CI and planning run in parallel. `version` mode creates / updates a release PR with package versions and changelogs; several feature PRs can accumulate before release.
3. Review the release PR, wait for CI, then rebase-merge it.
4. The new main run validates the commit and, in `publish` mode, rebuilds and publishes unpublished packages, pushes tags and creates GitHub Releases. Approve the npm environment if configured.

Versioning and publication share a non-cancelling write lock with `queue: max`. Both use the validated SHA and skip writes when main has moved. Only the write jobs serialize; validation remains independent per SHA.

To retry, manually run **Release** on main. Changesets can publish an unpublished version already on main even without pending changesets; check versions before enabling or retrying publication. After partial failure, inspect npm and logs before rerunning; do not bump already published packages again or delete pending changesets to postpone release.

## Documentation deployment

New npm publication dispatches **Deploy documentation** with the published SHA. Documentation-only changes and retries use **Actions → Deploy documentation → Run workflow → main**: leave `source_sha` blank for the dispatch SHA, or supply a full SHA already in main history. This workflow is independent of npm approval and publication retries.

- Pages settings: **Deploy from a branch → gh-pages → /(root)**; domain `charts.idux.site`, DNS target `iduxfe.github.io`.
- Secret: **PAGES_DEPLOY_TOKEN**, a repository-scoped PAT with Contents read/write; fallback **RELEASE_GITHUB_TOKEN**. `GITHUB_TOKEN` pushes cannot trigger branch-based Pages builds.
- Build verifies source ancestry and runs Chromium smoke tests. Deploy copies only the tested `documentation` artifact into `gh-pages`, removes stale assets and preserves history. Identical output creates no commit.
- Check both **Deploy documentation** and the platform **pages build and deployment**, then refresh a chart route on the site. Roll back by restoring known-good static files in a new `gh-pages` commit.

| Build variable | Default | Purpose                                                                |
| -------------- | ------- | ---------------------------------------------------------------------- |
| `SITE_BASE`    | `/`     | Absolute asset / router base; use the same value for build and preview |
| `SITE_DOMAIN`  | unset   | Optional CNAME; leave empty for a project subpath                      |

Production uses `/` and `charts.idux.site`. Variables are supplied through the shell at build time. The build includes `.nojekyll` and an `index.html` copy as `404.html`; deep links preserve parameters but still return GitHub Pages' HTTP 404 status.

```sh
SITE_BASE=/idux-charts/ SITE_DOMAIN= pnpm build:site
SITE_BASE=/idux-charts/ SITE_DOMAIN= pnpm preview
SITE_BASE=/idux-charts/ SITE_DOMAIN= pnpm exec playwright test e2e/pages.spec.ts
```
