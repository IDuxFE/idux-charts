# Pipeline map

English | [简体中文](PIPELINES.zh.md)

The diagrams describe repository configuration; workflow YAML is authoritative. Release setup: [RELEASING.md](RELEASING.md). Coverage and security: [OPEN_SOURCE.md](OPEN_SOURCE.md).

## Triggers and execution conditions

| Workflow                                    | Trigger                                                       | Execution conditions                                                                                                                                    |
| ------------------------------------------- | ------------------------------------------------------------- | ------------------------------------------------------------------------------------------------------------------------------------------------------- |
| [CI](workflows/ci.yml)                      | PR targeting main; feature-branch push; manual; reusable call | Push excludes main, `changesets-ghcommit-temp/**`, `changeset-release/**`, `dependabot/**`. Release calls CI for main                                   |
| [Release](workflows/release.yml)            | main push; manual                                             | Validation always runs. Planning requires `IDuxFE/idux-charts`, main and `RELEASE_ENABLED=true`; writes also require successful validation and planning |
| [Deploy documentation](workflows/pages.yml) | Manual; dispatch after new npm packages are published         | Upstream main only. Optional `source_sha` must be a full SHA in main history; blank uses the dispatch SHA                                               |
| [CodeQL](workflows/codeql.yml)              | PR targeting main; main push; Monday 02:23 UTC; manual        | Upstream only                                                                                                                                           |
| [FOSSA](workflows/fossa.yml)                | main push; Monday 02:43 UTC; manual                           | Upstream main, `FOSSA_ENABLED=true`; needs `FOSSA_API_KEY`                                                                                              |

Weekly scans run Monday at 10:23 / 10:43 Asia/Shanghai. [Dependabot](dependabot.yml) separately creates weekly update PRs; those PRs trigger CI. GitHub Pages runs its platform deployment after the `gh-pages` push. Neither is an additional repository workflow file.

```mermaid
flowchart TB
    pr["PR to main / feature push<br/>Manual CI"]
    main["main push / manual Release"]
    ci["CI · ci.yml<br/>Full validation; aggregate: CI result"]
    release["Release · release.yml<br/>Validate + plan in parallel<br/>Writes: upstream + main + RELEASE_ENABLED"]
    result["Update release PR OR publish npm<br/>Maintainer merges release PR"]
    manual_docs["Manual documentation dispatch<br/>Upstream main; optional source_sha"]
    docs["Deploy documentation · pages.yml<br/>Pinned main SHA → build + smoke → deploy"]
    pages["gh-pages → GitHub Pages<br/>charts.idux.site"]
    security["main push / weekly / manual<br/>CodeQL also runs on PRs to main"]
    codeql["CodeQL · codeql.yml<br/>Upstream only; JS / TS source analysis"]
    fossa["FOSSA · fossa.yml<br/>Upstream main + FOSSA_ENABLED<br/>Dependency analysis → policy test"]
    dependabot["Dependabot<br/>Weekly dependency / Actions PRs"]

    pr --> ci
    main --> release
    release -->|"workflow_call"| ci
    release --> result
    result -.->|"Only new npm publication"| docs
    manual_docs -.->|"workflow_dispatch"| docs
    docs --> pages
    security -.-> codeql
    security -.-> fossa
    dependabot -.->|"PR event"| pr
```

## CI dependencies

```mermaid
flowchart LR
    checks["checks · Ubuntu<br/>pnpm check:ci<br/>Lint / format / types / unit coverage<br/>Coverage-merge regression tests"]
    playground["playground-tests × 2 · macOS Intel<br/>Vue 2.6 / Vue 3<br/>Build → pack → install → Chromium<br/>Runtime coverage + visual reports"]
    build["browser-build · Ubuntu<br/>Build site + fixture once"]
    coverage["combined-coverage · Ubuntu<br/>Unit + both consumer coverages<br/>Artifact + conditional Codecov upload"]
    browsers["browser-tests × 3 · macOS Intel<br/>WebKit / Firefox / Chromium<br/>Seeded, disjoint random thirds<br/>Reports + browser-plans receipts"]
    compat["compatibility × 5 · Ubuntu<br/>Vue 2.7.16 / 3.5.44 × ECharts 5.4.3 / 6.1.0<br/>Vue 2.6.14 + ECharts 6.1.0<br/>Packed declarations + Chromium runtime"]
    smoke["pages-smoke × 2 · Ubuntu<br/>/ + charts.idux.site<br/>/idux-charts/<br/>Production-site Chromium smoke tests"]
    gate["ci · CI result · Ubuntu<br/>if: always()<br/>Require all 7 upstream jobs to succeed<br/>Verify complete, non-overlapping assignments"]

    checks -->|"unit-coverage"| coverage
    playground -->|"playground-coverage × 2"| coverage
    build -->|"browser-build"| browsers
    checks --> gate
    playground --> gate
    build --> gate
    coverage --> gate
    browsers --> gate
    compat --> gate
    smoke --> gate
```

- Independent roots run in parallel. `CI result` directly requires all seven upstream job IDs and every matrix child to succeed, then verifies complete, non-overlapping browser assignments.
- Browser cases are randomly partitioned across three browsers using the run ID seed. Each case is assigned to one browser; `pnpm test:e2e:full` runs every case in every browser.
- Combined code coverage merges unit coverage and both Playground consumers. Browser assignment receipts are separate from code coverage.
- Matrices use `fail-fast: false`. Superseded PR / feature runs may be cancelled; main validation is independent per SHA. Reports and artifacts are retained for seven days.

## Release and deployment

```mermaid
flowchart TB
    start["main push / manual Release<br/>Pin github.sha"]
    validate["validate → ci.yml<br/>Full CI; independent per SHA<br/>Not gated by RELEASE_ENABLED"]
    plan["plan → select-mode<br/>Upstream main + RELEASE_ENABLED=true"]
    gate["Both validate + plan must succeed<br/>Shared write lock: queue=max<br/>Skip writes if validated SHA is no longer main"]
    version["version<br/>Changesets updates release PR<br/>Versions / changelogs / dependencies"]
    merge["Maintainer reviews + rebase-merges<br/>Release PR receives normal PR CI"]
    publish["publish · environment: npm<br/>Build library → OIDC publication<br/>npm + git tags + GitHub Releases"]
    dispatch["pages.yml · workflow_dispatch<br/>source_sha = published SHA<br/>Only published == true; failure warns"]
    manual["Manual Deploy documentation<br/>Upstream main; optional full source_sha<br/>Blank uses dispatch SHA"]
    docs_build["pages.yml · build<br/>Verify source is in main history<br/>Build + Chromium smoke → documentation artifact"]
    deploy["pages.yml · deploy<br/>Token: PAGES_DEPLOY_TOKEN<br/>Fallback: RELEASE_GITHUB_TOKEN<br/>Copy tested artifact; preserve gh-pages history"]
    pages["GitHub Pages → charts.idux.site"]

    start --> validate
    start --> plan
    validate --> gate
    plan --> gate
    gate -->|"mode = version"| version
    gate -->|"mode = publish"| publish
    version --> merge
    merge -.->|"New main push"| start
    publish --> dispatch
    dispatch -.->|"Separate workflow"| docs_build
    manual -.-> docs_build
    docs_build -->|"documentation"| deploy
    deploy --> pages
```

Validation and planning run in parallel. Versioning and publication share a write lock (`queue: max`) and skip writes if their validated SHA is no longer main. Maintainers merge release PRs.

Only a successful **new-package** publication dispatches documentation deployment. Normal merges and release-PR updates do not deploy. Documentation uses the published SHA, builds and tests its own artifact, and can be retried independently. Dispatch failure warns without failing the successful npm publication.

## Maintenance entry points

| Symptom / change                          | Inspect                                                                                                                                                                                   |
| ----------------------------------------- | ----------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| Triggers, runners, matrices, dependencies | `workflows/*.yml`; update `ci.needs` when adding a CI job                                                                                                                                 |
| Install / canvas / cache                  | [setup action](actions/setup/action.yml), [ci-timing.mjs](../scripts/ci-timing.mjs)                                                                                                       |
| Browser assignment / missing receipts     | [partition runner](../scripts/e2e-ci.mjs), [partitioner](../scripts/e2e-partition.mjs), [verifier](../scripts/e2e-verify-plans.mjs), [reports action](actions/browser-reports/action.yml) |
| Coverage / consumer compatibility         | [coverage merge](../scripts/merge-coverage.mjs), [Playground preparation](../scripts/prepare-playgrounds.mjs), [declaration tests](../scripts/test-declarations.mjs)                      |
| npm succeeded, site unchanged             | Release dispatch → Deploy documentation build / deploy → platform Pages deployment                                                                                                        |

When workflows change, update the Mermaid diagrams and trigger conditions in both language versions.
