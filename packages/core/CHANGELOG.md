# @idux/charts-core

## 1.6.0

### Minor Changes

- dd3f55f: Add default overlay slots to `IxChart` and all Plot components: `IxBarChart`, `IxLineChart`, `IxPieChart`, `IxRadarChart`, `IxGaugeChart`, `IxLiquidFillChart`, and `IxMapChart`.

  - Place empty states, explanatory text, actions, or other custom content above a chart through its default slot. Slot content automatically fills the chart's content area and supports Vue 2 and Vue 3.
  - Keep the chart mounted while displaying or updating slot content, preserving its instance and interaction state. Empty slots, conditional comments, and blank text do not create a blocking overlay.
  - Preserve chart sizing with container padding, minimum heights, explicit dimensions, and responsive flex/grid layouts. The canvas and overlay stay within the same content box.
  - Preserve the last viewport while a chart is hidden, preventing map transform errors when resizing or rebuilding for a theme change. Automatic resizing resumes when the chart becomes visible.

  Update the chart examples to use overlay slots for empty states, and consolidate shared properties, slot usage, and chart lifecycle guidance in the base chart API documentation.

## 1.5.1

### Patch Changes

- 3326895: Require lodash-es 4.18.1 or later and ECharts 6.1.0 or later on the ECharts 6 compatibility line. Update Vue 2/3 playgrounds and packed-consumer tests to the patched dependency versions while retaining Vue 2.6 and legacy ECharts 5 compatibility coverage.

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

## 1.4.0

### Minor Changes

- 0139b71: Forward role, ARIA, tab order, and data attributes to the chart container for accessible labels, descriptions, and keyboard integration.

### Patch Changes

- 6c78c3f: Preserve compatible legend and zoom state across chart reinitialization. Category charts keep historical zoom windows and follow the latest data when a window is pinned to the end.

## 1.3.0

### Patch Changes

- 98141f5: Use an English fallback for the built-in loading overlay. Applications can provide localized text through `loading.text`.

## 1.2.1

### Patch Changes

- ab38e82: Fix gradient tooltip markers and preserve light and dark tooltip styles when mounting outside the chart. Correct multi-axis and time-axis units, respect injected line themes, and align Gauge, Radar, and rose-chart presentation.

## 1.2.0

### Minor Changes

- 879376a: Add CHART_THEME_TOKEN for reactive application-wide chart themes, with explicit per-chart themes taking precedence.

  Use a dark loading mask for dark chart themes while retaining explicit loading overrides.

  Let chart tooltips inherit theme surfaces, retaining the light Seer background.

## 1.1.0

### Minor Changes

- 887b91a: Add Radar, Gauge and LiquidFill components with pure option builders, public prop types and reactive plot theme/typography configuration. Extend core option types for the new series and coordinate systems.

  Schedule automatic chart resizing on the next animation frame to avoid ResizeObserver delivery loops, and cancel pending resize work when auto-resize is disabled or the chart is disposed.

## 1.0.0

### Major Changes

- 493c9e8: Release the first stable 1.0.0 versions of the chart packages. This release includes reactive chart updates and lifecycle fixes, inferred component declarations compatible with Vue 2.7 and Vue 3, and public prop types for Vue 2.6 adapters.

### Minor Changes

- 45f7872: Export ChartPublicProps, BarChartPublicProps, LineChartPublicProps, and PieChartPublicProps for component type declarations. These types preserve named props and their optionality without broad index signatures. Existing chart configuration types and runtime behavior remain unchanged.

### Patch Changes

- 45f7872: Fix reactive chart options and event listeners across Vue 2 and Vue 3. Clean up resize observers and striped area observers when charts update or unmount.
- 45f7872: Preserve vue-demi imports and emit component declarations compatible with Vue 2.7 and Vue 3, retaining inferred configuration props, events, scoped slots, and instance bindings. Keep ECharts registration reachable when consumers tree-shake the packaged library.

## 0.7.2

### Patch Changes

- 0.7.2

## 0.7.1

### Patch Changes

- 0.7.1

## 0.7.0

### Minor Changes

- v0.7.0

## 0.6.1

### Patch Changes

- v0.6.1

## 0.6.0

### Minor Changes

- 0.6.0

## 0.5.0

### Minor Changes

- 0.5.0

## 0.4.1

### Patch Changes

- 84c8aeb: the listeners not work in vue2.x

## 0.4.0

### Minor Changes

- docs(release): publish v0.4.0

## 0.3.0

### Minor Changes

- 0d08aec: update vite config
