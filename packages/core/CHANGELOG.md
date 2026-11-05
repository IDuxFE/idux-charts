# @idux/charts-core

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
