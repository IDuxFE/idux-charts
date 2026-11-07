# CI and releases

Contributors push feature branches to their forks, then open pull requests against
`IDuxFE/idux-charts:main`. CI runs on feature-branch pushes and pull requests. Main
branch pushes run the same checks through the Release workflow. Forks never run
the versioning or publishing jobs.

## Contributor workflow

For changes that affect published packages, run `pnpm changelog`, select the
affected packages and version impact, and write a concise English summary. Commit
the generated `.changeset/*.md` alongside the code. Documentation, tests, and
development tooling changes alone do not normally need a changeset.

Creating a Git commit does not generate a changeset automatically. Contributors
control when to add one and which packages and version increments it requests.
Before it is consumed by a release PR, its summary and version impact can be
edited through a normal code review.

Do not manually bump package versions or edit generated changelogs. Changesets
updates versions and internal dependencies together. Package versions are
independent; not every release needs to update all three packages.

CI checks lint, formatting, types, unit tests, and library builds on Linux. Browser
and screenshot tests run on Intel macOS 15 against all three browsers, then test
the packaged library in both Vue playgrounds. Playground lockfiles and local
tarballs remain untracked. Browser reports are retained for seven days. Review
screenshot differences if runner image or browser rendering changes; CI never
automatically accepts new baselines.

Keep Playwright pinned to the same exact version in the root and both playgrounds
so browser upgrades and screenshot changes are reviewed together. CI also installs
Chromium through each playground's own Playwright CLI before testing it.

After building, `pnpm test:declarations` packs the actual library and installs it
in independent Vue 2.7 and Vue 3 projects against ECharts 5.4.3 and 6.0.0. Both check declarations with
`skipLibCheck: false`, including inferred props, events, scoped slots, setup
bindings, data, computed values, and methods. Vue 2.6 checks the adapter prop
aliases with its existing `skipLibCheck: true` boundary. Pass `--runtime` to also
test the packed JS in Chromium: rendering, data updates, theme changes, disposal,
remounting, and composable-only tree shaking. The browser CI job runs this additional smoke test.

Root dependency lockfiles also remain untracked. CI and release jobs install with
`pnpm install --no-lockfile --no-frozen-lockfile`, resolving dependencies within their declared
version ranges on every run. Lockfile-based caching is disabled. Exact dependency
versions and the explicitly pinned Node.js and pnpm versions remain fixed.

## One-time upstream GitHub setup

These settings belong to **IDuxFE/idux-charts**, not the contributor's fork.

1. Enable GitHub Actions and allow the actions referenced in the workflows.
2. Under **Settings → Actions → General → Workflow permissions**, enable
   **Allow GitHub Actions to create and approve pull requests**. Jobs request their
   own permissions; read-only can remain the repository default.
3. Create an environment named **npm**. Limit deployment branches to **main**.
   Optionally require maintainer approval before publishing.
4. Protect `main`: require pull requests, reviews, and the **CI result** check from
   the CI workflow. Select the actual check after its first PR run. Do not require
   the publishing job for merging a PR.
5. To automatically run CI for bot-created release PRs, add a repository secret
   **RELEASE_GITHUB_TOKEN** containing a fine-grained PAT with access only to this
   repository and **Contents: read/write**, **Pull requests: read/write**. The token
   owner must have repository access. A renewable GitHub App installation token
   can replace the PAT if the workflow is extended to generate it.
   Without this secret, the workflow uses `GITHUB_TOKEN`, which can create the PR
   but does not trigger its CI. A maintainer must close and reopen that release PR
   to trigger `pull_request` checks. Never bypass the required checks.
6. After configuring npm below, set the repository Actions variable
   **RELEASE_ENABLED** to **true**. Leave it unset until publishing is ready.

No `NPM_TOKEN` or `NODE_AUTH_TOKEN` secret is needed. Only the publish job receives
`id-token: write`. All jobs install pnpm 11.8.0 and Node.js 22.14.0 explicitly.

## One-time npm setup

An npm owner/maintainer with permission to manage the existing `@idux/*` packages
must configure a GitHub Actions **Trusted Publisher** on **each** package:

- `@idux/charts`
- `@idux/charts-core`
- `@idux/charts-plots`

In each package's **Settings → Trusted publishing**, use:

| Field                | Value          |
| -------------------- | -------------- |
| Provider             | GitHub Actions |
| Organization or user | `IDuxFE`       |
| Repository           | `idux-charts`  |
| Workflow filename    | `release.yml`  |
| Environment          | `npm`          |
| Allowed action       | npm publish    |

The repository, workflow filename, and environment must match exactly. These are
existing packages: a fork does not grant permission to publish their names.
Trusted publishing uses short-lived OIDC credentials on GitHub-hosted runners.
pnpm 11 supports this authentication and automatically attaches provenance for
public packages published from public repositories. Package repository metadata
continues to point to the upstream repository.

Configure trust near the first planned release: npm currently requires a new
trusted publisher to complete its first publish within two days. Follow the npm
settings shown at setup time if the policy changes.

## Release workflow

1. Merge feature PRs containing changesets into `main`.
2. After validation passes, Changesets creates or updates the release PR with
   package versions, changelogs, and internal dependency updates.
3. Review the generated release PR and wait for CI, then merge it.
4. The main workflow validates the merged commit, rebuilds the library, and
   publishes unpublished versions to npm. It also pushes package tags and creates
   GitHub Releases. Approve the `npm` environment deployment if required.

Multiple feature PRs can accumulate in the same open release PR. Keep that PR
open until the batch is ready to release; merging each feature PR does not itself
create a new npm version. The release PR consumes the pending changeset files
and preserves their entries in each package's changelog. Do not manually delete
pending changesets to postpone a release.

Release PR CI runs on the pull request event. Pushes to Changesets temporary
branches and release branches are excluded from push CI to avoid duplicate runs.

Both Release PR generation and publishing remain disabled until
`RELEASE_ENABLED=true`. Once enabled, a manual **Release → Run workflow** on
**main** can start or retry the process. Main pushes also trigger it. Changesets
checks npm for unpublished versions, so running it without pending changesets can
publish any unpublished version already present on main. Review the current
versions before enabling releases. Re-running after a partial failure does not
require another version bump for packages already published; inspect npm and the
workflow logs first. Never attempt to overwrite an existing npm version.

## References

- [Changesets automation](https://changesets.dev/guide/automating)
- [Changesets Action](https://github.com/changesets/action)
- [npm trusted publishing](https://docs.npmjs.com/trusted-publishers/)
- [pnpm publishing](https://pnpm.io/cli/publish)

## Toolchain and dependency boundaries

- Development uses Node.js 22.14+ (22.x), 24.x or 26+, with pnpm 10+.
  `.nvmrc`, CI, engine declarations and Node typings use the Node 22 baseline.
  Changesets 3 requires pnpm 10+; the independent playgrounds retain their pnpm 9
  compatibility because they do not run the release toolchain.
- TypeScript stays on the 6.x compiler API for declaration generation, Vue tooling
  and the AST normalizer. The unused native TypeScript 7 compiler dependency is
  removed; a future compiler API migration must pass the packed-consumer matrix.
- Published ECharts peers explicitly support 5.x and 6.x. The documentation app
  uses the same 6.x baseline as development. `vue-demi` 0.14.10 and the optional
  Composition API peer remain necessary for the Vue 2 compatibility boundary.
- Core and plots entry points perform ECharts registration and are marked as
  side-effectful. Published CSS is also marked as side-effectful. Both component
  imports and a separately bundled `useChart`-only import are exercised in browsers.
- The latest archive documentation tooling still declares Vite 4 and archive-app
  0.2 peers, while this workspace uses Vite 8 and archive-app 0.5. Its current
  combination is covered by the site build and browser suite. The optional Vue 2.6
  Composition API peer can also warn in the Vue 3 development workspace. Do not
  broaden those upstream peer declarations to hide warnings: packed-consumer
  projects instead use strict peer validation for each supported Vue version.
