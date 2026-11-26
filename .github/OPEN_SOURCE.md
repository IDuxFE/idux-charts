# Coverage and security integrations

English | [简体中文](OPEN_SOURCE.zh.md) | [Pipeline map](PIPELINES.md)

Configuration applies to `IDuxFE/idux-charts`. Repository settings and service policies must be verified in their respective consoles; Git files do not establish their current state.

## Coverage and Codecov

| Command / output                                          | Purpose                                                                                                                               |
| --------------------------------------------------------- | ------------------------------------------------------------------------------------------------------------------------------------- |
| `pnpm test:coverage` → `coverage/index.html`              | Unit coverage; public library sources include untested files, excluding declarations, tests, build configuration and generated output |
| `pnpm test:coverage:all` → `coverage/combined/index.html` | Unit coverage plus Vue 2 / Vue 3 Chromium packed-consumer coverage                                                                    |
| `pnpm coverage:merge`                                     | Merge collected data; reject missing consumers or a changed source denominator                                                        |

Reports include HTML, LCOV and JSON. `CHARTS_COVERAGE=1` instruments library builds with source maps; normal builds have no counters. Site / Playground application code and third-party dependencies are excluded. CI retains unit and combined artifacts for seven days and uploads combined LCOV to Codecov.

To configure Codecov:

1. Install the [Codecov GitHub App](https://github.com/apps/codecov), activate the upstream repository and save its upload token as **CODECOV_TOKEN**.
2. Set **CODECOV_ENABLED=true** for non-PR uploads. Upstream PR uploads run without that variable; fork PRs and Dependabot use tokenless uploads and receive no Actions secret.
3. Confirm the result belongs to `IDuxFE/idux-charts`. If a base report is missing, correct the token / repository configuration and manually run **CI** on main.

[codecov.yml](../codecov.yml) requires **95% patch coverage with zero allowance**; project coverage is informational. Upload errors fail `combined-coverage`. To block merges on insufficient patch coverage, also require **codecov/patch** in branch protection or a ruleset.

## Dependency updates and CodeQL

[Dependabot](dependabot.yml) checks root npm dependencies Monday at 02:00 and Actions at 02:30 (Asia/Shanghai), groups routine upgrades and limits open PRs. Vitest and its coverage plugin stay on the same exact version and update together.

- Manually maintain Node 22 typings, jsdom and all three Playwright copies; review screenshot changes when upgrading browsers. TypeScript major upgrades require compiler-API compatibility review.
- Playground dependencies intentionally ignore version and security-update PRs. Security alerts remain available for manual evaluation.
- Lockfiles are untracked. Security updates also depend on repository dependency-graph / Dependabot settings; manifest updates do not audit the complete resolved graph.

[CodeQL](workflows/codeql.yml) scans JavaScript / TypeScript without dependency installation or builds. Use this advanced configuration without enabling duplicate default setup for the same language. Review results under code-scanning alerts before making the check required.

Enable **Private vulnerability reporting** in upstream security settings. [SECURITY.md](../SECURITY.md) provides the reporting route and contact fallback.

## FOSSA

### Setup and scan scope

1. Select the intended [FOSSA organization](https://app.fossa.com), configure its project and license policy.
2. Save **FOSSA_API_KEY** with analysis, result-read and project-metadata-edit access; set **FOSSA_ENABLED=true**.
3. Run **FOSSA** on main and inspect discovered dependencies and policy results.

The workflow generates a scan-only lockfile and scans public packages, the documentation app and development dependencies; independent Playgrounds are excluded by [.fossa.yml](../.fossa.yml). It uploads analysis, aligns the project title with `fossa project edit`, then runs the policy test. It is independent of Release and exposes no FOSSA secret to PR code.

| Scan source  | Project                                         | Notes                                                                        |
| ------------ | ----------------------------------------------- | ---------------------------------------------------------------------------- |
| GitHub App   | `idux-charts` (`git+github.com/...`)            | README badges and App status checks                                          |
| CLI workflow | `idux-charts-cli` (`custom+<organization>/...`) | Fixed project ID in `.fossa.yml`; separate settings, policies and exceptions |

Compare project scope and policies before comparing results. Changing the CLI project title does not change its identity or transfer GitHub App exceptions.

### Retained exceptions

Check for a compatible fix before accepting a vulnerability exception; dependency upgrades require maintainer approval. Scope exceptions to **In this project → Selected version**, record the integration reason and review on upgrade. Keep vulnerability and license checks enabled when ignoring quality warnings.

| Dependency                          | Version   | Retained reason / issue                                                                                                                                                                |
| ----------------------------------- | --------- | -------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| `vue`                               | `2.6.14`  | CVE-2024-9506 accepted risk for private compatibility fixtures; review when Vue 2.6 support changes. Vue is a peer, not bundled; this exception does not cover production applications |
| `jsdom`                             | `28.1.0`  | Outdated-version quality warning; validated test environment                                                                                                                           |
| `@types/node`                       | `22.20.5` | Outdated-version quality warning; Node 22 tooling baseline                                                                                                                             |
| `@atlaskit/pragmatic-drag-and-drop` | `1.8.1`   | Quality warning; iDux CDK 2.11 uses the 1.x API                                                                                                                                        |
| `entities`                          | `4.5.0`   | Quality warning; Markdown 14 dependency range                                                                                                                                          |
| `lru-cache`                         | `7.18.3`  | Quality warning; Archive 0.5 default-export constructor                                                                                                                                |
| `mime`                              | `1.6.0`   | Quality warning; Less legacy lookup / charsets APIs                                                                                                                                    |
| `nanoid`                            | `3.3.20`  | Quality warning; PostCSS 8 dependency range                                                                                                                                            |
| `shiki`                             | `0.11.1`  | Quality warning; Archive 0.5 / shiki-processor legacy API                                                                                                                              |
| `vscode-textmate`                   | `6.0.0`   | Quality warning; retained Shiki integration                                                                                                                                            |

These are version-specific maintenance records, not proof of current console state. FOSSA quality warnings do not support all-version auto-ignore; changing Stale Package Prevention changes the shared policy's enforcement. See [FOSSA quality issue guidance](https://docs.fossa.com/docs/quality/reviewing-quality-issues).

Keep the root `@types/node` dependency pinned to the recorded Node 22 baseline. Fresh CI installs generate an untracked lockfile, and a caret range can resolve a different patch version outside the selected-version exception. Review the CLI project's exception when intentionally updating this pin; keep license and vulnerability checks enabled.
