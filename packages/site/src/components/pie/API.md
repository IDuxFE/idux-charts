---
title: API
---

### IxPieChart

提供实心饼图、环形图和玫瑰图，支持自动排布饼图、标题和图例。

#### PieChartProps

表中默认行为指启用自动布局后的行为；未设置 `layoutMode` 和 `align` 时保留 1.0.0 的原生布局与默认效果。

同时支持 [ECharts 配置](https://echarts.apache.org/zh/option.html)和 [AdditionalChartOption](/components/core#additionalchartoption)。

| 名称        | 说明                                                                                   | 类型                        | 默认值             |
| ----------- | -------------------------------------------------------------------------------------- | --------------------------- | ------------------ |
| `data`      | 数据，分类 `name` 应唯一；`0` 为有效值，`null` 表示缺失，可用 `missingReason` 补充原因 | `PieChartProps['data']`     | —                  |
| `name`      | 系列名称，显示在默认 tooltip 中                                                        | `string`                    | —                  |
| `align`     | 自动布局下整个图文区域的对齐位置，见下表                                               | `PieChartAlign`             | `center-start`     |
| `radius`    | 半径；数组为 `[内半径, 外半径]`。自动布局中作为尺寸上限，空间不足时缩小                | `number \| string \| Array` | 自动计算           |
| `roseType`  | 启用玫瑰图                                                                             | `'radius' \| 'area'`        | —                  |
| `clockwise` | 扇区是否顺时针排列；`false` 为逆时针                                                   | `boolean`                   | `true`             |
| `title`     | 标题内容及样式；自动布局不自动生成统计标题或计算合计                                   | `TitleComponentOption`      | 不显示             |
| `legend`    | 图例显隐、格式化及样式                                                                 | `LegendComponentOption`     | 显示名称和数值     |
| `tooltip`   | 提示内容及样式                                                                         | `TooltipComponentOption`    | 显示系列名称及数据 |
| `label`     | 扇区标签；`position: 'center'` 可显示一次业务提供的中心摘要                            | `SeriesLabelOption`         | —                  |
| `center`    | 手动指定圆心，如 `['50%', '50%']`；设置后退出自动布局                                  | `Array`                     | 自动计算           |
| `markArea`  | 图表标域                                                                               | `MarkAreaOption`            | —                  |

#### 什么时候使用自动布局？

**设置 `layoutMode="auto"` 或声明 `align` 启用。** 自动布局负责计算圆心、尺寸、标题和图例位置，并随容器尺寸变化更新。

| 配置方式                                                                         | 是否自动布局            |
| -------------------------------------------------------------------------------- | ----------------------- |
| 仅使用 1.0.0 属性（未设置 `layoutMode` / `align`）                               | 否，保留 1.0.0 默认效果 |
| `layoutMode="auto"`，或 `align` 配合标题/图例内容、显隐、样式                    | 是                      |
| `radius` / `roseType` / `color` / `theme`，同时设置 `align`                      | 是                      |
| `radius` / `roseType` / `color` / `theme`，未设置 `align` 或 `layoutMode="auto"` | 否，保留旧版配置行为    |
| 设置 `center`、`series`、`dataset` 或 `graphic`                                  | 否，即使设置了 `align`  |
| `title` / `legend` 使用数组                                                      | 否，包括显式 auto 模式  |
| `title` / `legend` 设置定位字段，且未设置 `layoutMode="auto"`                    | 否，即使设置了 `align`  |
| `layoutMode="native"`                                                            | 否                      |

以上规则也适用于 `PIE_CHART_TOKEN` 全局配置。自动布局中可使用 `title.textStyle`、`legend.formatter` 等展示配置，无需手动计算位置。设置 `:auto-resize="false"` 可暂停尺寸跟随。

#### 基础用法与形态

为容器提供明确尺寸；`name` 是整个系列名称，`data[].name` 是分类名称。

```vue
<script setup lang="ts">
import { IxPieChart } from '@idux/charts'

const data = [
  { name: '在线', value: 80 },
  { name: '离线', value: 20 },
]
</script>

<template>
  <IxPieChart layout-mode="auto" name="设备状态" :data="data" style="width: 480px; height: 180px" />
</template>
```

```vue
<!-- 实心：省略 radius -->
<IxPieChart name="设备状态" :data="data" align="center" />

<!-- 环形：内半径大于 0；保留自动布局时需设置 align -->
<IxPieChart name="设备状态" :data="data" align="center" :radius="['70%', '80%']" />

<!-- 玫瑰图：480 × 180 基准容器下最大扇区默认半径为 82px，随可用空间自适应 -->
<IxPieChart name="设备状态" :data="data" align="center" rose-type="radius" />
```

百分比半径以容器短边的一半为基准。自动布局会根据图例和标题占用的空间缩小半径，并保持环形图的内外半径比例。隐藏图例后，饼图可使用更多空间。

#### 标题、图例与 tooltip

统计口径和业务文案由调用方显式提供。例如 `total` 为业务计算的合计：

```vue
<!-- 大数字 + 下方说明，即“重总数” -->
<IxPieChart
  name="设备状态"
  :data="data"
  align="center"
  :title="{
    text: String(total),
    subtext: '设备总数',
    itemGap: 8,
    textStyle: { fontSize: 28, fontWeight: 700, lineHeight: 28 },
  }"
/>

<!-- 自定义图例内容与 tooltip 字号 -->
<IxPieChart
  name="设备状态"
  :data="data"
  :legend="{ formatter: name => `设备：${name}` }"
  :tooltip="{ textStyle: { fontSize: 12 } }"
/>

<!-- 环形图中心显示业务合计，隐藏图例 -->
<IxPieChart
  name="设备状态"
  :data="data"
  align="center"
  :radius="['70%', '80%']"
  :legend="{ show: false }"
  :label="{ position: 'center', formatter: () => `设备总数\n${total}` }"
/>
```

中心摘要不会随图例筛选自动重算。需要更丰富的格式时，可使用 `title.textStyle.rich`、`legend.textStyle.rich` 或 `label.rich`。

图例在空间充足时按 1–4 项单列、5–8 项两列、9 项起三列排列。三列超过 12 项时，前两列各固定 4 项，第三列分页。最多三列；按图标、名称区域（沿用默认最大宽度）、数值和列间距测量实际可用宽度，不足时逐级减少列数并重新分配名称宽度，避免名称被压空；高度不足或显式设置 `legend.type: 'scroll'` 时改为单列。只要条目超过当前可见行数，就会分页并显示组件绘制的上下按钮，因此不足 12 项也可能分页。原生滚动图例负责内容切换，按钮由组件提供。

#### 数据与状态

以下规则适用于自动布局：

- 推荐使用带唯一 `name` 的数据项；也接受底层饼图数据类型。有限非负数有效，`null`、`undefined`、`'-'`、非有限值和负数按缺失处理。
- 全部数据为 `0` 时显示中性占位环，图例保留零值；缺失项不绘制扇区，默认图例显示 `–`，悬浮图例可查看 `missingReason`。示例中的“数据缺失 ⓘ”来自 `legend.formatter`。
- `data = []` 不会自动显示空态组件，仍可能保留装饰背景或业务标题。空态文案与重试由外层页面提供。
- `loading` 控制 IxChart 的原生加载遮罩；基础示例的图标和加载文案由外层条件渲染实现。“大尺寸：基础形态与加载”展示原生加载能力。
- 合计、百分比分母和中心摘要由业务计算。示例按全部有效数据计算，点击图例筛选不会自动重算这些业务文案。

#### align：九宫格对齐

| 顶部         | 垂直居中       | 底部            |
| ------------ | -------------- | --------------- |
| `top-start`  | `center-start` | `bottom-start`  |
| `top-center` | `center`       | `bottom-center` |
| `top-end`    | `center-end`   | `bottom-end`    |

`align` 控制饼图、标题和图例作为整体的位置。`start` 为左图右文，`end` 为左文右图；`center` 表示整体居中。隐藏标题和图例后，只对齐饼图本身。当前 `start` / `end` 按左右解释，不随 RTL 反转。

```vue
<IxPieChart name="设备状态" :data="data" align="top-end" />
<IxPieChart name="设备状态" :data="data" align="center" :legend="{ show: false }" />
```

#### 手动布局与旧版兼容

需要完全控制图形位置时，使用 ECharts 定位配置，此时 `align` 不生效：

```vue
<IxPieChart
  name="设备状态"
  :data="data"
  :center="['30%', '50%']"
  :radius="['50%', '70%']"
  :legend="{ orient: 'vertical', right: 20, top: 'center' }"
/>
```

只传 `data` 时保留 1.0.0 的默认形态和合计行为，无需修改旧代码。新布局通过 `layoutMode="auto"` 或 `align` 启用；自动布局不生成合计，摘要由业务传入。运行时切换自动/手动布局会重建图表实例。

### usePieOption

创建底层饼图配置，保留旧版配置语义，不包含 `IxPieChart` 的自动布局。

```ts
export function usePieOption(
  props: PieSeriesOption,
  attrs: PieChartProps | ShallowRef<PieChartProps>,
): ComputedRef<PieChartProps>
```

#### 显式模式与主系列局部样式

| 属性        | 类型                 | 行为                                                                                                |
| ----------- | -------------------- | --------------------------------------------------------------------------------------------------- |
| layoutMode  | `'auto' \| 'native'` | 不传且无 align 时保留 1.0.0；auto 启用内置布局；native 使用原生系列配置路径                         |
| seriesStyle | `PieSeriesStyle`     | 仅合并主数据系列的 itemStyle、labelLine、emphasis、blur、select、selectedMode，不覆盖数据或装饰系列 |
| plotTheme   | `PlotTheme`          | 自动布局的视觉默认值；支持全局 PLOT_THEME_TOKEN                                                     |

显式 `auto` 下，修改 `color`、`theme`、`radius`、`roseType` 不再间接切换渲染路径。标题/图例的位置由内置布局计算，样式与内容仍可局部配置。`center`、`series`、`dataset`、`graphic` 以及数组形式的 `title` / `legend` 属于完整几何配置，优先于 auto，继续进入原生路径；需要这些能力时建议明确设置 native。只有路径切换才会重新创建子图表；仅切换 plotTheme 不会重新创建实例。

```vue
<IxPieChart
  layout-mode="auto"
  :data="[
    { name: '正常', value: 80 },
    { name: '异常', value: 20 },
  ]"
  :plot-theme="{ color: '#8754cc', textColor: '#1f2329' }"
  :legend="{ textStyle: { fontSize: 14 } }"
  :series-style="{ itemStyle: { borderWidth: 3 }, emphasis: { scale: false } }"
/>
```

`label` 和 `markArea` 继续使用已有入口；`seriesStyle` 不提供 type、id、data、center、radius，避免破坏自动布局。单个 data 项的 itemStyle 仍优先于系列样式。原生路径同样将 seriesStyle 作为系列默认样式，显式 series 中的同名设置优先。

Pie 保留 ECharts 的默认更新合并策略，移除任意深层样式不保证清除实例中的旧值；需要完整清除时使用 `setOptionOpts: { notMerge: true }`，这也会重置未显式传入的图例选择等状态。普通样式更新仍可保留交互状态。

主题字段和文字优先级见[快速上手](/0-guide/GettingStarted.page.md)。自动布局支持根 textStyle 作为文字后备，title.textStyle、legend.textStyle、label 等局部配置优先；plotTheme 仅作用于自动布局，native 路径沿用 ECharts theme。未传新属性时原有模式推断与默认效果不变。

自动布局会为悬停放大的扇区预留空间，九宫格对齐均按放大后的边界计算，避免靠边时被裁切。默认放大半径为 5px，可通过 `:series-style="{ emphasis: { scaleSize: 12 } }"` 配置；设置 `scale: false` 或 `disabled: true` 时不为该强调效果预留空间。单个数据项的 `emphasis` 覆盖也会参与计算。空间不足时自动缩小饼图半径。

自动布局中的玫瑰图默认保留直径 32px 的透明中心区，透出所在容器的背景，与环形图一样适配深浅色背景，内部为直径 28px（含 1px 边框）的装饰圆，填充由 10% 蓝色渐变至透明，边框由 16% 蓝色渐变至透明。中心尺寸不随容器放大；空间不足时会收缩。`plotTheme.color` 可调整装饰颜色。显式 `radius` 仍优先：数组指定内外半径，单值指定实心玫瑰图。中心装饰会跟随显式内半径，并保留 2px 透明间隔。
