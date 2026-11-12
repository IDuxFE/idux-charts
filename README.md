<h1 align="center">iDux Charts</h1>

> [ECharts](https://echarts.apache.org/) for `Vue`, both `v2.x` and `v3.x`, see [documentation](https://charts.idux.site) for more.

English | [简体中文](README.zh.md)

## 📦 Installation

```bash
npm install echarts @idux/charts
```

Supports Vue 2 (including Vue 2.6) and Vue 3. Peer dependencies are Vue `^2.6.0 || ^3.2.5` and ECharts `^5.4.3 || ^6.0.0`.

Vue 2.6 also requires `@vue/composition-api >=1.6.2`. Register the plugin with `Vue.use(VueCompositionAPI)` before creating the application:

```sh
npm install @vue/composition-api
```

## 🔨 Usage

```ts
// Vue 3
import { createApp } from 'vue'
import App from './App.vue'
import { IxChart, IxLineChart } from '@idux/charts'

const app = createApp(App)
app.use(IxChart).use(IxLineChart)
```

Use `Vue.use` to register components in Vue 2. A complete Vue 2.6 initialization example:

```ts
import Vue from 'vue'
import VueCompositionAPI from '@vue/composition-api'
import { IxChart, IxLineChart } from '@idux/charts'
import App from './App.vue'

Vue.use(VueCompositionAPI)
Vue.use(IxChart).use(IxLineChart)

new Vue({ render: h => h(App) }).$mount('#app')
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

`*ChartProps` allow extension fields. `*ChartPublicProps` preserve named property types and optionality, including the declared accessibility attributes. Default component declarations retain `vue-demi` imports and inferred event, slot, and instance types.

Vue 2.6 projects use `*ChartPublicProps` through their existing `DefineComponent` adapters and retain `skipLibCheck: true`. These prop types support the adapter layer; they do not replace the default component declarations.

## ⌨️ Development

Requires Node.js 22.14+ (22.x), 24.x or 26+, and pnpm 10+. CI uses Node.js 22.14.0 and pnpm 11.8.0.

```bash
pnpm install

pnpm start
```

Open a browser: `http://localhost:8080/`

See [CI and releases](.github/RELEASING.md) for checks, changesets, and automated npm publishing.

Run `pnpm benchmark:charts` to measure initial rendering, refresh, and zoom in Chromium. See the [performance baseline](e2e/PERFORMANCE.md) for the workload and reference results.

## 🤝 Contributing

[![PRs Welcome](https://img.shields.io/badge/PRs-welcome-brightgreen.svg)](https://github.com/IDuxFE/idux-charts/pulls)

We welcome all contributions. Please read our [CONTRIBUTING.md](https://github.com/IDuxFE/idux/blob/main/packages/site/src/docs/Contributing.en.md) first. You can submit any ideas as [Pull Request](https://github.com/IDuxFE/idux-charts/pulls) or as [GitHub issues](https://github.com/IDuxFE/idux-charts/issues).

> If you're new to posting issues, we ask that you read [_How To Ask Questions The Smart Way_](http://www.catb.org/~esr/faqs/smart-questions.html) (**This guide does not provide actual support services for this project!**), [How to Ask a Question in Open Source Community](https://github.com/seajs/seajs/issues/545) and [How to Report Bugs Effectively](http://www.chiark.greenend.org.uk/~sgtatham/bugs.html) prior to posting. Well written bug reports help us help you!

## ☀️ License

[MIT](https://github.com/IDuxFE/idux/blob/main/LICENSE) © 2023-present IDuxFE

### Visual customization

All charts can inherit a reactive ECharts theme through `CHART_THEME_TOKEN`. Explicit `theme` props take precedence, and theme changes recreate the instance. The documentation site includes a light/dark toggle, follows the system until manually selected, and remembers the selection. See the configuration guide below for coordinating ECharts and plot themes.

Category Bar, Line and Area, automatic Pie, Radar, Gauge, and LiquidFill support `plotTheme`. Provide reactive defaults with `PLOT_THEME_TOKEN`. Chart component refs expose `getEChartsInstance()`. See the [configuration guide](packages/site/src/0-guide/GettingStarted.page.md) for option merging, background colors, and upgrade notes. Open either [compatibility playground](playgrounds/README.md) at `/?theme` to try theme switching.

Before each commit, Husky runs `pnpm check:staged`: lint and formatting checks target Git-staged files only; code changes also run related unit tests and project-wide type checking (which cannot safely run per file). Failures block the commit without auto-fixing files. Documentation-only changes run formatting checks only. Run `pnpm check` for the full suite. Installing dependencies initializes the hooks automatically.
