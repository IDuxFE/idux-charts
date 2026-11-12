---
title: API
---

### IxBarChart

传入 `categories` 启用分类布局，适用于一个分类轴和一个数值轴。数据按分类下标对应。单系列用 `data`，多系列用 `series`。系列的 `data` 优先于顶层 `data`，相同的 `stack` 值会堆叠。

使用 ESM 构建时，可从 `@idux/charts/bar` 按需导入组件和类型。

```vue
<script setup lang="ts">
import { IxBarChart, type BarChartProps } from '@idux/charts'

const option: BarChartProps = {
  categories: ['华东', '华南', '华北'],
  data: [320, { value: null, missingReason: '采集超时' }, 365],
  name: '访问次数',
  referenceLine: { value: 280, name: '告警阈值' },
}
</script>

<template>
  <IxBarChart v-bind="option" style="height: 300px" />
</template>
```

### BarChartProps

| 属性                 | 类型                                               | 分类布局行为                                                                                               |
| -------------------- | -------------------------------------------------- | ---------------------------------------------------------------------------------------------------------- |
| `categories`         | `string[]`                                         | 分类标签。                                                                                                 |
| `data`               | `BarChartProps['data']`                            | 单系列数据，可传数值、`null` 或带 `value` 和 `missingReason` 的对象。                                      |
| `series`             | `BarChartProps['series']`                          | 多系列配置。用 `name` 标识图例项，用 `stack` 指定堆叠组。                                                  |
| `layout`             | `'vertical' \| 'horizontal' \| 'horizontal-above'` | 默认 `'vertical'`。横向图首项居上，`'horizontal-above'` 将分类标签放在柱条上方并绘制轨道。                 |
| `barWidth`、`barGap` | `number \| string`                                 | 可覆盖柱宽和组内间距。系列值优先于顶层值。分类布局的 `barGap` 默认为 `30%`。                               |
| `referenceLine`      | `BarReferenceLine`                                 | `{ value: number, name?: string, color?: string }`。沿数值轴的指定值绘制虚线，提供独立名称后可用图例切换。 |
| `zeroText`           | `string`                                           | 全部数值为 0 时的可选提示。上方标签布局使用轨道表达零值。                                                  |
| `plotTheme`          | `PlotTheme`                                        | 分类布局的色板和辅助元素颜色，继承 `PLOT_THEME_TOKEN`。                                                    |

并排柱默认宽 6px。单列柱按可见分类数取宽度，1–3 项为 20px，4–5 项为 10px，6 项以上为 6px。

`0` 为有效值。缺少对应数据项、空值或非有限数值时保留分类并显示缺报底条，可用 `missingReason` 补充提示。缺少分类或全部系列的数据数组为空时，清除生成的图形。

`grid`、`xAxis`、`yAxis` 与默认值合并。分类布局使用每个轴的第一项配置，分类轴类型和标签由 `categories` 决定。`dataZoom` 默认绑定分类轴，显式指定目标轴时沿用该绑定。用 `tooltip.valueFormatter` 改写数值，用 `tooltip.formatter` 改写整个提示框。显式指定图例类型或位置时使用 ECharts 图例布局。

支持<a href="./core">基础组件</a> API 中的公共图表选项。分类布局在数据清空时移除旧系列及辅助图形。仅刷新数值时保留缩放范围和图例选择。若缩放配置未变，在分类末尾追加数据时保留回看窗口，末端窗口以相同的点数跟随新数据，全范围视图继续显示全部数据。

### 原生配置与 useBarOption

省略 `categories` 即可使用原生配置，适合多坐标系、`dataset` 和混合图。将 `data`、`name`、`barWidth`、`barGap`、`label`、`markArea`、`stack` 作为顶层系列简写，或传入 ECharts `series`。额外 ECharts 模块按需注册。

在 `setup` 中调用 `useBarOption(seriesProps, attrs)` 可得到 `ComputedRef<BarChartProps>`。`BAR_CHART_TOKEN` 为分类布局、原生布局和该组合式函数提供默认配置。系列的 `data` 整体覆盖顶层简写。原生布局的悬浮条纹可用 `useStripeBarSeries` 与 `useStripeBarTooltip` 组合。

原生条纹柱图可将 `useStripeBarTooltip` 的结果展开到轴触发 Tooltip 中。传入 `useStripeBarSeries` 的业务系列需要提供 `name`，以便提示框显示该系列。

```ts
import { useStripeBarSeries, useStripeBarTooltip } from '@idux/charts'
import type { BarChartProps } from '@idux/charts'

const option = {
  xAxis: { type: 'category', data: ['周一', '周二', '周三'] },
  yAxis: { type: 'value' },
  series: useStripeBarSeries({
    series: { name: '访问量', data: [4, 7, 5] },
    color: '#458FFF',
  }),
  tooltip: { trigger: 'axis', ...useStripeBarTooltip('次') },
} satisfies BarChartProps
```

自定义内容和复用内置 HTML 排版的用法见<a href="./core">基础组件 API 的「自定义 Tooltip」</a>。
