<h1 align="center">iDux Charts</h1>

> [ECharts](https://echarts.apache.org/) 的 `Vue` 组件, 支持 `v2.x` 和 `v3.x`, 查看 [文档](https://charts.idux.site) 了解更多.

[English](README.md) | 简体中文

## 📦 安装

```bash
npm install echarts @idux/charts
```

如果在 Vue 2.x(< 2.7) 中使用，需要确认 `@vue/composition-api` 已经被安装

```sh
npm install @vue/composition-api
```

## 🔨 使用

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
import { IxLineChart, type LineChartProps } from '@idux/charts'

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

参考[快速上手](https://idux.site/docs/getting-started/zh)以了解更多。

## ⌨️ 开发

```bash
npm install

npm start
```

使用浏览器访问：`http://localhost:8080/`

## 🤝 如何贡献

[![PRs Welcome](https://img.shields.io/badge/PRs-welcome-brightgreen.svg)](https://github.com/IDuxFE/idux-charts/pulls)

在任何形式的参与前，请先阅读 [贡献者文档](https://github.com/IDuxFE/idux/blob/main/packages/site/src/docs/Contributing.zh.md)。如果你希望参与贡献，欢迎 [Pull Request](https://github.com/IDuxFE/idux-charts/pulls)，或给我们 [报告 Bug](https://github.com/IDuxFE/idux-charts/issues)。

> 强烈推荐阅读 [《提问的智慧》](https://github.com/ryanhanwu/How-To-Ask-Questions-The-Smart-Way)、[《如何向开源社区提问题》](https://github.com/seajs/seajs/issues/545) 和 [《如何有效地报告 Bug》](http://www.chiark.greenend.org.uk/%7Esgtatham/bugs-cn.html)、[《如何向开源项目提交无法解答的问题》](https://zhuanlan.zhihu.com/p/25795393)，更好的问题更容易获得帮助。

## ☀️ 授权协议

[MIT](https://github.com/IDuxFE/idux/blob/main/LICENSE) © 2023-present IDuxFE
