---
title: API
---

### IxBulletChart

可从 `@idux/charts` 或 `@idux/charts/bullet` 导入组件和类型。

```vue
<script setup lang="ts">
import { IxBulletChart } from '@idux/charts/bullet'
</script>
<template>
  <IxBulletChart :value="75" :target="85" style="width: 320px; height: 32px" />
</template>
```

支持公共图表配置、事件、默认插槽和 `getEChartsInstance()`，详见<a href="./core">IxChart API</a>。默认插槽可承载业务空状态，`loading` 使用内置子弹图加载插画。

默认分组布局的类别标签最多显示 186px，短名称按实际宽度占位，超出后省略。悬停标签可查看完整类别名，缺失值和全零场景同样支持；内置 HTML 提示框的长标题会限宽换行。可用 `yAxis.axisLabel` 覆盖标签样式，用 `yAxis.triggerEvent: false` 关闭标签全文提示。默认左边距为 16px，可用 `grid.left` 覆盖。

分组模式配置 `ranges` 后，横轴刻度默认使用量程两端和各区间上界。可通过原生 ECharts 配置 `xAxis.axisLabel.customValues` 指定刻度位置，`xAxis.axisLabel.formatter` 设置显示格式；显式设置 `xAxis.interval`、`xAxis.splitNumber` 或动态 `xAxis.min/max` 时，改用 ECharts 的刻度划分。

横轴刻度文字默认自动避让，优先显示范围两端；空间不足时隐藏重叠文字，阈值线与色轴保持完整。可用 `xAxis.axisLabel.hideOverlap: false` 关闭自动避让，用 `showMinLabel`、`showMaxLabel` 控制两端文字是否显示。

分组模式可设置 `layout: 'horizontal-above'`，将类别名称放到轨道上方、数值放到实际值条右侧，适用于长名称。名称随图表宽度省略，悬停可查看完整名称与实际值、目标值。此布局中零值不显示数值标签，全零时保留轨道和目标线，缺失值仅显示缺报底条，不显示数值标签；无范围区间时隐藏横轴，有范围区间时保留阈值线与底部色轴。默认预留右侧 72px，可通过 `grid.right` 调整以容纳较长的格式化数值。

上方类别名称由自定义布局绘制，使用 `plotTheme` 的文字颜色和字体，不受 `yAxis.axisLabel` 控制；右侧数值仍使用原生 `label`。

数值标签沿用 ECharts `label` 配置，可在外层通过 `label: { show: false }` 关闭，也可设置 `position`、`distance`、`offset`、`rotate`、`formatter`、`color`、`fontSize`、`rich` 等。上方标签布局默认显示，其他布局默认隐藏，可显式设置 `show: true` 开启；默认 `position: 'right'`、`distance: 2`。`label` 只控制数值文字，不影响类别名称或 Tooltip。

```ts
{
  layout: 'horizontal-above',
  label: { show: false },
}
```

使用 `label.formatter` 格式化数值标签，使用 `tooltip.valueFormatter` 格式化提示框数值；两者互不影响。支持 `{a}`（实际值系列名称）、`{b}`（类别名）、`{c}`（实际值）的模板字符串，也支持回调；回调的 `params.value` 为原始实际值，缺失时为 `null`，`params.data` 保留对应数据项的业务字段（非有限测量值会归一化为 `null`）。

### ECharts 原生配置覆盖

可直接在组件外层传入 ECharts 原生配置，覆盖子弹图的默认配置。字段含义和子项沿用 [ECharts 配置项文档](https://echarts.apache.org/zh/option.html)。

| 配置               | 说明                                                                   |
| ------------------ | ---------------------------------------------------------------------- |
| `name`             | 原生 `series.bar.name`，设置实际值系列名称。                           |
| `label`            | 完整的原生 `series.bar.label`，控制实际值条的数值标签。                |
| `itemStyle`        | 原生 `series.bar.itemStyle`，控制实际值条的样式。                      |
| `emphasis`         | 原生 `series.bar.emphasis`，控制悬停状态。                             |
| `select`           | 原生 `series.bar.select`，控制选中状态；通过 `selectedMode` 开启选中。 |
| `markLine`         | 原生 `series.bar.markLine`，添加标记线。                               |
| `xAxis`            | 原生 `xAxis`，覆盖横轴配置。                                           |
| `yAxis`            | 原生 `yAxis`，覆盖纵轴配置。                                           |
| `tooltip`          | 原生 `tooltip`，覆盖提示框配置。                                       |
| `data[].itemStyle` | 原生 bar 数据项的 `itemStyle`，只覆盖对应数据项的实际值条。            |

`labelLayout`、`blur`、`selectedMode`、`markPoint`、`markArea`、`silent`、`cursor` 同样使用原生系列配置。`grid`、`dataZoom` 和 `animation*` 使用原生图表配置。具体类型见下表。显式设置条宽时由 ECharts 计算，轨道和目标线按实际条厚度同步绘制。量程使用 `xAxis.min`、`xAxis.max`；默认最小值为 0，最大值取 100、实际值、目标值和区间上界中的最大值。

系列配置作用于实际值条，数据项配置优先于外层配置，外层配置优先于默认值。轨道使用 `trackColor`，目标线使用 `targetColor`，范围引导使用 `ranges`。`data[].itemStyle.color` 优先于外层 `itemStyle.color`，二者均优先于原生调色盘 `color` 和默认配色。内置 Tooltip 的实际值色标使用原生条的最终颜色，在实际条、轨道和目标线之间移动指针时保持一致，也支持颜色回调。

缺失实际值没有柱体，上方标签布局不显示缺失值标签；其他布局显式开启的“–”标签支持 `label` 的静态样式、位置和格式化，行级 `data[].label` 优先于外层 `label`，但不参与原生 `labelLayout`、柱体悬停或选中。缺失值格式化时，`params.value` 与 `params.data.value` 均为 `null`，不会修改传入的数据项。

`series` 会整体替换生成的系列。内置布局保持横向数值轴和纵向类别轴；`stack`、多系列分组、极坐标、`dataset`/`encode` 和大数据渐进渲染需要自定义 `series` 或使用 `IxBarChart`。

### BulletChartProps

| 属性           | 类型                                 | 默认值或行为                                                                                                                                                                                                                                                                           |
| -------------- | ------------------------------------ | -------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| `layout`       | `'horizontal' \| 'horizontal-above'` | 默认 `horizontal`；仅作用于分组模式。                                                                                                                                                                                                                                                  |
| `name`         | `BarSeriesOption['name']`            | 原生实际值系列名称，默认“实际值”。                                                                                                                                                                                                                                                     |
| `label`        | `BarSeriesOption['label']`           | ECharts 数值标签配置。上方标签布局默认显示，其余布局默认隐藏；可用 `show` 显式覆盖。                                                                                                                                                                                                   |
| `itemStyle`    | `BarSeriesOption['itemStyle']`       | 原生实际值条样式配置，可覆盖默认值。                                                                                                                                                                                                                                                   |
| `labelLayout`  | `BarSeriesOption['labelLayout']`     | 原生数值标签布局配置，可覆盖默认值。                                                                                                                                                                                                                                                   |
| `emphasis`     | `BarSeriesOption['emphasis']`        | 原生悬停状态配置，可覆盖默认值。                                                                                                                                                                                                                                                       |
| `blur`         | `BarSeriesOption['blur']`            | 原生弱化状态配置，可覆盖默认值。                                                                                                                                                                                                                                                       |
| `select`       | `BarSeriesOption['select']`          | 原生选中状态配置，可覆盖默认值。                                                                                                                                                                                                                                                       |
| `selectedMode` | `BarSeriesOption['selectedMode']`    | 原生选中模式配置，可覆盖默认值。                                                                                                                                                                                                                                                       |
| `markLine`     | `BarSeriesOption['markLine']`        | 原生标记线配置，可覆盖默认值。                                                                                                                                                                                                                                                         |
| `markPoint`    | `BarSeriesOption['markPoint']`       | 原生标记点配置，可覆盖默认值。                                                                                                                                                                                                                                                         |
| `markArea`     | `BarSeriesOption['markArea']`        | 原生标记区域配置，可覆盖默认值。                                                                                                                                                                                                                                                       |
| `silent`       | `BarSeriesOption['silent']`          | 原生是否响应鼠标事件配置，可覆盖默认值。                                                                                                                                                                                                                                               |
| `cursor`       | `BarSeriesOption['cursor']`          | 原生鼠标指针样式配置，可覆盖默认值。                                                                                                                                                                                                                                                   |
| `value`        | `number \| null`                     | 单图实际值。0 有效，缺失值不绘制实际条。                                                                                                                                                                                                                                               |
| `target`       | `number \| null`                     | 单图目标值，省略时不显示目标线。                                                                                                                                                                                                                                                       |
| `data`         | `BulletChartDataItem[]`              | 传入即切换为分组模式，优先于 `value`、`target`，包括空数组和单项数组。                                                                                                                                                                                                                 |
| `ranges`       | `BulletRange[]`                      | 默认为空。每项为 `{ upper: number, color?: string, label?: string }`，上界使用实际数值，必须大于最小值、严格递增且不超过最大值。颜色省略时循环使用内置红 `#F5654F`、黄 `#FFC145`、绿 `#20CC94`，可逐项覆盖；单图背景区间不透明度为 10%。未覆盖的尾段使用普通轨道颜色。边界归入前一段。 |
| `targetColor`  | `string`                             | 目标线颜色，默认单图按目标所在区间配色，分组图使用主色。                                                                                                                                                                                                                               |
| `trackColor`   | `string`                             | 普通轨道色，默认主色的淡色。                                                                                                                                                                                                                                                           |
| `color`        | `EChartsOption['color']`             | 原生调色盘；未指定时使用默认渐变及区间配色。                                                                                                                                                                                                                                           |
| `barWidth`     | `BarSeriesOption['barWidth']`        | 原生条宽，支持像素和百分比。未设置宽度配置时默认实际条 8px、轨道 16px；可见分类不超过 3 时为 16px、24px。                                                                                                                                                                              |
| `barMinWidth`  | `BarSeriesOption['barMinWidth']`     | 原生最小条宽，支持像素和百分比。                                                                                                                                                                                                                                                       |
| `barMaxWidth`  | `BarSeriesOption['barMaxWidth']`     | 原生最大条宽，支持像素和百分比。                                                                                                                                                                                                                                                       |
| `zeroText`     | `string`                             | 全部实际值为 0 时的可选提示；无默认文案，省略或传空字符串时不显示。                                                                                                                                                                                                                    |
| `plotTheme`    | `PlotTheme`                          | 支持主色、坐标轴文字和字体、边界和网格线，也支持注入响应式 `PLOT_THEME_TOKEN`。                                                                                                                                                                                                        |

无效量程、无效区间会清空生成的 series，并通过 `console.warn` 输出包含字段位置和约束的 `[IxBulletChart]` 诊断。缺失测量值、零值及空数组不触发诊断。原生 ECharts option 在默认配置后合并，数组整体替换；传入 `series` 会整体替换生成系列。实际条、目标线和区间引导使用合并后的坐标轴，支持通过 `xAxis.min`、`xAxis.max` 和 `xAxis.inverse` 调整量程和方向。区间有效性按 `xAxis.min`、`xAxis.max` 的数值范围校验；内置布局要求横向数值轴和纵向类别轴。

分组图的数据刷新会保留当前缩放窗口；在末尾追加类别时，历史窗口保持原位，位于末尾的窗口跟随新增类别。显式修改 `dataZoom` 配置时使用新配置；类别重排或删除时重新应用配置窗口。

### BulletChartDataItem

| 属性                                                  | 类型                        | 说明                                                                               |
| ----------------------------------------------------- | --------------------------- | ---------------------------------------------------------------------------------- |
| `name`                                                | `string`                    | 类别名称，按数组顺序从上到下展示。                                                 |
| `value`、`target`                                     | `number \| null`            | 实际值和目标值；实际值缺失或非有限数时显示浅红色背景带，目标值有效时仍显示目标线。 |
| `itemStyle`                                           | `object`                    | ECharts 原生 bar 数据项样式，只覆盖当前数据项。                                    |
| `id`、`label`、`emphasis`、`blur`、`select`、`cursor` | 对应原生 bar 数据项字段类型 | 当前数据项的原生配置。                                                             |
| `missingReason`                                       | `string`                    | 实际值缺失说明，在缺失背景带的 Tooltip 中展示；未提供时显示“–”。                   |

`BulletRange.label` 可用于业务侧图例和说明，不自动添加画布文字。完整的数据状态、负值基线、颜色覆盖优先级和诊断说明见“指南”。

### createBulletOption

`createBulletOption(props: BulletChartProps)` 返回 ECharts option。直接调用时显式传入主题配置；组件会自动读取注入主题。
