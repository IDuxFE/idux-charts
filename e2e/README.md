# End-to-end tests

English | [简体中文](README.zh.md)

The full local suite runs every case in Chromium, Firefox and WebKit. CI randomly
partitions the complete catalogue into three balanced sets and assigns one set
to each browser, so each case runs once per CI run. A new workflow run changes
the assignment; rerunning the same workflow keeps its seed for reproduction.
The Chromium job additionally runs the CJK above-label visual regression on every run, using separate output so partition receipts remain intact.

A single CI run therefore does not check every case in every browser. Keep the
reviewed macOS screenshot baselines and their existing pixel tolerances. Vue 2
and Vue 3 playgrounds test packed packages separately; the compatibility jobs
also retain all five Vue/ECharts combinations.

Visual baselines in `visual.spec.ts-snapshots` use representative documentation demos for Bar, Line, Area, Pie, Radar, Gauge, LiquidFill, Map, Bullet and WordCloud in light/dark themes across all three browsers. Gauge covers basic, status and segmented examples; Map covers status, density and routes; Bullet covers single, segmented, grouped and above-label examples. A fixture imports the actual demo components and site theme setup, preserving demo options and component sizing rules inside a fixed 974px desktop container. Only this fixture supplies a pinned OFL CJK font through the public theme providers to avoid host font metric drift; published components keep their default font behavior. Tests finish animations for stable capture, and retain the original historical Bar/Pie baselines. Generate only missing baselines with `pnpm exec playwright test e2e/visual.spec.ts --grep "demo visual baseline" --update-snapshots=missing`, inspect the images, then rerun without the update flag.

## Coverage and execution boundaries

| Area               | Execution                                                    | Preserved checks                                                                                             |
| ------------------ | ------------------------------------------------------------ | ------------------------------------------------------------------------------------------------------------ |
| Chart sizing       | One test per renderer and CSS scenario                       | All 17 layouts in SVG and Canvas, resize, visibility and instance identity                                   |
| Rose emphasis      | One page per alignment and shape, named steps per mode       | All 9 alignments × 2 shapes × 4 modes, all four sectors, item-to-default transition and resize in every mode |
| Empty slots        | One test per named demo                                      | All 32 demos, complete demo counts, overlay geometry, reload/normal recovery and instance identity           |
| Bar legends        | Separate catalogue, wrapping and paginated interaction tests | Ordering, totals, wrapping, paging, zoom, selection, wheel propagation and resize anchors                    |
| Site rendering     | One DOM snapshot per assertion poll                          | Every source demo, expected chart counts, visibility and rendered paths/Canvas                               |
| Appearance         | Existing screenshots and same-browser reference comparisons  | All reviewed baselines, pixel checks and tooltip style assertions                                            |
| Theme and controls | Real page interaction and persisted preferences              | Dark/light transitions, responsive controls, keyboard, cross-tab storage and map theme coverage              |
| Package consumers  | Independent Vue playgrounds and compatibility matrix         | Packed imports, reactive data, themes, slots, lifecycle and screenshots                                      |

Tests with continuous transitions intentionally keep related operations on the
same chart. Splitting unrelated scenarios must not replace instance-preservation
or cancellation checks with fresh-page assertions.

## Stable interaction rules

- Scroll a persistent chart/SVG container before resolving its children. ECharts
  may replace text and paths during scroll, resize, emphasis or theme recreation.
- Use `clickSvg`, `hoverSvg` and `hoverCategory` from `helpers.ts` for SVG hit
  targets. They wait for current geometry and send real pointer events, including
  WebKit's transparent legend hit areas. The click itself is never replayed.
- Multi-sector pie tests locate an interior point from the rendered filled SVG
  arc and wait for its geometry to settle. Silent full-circle backgrounds are
  excluded. The decorated multi-layer example explicitly targets its interactive
  70–80% ring instead of treating silent decorative layers as data.
- Wait for the observable state being asserted, rather than a fixed sleep.
  `reloadDemo` observes the real loading transition before clicking, so slow
  runners cannot miss a short loader. It also verifies loading and empty-state
  recovery. The cancellation regression controls the page clock explicitly.
- Give read-only geometry polling an explicit bounded budget; `toPass` does not
  inherit the global expect timeout. Never wrap toggling input actions in it.
- Readiness probes must tolerate missing models or graphic elements during
  initialization. Compare the entire changed contract: matching only the y
  coordinate, an unchanged title, or the SVG shell can accept the previous state.
- Negative interaction checks must prove that the real input reached the intended
  target. The loading-wheel regression records delivery to the overlay and then
  verifies paging after removal, resolving fresh coordinates for each action.
- Require the expected number of charts when checking a collection. `every()`
  accepts an empty collection and cannot establish successful remounting alone.
- Assert geometry after ResizeObserver/rendering settles. Read related bounds
  together where possible instead of comparing values from different frames.
- Keep screenshot calls that participate in image assertions. Unasserted success
  screenshots add rasterization and report I/O; failure screenshots and traces
  provide diagnostics without capturing every passing state.
- The Pages smoke test intentionally waits for its static dynamic imports to
  finish before reloading the document. Do not use network idle as a general
  substitute for chart readiness.

## CI and reports

A Linux browser-build job builds the site and fixture once. WebKit, Firefox and
Chromium then consume those shared production assets through the same macOS
matrix. Preparation, artifact download, browser installation and test execution
are separate steps so their durations can be compared. No `max-parallel` limit
is set; GitHub runner capacity determines when jobs actually start. The three
browser jobs and two playground jobs need five macOS slots to run concurrently.
Other workflow runs can compete for that capacity.

`scripts/e2e-ci.mjs` collects the real Playwright catalogue, hashes each complete
case identity with the workflow run ID, and deals the shuffled cases across the
three browsers. Counts differ by at most one. It checks Playwright's actual
`--test-list` selection against the plan before running, preventing ambiguous
titles from dropping or duplicating cases. Seed, complete assignments and each
browser's selected list are retained under `test-results/ci-plan/` in the report
artifacts. The final CI gate compares all three receipts and verifies complete,
non-overlapping coverage and balanced counts. `IDUX_E2E_SEED` reproduces a particular assignment. This random strategy
provides cross-browser coverage over multiple runs; use the full command for a
complete three-browser regression in one run.

`IDUX_E2E_PREBUILT=1` reuses explicitly built assets for local repeated checks.
`IDUX_E2E_TARGET=site` skips the unused fixture server for deployment smoke jobs;
`fixture` skips the site server when running fixture-only tests. The target
selects servers, not tests. Without these variables, local commands build both
assets as before.

Existing retry budgets remain unchanged: two in CI for the main suite and one
for playgrounds, with no local retries by default. Do not increase retries,
timeouts or image tolerances to hide a failure. `scripts/e2e-summary.mjs` lists
first-attempt failures, flaky tests, attempt counts and slow tests in the Actions
job summary; a retry success also emits a warning. HTML, JSON, traces and failure
screenshots remain downloadable artifacts.

The pnpm store cache avoids downloading unchanged packages, but the repository's
untracked-lockfile policy still resolves version ranges on every run. Root
workspace installs skip scripts for browser, build, consumer, release-planning,
coverage-merge and analysis-only tasks. Unit validation retains canvas build
dependencies. Consumer installs still run their own scripts so vue-demi selects
the correct Vue environment. Release-PR versioning also retains normal scripts
because its version command reinstalls workspace dependencies.

`scripts/ci-timing.mjs` records native preparation and workspace installation in
logs and the Actions job summary, including failed commands. Playground
preparation separately times library builds, packing and each consumer install;
the Playground Chromium installation is timed as well. These measurements help
distinguish environment costs from actual tests without changing retry budgets.

## Validation commands

Run these only when local execution is appropriate. Local suites default to four
workers, and `pnpm test` runs suites sequentially to avoid browser/build contention.

Focused interaction checks:

```sh
pnpm exec playwright test e2e/bar-demo-controls.spec.ts e2e/category-legend-spacing.spec.ts e2e/pie-dark-hover.spec.ts e2e/pie-demo-controls.spec.ts --workers=1
```

Fixture geometry and the complete rose matrix:

```sh
IDUX_E2E_TARGET=fixture pnpm exec playwright test e2e/chart-layout.spec.ts e2e/pie-hover.spec.ts --workers=1
```

Full three-browser coverage and package consumers:

```sh
pnpm test:e2e:full
pnpm test:playgrounds
```

Reproduce the prebuilt-assets path after explicitly building fresh artifacts:

```sh
pnpm build:site
pnpm exec vite build --config e2e/fixture/vite.config.ts
IDUX_E2E_PREBUILT=1 pnpm test:e2e
```

Use the matching `SITE_BASE` and `SITE_DOMAIN` for deployment builds and previews;
do not reuse root-path build artifacts for a subpath smoke test. After any run,
including failures or interruptions, close only the browsers and preview servers
started by that run and verify that their child processes have exited.

Reproduce one CI browser assignment (use the same seed for all three browsers):

```sh
IDUX_E2E_SEED=12345 pnpm test:e2e:ci webkit
IDUX_E2E_SEED=12345 pnpm test:e2e:ci firefox
IDUX_E2E_SEED=12345 pnpm test:e2e:ci chromium
```

Add `--plan-only` to inspect and verify the selection without starting browsers.

## Word cloud visual and interaction regression

`visual.spec.ts-snapshots/demo-word-cloud-*.png` contains 30 reviewed macOS baselines: text, rectangular tags, bubbles, search highlights and overlapping rectangles, each in light/dark themes for Chromium, Firefox and WebKit. The fixture imports actual documentation demos. Word cloud screenshots emulate reduced motion before mounting, then finish native entry animations; the published component behavior is unchanged. The fixed CJK font includes the new example glyphs, and Chromium checks the actual platform font.

Generate only missing word cloud baselines with `pnpm exec playwright test e2e/visual.spec.ts --grep "word-cloud .* demo visual baseline" --update-snapshots=missing`. Inspect each image, then rerun without the update option. Existing baselines must remain unchanged.

`word-cloud.spec.ts` also checks actual pointer hover/pause/resume, reduced motion, selection, legend filtering, search layout stability and loading/empty recovery. The general demo-render, theme and empty-slot catalogues include WordCloud. Packed Vue 2/3 consumers exercise actual SVG clicks, tooltips, category filtering and invalid-size recovery, contributing browser coverage in addition to the lifecycle case.

## Map geometry, values and visual regression

`map-demo-drilldown.spec.ts` verifies actual region/pin clicks, cascader synchronization, municipality grouping, missing boundaries and stale-response handling. It also records native camera zooms while the optional transition helper switches maps.

`map-demo-controls.spec.ts` checks the real site's loading, empty-state recovery and navigation. `map-demo-state.spec.ts` mounts the actual documentation demos in the fixture and switches each through both China and world maps. It checks the live geo model's region names, matches every configured region to the geometry, reads normal and zero values through real pointer tooltips, compares rendered fills, distinguishes missing density data from zero and verifies restoration. Status node values and route metrics are checked in the live chart option as well.

The map visual matrix covers status, density and lines in both geographic scopes and both themes, for Chromium, Firefox and WebKit (36 snapshots). The original default-scope snapshot names remain unchanged; alternate scopes include `china` or `world` in the filename. Generate only missing baselines, inspect the images, then rerun without snapshot updates:

```sh
IDUX_E2E_TARGET=fixture pnpm exec playwright test e2e/visual.spec.ts --grep 'map (status|density|lines)' --update-snapshots=missing
IDUX_E2E_TARGET=fixture pnpm exec playwright test e2e/map-demo-state.spec.ts e2e/visual.spec.ts --grep 'map (status|density|lines)'
```
