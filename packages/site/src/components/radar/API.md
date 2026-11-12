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

数值数组的顺序须与 `indicator` 一致。开启 `clockwise` 后，ECharts 回调中的 `value` 使用绘制顺序。要读取业务原始数据，可按 `dataIndex` 索引传入的 `data`。

### createRadarOption

`createRadarOption(props)` 生成 ECharts option。局部定制时，先生成配置，再展开要修改的字段。例如用 `{ ...base, radar: { ...base.radar, shape: 'circle' as const } }` 保留原有维度和网格配置。将结果传给 `IxRadarChart` 可复用模块注册和实例管理。直接调用函数时显式传入 `plotTheme`。

额外 ECharts 顶层字段整体替换生成配置，例如 `radar`、`series` 或 `tooltip`。支持<a href="./core">基础组件</a> API 中的公共图表选项，`setOptionOpts.notMerge` 默认是 `true`，可显式覆盖。
