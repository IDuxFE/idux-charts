---
title: API
---

### IxChart

从 `@idux/charts` 导入。将 ECharts option 通过 `v-bind` 传给组件，设置图表宽高。使用按需版 ECharts 时，通过 `echarts/core` 的 `use` 注册所用模块。基础组件内置 SVG 渲染器及网格、图例、提示框、标题、缩略轴和标记组件。使用 `dataset`、其他系列或 Canvas 渲染器时注册相应模块。

```vue
<script setup lang="ts">
import { IxChart, type ChartProps } from '@idux/charts'
import { BarChart } from 'echarts/charts'
import { use } from 'echarts/core'

use([BarChart])

const option = {
  xAxis: { type: 'category', data: ['北京', '深圳', '上海'] },
  yAxis: { type: 'value' },
  series: [{ type: 'bar', data: [4, 7, 5] }],
} satisfies ChartProps
</script>

<template>
  <IxChart v-bind="option" style="height: 300px" />
</template>
```

`ChartProps` 组合 `ChartOption` 和 `AdditionalChartOption`。`ChartOption` 声明库内置系列的类型。使用额外系列时，可用 ECharts 的 `ComposeOption` 描述对应配置。

### AdditionalChartOption

所有图表组件共用以下配置。ECharts 事件可通过 `@click`、`@legendselectchanged` 等监听，回调参数沿用 ECharts。

| 属性                   | 类型                               | 默认值            | 行为                                                                                                                                       |
| ---------------------- | ---------------------------------- | ----------------- | ------------------------------------------------------------------------------------------------------------------------------------------ |
| `chartBackgroundColor` | `EChartsOption['backgroundColor']` | —                 | 设置整个 ECharts 绘图区的背景，优先于顶层原生 `backgroundColor`。                                                                          |
| `autoResize`           | `boolean`                          | `true`            | 随容器尺寸变化调整图表。                                                                                                                   |
| `group`                | `string`                           | —                 | 设置实例的分组 ID，调用 ECharts 的 `connect(group)` 后联动同组图表。                                                                       |
| `initOption`           | `ChartInitOption`                  | —                 | ECharts `init` 的第三个参数。变化时重建实例。                                                                                              |
| `loading`              | `boolean \| object`                | —                 | 显示原生加载遮罩，传对象可配置 `text`、`maskColor` 等。默认文案为 `Loading...`，生效的 ECharts option 含 `darkMode: true` 时使用深色遮罩。 |
| `setOptionOpts`        | `SetOptionOpts`                    | 由图表决定        | 传给 ECharts `setOption` 的第二个参数。单独修改此项也会应用到当前配置。                                                                    |
| `theme`                | `ChartTheme`                       | 注入值或 `'seer'` | ECharts 主题名或主题对象。变化时重建实例。                                                                                                 |
| `onReady`              | `(chart: EChartsType) => void`     | —                 | 创建实例并提交初始 option 后调用。重建时再次调用。                                                                                         |

### 实例访问

所有图表组件均可通过模板 ref 调用 `getEChartsInstance()`。组件挂载后返回当前 ECharts 实例，主题或初始化参数变化后返回新实例。`onReady(chart)` 会在每次初始化后收到实例。

### 配置合并与更新

图表在生成配置时按字段合并对象，数组由优先级更高的配置整体替换。组件属性覆盖图表注入默认值。图表各自负责内置布局所需的轴、数据和辅助图形。

`IxChart` 与 Bar、Line、Pie 的原生模式沿用 ECharts 的默认合并策略。内置布局默认使用 `notMerge: true`。显式传入 `notMerge: false` 时，安全的更新沿用 ECharts 合并。移除配置时会应用完整配置以清理旧状态。分类 Bar、Line 和 Area 在缩放与图例配置未变时会保留用户选择，自动 Pie 和 Radar 在图例选择配置及名称未变时会保留图例选择。

### useChart

在 `setup` 中调用 `useChart(options)`，传入配置对象或 ref。将返回的 `containerRef` 绑定到有宽高的 `div`，通过 `chartRef` 访问实例。实例在挂载时创建，在卸载前销毁。ECharts 模块按所用配置注册；直接使用组合式 API 时也需确保渲染器、组件和主题已注册。

```vue
<script setup lang="ts">
import { seerTheme, useChart } from '@idux/charts'
import { TitleComponent } from 'echarts/components'
import { registerTheme, use } from 'echarts/core'
import { SVGRenderer } from 'echarts/renderers'

use([TitleComponent, SVGRenderer])
registerTheme('seer', seerTheme)

const { containerRef } = useChart({
  title: { text: '资产分布' },
  onReady: chart => chart.resize(),
})
</script>

<template>
  <div ref="containerRef" style="height: 160px" />
</template>
```
