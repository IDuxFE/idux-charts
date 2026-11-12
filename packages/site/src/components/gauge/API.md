---
title: API
---

### IxGaugeChart

```vue
<script setup lang="ts">
import { IxGaugeChart, type GaugeChartProps } from '@idux/charts'

const option: GaugeChartProps = {
  value: 48,
  max: 64,
  label: '已用容量',
  valueFormatter: value => `${value} GB`,
}
</script>

<template>
  <IxGaugeChart v-bind="option" style="width: 180px; height: 110px" />
</template>
```

### GaugeChartProps

| 属性                               | 类型                        | 默认值或行为                                                                |
| ---------------------------------- | --------------------------- | --------------------------------------------------------------------------- |
| `value`                            | `number \| null`            | 当前值，`0` 有效。省略、`null` 或非有限值时清空图形。                       |
| `min`、`max`                       | `number`                    | 默认 0、100。须为有限数，且 `max > min`。                                   |
| `segments`                         | `GaugeSegment[]`            | 分段颜色和说明。每段为 `{ upper: number, color: string, label?: string }`。 |
| `label`                            | `string`                    | 底部说明，优先于当前分段的说明。空字符串可隐藏。                            |
| `valueFormatter`                   | `(value: number) => string` | 接收原始值，默认显示 `String(value)`。                                      |
| `size`                             | `'lg' \| 'md'`              | 默认 `'lg'`，控制轨道几何，主文字字号独立。                                 |
| `color`、`trackColor`              | `string`                    | 非分段主色及轨道色，默认 `#4089FF`、`#D8DDE5`。                             |
| `textColor`、`labelColor`          | `string`                    | 主文字和底部说明颜色，默认 `#1F2329`、`#6F7785`。                           |
| `valueFontSize`、`valueFontFamily` | `number`、`string`          | 主文字字号和字体。字号默认 32px，有 `valueFormatter` 时为 16px。            |
| `valueTextStyle`、`labelTextStyle` | `PlotTextStyle`             | 分别控制主文字与说明。支持颜色、字体、字号、字重和行高。                    |
| `plotTheme`                        | `PlotTheme`                 | 继承 `PLOT_THEME_TOKEN`。                                                   |

指示位置按量程计算。有限越界值将指示限制在量程端点，文字仍使用原值。分段的 `upper` 为归一化比例，须在 `(0, 1]` 内严格递增且末段为 `1`，边界值归入前一段。无效量程或分段清空图形。

用 `chartBackgroundColor` 设置整张图的背景。`backgroundColor` 兼容旧版轨道配色，`trackColor` 优先。

文字样式按显式颜色或字号等专用属性、角色样式、`textStyle`、`plotTheme`、组件默认值的顺序取值。

### createGaugeOption

`createGaugeOption(props)` 生成 ECharts option，可显式传入 `plotTheme`。组件支持<a href="./core">基础组件</a> API 中的公共图表选项，额外 ECharts 配置对象按字段合并，显式 `series` 整体替换生成的系列。内置自定义系列为静默图形。
