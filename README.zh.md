<h1 align="center">iDux Charts</h1>

> [ECharts](https://echarts.apache.org/) 的 `Vue` 组件, 支持 `v2.x` 和 `v3.x`, 查看 [文档](https://charts.idux.site) 了解更多.

[English](README.md) | 简体中文

## 📦 安装

```bash
npm install echarts @idux/charts
```

支持 Vue 2（含 Vue 2.6）和 Vue 3。依赖版本为 Vue `^2.6.0 || ^3.2.5` 和 ECharts `^5.4.3 || ^6.0.0`。

Vue 2.6 还需安装 `@vue/composition-api >=1.6.2`，并在创建应用前通过 `Vue.use(VueCompositionAPI)` 注册插件：

```sh
npm install @vue/composition-api
```

## 🔨 使用

```ts
// Vue 3
import { createApp } from 'vue'
import App from './App.vue'
import { IxChart, IxLineChart } from '@idux/charts'

const app = createApp(App)
app.use(IxChart).use(IxLineChart)
```

Vue 2 使用 `Vue.use` 注册组件；以下为 Vue 2.6 的完整初始化示例：

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

`*ChartProps` 允许扩展配置字段。`*ChartPublicProps` 保留具名属性（含已声明的无障碍属性）的类型和可选性。默认组件声明保留 `vue-demi` 引用及事件、插槽和实例成员的类型推导。

Vue 2.6 项目通过现有的 `DefineComponent` 适配声明使用 `*ChartPublicProps`，并保留 `skipLibCheck: true`。这些属性类型供适配层使用，不替换默认组件声明。

## ⌨️ 开发

开发环境要求：Node.js 22.14+（22.x）、24.x 或 26+，以及 pnpm 10+。CI 使用 Node.js 22.14.0 和 pnpm 11.8.0。

```bash
pnpm install

pnpm start
```

使用浏览器访问：`http://localhost:8080/`

CI 检查、Changesets 和自动发布配置见 [CI 与发布指南](.github/RELEASING.md)。

运行 `pnpm benchmark:charts` 可在 Chromium 中测量首帧、刷新和缩放耗时。运行条件和参考结果见[性能基线](e2e/PERFORMANCE.md)。

## 🤝 如何贡献

[![PRs Welcome](https://img.shields.io/badge/PRs-welcome-brightgreen.svg)](https://github.com/IDuxFE/idux-charts/pulls)

在任何形式的参与前，请先阅读 [贡献者文档](https://github.com/IDuxFE/idux/blob/main/packages/site/src/docs/Contributing.zh.md)。如果你希望参与贡献，欢迎 [Pull Request](https://github.com/IDuxFE/idux-charts/pulls)，或给我们 [报告 Bug](https://github.com/IDuxFE/idux-charts/issues)。

> 强烈推荐阅读 [《提问的智慧》](https://github.com/ryanhanwu/How-To-Ask-Questions-The-Smart-Way)、[《如何向开源社区提问题》](https://github.com/seajs/seajs/issues/545) 和 [《如何有效地报告 Bug》](http://www.chiark.greenend.org.uk/%7Esgtatham/bugs-cn.html)、[《如何向开源项目提交无法解答的问题》](https://zhuanlan.zhihu.com/p/25795393)，更好的问题更容易获得帮助。

## ☀️ 授权协议

[MIT](https://github.com/IDuxFE/idux/blob/main/LICENSE) © 2023-present IDuxFE

### 视觉定制

所有图表可通过 `CHART_THEME_TOKEN` 继承响应式 ECharts 主题；显式 `theme` 属性优先，主题变化会重建实例。文档站支持明暗切换，首次跟随系统，手动选择后保存偏好。ECharts 与图形主题的联动方式见下面的配置指南。

分类柱状图、分类折线图和面积图、自动饼图、雷达图、仪表盘及水波图支持 `plotTheme`，可通过 `PLOT_THEME_TOKEN` 注入响应式默认值。组件的模板 ref 提供 `getEChartsInstance()`。配置合并规则、背景色属性和升级注意事项见[配置指南](packages/site/src/0-guide/GettingStarted.page.md)。两个[兼容性 playground](playgrounds/README.zh.md) 均可通过 `/?theme` 体验主题切换。

提交前会通过 Husky 自动执行 `pnpm check:staged`：lint 和格式检查仅针对 Git 暂存文件，代码变更运行相关单元测试及项目类型检查（类型检查不能安全地按单文件执行）。检查失败会阻止提交，不会自动修复文件。纯文档变更只检查格式。可手动运行 `pnpm check` 执行完整检查；安装依赖时会自动初始化 hooks。
