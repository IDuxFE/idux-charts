<h1 align="center">iDux Charts</h1>

> [ECharts](https://echarts.apache.org/) for `Vue`, both `v2.x` and `v3.x`, see [documentation](https://charts.idux.site) for more.

English | [简体中文](README.zh.md)

## 📦 Installation

```bash
npm install echarts @idux/charts
```

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

## ⌨️ Development

```bash
pnpm install

pnpm start
```

Open a browser: `http://localhost:8080/`

## 🤝 Contributing

[![PRs Welcome](https://img.shields.io/badge/PRs-welcome-brightgreen.svg)](https://github.com/IDuxFE/idux-charts/pulls)

We welcome all contributions. Please read our [CONTRIBUTING.md](https://github.com/IDuxFE/idux/blob/main/packages/site/src/docs/Contributing.en.md) first. You can submit any ideas as [Pull Request](https://github.com/IDuxFE/idux-charts/pulls) or as [GitHub issues](https://github.com/IDuxFE/idux-charts/issues).

> If you're new to posting issues, we ask that you read [_How To Ask Questions The Smart Way_](http://www.catb.org/~esr/faqs/smart-questions.html) (**This guide does not provide actual support services for this project!**), [How to Ask a Question in Open Source Community](https://github.com/seajs/seajs/issues/545) and [How to Report Bugs Effectively](http://www.chiark.greenend.org.uk/~sgtatham/bugs.html) prior to posting. Well written bug reports help us help you!

## ☀️ License

[MIT](https://github.com/IDuxFE/idux/blob/main/LICENSE) © 2023-present IDuxFE
