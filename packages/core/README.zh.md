# @idux/charts-core

[English](README.md) | 简体中文

iDux Charts 的基础层，提供通用 `IxChart`、图表生命周期组合式函数、主题、类型及工具，适合直接使用 ECharts 配置或开发自定义图表组件。

如需统一入口及共享提示框样式，可使用 [`@idux/charts`](https://github.com/IDuxFE/idux-charts/blob/main/packages/charts/README.zh.md)。

## 安装

```bash
npm install @idux/charts-core echarts
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

## 快速上手

以下示例使用 Vue 3 的 `<script setup>`，局部导入组件即可使用。容器必须具有有效的宽度和高度。

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

`IxChart` 的 ECharts 配置通过 `v-bind` 直接传入，不使用单独的 `option` 属性。默认注册 SVG 渲染器、Grid、Legend、Tooltip、Title、DataZoom，以及 LabelLayout、UniversalTransition。自定义系列或额外组件需要通过 `echarts/core` 的 `use` 注册；使用 Canvas 时也需注册 `CanvasRenderer`，并传入 `initOption: { renderer: 'canvas' }`。

## 核心 API

- `IxChart` 支持 `autoResize`（默认开启）、`chartBackgroundColor`、`loading`、`theme`、`group`、`initOption`、`setOptionOpts` 和 `onReady`。挂载后可通过模板 ref 调用 `getEChartsInstance()`。单独更新 `setOptionOpts` 也会应用到当前配置，传入 `title: null` 可清除标题。
- `useChart(options, listeners?)`：管理初始化、响应式更新、事件、尺寸变化和销毁，返回 `containerRef` 与 `chartRef`；在组件 `setup` 中调用。
- `seerTheme`：内置主题，默认主题名称为 `seer`。
- `useTooltipsFormatter` 接收原始文本并转义后生成 Tooltip HTML。
- `useReactiveAttrs`、`createInstall` 和 `withChartProps` 用于自定义图表开发。
- `ChartProps`、`ChartPublicProps`、`ChartOption`：公开配置类型。

此包不提供独立 CSS 文件；共享 HTML 提示框样式由 `@idux/charts/dist/style.css` 提供。

## 应用级主题

可用 `CHART_THEME_TOKEN` 提供应用级主题名称、对象或响应式 ref。显式 `theme` 属性优先，未配置时回退到 `seer`。注入主题变化沿用已有主题生命周期，重新创建图表实例。对于配置生成器绘制的文字和辅助图形，还需配置 `@idux/charts-plots`（或 `@idux/charts`）导出的 `PLOT_THEME_TOKEN`。

## TypeScript

`*ChartProps` 用于图表配置，允许扩展字段；`*ChartPublicProps` 提供具名公开属性类型，保留属性的类型及可选性，便于编写组件类型适配。具体适配说明见[仓库 README](https://github.com/IDuxFE/idux-charts/blob/main/README.zh.md#typescript-属性类型)。

## 文档

- [iDux Charts](https://charts.idux.site)
- [配置指南](https://github.com/IDuxFE/idux-charts/blob/main/packages/site/src/0-guide/GettingStarted.page.md)
- [Vue 2 / Vue 3 示例项目](https://github.com/IDuxFE/idux-charts/blob/main/playgrounds/README.zh.md)
- [仓库与开发指南](https://github.com/IDuxFE/idux-charts/blob/main/README.zh.md)

## 许可证

MIT © 2023-present IDuxFE
