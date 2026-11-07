---
title: API
---

### IxChart

基础组件，可以使用此组件实现所有 `ECharts` 的图表。

#### ChartProps

支持 `ECharts` 的[所有配置](https://echarts.apache.org/zh/option.html)。

```ts
export interface ChartProps extends ChartOption, AdditionalChartOption {}

export type ChartOption = ComposeOption<
  | DatasetComponentOption
  | DataZoomComponentOption
  | GridComponentOption
  | LegendComponentOption
  | TitleComponentOption
  | TooltipComponentOption
  | BarSeriesOption
  | PieSeriesOption
  | LineSeriesOption
>
```

#### AdditionalChartOption

| 名称            | 说明                            | 类型                           | 默认值   | 全局配置 | 备注                                                                                                         |
| --------------- | ------------------------------- | ------------------------------ | -------- | -------- | ------------------------------------------------------------------------------------------------------------ |
| `autoResize`    | 是否开启自动 resize             | `boolean`                      | `true`   | ✅       | -                                                                                                            |
| `group`         | 图表的分组                      | `string`                       | -        | -        | -                                                                                                            |
| `initOption`    | 图表用于初始化的配置            | `ChartInitOption`              | -        | ✅       | 也就是 `ECharts.init` 的第三个参数，参见 [echarts.init](https://echarts.apache.org/zh/api.html#echarts.init) |
| `loading`       | 是否显示加载中状态              | `boolean \| object`            | -        | -        | -                                                                                                            |
| `setOptionOpts` | 图表实例 setOption 的第二个参数 | `SetOptionOpts`                | -        | -        | 参见 [echartsInstance.setOption](https://echarts.apache.org/zh/api.html#echartsInstance.setOption)           |
| `theme`         | 图表的主题                      | `ChartTheme`                   | `'seer'` | ✅       | -                                                                                                            |
| `onReady`       | 图表渲染完成执行回调            | `(chart: EChartsType) => void` | -        | -        | 可以通过该回调函数拿获取到图表实例                                                                           |

### useChart

创建图表配置的函数，可以更加灵活的处理图表的配置

```ts
export function useChart(options: MaybeRef<ChartProps>): {
  containerRef: ShallowRef<HTMLDivElement | undefined>
  chartRef: ShallowRef<EChartsType | undefined>
}
```

### 主题边界

`IxChart` 原样消费 ECharts option 与 `AdditionalChartOption`，不解释 `plotTheme`、`layoutMode`、`seriesStyle` 或测量图的文字角色属性。使用 `theme` 切换 ECharts 初始化主题，使用 `textStyle`、各组件/系列样式调整文字；`theme` 或 `initOption` 改变时会重建实例。Plots 层的纯构建器输出可交给 IxChart，但需自行注册相应 ECharts 图表模块。

### 应用级主题

通过 `CHART_THEME_TOKEN` 提供主题名称或响应式主题对象，所有未显式设置 `theme` 的图表都会继承。优先级为组件 `theme` → 注入主题 → 内置 `seer`。主题变化沿用组件生命周期，会重新创建图表实例。

```ts
import { computed, provide, ref } from 'vue'
import { CHART_THEME_TOKEN, PLOT_THEME_TOKEN } from '@idux/charts'

const dark = ref(false)
provide(
  CHART_THEME_TOKEN,
  computed(() => (dark.value ? 'dark' : 'seer')),
)
provide(
  PLOT_THEME_TOKEN,
  computed(() =>
    dark.value
      ? { textColor: '#f4f8ff', secondaryTextColor: '#8b949e', splitLineColor: '#30363d' }
      : {},
  ),
)
```

`CHART_THEME_TOKEN` 控制 ECharts 主题；`PLOT_THEME_TOKEN` 控制饼图自动布局、雷达图、仪表盘和水波图生成的文字与辅助图形。显式配置的颜色优先，业务自定义文字或富文本应随应用主题同步更新。

主题切换会重新触发 `onReady`，实例内的图例选中和缩放状态可能重置。若只调整生成的文字或辅助图形，可仅更新 `PLOT_THEME_TOKEN`。`darkMode: true` 时原生加载遮罩自动使用深色；`loading` 对象中的 `textColor`、`maskColor` 可显式覆盖。站点切换入口和完整接入说明见[快速上手](../../0-guide/GettingStarted.page.md)。

内置柱状图、折线图和饼图的提示框背景由 ECharts 主题提供；默认 `seer` 保持原有浅色背景。显式 `tooltip.backgroundColor` 优先于主题。
