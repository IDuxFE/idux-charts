---
title: API
---

### IxLineChart

折线图组件。

#### LineChartProps

> 除以下表格之外还支持 `ECharts` 的[所有配置](https://echarts.apache.org/zh/option.html)。
> 除以下表格之外还支持 `AdditionalChartOption` 的[所有配置](/components/core#additionalchartoption)。
> 下表格中的配置，其实就是 `LineSeriesOption` 中的[部分配置](https://echarts.apache.org/zh/option.html#series-line)

| 名称        | 说明             | 类型                | 默认值 | 全局配置 | 备注                                                                                                                                                                          |
| ----------- | ---------------- | ------------------- | ------ | -------- | ----------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| `data`      | 数据内容         | `Array`             | -      | -        | 参见 [series-line.data](https://echarts.apache.org/zh/option.html#series-line.data)                                                                                           |
| `areaStyle` | 区域填充样式     | `AreaStyleOption`   | -      | -        | 设置后显示成区域面积图,参见 [series-line.areaStyle](https://echarts.apache.org/zh/option.html#series-line.areaStyle)                                                          |
| `label`     | 图形上的文本标签 | `SeriesLabelOption` | -      | -        | 可用于说明图形的一些数据信息，比如值，名称等, 参见 [series-line.label](https://echarts.apache.org/zh/option.html#series-line.label)                                           |
| `name`      | 系列名称         | `string`            | -      | -        | 用于 tooltip 的显示，legend 的图例筛选，在 setOption 更新数据和配置项时用于指定对应的系列,参见 [series-line.name](https://echarts.apache.org/zh/option.html#series-line.name) |
| `markArea`  | 图表标域         | `MarkAreaOption `   | -      | -        | 常用于标记图表中某个范围的数据，例如标出某段时间投放了广告, 参见 [series-line.markArea](https://echarts.apache.org/zh/option.html#series-line.markArea)                       |
| `smooth`    | 是否平滑曲线显示 | `boolean`           | -      | -        | 参见 [series-line.smooth](https://echarts.apache.org/zh/option.html#series-line.smooth)                                                                                       |
| `stack`     | 数据堆叠         | `string`            | -      | -        | 参见 [series-line.stack](https://echarts.apache.org/zh/option.html#series-line.stack)                                                                                         |

### useLineOption

创建折线图配置的函数

```ts
export function useLineOption(
  props: LineSeriesOption,
  attrs: LineChartProps,
): ComputedRef<LineChartProps>
```
