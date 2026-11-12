# @idux/charts-core

English | [简体中文](README.zh.md)

The foundation of iDux Charts: the generic `IxChart` component, chart lifecycle composables, themes, types, and utilities. Use it for direct ECharts options or custom chart components.

For the unified entry point and shared tooltip styles, use [`@idux/charts`](https://github.com/IDuxFE/idux-charts/blob/main/packages/charts/README.md).

## Installation

```bash
npm install @idux/charts-core echarts
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

## Quick start

This example uses Vue 3 `<script setup>` with a locally imported component. The container must have a nonzero width and height.

```vue
<script setup lang="ts">
import { use } from 'echarts/core'
import { LineChart } from 'echarts/charts'
import { IxChart, type ChartProps } from '@idux/charts-core'

use([LineChart])

const option: ChartProps = {
  xAxis: { type: 'category', data: ['Mon', 'Tue', 'Wed', 'Thu', 'Fri'] },
  yAxis: { type: 'value' },
  series: [{ type: 'line', data: [123, 324, 156, 244, 188] }],
}
</script>

<template>
  <div style="height: 320px">
    <IxChart v-bind="option" />
  </div>
</template>
```

`IxChart` takes ECharts options directly through `v-bind`, rather than a separate `option` prop. It registers the SVG renderer, Grid, Legend, Tooltip, Title, DataZoom, LabelLayout, and UniversalTransition. Register custom series or additional components with `use` from `echarts/core`. For Canvas, also register `CanvasRenderer` and pass `initOption: { renderer: 'canvas' }`.

## Core API

- `IxChart` supports `autoResize` (enabled by default), `chartBackgroundColor`, `loading`, `theme`, `group`, `initOption`, `setOptionOpts`, and `onReady`. Call `getEChartsInstance()` on the mounted template ref. Changing `setOptionOpts` alone reapplies the current option. Use `title: null` to remove the title.
- `useChart(options, listeners?)`: manages initialization, reactive updates, events, resizing, and disposal. Call it in component `setup`; it returns `containerRef` and `chartRef`.
- `seerTheme`: the built-in theme, registered as the default theme `seer`.
- `useTooltipsFormatter` accepts plain text and escapes it when generating tooltip HTML.
- `useReactiveAttrs`, `createInstall`, and `withChartProps` support custom chart development.
- `ChartProps`, `ChartPublicProps`, and `ChartOption`: public configuration types.

This package does not ship a separate CSS file. Shared HTML tooltip styles are provided by `@idux/charts/dist/style.css`.

## Application themes

Use `CHART_THEME_TOKEN` to provide an application-wide theme name/object or a reactive ref. Explicit `theme` props override it; otherwise charts fall back to `seer`. Changing the inherited theme recreates the chart, following the existing theme lifecycle. For generated plot labels and graphics, also configure `PLOT_THEME_TOKEN` from `@idux/charts-plots` (or `@idux/charts`).

## TypeScript

`*ChartProps` types describe chart configuration and allow extension fields. `*ChartPublicProps` expose named public properties while preserving their types and optionality for component type adapters. See the [repository README](https://github.com/IDuxFE/idux-charts/blob/main/README.md#typescript-prop-types) for adapter details.

## Documentation

- [iDux Charts](https://charts.idux.site)
- [Configuration guide](https://github.com/IDuxFE/idux-charts/blob/main/packages/site/src/0-guide/GettingStarted.page.md)
- [Vue 2 / Vue 3 playgrounds](https://github.com/IDuxFE/idux-charts/blob/main/playgrounds/README.md)
- [Repository and development](https://github.com/IDuxFE/idux-charts/blob/main/README.md)

## License

MIT © 2023-present IDuxFE
