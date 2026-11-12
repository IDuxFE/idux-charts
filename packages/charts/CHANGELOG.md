# @idux/charts

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
