---
title: API
---

### IxPieChart

折线图组件。

#### PieChartProps

> 除以下表格之外还支持 `ECharts` 的[所有配置](https://echarts.apache.org/zh/option.html)。
> 除以下表格之外还支持 `AdditionalChartOption` 的[所有配置](/components/core#additionalchartoption)。
> 下表格中的配置，其实就是 `PieSeriesOption` 中的[部分配置](https://echarts.apache.org/zh/option.html#series-pie)

| 名称       | 说明                   | 类型                        | 默认值           | 全局配置 | 备注                                                                                                                                                                        |
| ---------- | ---------------------- | --------------------------- | ---------------- | -------- | --------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| `data`     | 数据内容               | `Array`                     | -                | -        | 参见 [series-pie.data](https://echarts.apache.org/zh/option.html#series-pie.data)                                                                                           |
| `center`   | 饼图的中心（圆心）坐标 | `Array`                     | -                | -        | 数组的第一项是横坐标，第二项是纵坐标，参见 [series-pie.center](https://echarts.apache.org/zh/option.html#series-pie.center)                                                 |
| `label`    | 图形上的文本标签       | `SeriesLabelOption`         | -                | -        | 可用于说明图形的一些数据信息，比如值，名称等, 参见 [series-pie.label](https://echarts.apache.org/zh/option.html#series-pie.label)                                           |
| `name`     | 系列名称               | `string`                    | -                | -        | 用于 tooltip 的显示，legend 的图例筛选，在 setOption 更新数据和配置项时用于指定对应的系列,参见 [series-pie.name](https://echarts.apache.org/zh/option.html#series-pie.name) |
| `markArea` | 图表标域               | `MarkAreaOption `           | -                | -        | 常用于标记图表中某个范围的数据，例如标出某段时间投放了广告, 参见 [series-pie.markArea](https://echarts.apache.org/zh/option.html#series-pie.markArea)                       |
| `radius`   | 饼图的半径             | `number \| string \| Array` | `['70%', '80%']` | -        | 参见 [series-pie.radius](https://echarts.apache.org/zh/option.html#series-pie.radius)                                                                                       |
| `roseType` | 是否展示成南丁格尔图   | `boolean`                   | -                | -        | 参见 [series-pie.roseType](https://echarts.apache.org/zh/option.html#series-pie.roseType)                                                                                   |

### usePieOption

创建折线图配置的函数

```ts
export function usePieOption(
  props: PieSeriesOption,
  attrs: PieChartProps,
): ComputedRef<PieChartProps>
```
