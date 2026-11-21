---
title: API
---

### IxGaugeChart

使用 ESM 构建时，可从 `@idux/charts/gauge` 按需导入组件和类型。

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

支持默认插槽，公共配置和用法见<a href="./core">IxChart API</a>。

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
| `valueTextStyle`、`labelTextStyle` | `PlotTextStyle`             | 分别控制主文字与说明的文字样式。                                            |
| `plotTheme`                        | `PlotTheme`                 | 主色、文字与字体的绘图默认值。                                              |

指示位置按量程计算。有限越界值将指示限制在量程端点，文字仍使用原值。分段的 `upper` 为归一化比例，须在 `(0, 1]` 内严格递增且末段为 `1`，边界值归入前一段。无效量程或分段清空图形。

`backgroundColor` 兼容旧版轨道配色，`trackColor` 优先。

### createGaugeOption

`createGaugeOption(props)` 返回仪表盘的 ECharts option。
