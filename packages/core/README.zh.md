# @idux/charts-core

[English](README.md) | 简体中文

iDux Charts 的基础层，提供通用 `IxChart`、图表生命周期组合式函数、主题、类型及工具，适合直接使用 ECharts 配置或开发自定义图表组件。

如需统一入口及共享提示框样式，可使用 [`@idux/charts`](https://github.com/IDuxFE/idux-charts/blob/main/packages/charts/README.zh.md)。

## 安装

```bash
npm install @idux/charts-core echarts
```

支持 Vue 2（含 Vue 2.6）和 Vue 3。在已有 Vue 项目中使用，依赖版本为 Vue `^2.6.0 || ^3.2.5` 和 ECharts `^5.4.3 || ^6.1.0`。Vue 2.6 还需安装 `@vue/composition-api >=1.6.2`，并在创建应用前注册插件。

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

`IxChart` 的 ECharts 配置通过 `v-bind` 直接传入，不使用单独的 `option` 属性。默认注册 SVG 渲染器、Grid、Legend、Tooltip、Title、DataZoom、MarkLine、MarkPoint、MarkArea，以及 LabelLayout、UniversalTransition。自定义系列或额外组件需要通过 `echarts/core` 的 `use` 注册；使用 Canvas 时也需注册 `CanvasRenderer`，并传入 `initOption: { renderer: 'canvas' }`。

## 核心 API

- `IxChart` 支持 `autoResize`（默认开启）、`chartBackgroundColor`、`loading`、`theme`、`group`、`initOption`、`setOptionOpts` 和 `onReady`。挂载后可通过模板 ref 调用 `getEChartsInstance()`。单独更新 `setOptionOpts` 也会应用到当前配置，传入 `title: null` 可清除标题。
- `useChart(options, listeners?)`：管理初始化、响应式更新、事件、尺寸变化和销毁，返回 `containerRef` 与 `chartRef`；在组件 `setup` 中调用。
- `seerTheme`：内置主题，默认主题名称为 `seer`。
- `useTooltipsFormatter` 接收原始文本并转义后生成 Tooltip HTML。
- `useReactiveAttrs`、`createInstall` 和 `withChartProps` 用于自定义图表开发。
- `ChartProps`、`ChartPublicProps`、`ChartOption`：公开配置类型。

图表组件将 `role`、`aria-*`、`tabindex` 和 `data-*` 转发到图表容器。

此包不提供独立 CSS 文件；共享 HTML 提示框样式由 `@idux/charts/dist/style.css` 提供。

## 默认插槽

`IxChart` 支持默认插槽，可放置 `IxEmpty`、错误提示或其他自定义内容。覆盖层绝对定位铺满图表，内部使用 `flex: 1` 和 Grid 拉伸直接子节点，无需额外设置宽高；多个根节点按行平分高度。显式尺寸和外边距仍然生效。

```vue
<IxChart v-bind="option" style="height: 320px">
  <IxEmpty v-if="isEmpty" simple description="暂无数据" />
</IxChart>
```

显隐由业务控制，图表实例保持挂载。覆盖层默认接收鼠标事件；纯说明场景可设置 `.ix-chart-overlay { pointer-events: none; }`，局部交互节点可设置 `pointer-events: auto`。插槽不自动隐藏图表或设置背景；需要完整遮盖时为内容设置背景并清除外边距。插槽内容不包含在 ECharts 导出的图片中。

## 应用级主题

可用 `CHART_THEME_TOKEN` 提供应用级主题名称、对象或响应式 ref。显式 `theme` 属性优先，未配置时回退到 `seer`。修改 `theme` 或 `initOption` 会重建实例，并恢复兼容的缩放范围和图例选择。显式变更范围或选择时采用新配置。对于配置生成器绘制的文字和辅助图形，还需配置 `@idux/charts-plots`（或 `@idux/charts`）导出的 `PLOT_THEME_TOKEN`。

兼容的 geo 底图在完整更新或主题重建后保留用户缩放和中心位置。匹配时优先使用 `geo.id`，未设置 ID 时按位置匹配；底图、投影、坐标边界或显式视角配置变化时采用新配置。初始化提交失败会销毁已创建的实例，并把原始异常交给 Vue 错误处理；不会触发 `onReady`。纠正配置后重新挂载组件。

## 加载状态

使用 `:loading="pending"` 即可展示内置图标和 `Loading...` 文案，保留图表实例及已有数据。柱状图、折线/面积图、饼图/环形图/玫瑰图、雷达图、仪表盘、水波图和地图自动选择对应图标。`IxChart` 和 `useChart` 使用首个系列判断：饼图或没有系列类型时使用饼图兜底，其余类型使用通用图标。图标和遮罩均适配深浅主题。

传对象可定制文案和外观，如 `:loading="pending && { text: '正在加载...', maskColor: 'transparent' }"`。还支持 `textColor`、`color`（图标着色）、`fontSize`、`fontFamily` 和 `icon`（图片 URL 或 SVG 源码）。加载层为 DOM 内容，不包含在 ECharts 导出的图片中；原生旋转动画的 `showSpinner`、`spinnerRadius` 等选项不再改变图标。

使用 `useChart` 时，将 `loading` 放在响应式配置（如 `computed` 或 `ref`）中，更新配置即可切换加载状态。基础图表示例的「函数用法」提供了开关，可查看通用加载图标。

## 视觉默认值

内置 Plot 使用 1px 圆角矩形分类色标，`seer` 主题使用相同色标。`seer` 浅色提示框背景为 `rgba(251, 253, 255, 0.72)`，共享 HTML 提示框样式提供 4px 背景模糊。原生图例可通过 `legend.icon` 自定义色标，分类布局可通过 `legend.data` 指定图例项及图标；显式 `tooltip.backgroundColor` 优先。

`createLegendIcon(width = 12, height = 12)` 返回 ECharts `path://` 图标，可配合相同尺寸的 `legend.itemWidth`、`legend.itemHeight` 使用。

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
