# @idux/charts-plots

[English](README.md) | 简体中文

iDux Charts 的预设图表层，基于 `@idux/charts-core` 提供六类图表组件及配置构建工具。

如需统一入口及共享提示框样式，可使用 [`@idux/charts`](https://github.com/IDuxFE/idux-charts/blob/main/packages/charts/README.zh.md)。

## 安装

```bash
npm install @idux/charts-plots echarts
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

## 快速上手

以下示例使用 Vue 3 的 `<script setup>`，局部导入组件即可使用。容器必须具有有效的宽度和高度。

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

图表组件会注册自身所需的 ECharts 模块。组件也支持全局注册：Vue 3 使用 `app.use(IxLineChart)`，Vue 2 使用 `Vue.use(IxLineChart)`。

ESM 项目可通过 [`@idux/charts` 的图表子入口](https://github.com/IDuxFE/idux-charts/blob/main/packages/charts/README.zh.md#快速上手)按需导入，例如 `@idux/charts/line`。

## 配置与主题

- `useBarOption`、`useLineOption`、`usePieOption` 提供组合式配置；`createRadarOption`、`createGaugeOption`、`createLiquidFillOption` 提供纯配置构建函数。
- `BAR_CHART_TOKEN`、`LINE_CHART_TOKEN`、`PIE_CHART_TOKEN` 通过 Vue `provide` 为对应图表的原生和内置布局提供默认配置。
- 分类 Bar、Line / Area、自动 Pie、Radar、Gauge 和 LiquidFill 支持 `plotTheme`。用 `PLOT_THEME_TOKEN` 提供响应式默认值，直接调用纯配置构建函数时传入所需的 `plotTheme`。
- 配置对象按字段合并，数组整体替换。所有组件的模板 ref 均可调用 `getEChartsInstance()`。

共享 HTML 提示框样式位于 `@idux/charts/dist/style.css`，在应用入口导入一次即可。此包自身不输出 CSS；需要这些样式时，安装 `@idux/charts` 并导入该样式文件，或由应用提供对应样式。

- 所有图表继承 `@idux/charts-core`（也由 `@idux/charts` 导出）的 `CHART_THEME_TOKEN`。显式 ECharts `theme` 属性优先，切换时重建实例，并恢复兼容的缩放范围和图例选择。生成的文字和辅助图形需配合 `PLOT_THEME_TOKEN` 同步更新。

在分类末尾追加数据且缩放配置未变时，柱状图、折线图和面积图会保留回看窗口。末端窗口以相同的点数跟随新数据，全范围视图继续显示全部数据。

图表组件将 `role`、`aria-*`、`tabindex` 和 `data-*` 转发到图表容器。

## 自定义 Tooltip

在 `tooltip.formatter` 中调用 `useTooltipsFormatter(title, rows, rowsPerColumn?)` 可复用内置 HTML 排版。`getTooltipsColor(color)` 提取纯色色标，`useStripeBarTooltip(unit)` 返回原生条纹柱图的提示框配置。工具从 `@idux/charts` 或 `@idux/charts-core` 导入。

[查看参数与完整组装示例](https://github.com/IDuxFE/idux-charts/blob/main/packages/site/src/components/core/API.tab.md#自定义-tooltip)。

## TypeScript

`*ChartProps` 用于图表配置，允许扩展字段；`*ChartPublicProps` 提供具名公开属性类型，保留属性的类型及可选性，便于编写组件类型适配。具体适配说明见[仓库 README](https://github.com/IDuxFE/idux-charts/blob/main/README.zh.md#typescript-属性类型)。

## 文档

- [iDux Charts](https://charts.idux.site)
- [配置指南](https://github.com/IDuxFE/idux-charts/blob/main/packages/site/src/0-guide/GettingStarted.page.md)
- [Vue 2 / Vue 3 示例项目](https://github.com/IDuxFE/idux-charts/blob/main/playgrounds/README.zh.md)
- [仓库与开发指南](https://github.com/IDuxFE/idux-charts/blob/main/README.zh.md)

## 许可证

MIT © 2023-present IDuxFE
