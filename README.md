<h1 align="center">iDux Charts</h1>

> [ECharts](https://echarts.apache.org/) for `Vue`, both `v2.x` and `v3.x`, see [documentation](https://charts.idux.site) for more.

English | [简体中文](README.zh.md)

## 📦 Installation

```bash
npm install echarts @idux/charts
```

Requires Vue `^2.6.0 || ^3.2.5` and ECharts `^5.4.3 || ^6.0.0`. Vue 2.6 additionally requires `@vue/composition-api >=1.6.2`; Vue 2.7 and Vue 3 do not require this plugin.

To make `@idux/charts` work for Vue 2.x(< 2.7), you need to have `@vue/composition-api` installed:

```sh
npm install @vue/composition-api
```

## 🔨 Usage

```ts
// vue@2.x(< 2.7)
// import { createApp } from "@vue/composition-api";
import { createApp } from 'vue'
import { IxChart, IxLineChart } from '@idux/charts'

const app = createApp(App)
app.use(IxChart).use(IxLineChart)
```

```vue
<script setup lang="ts">
import { type LineChartProps } from '@idux/charts'

const data = [123, 324, 156, 244, 188]

const lineOption: LineChartProps = {
  xAxis: {
    data: ['Mon', 'Tue', 'Wed', 'Thu', 'Fri'],
  },
}
</script>
<template>
  <IxLineChart :data="data" v-bind="lineOption" />
</template>
```

See [Getting Started](https://idux.site/guide/getting-started/en) for more details.

### TypeScript prop types

For Vue 2.6 component type adapters, import `ChartPublicProps`, `BarChartPublicProps`, `LineChartPublicProps`, and `PieChartPublicProps` from `@idux/charts`:

```ts
import type { LineChartPublicProps } from '@idux/charts'

const lineProps: LineChartPublicProps = {
  autoResize: true,
  smooth: true,
  data: [123, 324, 156],
}
```

The existing `*ChartProps` types continue to accept extension fields. Each `*ChartPublicProps` type derives from its corresponding configuration type, removes broad index signatures, and preserves named property types and optionality. It does not resolve defaults or include HTML attributes. This distinction describes open configuration versus named public props, rather than Vue's resolved internal props versus caller-facing props.

Default component declarations retain `vue-demi` imports and the existing configuration prop types. The `*ChartPublicProps` aliases are provided separately for Vue 2.6 adapters; they do not replace the default component declarations. Vue 2.6 projects can use them in their existing `DefineComponent` adapters without implementing index-signature filtering themselves.

Default component declarations target Vue 2.7 and Vue 3 and preserve inferred events, scoped slots, and instance bindings. Vue 2.7 exposes scoped slot functions through `$scopedSlots`; Vue 3 uses `$slots`. Vue 2.6 adapters retain their own component declarations and `skipLibCheck: true`; the prop aliases do not make the default component declarations native Vue 2.6 declarations.

## ⌨️ Development

Requires Node.js 22.14+ (22.x), 24.x or 26+, and pnpm 10+. CI uses Node.js 22.14.0 and pnpm 11.8.0.

```bash
pnpm install

pnpm start
```

Open a browser: `http://localhost:8080/`

See [CI and releases](.github/RELEASING.md) for checks, changesets, and automated npm publishing.

## 🤝 Contributing

[![PRs Welcome](https://img.shields.io/badge/PRs-welcome-brightgreen.svg)](https://github.com/IDuxFE/idux-charts/pulls)

We welcome all contributions. Please read our [CONTRIBUTING.md](https://github.com/IDuxFE/idux/blob/main/packages/site/src/docs/Contributing.en.md) first. You can submit any ideas as [Pull Request](https://github.com/IDuxFE/idux-charts/pulls) or as [GitHub issues](https://github.com/IDuxFE/idux-charts/issues).

> If you're new to posting issues, we ask that you read [_How To Ask Questions The Smart Way_](http://www.catb.org/~esr/faqs/smart-questions.html) (**This guide does not provide actual support services for this project!**), [How to Ask a Question in Open Source Community](https://github.com/seajs/seajs/issues/545) and [How to Report Bugs Effectively](http://www.chiark.greenend.org.uk/~sgtatham/bugs.html) prior to posting. Well written bug reports help us help you!

## ☀️ License

[MIT](https://github.com/IDuxFE/idux/blob/main/LICENSE) © 2023-present IDuxFE

### Visual customization

Pie built-in layout, Radar, Gauge and LiquidFill accept `plotTheme`; provide `PLOT_THEME_TOKEN` with a reactive object/ref for shared defaults. Gauge/LiquidFill expose `valueTextStyle` and `labelTextStyle`, and LiquidFill also exposes `unitTextStyle`. Existing explicit styling props keep precedence. Pie adds `layoutMode: 'auto' | 'native'` and main-series-only `seriesStyle`; omitting them preserves existing behavior. Bar, Line and IxChart keep their ECharts theme/style APIs. See [theme and configuration guide](packages/site/src/0-guide/GettingStarted.page.md) and run either [compatibility playground](playgrounds/README.md) at `/?theme`.
