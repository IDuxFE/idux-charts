---
title: API
---

### IxChart

本页统一说明所有图表组件的公共属性、插槽、主题、实例访问、配置更新及 Tooltip 工具。各图表 API 仅补充专有属性与布局规则。

从 `@idux/charts` 导入，或在 ESM 项目中从 `@idux/charts/core` 按需导入。将 ECharts option 通过 `v-bind` 传给组件，设置图表宽高。使用按需版 ECharts 时，通过 `echarts/core` 的 `use` 注册所用模块。基础组件内置 SVG 渲染器及网格、图例、提示框、标题、缩略轴和标记组件。使用 `dataset`、其他系列或 Canvas 渲染器时注册相应模块。

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

### 默认插槽

`IxChart`、Bar、Line / Area、Pie、Radar、Gauge、LiquidFill 和 Map 均支持默认插槽，可放置空状态、错误提示或自定义内容。

| 插槽      | 参数 | 说明                                                |
| --------- | ---- | --------------------------------------------------- |
| `default` | —    | 覆盖在图表上方的 DOM 内容，不自动判断数据是否为空。 |

覆盖层铺满图表的内容区域，不占用外层容器的 padding 与边框。直接子节点默认拉伸填满可用空间，无需为 `IxEmpty` 额外设置宽高。多个根节点按行平分高度；需要其他排版时，传入一个包装节点自行布局。子节点显式设置的尺寸、外边距和对齐仍然生效。

图表宽高可通过组件的 `style` 设置，也可随父容器尺寸变化。默认开启 `autoResize`，尺寸变化时更新现有实例。支持 `min-height`、padding，以及 `relative`、`static`、`absolute`、`fixed` 和 `sticky` 定位；父容器中的 flex/grid 布局仍由外层容器参与。使用百分比高度时，父容器需要提供可解析的高度。

以下示例由业务提供 `isEmpty`。空状态遮住底层图形，切换时保留图表实例。

```vue
<template>
  <IxChart v-bind="option" style="height: 300px">
    <IxEmpty v-if="isEmpty" simple description="暂无数据" class="chart-empty" />
  </IxChart>
</template>

<style scoped>
.chart-empty {
  /* 清除 IxEmpty 的默认外边距，让背景完整遮住底层图表。 */
  margin: 0;
  background: var(--ix-color-container-bg);
}
</style>
```

`IxEmpty`（包括 `simple` 模式）自带外边距，完整遮盖图表时需要清除；独立展示占位内容时可保留默认外边距。背景由业务设置，未设置背景时可同时看到插槽内容和底层图形。上例使用的背景变量由 iDux 组件主题提供，也可替换为应用自己的背景色。

需要重试操作时，可在 `IxEmpty` 的 `description` 插槽中排列文案与按钮：

```vue
<template #description>
  <IxSpace align="center">
    <span>暂无数据</span>
    <IxButton mode="link" size="sm" style="display: flex" @click="reload">重新加载</IxButton>
  </IxSpace>
</template>
```

`align="center"` 对齐文案和按钮的包装层，按钮的 `display: flex` 消除包装层内的行内基线间隙。`reload` 及请求状态由业务维护，图表不会自动发起请求。控制插槽内容的显隐不会销毁或重建图表实例；主题变化会重建图表实例，插槽内容仍保留。

覆盖层默认接收鼠标事件，即使背景透明也会阻挡底层图表交互。仅展示说明并需要操作图表时，可设置 `.ix-chart-overlay { pointer-events: none; }`，再对需要交互的局部节点设置 `pointer-events: auto`。在 `scoped` 样式中，使用 `:deep(.ix-chart-overlay)` 选择内部覆盖层。无有效插槽内容时不渲染覆盖层。插槽内容属于 DOM，不包含在 ECharts 导出的图片中。

### AdditionalChartOption

所有图表组件共用以下配置。ECharts 事件可通过 `@click`、`@legendselectchanged` 等监听，回调参数沿用 ECharts。

| 属性                   | 类型                               | 默认值            | 行为                                                                                                                                                                                                                                                                                                                                                      |
| ---------------------- | ---------------------------------- | ----------------- | --------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| `chartBackgroundColor` | `EChartsOption['backgroundColor']` | —                 | 设置整个 ECharts 绘图区的背景，优先于顶层原生 `backgroundColor`。                                                                                                                                                                                                                                                                                         |
| `autoResize`           | `boolean`                          | `true`            | 随容器尺寸变化调整图表。                                                                                                                                                                                                                                                                                                                                  |
| `group`                | `string`                           | —                 | 设置实例的分组 ID，调用 ECharts 的 `connect(group)` 后联动同组图表。                                                                                                                                                                                                                                                                                      |
| `initOption`           | `ChartInitOption`                  | —                 | ECharts `init` 的第三个参数。变化时重建实例。                                                                                                                                                                                                                                                                                                             |
| `loading`              | `boolean \| ChartLoadingOptions`   | —                 | 显示内置图标和加载文案，保留图表实例及已有数据。各 Plot 自动选择对应图标；`IxChart` 和 `useChart` 根据首个系列判断，饼图或无类型时默认饼图，其余类型使用通用图标。传对象可配置 `text`、`textColor`、`maskColor`、`color`、`fontSize`、`fontFamily`、`icon`（图片 URL 或 SVG 源码）。默认文案为 `Loading...`，图标和遮罩随生效的 `darkMode` 适配深浅主题。 |
| `setOptionOpts`        | `SetOptionOpts`                    | 由图表决定        | 传给 ECharts `setOption` 的第二个参数。单独修改此项也会应用到当前配置。                                                                                                                                                                                                                                                                                   |
| `theme`                | `ChartTheme`                       | 注入值或 `'seer'` | ECharts 主题名或主题对象。变化时重建实例。                                                                                                                                                                                                                                                                                                                |
| `onReady`              | `(chart: EChartsType) => void`     | —                 | 创建实例并提交初始 option 后调用。重建时再次调用。                                                                                                                                                                                                                                                                                                        |

加载内容由 DOM 绘制，不包含在 ECharts 导出的图片中。原生旋转动画选项（如 `showSpinner`、`spinnerRadius`）不再改变加载图标。`ChartLoadingOptions` 可从 `@idux/charts` 或 `@idux/charts-core` 导入。

### 实例访问

所有图表组件均可通过模板 ref 调用 `getEChartsInstance()`。组件挂载后返回当前 ECharts 实例，主题或初始化参数变化后返回新实例。`onReady(chart)` 会在每次初始化后收到实例。重建时会恢复配置兼容的缩放和图例选择，显式变更范围或选择时采用新配置。

初始化配置提交失败时会销毁已创建的实例，保留原始异常交给 Vue 错误处理，不触发 `onReady`。纠正配置后重新挂载组件。

### 主题与文字样式

`theme` 控制 ECharts 主题，默认继承 `CHART_THEME_TOKEN`，显式属性优先，未配置时使用 `seer`。修改 `theme` 或 `initOption` 会重建实例，详见「实例访问」。

Plot 的绘图默认样式使用独立的 `plotTheme: PlotTheme`。分类 Bar、Line / Area、自动 Pie、Radar、Gauge、LiquidFill 和 Map 继承 `PLOT_THEME_TOKEN`；局部 `plotTheme` 覆盖已定义的字段，未定义字段继续继承，色板等数组整体替换。`CHART_THEME_TOKEN` 从 `@idux/charts` 或 `@idux/charts-core` 导入，`PLOT_THEME_TOKEN` 与 `PlotTheme` 从 `@idux/charts` 或 `@idux/charts-plots` 导入。

Bar、Line / Area 的 `zeroText` 默认颜色为浅色 `#A1A7B3`、深色 `#808999`，可通过 `plotTheme.secondaryTextColor` 覆盖。

Gauge 和 LiquidFill 的角色文字样式使用 `PlotTextStyle`，支持 `color`、`fontFamily`、`fontSize`、`fontWeight` 和 `lineHeight`。样式按专用颜色、字号等属性 → 对应角色样式 → ECharts `textStyle` → `plotTheme` → 组件默认值的优先级取值；各角色的默认字号和字体见对应图表 API。

### 组合式配置函数

在 `setup` 中调用以下函数，传入系列简写 `seriesProps` 和其余选项 `attrs`，返回响应式的 `ComputedRef`。系列内的 `data` 优先于顶层简写。组件和对应组合式函数均读取各自的默认配置注入。

| 函数                                | 返回类型                      | 默认配置注入       |
| ----------------------------------- | ----------------------------- | ------------------ |
| `useBarOption(seriesProps, attrs)`  | `ComputedRef<BarChartProps>`  | `BAR_CHART_TOKEN`  |
| `useLineOption(seriesProps, attrs)` | `ComputedRef<LineChartProps>` | `LINE_CHART_TOKEN` |
| `usePieOption(seriesProps, attrs)`  | `ComputedRef<PieChartProps>`  | `PIE_CHART_TOKEN`  |

这些函数只生成配置，使用 `IxChart` 或 `useChart` 管理实例。Bar/Line 的分类布局和 Pie 的自适应布局通过对应图表组件启用，各函数的专有参数与行为见对应图表 API。

### 纯配置函数

`createRadarOption`、`createGaugeOption`、`createLiquidFillOption`、`createMapOption` 及地图数据生成函数直接返回 ECharts 配置，不读取 Vue 注入。需要主题时显式传入 `plotTheme`；输入数据或主题变化时，在 `computed` 中重新调用。返回值不包含图表实例、插槽或自动 resize 等组件能力。

### 配置合并与更新

图表在生成配置时按字段合并对象，数组由优先级更高的配置整体替换。组件属性覆盖图表注入默认值。Radar、Gauge、LiquidFill 和 Map 的显式 `series` 整体替换生成系列。图表各自负责内置布局所需的轴、数据和辅助图形。分类 Bar、Line / Area 在数据清空时移除旧系列及辅助图形。

`IxChart` 与 Bar、Line、Area、Pie 的原生模式沿用 ECharts 的默认合并策略。内置布局默认使用 `notMerge: true`。显式传入 `notMerge: false` 时，安全的更新沿用 ECharts 合并。移除配置时会应用完整配置以清理旧状态。分类 Bar、Line 和 Area 在缩放与图例配置未变时会保留用户选择，自动 Pie 和 Radar 在图例选择配置及名称未变时会保留图例选择。

地图的视角保留和重置规则见<a href="./map">Map API 的「交互状态与数据诊断」</a>。

Radar、Gauge、LiquidFill 和 Map 仅修改 `loading`、事件、`group` 或容器属性时保留现有图形；修改 `setOptionOpts` 会重新提交当前配置。

分类 Bar、Line 和 Area 在 `categories` 末尾追加标签且缩放配置未变时，回看的窗口保持原范围，停在末端的窗口跟随新数据并保持采样点数，全范围视图继续显示全部数据。替换或重排分类时采用传入的缩放配置。

### 无障碍

图表组件将 `role`、`aria-*`、`tabindex` 和 `data-*` 转发到图表容器。可用 `role="img"` 和 `aria-label` 为图表提供名称，用 `aria-describedby` 关联说明。需要操作图例或查看具体数据时，可在容器外提供键盘可操作的控件和数据表。

### 默认图例与提示框样式

分类 Bar、Line / Area 的多行图例默认采用 16px 行间距；显式指定图例类型或位置时使用 ECharts 图例布局。Pie 的自适应图例间距见其专有 API。

内置 Plot 的分类色标默认使用圆角为 1px 的矩形，`seer` 主题也使用该色标。原生图例可通过 `legend.icon` 指定其他图标，分类布局可通过 `legend.data` 指定图例项及图标。`createLegendIcon(width = 12, height = 12)` 返回 ECharts `path://` 图标字符串，可从 `@idux/charts` 或 `@idux/charts-core` 导入。自定义图例尺寸时可同时设置 `legend.itemWidth`、`legend.itemHeight`，并用相同尺寸调用该函数。

`seer` 主题的浅色提示框背景为 `rgba(251, 253, 255, 0.72)`。导入 `@idux/charts/dist/style.css` 后，HTML 提示框带有 4px 背景模糊；不支持背景模糊的浏览器仍显示半透明背景。显式设置的 `tooltip.backgroundColor` 优先。

### 自定义 Tooltip

分类和原生 Bar、Line / Area 可用 `tooltip.valueFormatter` 修改数值显示，同时沿用内置标题、色标和缺报提示。需要自己组织标题、数据行或输出格式时，用 `tooltip.formatter` 提供完整内容。回调参数来自 ECharts，单项提示通常收到一个数据项，轴触发提示通常收到数据项数组。

以下工具均可从 `@idux/charts` 或 `@idux/charts-core` 导入。

| 工具                                                | 用法                                                                                                                                                                                                   |
| --------------------------------------------------- | ------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------ |
| `useTooltipsFormatter(title, rows, rowsPerColumn?)` | 把标题和 `{ name: string, value: string \| number, color? }[]` 渲染成内置样式的 HTML 字符串。`color` 可传纯色或渐变。传入正整数 `rowsPerColumn` 可按行数分列。标题、名称和数值传原始文本，由工具转义。 |
| `getTooltipsColor(color)`                           | 传入纯色时返回原值。传入渐变时，从可见色标中优先取不透明度最高的颜色，同透明度取较深的颜色。无可用色标时返回空字符串。                                                                                 |
| `useStripeBarTooltip(unit)`                         | 返回原生条纹柱图的 `tooltip` 配置片段，包含 `formatter` 和 `axisPointer`。在 `trigger: 'axis'` 下使用，可追加单位并过滤没有系列名的辅助项。                                                            |

使用内置 HTML 排版时，在应用入口导入一次 `@idux/charts/dist/style.css`。下面的折线图从轴触发回调中取出业务数据行，再补一行说明。

```vue
<script setup lang="ts">
import { getTooltipsColor, IxLineChart, useTooltipsFormatter } from '@idux/charts'
import type { LineChartProps } from '@idux/charts'

const option = {
  categories: ['周一', '周二', '周三'],
  data: [24, 30, 36],
  name: '延迟',
  tooltip: {
    trigger: 'axis',
    renderMode: 'html',
    formatter(params) {
      const points = Array.isArray(params) ? params : [params]
      const lines = points.filter(point => point.seriesType === 'line')
      if (!lines.length) return ''

      const rows = lines.map(point => ({
        name: point.seriesName ?? '',
        value: typeof point.value === 'number' ? `${point.value} ms` : '–',
        color: getTooltipsColor(point.color),
      }))
      return useTooltipsFormatter(lines[0]!.name, [
        ...rows,
        { name: '统计口径', value: '最近 24 小时' },
      ])
    },
  },
} satisfies LineChartProps
</script>

<template>
  <IxLineChart v-bind="option" style="height: 320px" />
</template>
```

自动 Pie 可分别通过 `tooltip.formatter` 和 `legend.tooltip.formatter` 配置扇区和图例提示，两处可共用一个内容组装函数。Gauge、LiquidFill 的内置系列默认静默，`valueFormatter` 用于图内数值文字。

### useChart

在 `setup` 中调用 `useChart(options)`，传入配置对象或 ref。将返回的 `containerRef` 绑定到有宽高的 `div`，通过 `chartRef` 访问实例。实例在挂载时创建，在卸载前销毁。ECharts 模块按所用配置注册；直接使用组合式 API 时也需确保渲染器、组件和主题已注册。

将 `loading` 放在响应式配置中即可切换加载状态。「函数用法」示例提供了开关，可查看通用加载图标。

```vue
<script setup lang="ts">
import { computed, ref } from 'vue'
import { seerTheme, useChart, type ChartProps } from '@idux/charts'
import { TitleComponent } from 'echarts/components'
import { registerTheme, use } from 'echarts/core'
import { SVGRenderer } from 'echarts/renderers'

use([TitleComponent, SVGRenderer])
registerTheme('seer', seerTheme)

const loading = ref(false)
const option = computed<ChartProps>(() => ({
  loading: loading.value && { text: '图表正在加载中，请稍后...' },
  title: { text: '资产分布' },
  onReady: chart => chart.resize(),
}))
const { containerRef } = useChart(option)
</script>

<template>
  <button type="button" @click="loading = !loading">切换加载状态</button>
  <div ref="containerRef" style="height: 160px" />
</template>
```
