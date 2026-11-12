# @idux/charts-plots

English | [简体中文](README.zh.md)

The preset chart layer of iDux Charts, providing six chart components and option helpers built on `@idux/charts-core`.

For the unified entry point and shared tooltip styles, use [`@idux/charts`](https://github.com/IDuxFE/idux-charts/blob/main/packages/charts/README.md).

## Installation

```bash
npm install @idux/charts-plots echarts
```

Supports Vue 2 (including Vue 2.6) and Vue 3. Use in an existing Vue project with peer dependencies Vue `^2.6.0 || ^3.2.5` and ECharts `^5.4.3 || ^6.0.0`. Vue 2.6 also requires `@vue/composition-api >=1.6.2` and plugin registration before creating the application.

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

| Component           | Chart            |
| ------------------- | ---------------- |
| `IxBarChart`        | Bar              |
| `IxLineChart`       | Line and area    |
| `IxPieChart`        | Pie and doughnut |
| `IxRadarChart`      | Radar            |
| `IxGaugeChart`      | Gauge            |
| `IxLiquidFillChart` | Liquid fill      |

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

## Configuration and themes

- `useBarOption`, `useLineOption`, and `usePieOption` provide composable options; `createRadarOption`, `createGaugeOption`, and `createLiquidFillOption` are pure option builders.
- Use Vue `provide` with `BAR_CHART_TOKEN`, `LINE_CHART_TOKEN`, or `PIE_CHART_TOKEN` to set defaults for the corresponding native and built-in layouts.
- Category Bar, Line / Area, automatic Pie, Radar, Gauge, and LiquidFill support `plotTheme`. Provide reactive defaults with `PLOT_THEME_TOKEN`, or pass `plotTheme` explicitly to a pure option builder.
- Option objects merge by field and arrays replace in full. Every chart component exposes `getEChartsInstance()` on its template ref.

Shared HTML tooltip styles live in `@idux/charts/dist/style.css`; import them once in the application entry point. This package does not emit CSS itself. To use these styles, install `@idux/charts` and import that stylesheet, or supply equivalent application styles.

- All plots inherit `CHART_THEME_TOKEN` from `@idux/charts-core` (also re-exported by `@idux/charts`). Explicit ECharts `theme` props override this default; switching it recreates the chart and restores compatible zoom ranges and legend selections. Pair it with `PLOT_THEME_TOKEN` for generated labels and graphics.

When data is appended and the zoom configuration is unchanged, category Bar, Line, and Area charts keep the historical window. A window at the end follows the newest data and keeps the same number of points. A full-range view continues to show all data.

Chart components forward `role`, `aria-*`, `tabindex`, and `data-*` to the chart container.

## Custom tooltips

Call `useTooltipsFormatter(title, rows, rowsPerColumn?)` from `tooltip.formatter` to reuse the built-in HTML layout. `getTooltipsColor(color)` resolves a solid swatch, and `useStripeBarTooltip(unit)` returns tooltip options for native striped bars. Import these helpers from `@idux/charts` or `@idux/charts-core`.

[See the signatures and complete formatter example](https://github.com/IDuxFE/idux-charts/blob/main/packages/site/src/components/core/API.tab.md#自定义-tooltip).

## TypeScript

`*ChartProps` types describe chart configuration and allow extension fields. `*ChartPublicProps` expose named public properties while preserving their types and optionality for component type adapters. See the [repository README](https://github.com/IDuxFE/idux-charts/blob/main/README.md#typescript-prop-types) for adapter details.

## Documentation

- [iDux Charts](https://charts.idux.site)
- [Configuration guide](https://github.com/IDuxFE/idux-charts/blob/main/packages/site/src/0-guide/GettingStarted.page.md)
- [Vue 2 / Vue 3 playgrounds](https://github.com/IDuxFE/idux-charts/blob/main/playgrounds/README.md)
- [Repository and development](https://github.com/IDuxFE/idux-charts/blob/main/README.md)

## License

MIT © 2023-present IDuxFE
