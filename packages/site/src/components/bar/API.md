---
title: API
---

### IxBarChart

折线图组件。

#### BarChartProps

> 除以下表格之外还支持 `ECharts` 的[所有配置](https://echarts.apache.org/zh/option.html)。
> 除以下表格之外还支持 `AdditionalChartOption` 的[所有配置](/components/core#additionalchartoption)。
> 下表格中的配置，其实就是 `BarSeriesOption` 中的[部分配置](https://echarts.apache.org/zh/option.html#series-bar)

| 名称       | 说明                         | 类型                | 默认值 | 全局配置 | 备注                                                                                                                                                                        |
| ---------- | ---------------------------- | ------------------- | ------ | -------- | --------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| `data`     | 数据内容                     | `Array`             | -      | -        | 参见 [series-bar.data](https://echarts.apache.org/zh/option.html#series-bar.data)                                                                                           |
| `barGap`   | 不同系列的柱间距离，为百分比 | `number \| string`  | `0.2`  | -        | 参见 [series-bar.barGap](https://echarts.apache.org/zh/option.html#series-bar.barGap)                                                                                       |
| `barWidth` | 柱条的宽度                   | `number \| string`  | `10`   | -        | 参见 [series-bar.barWidth](https://echarts.apache.org/zh/option.html#series-bar.barWidth)                                                                                   |
| `label`    | 图形上的文本标签             | `SeriesLabelOption` | -      | -        | 可用于说明图形的一些数据信息，比如值，名称等, 参见 [series-bar.label](https://echarts.apache.org/zh/option.html#series-bar.label)                                           |
| `name`     | 系列名称                     | `string`            | -      | -        | 用于 tooltip 的显示，legend 的图例筛选，在 setOption 更新数据和配置项时用于指定对应的系列,参见 [series-bar.name](https://echarts.apache.org/zh/option.html#series-bar.name) |
| `markArea` | 图表标域                     | `MarkAreaOption `   | -      | -        | 常用于标记图表中某个范围的数据，例如标出某段时间投放了广告, 参见 [series-bar.markArea](https://echarts.apache.org/zh/option.html#series-bar.markArea)                       |
| `stack`    | 数据堆叠                     | `string`            | -      | -        | 参见 [series-bar.stack](https://echarts.apache.org/zh/option.html#series-bar.stack)                                                                                         |

### useBarOption

创建折线图配置的函数

```ts
export function useBarOption(
  props: BarSeriesOption,
  attrs: BarChartProps,
): ComputedRef<BarChartProps>
```
