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
| `loading`       | 是否显示加载中状态              | `boolean `                     | -        | -        | -                                                                                                            |
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
