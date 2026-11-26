# @idux/charts-plots

English | [简体中文](README.zh.md)

The preset chart layer of iDux Charts, providing nine chart components and option helpers built on `@idux/charts-core`.

For the unified entry point and shared tooltip styles, use [`@idux/charts`](https://github.com/IDuxFE/idux-charts/blob/main/packages/charts/README.md).

## Installation

```bash
npm install @idux/charts-plots echarts
```

Supports Vue 2 (including Vue 2.6) and Vue 3. Use in an existing Vue project with peer dependencies Vue `^2.6.0 || ^3.2.5` and ECharts `^5.4.3 || ^6.1.0`. Vue 2.6 also requires `@vue/composition-api >=1.6.2` and plugin registration before creating the application.

```bash
npm install @vue/composition-api
```

```ts
// Vue 2.6
import Vue from 'vue'
import VueCompositionAPI from '@vue/composition-api'

Vue.use(VueCompositionAPI)
```

## Chart components

| Component           | Chart                            |
| ------------------- | -------------------------------- |
| `IxBarChart`        | Bar                              |
| `IxLineChart`       | Line and area                    |
| `IxPieChart`        | Pie and doughnut                 |
| `IxRadarChart`      | Radar                            |
| `IxGaugeChart`      | Gauge                            |
| `IxBulletChart`     | Bullet (single and grouped)      |
| `IxWordCloudChart`  | Word cloud (text, tags, bubbles) |
| `IxMapChart`        | Map (regions, nodes, routes)     |
| `IxLiquidFillChart` | Liquid fill                      |

Register geometry with `registerMap(name, geoJSON)` before rendering `IxMapChart`. Compose native `geo`, `series`, and `visualMap` options; optional `createMapRegions`, `createMapNodes`, `createMapLines`, and `createMapVisualMap` helpers return ordinary ECharts configuration. There is no `mode` prop. Geometry assets are managed by the application and excluded from the library bundle. Use `validateMapData({ nodes, routes, regions })` to inspect invalid coordinates, unresolved endpoints, and duplicate identities before generating options.

Word cloud layouts use native graph nodes and preserve scalar weights, category styles, selection and common chart controls. See the [component API](https://charts.idux.site/components/word-cloud) for sizing, optional motion and collision boundaries.

## Quick start

This example uses Vue 3 `<script setup>` with a locally imported component. The container must have a nonzero width and height.

```vue
<script setup lang="ts">
import { IxLineChart, type LineChartProps } from '@idux/charts-plots'

const data = [123, 324, 156, 244, 188]
const option: LineChartProps = {
  xAxis: { data: ['Mon', 'Tue', 'Wed', 'Thu', 'Fri'] },
}
</script>

<template>
  <div style="height: 320px">
    <IxLineChart :data="data" v-bind="option" />
  </div>
</template>
```

Chart components register their required ECharts modules. Global registration is also supported: use `app.use(IxLineChart)` in Vue 3 or `Vue.use(IxLineChart)` in Vue 2.

To import individual chart families in an ESM build, use the [`@idux/charts` subpaths](https://github.com/IDuxFE/idux-charts/blob/main/packages/charts/README.md#quick-start), such as `@idux/charts/line`.

## Default slot

All Plot components accept a default overlay slot that fills the chart. Control empty-state visibility with `v-if`; the chart instance stays mounted. An `IxEmpty` description is sufficient when no retry action is needed. Add a background and remove margins to cover the underlying chart.

```vue
<IxBarChart :categories="categories" :data="data" style="height: 300px">
  <IxEmpty v-if="isEmpty" simple description="No data" class="chart-empty" />
</IxBarChart>
```

```css
.chart-empty {
  /* Remove the Empty component margins so the background covers the whole chart. */
  margin: 0;
  background: var(--ix-color-container-bg);
}
```

The slot does not hide or clear the underlying chart. Transparent content remains visible alongside the chart, but the overlay receives pointer events by default. For annotations, set `.ix-chart-overlay { pointer-events: none; }` and restore `pointer-events: auto` on interactive elements. In scoped styles, target the overlay with `:deep(.ix-chart-overlay)`. Slot content is excluded from ECharts image exports. The background variable above comes from the iDux component theme; an application background color also works.

## Configuration and themes

- `useBarOption`, `useLineOption`, and `usePieOption` provide composable options; `createRadarOption`, `createGaugeOption`, `createLiquidFillOption`, `createBulletOption`, and `createMapOption` are pure option builders.
- Use Vue `provide` with `BAR_CHART_TOKEN`, `LINE_CHART_TOKEN`, or `PIE_CHART_TOKEN` to set defaults for the corresponding native and built-in layouts.
- Category Bar, Line / Area, automatic Pie, Radar, Gauge, Bullet, LiquidFill, and Map support `plotTheme`. Provide reactive defaults with `PLOT_THEME_TOKEN`, or pass `plotTheme` explicitly to a pure option builder.
- Option objects merge by field and arrays replace in full. Every chart component exposes `getEChartsInstance()` on its template ref.

Shared HTML tooltip styles live in `@idux/charts/dist/style.css`; import them once in the application entry point. This package does not emit CSS itself. To use these styles, install `@idux/charts` and import that stylesheet, or supply equivalent application styles.

- All plots inherit `CHART_THEME_TOKEN` from `@idux/charts-core` (also re-exported by `@idux/charts`). Explicit ECharts `theme` props override this default; switching it recreates the chart and restores compatible zoom ranges and legend selections. Pair it with `PLOT_THEME_TOKEN` for generated labels and graphics.

When data is appended and the zoom configuration is unchanged, category Bar, Line, and Area charts keep the historical window. A window at the end follows the newest data and keeps the same number of points. A full-range view continues to show all data.

Maps preserve compatible geo zoom and center across data refreshes, series cleanup, and theme rebuilds. Use stable `geo.id` values for multiple maps; new geometry, projection, or explicit viewport settings take precedence. Map data helpers do not read injected themes: pass `plotTheme` explicitly and regenerate when data or themes change.

Chart components forward `role`, `aria-*`, `tabindex`, and `data-*` to the chart container.

## Loading

All Plot components support `:loading="pending"` and automatically select horizontal/vertical bar, line/area, pie/ring/rose, radar, gauge, liquid fill, or map illustrations with light and dark palettes. Loading retains the chart instance and data, so applications do not need custom placeholders.

Pass `pending && { text: 'Updating...' }` to customize the message. See [Core loading](https://github.com/IDuxFE/idux-charts/blob/main/packages/core/README.md#loading) for all options and image export limitations.

## Visual defaults

Built-in Plots use rectangular category swatches with 1px rounded corners; the `seer` theme uses the same swatch. Seer light tooltips use `rgba(251, 253, 255, 0.72)`, and the shared HTML tooltip stylesheet adds a 4px backdrop blur. Customize native legend swatches with `legend.icon`, or supply category legend entries and icons through `legend.data`. Explicit `tooltip.backgroundColor` takes precedence.

Automatic multi-row legends for category Bar and Line/Area charts use a 16px row gap. Automatic Pie layouts use a base gap of 20px for up to three initial rows per column and 16px for more rows, scaled to the layout height; explicit `legend.itemGap` is not scaled. Horizontal names at the top of right Y axes in Line/Area charts align with the left edge of the tick labels unless overridden.

Bar value labels default to `top` for basic vertical bars and `right` for basic horizontal bars, including `horizontal-above`. Grouped bars hide labels. Stacked bars show one total of visible series per category, at the top for vertical stacks and at the right end for horizontal stacks. Override these defaults with `label` or `series[].label`. In dark `horizontal-above` layouts, value labels use opaque `#B2B8C2`; explicit `label.color` takes precedence.

## Custom tooltips

Call `useTooltipsFormatter(title, rows, rowsPerColumn?)` from `tooltip.formatter` to reuse the built-in HTML layout. `getTooltipsColor(color)` resolves a solid swatch, and `useStripeBarTooltip(unit)` returns tooltip options for native striped bars. Import these helpers from `@idux/charts` or `@idux/charts-core`.

[See the signatures and complete formatter example](https://github.com/IDuxFE/idux-charts/blob/main/packages/site/src/components/core/API.md#自定义-tooltip).

## TypeScript

`*ChartProps` types describe chart configuration and allow extension fields. `*ChartPublicProps` expose named public properties while preserving their types and optionality for component type adapters. See the [repository README](https://github.com/IDuxFE/idux-charts/blob/main/README.md#typescript-prop-types) for adapter details.

## Documentation

- [iDux Charts](https://charts.idux.site)
- [Configuration guide](https://github.com/IDuxFE/idux-charts/blob/main/packages/site/src/0-guide/GettingStarted.page.md)
- [Vue 2 / Vue 3 playgrounds](https://github.com/IDuxFE/idux-charts/blob/main/playgrounds/README.md)
- [Repository and development](https://github.com/IDuxFE/idux-charts/blob/main/README.md)

## License

MIT © 2023-present IDuxFE
