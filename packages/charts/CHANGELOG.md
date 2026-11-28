# @idux/charts

## 1.8.1

### Patch Changes

- Updated dependencies [f7ff5c3]
  - @idux/charts-plots@1.8.1
  - @idux/charts-core@1.8.1

## 1.8.0

### Minor Changes

- c722ad6: Add IxAreaChart as a lightweight Line chart wrapper with area fill enabled by default, Area type aliases, and an @idux/charts/area entry.

### Patch Changes

- Updated dependencies [c722ad6]
  - @idux/charts-plots@1.8.0
  - @idux/charts-core@1.8.0

## 1.7.0

### Minor Changes

- 2d1086a: Add `IxBulletChart` and `createBulletOption` for comparing actual values, targets, and qualitative ranges.

  - Import the component, option builder, and public types from `@idux/charts`, `@idux/charts/bullet`, or `@idux/charts-plots`. Include Vue global-component declarations for `IxBulletChart`.
  - Use `value` and `target` for a single indicator, or supply `data` for grouped rows. Supplying `data` selects grouped mode even for an empty array or a single row. Support `horizontal` and `horizontal-above` grouped layouts, with full-name tooltips for truncated categories.
  - Configure qualitative ranges with increasing numeric `upper` bounds, optional colors and labels, and an explicit scale through `xAxis.min` / `xAxis.max`. Keep actual bars, tracks, target markers, and range guides aligned with native axis direction and bar widths.
  - Distinguish valid zero values from missing measurements. Missing actual values use a missing-data background while valid targets remain visible. `zeroText` is opt-in; the above-label layout suppresses zero-value labels while retaining tracks and targets.
  - Support native bar labels, formatters, styles, emphasis, selection, marks, and tooltip overrides. Preserve the grouped zoom window during data refreshes, and follow appended categories when the current window is at the end.
  - Integrate reactive plot themes, light/dark loading illustrations, default overlay slots, and the shared chart lifecycle. Export `getLinearColor` and `getLinearColors` through the aggregate plots entry for matching custom gradients.

  Range bounds use measurement units rather than normalized ratios. Invalid scales or ranges emit actionable diagnostics and clear generated series. The built-in layout uses a horizontal value axis and vertical category axis; supply native `series` to replace the generated series for other arrangements. Add API guidance and single/grouped examples for Vue 2 and Vue 3 consumers.

- 2d1086a: Add `createMapTransition(getChart, options?)` for animated map drilldown and return navigation.

  - Export the helper and `MapTransition`, `MapTransitionDirection`, and `MapTransitionOptions` types from the aggregate chart entries and `@idux/charts/map`.
  - Use `run('drilldown' | 'back', update)` to commit prepared map and data changes between native camera transitions and a canvas fade. Await reactive rendering inside `update`; each phase defaults to 480ms, and the cover follows chart resizing and the effective background.
  - Return a completion boolean, cancel superseded runs, and expose `cancel()` and `dispose()` for application lifecycle cleanup. Remove temporary covers, listeners, and timers, and restore phase viewport and animation settings on cancellation or failure. Reject callback/update failures without leaving transition resources behind.
  - Apply changes directly when the chart or first `geo` is unavailable, duration is zero, animation is disabled, or reduced motion is requested. Preserve the new map's final camera and animation settings after a completed transition.
  - Add a China province/city drilldown demo with lazy-loaded boundaries from `@idux/geo-areas`, and refresh world density/status and China route examples with geometry from the same package, updated attribution, and API guidance.

  The helper operates on the first `geo`. Load and register geometry and finish asynchronous requests before starting a transition; application code owns hierarchy, navigation, and stale-response handling. Cancellation does not roll back an `update` that has already started. Dispose the helper on unmount. The geometry dependency belongs to the documentation site and is not added to the published chart packages.

- 2d1086a: Add `IxWordCloudChart` and `createWordCloudOption`, built on native ECharts graph series without an additional word-cloud plugin.

  - Export the component, builder, public props, data-item, shape, and motion types from `@idux/charts`, `@idux/charts/word-cloud`, and `@idux/charts-plots`. Add Vue global-component declarations and include `GraphSeriesOption` in the core `ChartOption` series union.
  - Render weighted horizontal text, rectangular tags, or circles with configurable `sizeRange`, `gap`, and rectangular background `overlap`. Measure labels and state geometry, prioritize higher weights in crowded containers, and omit items that do not fit without silently shrinking explicit sizes.
  - Support native categories, palettes, labels, item styles, tooltips, emphasis, selection, and graph-node events. Keep event indices tied to the original input. Preserve selection by stable item identity and retain positions for appearance-only changes; remeasure after container or asynchronous font changes.
  - Add opt-in floating `motion`, with amplitude, axis ratio, duration, and pause-on-hover controls. Reserve movement space and respect reduced-motion preferences and disabled animation. Native entry/update transitions remain separately configurable.
  - Integrate reactive plot themes, light/dark loading illustrations, default overlay slots, and shared instance methods. Add examples for text, tags, circles, motion, search highlighting, and native options.

  Use finite non-negative weights and non-empty names; zero is valid. Invalid items are skipped, invalid layout settings or duplicate explicit IDs clear generated series, and invalid motion settings disable floating. Empty or unplaceable data leaves an empty canvas for caller-provided slot content. Native selection uses names, so duplicate names share selection; provide distinct names when independent selection is required.

  The built-in layout supports horizontal labels rather than pixel-level glyph packing, image masks, arbitrary outlines, or force layouts. It does not support dataset/encode, axes, dataZoom, links, dragging, or roaming. `createWordCloudOption` requires the extensions registered by the component entry; direct builder consumers should resize after fonts load. Supplying native `series` replaces all generated series.

### Patch Changes

- 2d1086a: Improve horizontal category labels and zero-value presentation in built-in Bar layouts.

  - Show full category names on label hover, including rows with missing or all-zero measurements. Keep default truncation within the category label width, escape HTML label content, and support native rich-text tooltips. Honor custom axis tooltips and allow opting out with `yAxis.triggerEvent: false`.
  - Constrain shared HTML tooltip titles and category text to the viewport and wrap long names, with an 18px title line height. Import `@idux/charts/dist/style.css` to apply these shared tooltip styles.
  - In `horizontal-above`, hide numeric labels for zero values and suppress the central all-zero message so the category rows remain readable. Preserve missing-value styling and the existing `zeroText` behavior in other category layouts.

  The same category-label tooltip behavior is available in the new grouped Bullet chart. Update API guidance and add regression coverage for long labels, missing values, all-zero data, and tooltip overrides.

- Updated dependencies [2d1086a]
- Updated dependencies [2d1086a]
- Updated dependencies [2d1086a]
- Updated dependencies [2d1086a]
  - @idux/charts-plots@1.7.0
  - @idux/charts-core@1.7.0

## 1.6.1

### Patch Changes

- Updated dependencies [cc8b790]
  - @idux/charts-core@1.6.1
  - @idux/charts-plots@1.6.1

## 1.6.0

### Patch Changes

- Updated dependencies [dd3f55f]
  - @idux/charts-core@1.6.0
  - @idux/charts-plots@1.6.0

## 1.5.1

### Patch Changes

- 3326895: Require lodash-es 4.18.1 or later and ECharts 6.1.0 or later on the ECharts 6 compatibility line. Update Vue 2/3 playgrounds and packed-consumer tests to the patched dependency versions while retaining Vue 2.6 and legacy ECharts 5 compatibility coverage.
- Updated dependencies [3326895]
  - @idux/charts-core@1.5.1
  - @idux/charts-plots@1.5.1

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

- Updated dependencies [b5b4884]
- Updated dependencies [fba2efa]
- Updated dependencies [7333ad7]
  - @idux/charts-plots@1.5.0
  - @idux/charts-core@1.5.0

## 1.4.0

### Minor Changes

- 5ce1ad3: Add ESM subpath imports for individual chart families and the base chart utilities, so applications can bundle only the chart modules they use.

### Patch Changes

- Updated dependencies [0139b71]
- Updated dependencies [5ce1ad3]
- Updated dependencies [6c78c3f]
- Updated dependencies [2598246]
  - @idux/charts-core@1.4.0
  - @idux/charts-plots@1.4.0

## 1.3.0

### Patch Changes

- 98141f5: Keep tooltip rows at 32px and vertically center their labels and values when the host page has no box-sizing reset.
- Updated dependencies [98141f5]
- Updated dependencies [98141f5]
- Updated dependencies [98141f5]
  - @idux/charts-plots@1.3.0
  - @idux/charts-core@1.3.0

## 1.2.1

### Patch Changes

- ab38e82: Fix gradient tooltip markers and preserve light and dark tooltip styles when mounting outside the chart. Correct multi-axis and time-axis units, respect injected line themes, and align Gauge, Radar, and rose-chart presentation.
- Updated dependencies [ab38e82]
  - @idux/charts-core@1.2.1
  - @idux/charts-plots@1.2.1

## 1.1.1

### Patch Changes

- Updated dependencies [2e89956]
- Updated dependencies [879376a]
  - @idux/charts-plots@1.1.1
  - @idux/charts-core@1.2.0

## 1.1.0

### Minor Changes

- 1934758: Add responsive built-in Pie layouts with alignment, paged legends and zero/missing-data presentation, plus explicit layout modes and main-series style overrides. Pie calls without the new layout controls retain 1.0.0 rendering and total calculation; opt into the built-in presentation with `layoutMode: 'auto'` or `align`. Existing explicit geometry and native option overrides retain their compatibility path.

  Expand component guides, demos and packed Vue 2/Vue 3 playground coverage, including cross-version declaration and browser regression tests.

- 887b91a: Add Radar, Gauge and LiquidFill components with pure option builders, public prop types and reactive plot theme/typography configuration. Extend core option types for the new series and coordinate systems.

  Schedule automatic chart resizing on the next animation frame to avoid ResizeObserver delivery loops, and cancel pending resize work when auto-resize is disabled or the chart is disposed.

### Patch Changes

- 34ae7b4: Preserve the built-in Pie radius when a wider legend still fits beside the chart. Reserve the standalone chart inset only when the legend is hidden, avoiding unnecessary shrinking with platform-dependent font widths.
- Updated dependencies [1934758]
- Updated dependencies [34ae7b4]
- Updated dependencies [887b91a]
  - @idux/charts-plots@1.1.0
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
  - @idux/charts-plots@1.0.0

## 0.7.2

### Patch Changes

- 0.7.2
- Updated dependencies
  - @idux/charts-core@0.7.2
  - @idux/charts-plots@0.7.2

## 0.7.1

### Patch Changes

- 0.7.1
- Updated dependencies
  - @idux/charts-core@0.7.1
  - @idux/charts-plots@0.7.1

## 0.7.0

### Minor Changes

- v0.7.0

### Patch Changes

- Updated dependencies
  - @idux/charts-core@0.7.0
  - @idux/charts-plots@0.7.0

## 0.6.1

### Patch Changes

- v0.6.1
- Updated dependencies
  - @idux/charts-core@0.6.1
  - @idux/charts-plots@0.6.1

## 0.6.0

### Minor Changes

- 0.6.0

### Patch Changes

- Updated dependencies
  - @idux/charts-core@0.6.0
  - @idux/charts-plots@0.6.0

## 0.5.0

### Minor Changes

- 0.5.0

### Patch Changes

- Updated dependencies
  - @idux/charts-core@0.5.0
  - @idux/charts-plots@0.5.0

## 0.4.1

### Patch Changes

- Updated dependencies [84c8aeb]
  - @idux/charts-plots@0.4.1
  - @idux/charts-core@0.4.1

## 0.4.0

### Minor Changes

- docs(release): publish v0.4.0

### Patch Changes

- Updated dependencies
  - @idux/charts-core@0.4.0
  - @idux/charts-plots@0.4.0

## 0.3.0

### Minor Changes

- 0d08aec: update vite config

### Patch Changes

- Updated dependencies [0d08aec]
  - @idux/charts-plots@0.3.0
  - @idux/charts-core@0.3.0
