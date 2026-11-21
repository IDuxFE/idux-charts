---
title: API
---

### IxLiquidFillChart

使用 ESM 构建时，可从 `@idux/charts/liquid-fill` 按需导入组件和类型。

```vue
<script setup lang="ts">
import { IxLiquidFillChart, type LiquidFillChartProps } from '@idux/charts'

const option: LiquidFillChartProps = {
  value: 48,
  max: 64,
  unit: 'GB',
  label: '已用容量',
}
</script>

<template>
  <IxLiquidFillChart v-bind="option" style="width: 200px; height: 240px" />
</template>
```

支持默认插槽，公共配置和用法见<a href="./core">IxChart API</a>。

### LiquidFillChartProps

| 属性                                                | 类型                        | 默认值或行为                                                 |
| --------------------------------------------------- | --------------------------- | ------------------------------------------------------------ |
| `value`                                             | `number \| null`            | 当前值，`0` 有效。省略、`null` 或非有限值时清空图形。        |
| `min`、`max`                                        | `number`                    | 默认 0、100。须为有限数，且 `max > min`。                    |
| `label`                                             | `string`                    | 圆下方的说明。                                               |
| `unit`                                              | `string`                    | 默认 `'%'`，空字符串隐藏单位。                               |
| `valueFormatter`                                    | `(value: number) => string` | 接收原始值，返回整段文字，替代默认数字和单位排版。           |
| `radius`                                            | `number`                    | 最大半径，默认 64px，实际半径随容器缩小。                    |
| `waveAnimation`                                     | `boolean`                   | 默认 `true`，传 `false` 保留静态波形。零水位和满水位为静态。 |
| `color`、`zeroColor`                                | `string`                    | 水波色与零水位颜色，默认 `#20C997`、`#E8EAED`。              |
| `textColor`、`containerColor`                       | `string`                    | 文字颜色和底色，默认 `#1F2329`、`transparent`。              |
| `valueTextStyle`、`labelTextStyle`、`unitTextStyle` | `PlotTextStyle`             | 分别控制数值、底部说明和默认单位的文字样式。                 |
| `plotTheme`                                         | `PlotTheme`                 | 水波颜色、文字与字体的绘图默认值。                           |

水位按量程计算，越界时限制到空或满。默认文字显示原值及单位。示例显示 `48 GB`，水位为 75%。传入 `value: 0.5, max: 1` 时，可用 `valueFormatter: value => String(value * 100) + '%'` 显示 `50%`。无效量程清空图形。

`backgroundColor` 兼容旧版容器底色，`containerColor` 优先。

数字字体默认使用 `D-DIN-PRO, sans-serif`，由应用加载字体资源。

### createLiquidFillOption

`createLiquidFillOption(props)` 返回水波图的 ECharts option。
