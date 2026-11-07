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

## Configuration and themes

- `useBarOption`, `useLineOption`, and `usePieOption` provide composable options; `createRadarOption`, `createGaugeOption`, and `createLiquidFillOption` are pure option builders.
- Use Vue `provide` with `BAR_CHART_TOKEN`, `LINE_CHART_TOKEN`, or `PIE_CHART_TOKEN` for shared chart configuration.
- Pie automatic layout, Radar, Gauge, and LiquidFill support `plotTheme`. Provide reactive shared defaults with `PLOT_THEME_TOKEN`; pure option builders require an explicit `plotTheme`.
- All charts support the ECharts `theme`. Bar and Line use ECharts styling options and do not consume `plotTheme`.

Shared HTML tooltip styles live in `@idux/charts/dist/style.css`; import them once in the application entry point. This package does not emit CSS itself. To use these styles, install `@idux/charts` and import that stylesheet, or supply equivalent application styles.

## TypeScript

`*ChartProps` types describe chart configuration and allow extension fields. `*ChartPublicProps` expose named public properties while preserving their types and optionality for component type adapters. See the [repository README](https://github.com/IDuxFE/idux-charts/blob/main/README.md#typescript-prop-types) for adapter details.

## Documentation

- [iDux Charts](https://charts.idux.site)
- [Configuration guide](https://github.com/IDuxFE/idux-charts/blob/main/packages/site/src/0-guide/GettingStarted.page.md)
- [Vue 2 / Vue 3 playgrounds](https://github.com/IDuxFE/idux-charts/blob/main/playgrounds/README.md)
- [Repository and development](https://github.com/IDuxFE/idux-charts/blob/main/README.md)

## License

MIT © 2023-present IDuxFE
