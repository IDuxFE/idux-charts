<h1 align="center">iDux Charts</h1>

> [ECharts](https://echarts.apache.org/) 的 `Vue` 组件, 支持 `v2.x` 和 `v3.x`, 查看 [文档](https://charts.idux.site) 了解更多.

[English](README.md) | 简体中文

## 📦 安装

```bash
npm install echarts @idux/charts
```

支持 Vue `^2.6.0 || ^3.2.5` 和 ECharts `^5.4.3 || ^6.0.0`。Vue 2.6 还需要安装 `@vue/composition-api >=1.6.2`；Vue 2.7 和 Vue 3 无需安装此插件。

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

### TypeScript 属性类型

`ChartPublicProps`、`BarChartPublicProps`、`LineChartPublicProps`、`PieChartPublicProps` 专供 Vue 2.6 项目的组件类型适配声明使用，可从 `@idux/charts` 导入：

```ts
import type { LineChartPublicProps } from '@idux/charts'

const lineProps: LineChartPublicProps = {
  autoResize: true,
  smooth: true,
  data: [123, 324, 156],
}
```

现有的 `*ChartProps` 继续允许扩展配置字段。`*ChartPublicProps` 从对应类型推导，去掉宽泛索引签名，保留具名属性的类型及可选性；不会补齐默认值，也不包含 HTML 属性。这是配置类型与具名公开属性的区分，不是 Vue 内部已解析 Props 与外部可选 Props 的区分。

默认组件声明保留 `vue-demi` 引用及原有配置属性类型；`*ChartPublicProps` 独立提供给 Vue 2.6 适配层，不替换默认组件声明。Vue 2.6 项目可在现有的 `DefineComponent` 适配声明中使用 `*ChartPublicProps`，无需自行实现索引签名过滤。

默认组件声明面向 Vue 2.7 和 Vue 3，保留事件、带参数插槽及实例成员的自动推导。Vue 2.7 的插槽函数位于 `$scopedSlots`，Vue 3 位于 `$slots`。Vue 2.6 适配层保留自己的组件声明和 `skipLibCheck: true` 配置；属性别名不会把默认组件声明转换成 Vue 2.6 原生组件声明。

## ⌨️ 开发

开发环境要求：Node.js 22.14+（22.x）、24.x 或 26+，以及 pnpm 10+。CI 使用 Node.js 22.14.0 和 pnpm 11.8.0。

```bash
pnpm install

pnpm start
```

使用浏览器访问：`http://localhost:8080/`

CI 检查、Changesets 和自动发布配置见 [CI 与发布指南](.github/RELEASING.md)。

## 🤝 如何贡献

[![PRs Welcome](https://img.shields.io/badge/PRs-welcome-brightgreen.svg)](https://github.com/IDuxFE/idux-charts/pulls)

在任何形式的参与前，请先阅读 [贡献者文档](https://github.com/IDuxFE/idux/blob/main/packages/site/src/docs/Contributing.zh.md)。如果你希望参与贡献，欢迎 [Pull Request](https://github.com/IDuxFE/idux-charts/pulls)，或给我们 [报告 Bug](https://github.com/IDuxFE/idux-charts/issues)。

> 强烈推荐阅读 [《提问的智慧》](https://github.com/ryanhanwu/How-To-Ask-Questions-The-Smart-Way)、[《如何向开源社区提问题》](https://github.com/seajs/seajs/issues/545) 和 [《如何有效地报告 Bug》](http://www.chiark.greenend.org.uk/%7Esgtatham/bugs-cn.html)、[《如何向开源项目提交无法解答的问题》](https://zhuanlan.zhihu.com/p/25795393)，更好的问题更容易获得帮助。

## ☀️ 授权协议

[MIT](https://github.com/IDuxFE/idux/blob/main/LICENSE) © 2023-present IDuxFE

### 视觉定制

Pie 自动布局、Radar、Gauge、LiquidFill 支持 `plotTheme`，可通过 `PLOT_THEME_TOKEN` 提供响应式对象/ref 作为全局后备。Gauge/LiquidFill 支持 `valueTextStyle`、`labelTextStyle`，LiquidFill 另支持 `unitTextStyle`，已有显式样式属性保持优先。Pie 新增 `layoutMode: 'auto' | 'native'` 和仅作用于主系列的 `seriesStyle`，不传则保留原有行为。Bar、Line、IxChart 继续使用 ECharts 的主题/样式 API。详见[配置指南](packages/site/src/0-guide/GettingStarted.page.md)；两个[兼容性 playground](playgrounds/README.zh.md) 均可通过 `/?theme` 体验。
