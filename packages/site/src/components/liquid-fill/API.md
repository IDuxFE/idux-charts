---
title: API
---

### IxLiquidFillChart

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

### LiquidFillChartProps

| 属性                                                | 类型                        | 默认值或行为                                                     |
| --------------------------------------------------- | --------------------------- | ---------------------------------------------------------------- |
| `value`                                             | `number \| null`            | 当前值，`0` 有效。省略、`null` 或非有限值时清空图形。            |
| `min`、`max`                                        | `number`                    | 默认 0、100。须为有限数，且 `max > min`。                        |
| `label`                                             | `string`                    | 圆下方的说明。                                                   |
| `unit`                                              | `string`                    | 默认 `'%'`，空字符串隐藏单位。                                   |
| `valueFormatter`                                    | `(value: number) => string` | 接收原始值，返回整段文字，替代默认数字和单位排版。               |
| `radius`                                            | `number`                    | 最大半径，默认 64px，实际半径随容器缩小。                        |
| `waveAnimation`                                     | `boolean`                   | 默认 `true`，传 `false` 保留静态波形。零水位和满水位为静态。     |
| `color`、`zeroColor`                                | `string`                    | 水波色与零水位颜色，默认 `#20C997`、`#E8EAED`。                  |
| `textColor`、`backgroundColor`                      | `string`                    | 文字颜色和底色，默认 `#1F2329`、`transparent`。                  |
| `valueTextStyle`、`labelTextStyle`、`unitTextStyle` | `PlotTextStyle`             | 分别调整数值、底部说明和默认单位的颜色、字体、字号、字重与行高。 |
| `plotTheme`                                         | `PlotTheme`                 | 继承 `PLOT_THEME_TOKEN`。                                        |

水位按量程计算，越界时限制到空或满。默认文字显示原值及单位。示例显示 `48 GB`，水位为 75%。传入 `value: 0.5, max: 1` 时，可用 `valueFormatter: value => String(value * 100) + '%'` 显示 `50%`。无效量程清空图形。

主文字及底部说明的样式优先级为 `textColor`、对应角色样式、`textStyle`、`plotTheme`、组件默认值。数字字体默认使用 `D-DIN-PRO, sans-serif`，由应用加载字体资源。

### createLiquidFillOption

`createLiquidFillOption(props)` 生成 ECharts option，可显式传入 `plotTheme`。组件支持<a href="./core">基础组件</a> API 中的公共图表选项，额外 ECharts 顶层字段整体替换生成配置，`setOptionOpts.notMerge` 默认是 `true`。内置自定义系列为静默图形。
