# @idux/charts-plots

## 1.5.0

### Minor Changes

- fba2efa: Add theme-aware loading illustrations to all chart components and `useChart`.

  - Select illustrations for horizontal/vertical bars, lines/areas, pies/rings/roses, radar, gauge, and liquid fill. Core charts use the pie illustration for pie or unspecified series and a generic illustration for other series.
  - Keep the chart instance, existing data, zoom window, and legend selection while loading. Update illustration colors and masks when the effective light/dark theme changes, and keep the overlay aligned during resize.
  - Export `ChartLoadingOptions` with `text`, `textColor`, `maskColor`, `color`, `fontSize`, `fontFamily`, and `icon` options. Custom icons accept image URLs or SVG source; an undefined icon retains the plot-specific default. The default message is `Loading...`.
  - Announce loading through a status region, mark the chart busy, hide active tooltips, and prevent legend wheel paging through the overlay. Remove the overlay on cleanup and restore container positioning and its prior busy state without overwriting positioning changed by the application.
  - Replace demo placeholders with the shared loading state and document localized messages, custom icons, and reactive `useChart` options.

  Migration: `loading` now renders a DOM illustration and message instead of the ECharts spinner. Native spinner-specific settings such as `showSpinner` and `spinnerRadius` no longer affect its appearance. Loading content is excluded from ECharts image exports. Use `icon` and the supported appearance options to customize the new state.

### Patch Changes

- b5b4884: Provide layout-aware default value labels in category and native bar charts.

  - Show basic vertical values at `top` and horizontal values at `right`, including `horizontal-above`. Hide labels for grouped bars and multiple side-by-side stack groups.
  - Show one total per category for a single stack, above vertical stacks and at the right of horizontal stacks. Recalculate totals and move the label to the last valid visible segment when legend selection changes. Include valid zero values, ignore missing/non-finite measurements, and omit labels when the entire category is missing.
  - Preserve top-level, series, and data-item label overrides. Exclude non-bar helper series, including stripe overlays, from group detection and stack totals, and leave their labels unchanged.
  - Use opaque `#B2B8C2` for dark `horizontal-above` value labels unless an explicit label color is supplied.
  - Allow direct `useBarOption` consumers to provide an optional third `getChart` callback so stack totals can read live legend selection. Automatic totals read series data; dataset users should supply a custom `label.formatter`.

  Update the demos, metadata, design/API guidance, and English/Chinese READMEs to describe these defaults, with unit and browser coverage for labels, missing values, legend selection, and loading transitions.

- 7333ad7: Refine chart visual defaults and preserve explicit customization.

  - Use category legend swatches with 1px rounded corners in built-in plots and the Seer theme. Export `createLegendIcon(width, height)` for matching custom legend dimensions; custom native icons and category legend data remain configurable.
  - Give category Bar and Line/Area multi-row legends a 16px row gap while keeping columns aligned and paging controls within the reserved legend region.
  - Make automatic Pie legend spacing depend on the initial rows per column: 20px for up to three rows and 16px for more rows, scaled with the layout height. Preserve explicit `legend.itemGap` without scaling. Use normal weight for summary captions and align paging icons with the value column.
  - Soften bar shadows on every side and adapt the blur to the rendered bar geometry, including thin and short bars. Preserve explicit shadow overrides.
  - Keep native bar hover backgrounds below data series and hover stripes above their bars. `useStripeBarSeries` defaults to bar `z: 2`, places stripes one level above the configured bar `z`, and propagates `zlevel`; explicit axis-pointer layers take precedence.
  - Align horizontal names at the top of right Line/Area Y axes with their tick labels, respecting axis grids, label margins, and explicit name styles. Use `#A1A7B3` / `#808999` for light/dark category zero-state text unless the plot theme overrides it.
  - Reduce Seer light tooltip background opacity to 0.72 and add 4px backdrop blur through the shared HTML tooltip stylesheet. Preserve explicit tooltip backgrounds and existing tooltip classes.
  - Align demo titles and grids, use a shared left axis for same-unit trend comparisons, and update pie sorting examples while preserving missing-category positions and semantic risk ordering. Refresh API guides, English/Chinese package documentation, and demo metadata; retain explicit legacy-style pie comparisons and add regression coverage for the new defaults.

  Verify legend columns and paging alignment with SVG layout anchors across Chromium, Firefox, and WebKit, avoiding false regressions from glyph overhang and browser screen-transform differences.

- Updated dependencies [fba2efa]
- Updated dependencies [7333ad7]
  - @idux/charts-core@1.5.0

## 1.4.0

### Minor Changes

- 5ce1ad3: Add ESM subpath imports for individual chart families and the base chart utilities, so applications can bundle only the chart modules they use.

### Patch Changes

- 6c78c3f: Preserve compatible legend and zoom state across chart reinitialization. Category charts keep historical zoom windows and follow the latest data when a window is pinned to the end.
- 2598246: Reduce repeated missing-data scans when building category line and area charts.
- Updated dependencies [0139b71]
- Updated dependencies [6c78c3f]
  - @idux/charts-core@1.4.0

## 1.3.0

### Minor Changes

- 98141f5: Add an opt-in category layout for bar charts with zoom-aware bar widths, horizontal tracks, separate zero and missing data states, per-point `missingReason`, reference lines behind the bars, and responsive legends.
- 98141f5: Add opt-in category layouts for line and area charts with responsive legends, zoom controls, reference lines, and missing-data markers and bands. Shrinking or clearing data removes generated series and overlays. Tooltip and event callbacks receive the original sample even when the chart draws an interpolated point.

  Page overflowing pie legends by row to keep more categories accessible in compact layouts.

### Patch Changes

- Updated dependencies [98141f5]
  - @idux/charts-core@1.3.0

## 1.2.1

### Patch Changes

- ab38e82: Fix gradient tooltip markers and preserve light and dark tooltip styles when mounting outside the chart. Correct multi-axis and time-axis units, respect injected line themes, and align Gauge, Radar, and rose-chart presentation.
- Updated dependencies [ab38e82]
  - @idux/charts-core@1.2.1

## 1.1.1

### Patch Changes

- 2e89956: Supply stripe image dimensions before decoding so theme reinitialization and hidden containers do not produce invalid SVG patterns.
- 879376a: Add CHART_THEME_TOKEN for reactive application-wide chart themes, with explicit per-chart themes taking precedence.

  Use a dark loading mask for dark chart themes while retaining explicit loading overrides.

  Let chart tooltips inherit theme surfaces, retaining the light Seer background.

- Updated dependencies [879376a]
  - @idux/charts-core@1.2.0

## 1.1.0

### Minor Changes

- 1934758: Add responsive built-in Pie layouts with alignment, paged legends and zero/missing-data presentation, plus explicit layout modes and main-series style overrides. Pie calls without the new layout controls retain 1.0.0 rendering and total calculation; opt into the built-in presentation with `layoutMode: 'auto'` or `align`. Existing explicit geometry and native option overrides retain their compatibility path.

  Expand component guides, demos and packed Vue 2/Vue 3 playground coverage, including cross-version declaration and browser regression tests.

- 887b91a: Add Radar, Gauge and LiquidFill components with pure option builders, public prop types and reactive plot theme/typography configuration. Extend core option types for the new series and coordinate systems.

  Schedule automatic chart resizing on the next animation frame to avoid ResizeObserver delivery loops, and cancel pending resize work when auto-resize is disabled or the chart is disposed.

### Patch Changes

- 34ae7b4: Preserve the built-in Pie radius when a wider legend still fits beside the chart. Reserve the standalone chart inset only when the legend is hidden, avoiding unnecessary shrinking with platform-dependent font widths.
- Updated dependencies [887b91a]
  - @idux/charts-core@1.1.0

## 1.0.0

### Major Changes

- 493c9e8: Release the first stable 1.0.0 versions of the chart packages. This release includes reactive chart updates and lifecycle fixes, inferred component declarations compatible with Vue 2.7 and Vue 3, and public prop types for Vue 2.6 adapters.

### Minor Changes

- 45f7872: Export ChartPublicProps, BarChartPublicProps, LineChartPublicProps, and PieChartPublicProps for component type declarations. These types preserve named props and their optionality without broad index signatures. Existing chart configuration types and runtime behavior remain unchanged.

### Patch Changes

- 45f7872: Fix reactive chart options and event listeners across Vue 2 and Vue 3. Clean up resize observers and striped area observers when charts update or unmount.
- 45f7872: Preserve vue-demi imports and emit component declarations compatible with Vue 2.7 and Vue 3, retaining inferred configuration props, events, scoped slots, and instance bindings. Keep ECharts registration reachable when consumers tree-shake the packaged library.
- Updated dependencies [45f7872]
- Updated dependencies [45f7872]
- Updated dependencies [493c9e8]
- Updated dependencies [45f7872]
  - @idux/charts-core@1.0.0

## 0.7.2

### Patch Changes

- 0.7.2
- Updated dependencies
  - @idux/charts-core@0.7.2

## 0.7.1

### Patch Changes

- 0.7.1
- Updated dependencies
  - @idux/charts-core@0.7.1

## 0.7.0

### Minor Changes

- v0.7.0

### Patch Changes

- Updated dependencies
  - @idux/charts-core@0.7.0

## 0.6.1

### Patch Changes

- v0.6.1
- Updated dependencies
  - @idux/charts-core@0.6.1

## 0.6.0

### Minor Changes

- 0.6.0

### Patch Changes

- Updated dependencies
  - @idux/charts-core@0.6.0

## 0.5.0

### Minor Changes

- 0.5.0

### Patch Changes

- Updated dependencies
  - @idux/charts-core@0.5.0

## 0.4.1

### Patch Changes

- 84c8aeb: the listeners not work in vue2.x
- Updated dependencies [84c8aeb]
  - @idux/charts-core@0.4.1

## 0.4.0

### Minor Changes

- docs(release): publish v0.4.0

### Patch Changes

- Updated dependencies
  - @idux/charts-core@0.4.0

## 0.3.0

### Minor Changes

- 0d08aec: update vite config

### Patch Changes

- Updated dependencies [0d08aec]
  - @idux/charts-core@0.3.0
