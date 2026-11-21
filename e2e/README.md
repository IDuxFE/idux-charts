# End-to-end tests

The main suite runs the same coverage in Chromium, Firefox and WebKit. Keep the
reviewed macOS screenshot baselines and their existing pixel tolerances. Vue 2
and Vue 3 playgrounds test packed packages separately; the compatibility jobs
also retain all five Vue/ECharts combinations.

## Coverage and execution boundaries

| Area               | Execution                                                    | Preserved checks                                                                                             |
| ------------------ | ------------------------------------------------------------ | ------------------------------------------------------------------------------------------------------------ |
| Chart sizing       | One test per renderer and CSS scenario                       | All 17 layouts in SVG and Canvas, resize, visibility and instance identity                                   |
| Rose emphasis      | One page per alignment and shape, named steps per mode       | All 9 alignments × 2 shapes × 4 modes, all four sectors, item-to-default transition and resize in every mode |
| Empty slots        | One test per named demo                                      | All 29 demos, complete demo counts, overlay geometry, reload/normal recovery and instance identity           |
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

The shared browser-build job builds the root-path site and fixture assets once.
Six macOS shards reuse those assets with `IDUX_E2E_PREBUILT=1`, while retaining
fresh preview processes and independent ports. `IDUX_E2E_TARGET=site` skips the
unused fixture server for deployment smoke jobs; `fixture` skips the site server
when explicitly running fixture-only tests. The target selects servers, not tests.
Without these variables, local commands build both assets as before.

Existing retry budgets remain unchanged: two in CI for the main suite and one
for playgrounds, with no local retries by default. Do not increase retries,
timeouts or image tolerances to hide a failure. `scripts/e2e-summary.mjs` lists
first-attempt failures, flaky tests, attempt counts and slow tests in the Actions
job summary; a retry success also emits a warning. HTML, JSON, traces and failure
screenshots remain downloadable artifacts.

The pnpm store cache avoids downloading unchanged packages, but the repository's
untracked-lockfile policy still resolves version ranges on every run. Preview
workers install dependencies without scripts because they only serve prebuilt
assets; builds, unit tests and package-consumer jobs retain normal install scripts
and native dependencies.

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
pnpm test:e2e
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
