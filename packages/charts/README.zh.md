# @idux/charts

[English](README.md) | 简体中文

iDux Charts 的统一入口，重新导出 `@idux/charts-core` 和 `@idux/charts-plots` 的全部公开 API，并提供共享提示框样式及 `version`。应用项目通常从此包开始使用。

## 安装

```bash
npm install @idux/charts echarts lodash-es
```

支持 Vue 2（含 Vue 2.6）和 Vue 3。在已有 Vue 项目中使用，依赖版本为 Vue `^2.6.0 || ^3.2.5` 和 ECharts `^5.4.3 || ^6.0.0`。Vue 2.6 还需安装 `@vue/composition-api >=1.6.2`，并在创建应用前注册插件。

```bash
npm install @vue/composition-api
```

```ts
// Vue 2.6
import Vue from 'vue'
import VueCompositionAPI from '@vue/composition-api'

Vue.use(VueCompositionAPI)
```

## 图表组件

| 组件                | 图表           |
| ------------------- | -------------- |
| `IxBarChart`        | 柱状图         |
| `IxLineChart`       | 折线图、面积图 |
| `IxPieChart`        | 饼图、环形图   |
| `IxRadarChart`      | 雷达图         |
| `IxGaugeChart`      | 仪表盘         |
| `IxLiquidFillChart` | 水波图         |

此外还导出基础组件 `IxChart`，可直接传入 ECharts 配置。

## 快速上手

以下示例使用 Vue 3 的 `<script setup>`，局部导入组件即可使用。容器必须具有有效的宽度和高度。

```vue
<script setup lang="ts">
import { IxLineChart, type LineChartProps } from '@idux/charts'
import '@idux/charts/dist/style.css'

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

图表组件会注册自身所需的 ECharts 模块。组件也支持全局注册：Vue 3 使用 `app.use(IxLineChart)`，Vue 2 使用 `Vue.use(IxLineChart)`。

## 配置与主题

- `useBarOption`、`useLineOption`、`usePieOption` 提供组合式配置；`createRadarOption`、`createGaugeOption`、`createLiquidFillOption` 提供纯配置构建函数。
- `BAR_CHART_TOKEN`、`LINE_CHART_TOKEN`、`PIE_CHART_TOKEN` 通过 Vue `provide` 为对应图表的原生和内置布局提供默认配置。
- 分类 Bar、Line / Area、自动 Pie、Radar、Gauge 和 LiquidFill 支持 `plotTheme`。用 `PLOT_THEME_TOKEN` 提供响应式默认值，直接调用纯配置构建函数时传入所需的 `plotTheme`。
- 配置对象按字段合并，数组整体替换。所有组件的模板 ref 均可调用 `getEChartsInstance()`。

共享 HTML 提示框样式位于 `@idux/charts/dist/style.css`，在应用入口导入一次即可。

- `CHART_THEME_TOKEN` 为所有图表提供响应式 ECharts 主题名称或对象；显式 `theme` 属性优先，默认回退到 `seer`。主题变化会重建实例，生成的文字与辅助图形需同步设置 `PLOT_THEME_TOKEN`。暗色图表使用深色原生加载遮罩，显式配置仍优先。

## TypeScript

`*ChartProps` 用于图表配置，允许扩展字段；`*ChartPublicProps` 提供具名公开属性类型，保留属性的类型及可选性，便于编写组件类型适配。具体适配说明见[仓库 README](https://github.com/IDuxFE/idux-charts/blob/main/README.zh.md#typescript-属性类型)。

## 文档

- [iDux Charts](https://charts.idux.site)
- [配置指南](https://github.com/IDuxFE/idux-charts/blob/main/packages/site/src/0-guide/GettingStarted.page.md)
- [Vue 2 / Vue 3 示例项目](https://github.com/IDuxFE/idux-charts/blob/main/playgrounds/README.zh.md)
- [仓库与开发指南](https://github.com/IDuxFE/idux-charts/blob/main/README.zh.md)

## 许可证

MIT © 2023-present IDuxFE
