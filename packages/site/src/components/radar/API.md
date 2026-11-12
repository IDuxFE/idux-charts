---
title: API
---

### IxRadarChart

```vue
<script setup lang="ts">
import { IxRadarChart, type RadarChartProps } from '@idux/charts'

const option: RadarChartProps = {
  indicator: [
    { name: '覆盖率', min: 0, max: 100 },
    { name: '稳定性', min: 0, max: 100 },
    { name: '自动化', min: 0, max: 100 },
  ],
  data: [
    { name: '当前方案', value: [80, 90, 70] },
    { name: '目标方案', value: [95, 95, 90] },
  ],
  area: true,
}
</script>

<template>
  <IxRadarChart v-bind="option" style="height: 320px" />
</template>
```

### RadarChartProps

| 属性          | 类型                                | 默认值           | 行为                                                          |
| ------------- | ----------------------------------- | ---------------- | ------------------------------------------------------------- |
| `indicator`   | `RadarComponentOption['indicator']` | `[]`             | 各维度的名称与量程。                                          |
| `data`        | `RadarSeriesOption['data']`         | `[]`             | 对比对象，支持数值数组或带 `name`、`value` 的对象。           |
| `area`        | `boolean`                           | `false`          | 开启后以 0.12 不透明度填充轮廓，数据项的 `areaStyle` 可覆盖。 |
| `gridStyle`   | `'line' \| 'area'`                  | `'area'`         | 线框或交替填充的网格背景。                                    |
| `splitNumber` | `number`                            | `5`              | 网格分段数，传正整数。                                        |
| `clockwise`   | `boolean`                           | `false`          | 开启后从首轴按顺时针排列其余维度，并同步调整数值顺序。        |
| `center`      | `RadarComponentOption['center']`    | `['50%', '50%']` | 圆心坐标。                                                    |
| `radius`      | `RadarComponentOption['radius']`    | `'65%'`          | 支持像素或百分比。                                            |
| `plotTheme`   | `PlotTheme`                         | 注入值           | 色板、轴文字和网格样式，继承 `PLOT_THEME_TOKEN`。             |

数值数组的顺序须与 `indicator` 一致。维度尚未就绪时渲染空态。开启 `clockwise` 后，ECharts 回调中的 `value` 使用绘制顺序。要读取业务原始数据，可按 `dataIndex` 索引传入的 `data`。

### createRadarOption

`createRadarOption(props)` 与组件使用同样的配置合并规则。例如传入 `radar: { splitNumber: 3 }` 可修改网格分段数并保留 `indicator` 和其他默认值。直接调用函数时可显式传入 `plotTheme`。

`radar` 和 `tooltip` 等原生对象按字段合并。显式传入 `series` 会使用指定的系列及其原始数据顺序。组件支持<a href="./core">基础组件</a> API 中的公共图表选项。
