# @idux/charts-plots

[English](README.md) | 简体中文

iDux Charts 的预设图表层，基于 `@idux/charts-core` 提供九类图表组件及配置构建工具。

如需统一入口及共享提示框样式，可使用 [`@idux/charts`](https://github.com/IDuxFE/idux-charts/blob/main/packages/charts/README.zh.md)。

## 安装

```bash
npm install @idux/charts-plots echarts
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

## 图表组件

| 组件                | 图表                     |
| ------------------- | ------------------------ |
| `IxBarChart`        | 柱状图                   |
| `IxLineChart`       | 折线图、面积图           |
| `IxPieChart`        | 饼图、环形图             |
| `IxRadarChart`      | 雷达图                   |
| `IxGaugeChart`      | 仪表盘                   |
| `IxBulletChart`     | 子弹图（单值与分组）     |
| `IxWordCloudChart`  | 词云（文字、标签、气泡） |
| `IxMapChart`        | 地图（区域、节点、线路） |
| `IxLiquidFillChart` | 水波图                   |

渲染 `IxMapChart` 前通过 `registerMap(name, geoJSON)` 注册几何数据。地图由原生 `geo`、`series`、`visualMap` 组合，不使用 `mode` 属性。可选的 `createMapRegions`、`createMapNodes`、`createMapLines`、`createMapVisualMap` 返回普通 ECharts 配置。几何由应用管理，不打入组件包；`validateMapData({ nodes, routes, regions })` 可提前检查无效坐标、缺失端点和重复标识。

词云使用原生 graph 节点，保留标量权重、分类样式、选中与公共控制配置；尺寸、可选漂浮和避让边界见 [词云 API](../site/src/components/word-cloud/API.md)。

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

## 默认插槽

所有 Plot 组件均支持默认覆盖插槽，内容自动铺满图表。业务通过 `v-if` 控制空状态，切换时保留图表实例；无重试功能时可仅传入 `IxEmpty` 的描述文案。需要遮住底层图形时，为内容设置背景并清除外边距。

```vue
<IxBarChart :categories="categories" :data="data" style="height: 300px">
  <IxEmpty v-if="isEmpty" simple description="暂无数据" class="chart-empty" />
</IxBarChart>
```

```css
.chart-empty {
  /* 清除 IxEmpty 的默认外边距，让背景覆盖整个图表。 */
  margin: 0;
  background: var(--ix-color-container-bg);
}
```

插槽不会隐藏或清空底层图表。透明内容可与图表同时展示，但覆盖层默认接收鼠标事件。纯说明场景可设置 `.ix-chart-overlay { pointer-events: none; }`，局部交互节点设置 `pointer-events: auto`；在 scoped 样式中使用 `:deep(.ix-chart-overlay)`。插槽内容不包含在 ECharts 导出的图片中。上例背景变量由 iDux 组件主题提供，也可替换为应用自己的背景色。

## 配置与主题

- `useBarOption`、`useLineOption`、`usePieOption` 提供组合式配置；`createRadarOption`、`createGaugeOption`、`createLiquidFillOption`、`createBulletOption`、`createMapOption` 提供纯配置构建函数。
- `BAR_CHART_TOKEN`、`LINE_CHART_TOKEN`、`PIE_CHART_TOKEN` 通过 Vue `provide` 为对应图表的原生和内置布局提供默认配置。
- 分类 Bar、Line / Area、自动 Pie、Radar、Gauge、Bullet、LiquidFill 和 Map 支持 `plotTheme`。用 `PLOT_THEME_TOKEN` 提供响应式默认值，直接调用纯配置构建函数时传入所需的 `plotTheme`。
- 配置对象按字段合并，数组整体替换。所有组件的模板 ref 均可调用 `getEChartsInstance()`。

共享 HTML 提示框样式位于 `@idux/charts/dist/style.css`，在应用入口导入一次即可。此包自身不输出 CSS；需要这些样式时，安装 `@idux/charts` 并导入该样式文件，或由应用提供对应样式。

- 所有图表继承 `@idux/charts-core`（也由 `@idux/charts` 导出）的 `CHART_THEME_TOKEN`。显式 ECharts `theme` 属性优先，切换时重建实例，并恢复兼容的缩放范围和图例选择。生成的文字和辅助图形需配合 `PLOT_THEME_TOKEN` 同步更新。

在分类末尾追加数据且缩放配置未变时，柱状图、折线图和面积图会保留回看窗口。末端窗口以相同的点数跟随新数据，全范围视图继续显示全部数据。

地图在数据刷新、清理系列及主题重建时保留兼容底图的缩放和中心位置。多底图建议提供稳定的 `geo.id`；修改底图、投影或显式视角时采用新配置。生成节点、线路和区域的函数不读取主题注入，需显式传入 `plotTheme`，并在数据或主题变化时重新调用。

图表组件将 `role`、`aria-*`、`tabindex` 和 `data-*` 转发到图表容器。

## 加载状态

所有 Plot 组件均支持 `:loading="pending"`，自动选择横向/竖向柱图、折线/面积图、饼图/环形图/玫瑰图、雷达图、仪表盘、水波图或地图的加载图标，并适配深浅主题。加载期间保留实例及已有数据，无需自行绘制占位内容。

可传入 `pending && { text: '正在加载...' }` 定制文案；完整配置和导出限制见 [Core 加载状态](https://github.com/IDuxFE/idux-charts/blob/main/packages/core/README.zh.md#加载状态)。

## 视觉默认值

内置 Plot 使用 1px 圆角矩形分类色标，`seer` 主题使用相同色标。`seer` 浅色提示框背景为 `rgba(251, 253, 255, 0.72)`，共享 HTML 提示框样式提供 4px 背景模糊。原生图例可通过 `legend.icon` 自定义色标，分类布局可通过 `legend.data` 指定图例项及图标；显式 `tooltip.backgroundColor` 优先。

分类柱图和折线/面积图的自动多行图例行间距为 16px。自动饼图的默认行间距按初始每列行数选择 20px（不超过 3 行）或 16px，再随布局高度缩放；显式 `legend.itemGap` 不缩放。折线/面积图右侧 Y 轴顶部的水平轴名默认与刻度标签左边缘对齐，显式轴名样式优先。

柱状图的数值标签默认规则：基础竖向图显示在 `top`，基础横向图（含 `horizontal-above`）显示在 `right`，分组图不显示；堆叠图每个分类只显示当前可见系列的总数，竖向位于顶部，横向位于整条柱子的右侧。可通过 `label` 或 `series[].label` 覆盖。暗黑模式的 `horizontal-above` 数值标签使用不透明的 `#B2B8C2`，显式 `label.color` 优先。

## 自定义 Tooltip

在 `tooltip.formatter` 中调用 `useTooltipsFormatter(title, rows, rowsPerColumn?)` 可复用内置 HTML 排版。`getTooltipsColor(color)` 提取纯色色标，`useStripeBarTooltip(unit)` 返回原生条纹柱图的提示框配置。工具从 `@idux/charts` 或 `@idux/charts-core` 导入。

[查看参数与完整组装示例](https://github.com/IDuxFE/idux-charts/blob/main/packages/site/src/components/core/API.md#自定义-tooltip)。

## TypeScript

`*ChartProps` 用于图表配置，允许扩展字段；`*ChartPublicProps` 提供具名公开属性类型，保留属性的类型及可选性，便于编写组件类型适配。具体适配说明见[仓库 README](https://github.com/IDuxFE/idux-charts/blob/main/README.zh.md#typescript-属性类型)。

## 文档

- [iDux Charts](https://charts.idux.site)
- [配置指南](https://github.com/IDuxFE/idux-charts/blob/main/packages/site/src/0-guide/GettingStarted.page.md)
- [Vue 2 / Vue 3 示例项目](https://github.com/IDuxFE/idux-charts/blob/main/playgrounds/README.zh.md)
- [仓库与开发指南](https://github.com/IDuxFE/idux-charts/blob/main/README.zh.md)

## 许可证

MIT © 2023-present IDuxFE
