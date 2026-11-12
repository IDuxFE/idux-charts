---
title: API
---

### IxLineChart

传入 `categories` 启用分类布局。每个采样值按下标对应一个 X 轴标签。单系列用 `data`，多系列用 `series`。每个系列的 `data` 优先于顶层数据，可通过 `yAxisIndex` 或 `yAxisId` 选择 Y 轴。

```vue
<script setup lang="ts">
import { IxLineChart, type LineChartProps } from '@idux/charts'

const option: LineChartProps = {
  categories: ['07-01', '07-02', '07-03'],
  data: [85, { value: null, missingReason: '采集超时' }, 155],
  name: '上行流量',
  yAxis: { name: 'Kbps' },
  dataZoom: { type: 'slider' },
  referenceLine: { value: 120, name: '告警阈值' },
}
</script>

<template>
  <IxLineChart v-bind="option" style="height: 320px" />
</template>
```

### LineChartProps

| 属性            | 类型                                               | 分类布局行为                                                                              |
| --------------- | -------------------------------------------------- | ----------------------------------------------------------------------------------------- |
| `categories`    | `string[]`                                         | X 轴采样标签。                                                                            |
| `data`          | `LineChartProps['data']`                           | 单系列采样值。缺报可传 `null` 或 `{ value: null, missingReason }`。                       |
| `series`        | `LineChartProps['series']`                         | 多系列配置，可分别设置 `name`、`smooth`、`stack`、`yAxisIndex` 等。                       |
| `area`          | `boolean \| 'striped'`                             | 默认绘制折线。`true` 添加渐变填充，`'striped'` 添加条纹填充，`areaStyle` 可覆盖填充样式。 |
| `referenceLine` | `{ value: number; name?: string; color?: string }` | 在第一条 Y 轴的指定值绘制水平虚线，提供独立名称后可用图例切换。                           |
| `zeroText`      | `string`                                           | 全部采样值为 0 时的可选提示，保留坐标轴和系列。                                           |
| `plotTheme`     | `PlotTheme`                                        | 分类布局的色板和辅助元素颜色，继承 `PLOT_THEME_TOKEN`。                                   |

`0` 为有效值。内侧孤立缺报通常用插值圆点表示，首尾或连续缺报用底纹表示，可用 `plotTheme.missingBackgroundColor` 调整底纹。默认提示框列出已上报的值与可用的缺报原因。插值只用于绘制。自定义提示框或事件回调收到系列内的插值项时，可通过 `params.data`、`params.value` 读取原采样项和值。

分类布局使用第一项 `xAxis` 的样式，类型和标签由 `categories` 决定。`dataZoom` 默认绑定 X 轴，显式指定目标轴时沿用该绑定。多系列默认显示图例，空间不足时分页。用 `tooltip.valueFormatter` 改写数值，用 `tooltip.formatter` 改写整个提示框。

支持<a href="./core">基础组件</a> API 中的公共图表选项。分类布局在数据清空时移除旧系列及辅助图形。仅刷新数值时保留缩放范围和图例选择。

### 原生配置与 useLineOption

省略 `categories` 可使用 ECharts 时间轴、多坐标系和 `dataset`，额外 ECharts 模块按需注册。顶层系列简写为 `data`、`name`、`areaStyle`、`label`、`markArea`、`smooth` 和 `stack`。

在 `setup` 中调用 `useLineOption(seriesProps, attrs)` 可得到 `ComputedRef<LineChartProps>`。`LINE_CHART_TOKEN` 为分类布局、原生布局和该组合式函数提供默认配置。系列的 `data` 整体覆盖顶层简写。原生布局的默认 Tooltip 向 `tooltip.valueFormatter` 传入数据所在值轴的测量值。

自定义内容和复用内置 HTML 排版的用法见<a href="./core">基础组件 API 的「自定义 Tooltip」</a>。
