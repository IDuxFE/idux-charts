---
title: API
---

### IxPieChart

```vue
<script setup lang="ts">
import { IxPieChart, type PieChartProps } from '@idux/charts'

const option: PieChartProps = {
  layoutMode: 'auto',
  name: '设备状态',
  data: [
    { name: '在线', value: 80 },
    { name: '离线', value: 20 },
  ],
}
</script>

<template>
  <IxPieChart v-bind="option" style="height: 200px" />
</template>
```

### 布局模式

- `layoutMode="auto"` 按容器尺寸计算饼图、标题和图例的位置。只传 `align` 也可启用自动布局。
- `layoutMode="native"` 使用 ECharts 定位与系列配置。省略 `layoutMode` 和 `align` 时默认走此路径，并保留默认合计标题。
- 传入 `center`、`series`、`dataset`、`graphic` 或数组形式的 `title`、`legend` 时使用原生布局。仅通过 `align` 启用自动布局时，标题或图例的定位字段也会切换到原生布局。显式设置 `layoutMode="auto"` 时，组件负责标题和图例定位。
- 以上模式判断也读取 `PIE_CHART_TOKEN` 中的默认配置。自动与原生布局之间切换会重建实例。

### PieChartProps

| 属性                         | 类型                      | 行为                                                                                                                                                                                                |
| ---------------------------- | ------------------------- | --------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| `data`                       | `PieChartProps['data']`   | 分类数据，建议使用唯一的 `name` 和非负的 `value`。                                                                                                                                                  |
| `name`                       | `string`                  | 系列名称，用于默认提示框。                                                                                                                                                                          |
| `align`                      | `PieChartAlign`           | 对齐整个图文区域。支持 `top-start`、`top-center`、`top-end`、`center-start`、`center`、`center-end`、`bottom-start`、`bottom-center`、`bottom-end`。水平方向 `start` 为左图右文，`end` 为左文右图。 |
| `radius`                     | `PieChartProps['radius']` | 单值为外半径，数组为 `[内半径, 外半径]`。百分比以容器短边的一半为基准。自动布局会按可用空间缩小半径，并保持显式内外半径的比例。                                                                     |
| `roseType`                   | `'radius' \| 'area'`      | 启用玫瑰图。自动布局默认保留带装饰的中心孔，指定单值半径可绘制实心玫瑰图。                                                                                                                          |
| `clockwise`                  | `boolean`                 | 默认顺时针，传 `false` 逆时针排列。                                                                                                                                                                 |
| `title`、`legend`、`tooltip` | 对应的 ECharts 选项       | 自动布局由业务传入标题。默认图例显示分类名称和数值，空间不足时分列或分页。用 `legend.formatter` 自定义内容。                                                                                        |
| `label`、`markArea`          | 对应的 ECharts 系列选项   | 扇区标签和标域。自动布局中可用 `label: { position: 'center', formatter }` 显示一段中心摘要。                                                                                                        |
| `seriesStyle`                | `PieSeriesStyle`          | 主系列的 `itemStyle`、`labelLine`、`emphasis`、`blur`、`select`、`selectedMode`。                                                                                                                   |
| `plotTheme`                  | `PlotTheme`               | 自动布局的色板与辅助样式，继承 `PLOT_THEME_TOKEN`。                                                                                                                                                 |

自动布局接受有限非负数，`0` 是有效值。所有分类均为零时显示中性占位环。缺失、负数和非有限值按缺报处理，默认图例显示 `–`，可用 `{ name, value: null, missingReason }` 补充原因。空数据的提示文案由业务页面提供。

自动布局的标题和中心摘要由业务计算。用 `title.text`、`title.subtext` 显示总数及说明。点击图例筛选后，业务文案保持原值。

支持<a href="./core">基础组件</a> API 中的公共图表选项。自动布局清理已移除的样式，图例配置和数据名称相同时保留图例选择。原生布局的默认合计取最终生效的系列数据，可用 `title: null` 移除标题。

### usePieOption

在 `setup` 中调用 `usePieOption(seriesProps, attrs)` 可得到 `ComputedRef<PieChartProps>`。该函数读取 `PIE_CHART_TOKEN`，生成原生饼图配置。组件的自适应布局通过 `layoutMode` 或 `align` 启用。

风险分布示例用同一个函数组装风险数量、占比和统计口径，再分别交给扇区与图例的 formatter。

自定义内容和复用内置 HTML 排版的用法见<a href="./core">基础组件 API 的「自定义 Tooltip」</a>。
