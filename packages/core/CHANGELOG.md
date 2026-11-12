# @idux/charts-core

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
