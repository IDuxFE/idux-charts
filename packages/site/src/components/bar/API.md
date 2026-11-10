---
title: API
---

### IxBarChart

柱状图组件。

#### BarChartProps

> 除以下表格之外，还可传入 [ECharts 配置](https://echarts.apache.org/zh/option.html)。分类布局的配置范围及覆盖规则见下文。
> 除以下表格之外还支持 `AdditionalChartOption` 的[所有配置](/components/core#additionalchartoption)。
> 下表格中的配置，其实就是 `BarSeriesOption` 中的[部分配置](https://echarts.apache.org/zh/option.html#series-bar)

| 名称       | 说明                         | 类型                | 默认值 | 全局配置 | 备注                                                                                                                                                                        |
| ---------- | ---------------------------- | ------------------- | ------ | -------- | --------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| `data`     | 单系列数据                   | `Array`             | -      | -        | 分组或堆叠时使用各自的 [`series[i].data`](https://echarts.apache.org/zh/option.html#series-bar.data)。                                                                      |
| `barGap`   | 不同系列的柱间距离，为百分比 | `number \| string`  | `0.2`  | -        | 参见 [series-bar.barGap](https://echarts.apache.org/zh/option.html#series-bar.barGap)                                                                                       |
| `barWidth` | 柱条的宽度                   | `number \| string`  | `10`   | -        | 参见 [series-bar.barWidth](https://echarts.apache.org/zh/option.html#series-bar.barWidth)                                                                                   |
| `label`    | 图形上的文本标签             | `SeriesLabelOption` | -      | -        | 可用于说明图形的一些数据信息，比如值，名称等, 参见 [series-bar.label](https://echarts.apache.org/zh/option.html#series-bar.label)                                           |
| `name`     | 系列名称                     | `string`            | -      | -        | 用于 tooltip 的显示，legend 的图例筛选，在 setOption 更新数据和配置项时用于指定对应的系列,参见 [series-bar.name](https://echarts.apache.org/zh/option.html#series-bar.name) |
| `markArea` | 图表标域                     | `MarkAreaOption `   | -      | -        | 常用于标记图表中某个范围的数据，例如标出某段时间投放了广告, 参见 [series-bar.markArea](https://echarts.apache.org/zh/option.html#series-bar.markArea)                       |
| `stack`    | 数据堆叠                     | `string`            | -      | -        | 参见 [series-bar.stack](https://echarts.apache.org/zh/option.html#series-bar.stack)                                                                                         |

`IxBarChart` 的柱体默认使用同色投影。渐变柱取主色标，投影向上偏移 `4px`，模糊 `10px`，不透明度为 `16%`。

### useBarOption

创建柱状图配置的函数

```ts
export function useBarOption(
  props: BarSeriesOption,
  attrs: BarChartProps,
): ComputedRef<BarChartProps>
```

### 主题与配置边界

继续使用 ECharts `theme`、`color`、`textStyle`，以及 `label` / `series` 的局部样式。分类布局支持 `plotTheme` 和 `PLOT_THEME_TOKEN`，原生布局沿用 ECharts 主题与样式配置。切换 `theme` 会重新创建 ECharts 实例。

不传 `categories` 时，原生入口通过 `useBarOption` 合并内置默认值、`BAR_CHART_TOKEN` 和调用方配置。传入 `categories` 时，由分类布局处理数据和样式。

### 分类布局

传入 `categories` 启用分类布局，适用于一个分类轴和一个数值轴上的基础、分组和堆叠柱状图。多坐标系、`dataset`、`encode` 和混合图可使用不传 `categories` 的原生入口。

#### 数据传入

- 单系列直接传 `:data="data"`，分类名和数值按下标对应。
- 分组和堆叠通过 `:series="series"` 传入，每个系列提供自己的 `name` 和 `data`。相同的 `stack` 会将这些系列堆叠。
- 两种配置同时传入时，分类布局以显式传入的 `series[i].data` 为准。系列省略 `data` 时使用顶层 `data`。

```vue
<div v-if="loading" role="status">图表正在加载中，请稍后…</div>
<IxEmpty v-else-if="isEmpty" simple description="未配置数据源，请先配置采集任务" />
<IxBarChart
  v-else
  style="width: 100%; height: 300px"
  :categories="['微信网页', '百度网盘', '网易邮箱']"
  :data="[320, { value: null, missingReason: '采集请求超时，请检查数据源连接' }, 365]"
  :reference-line="{ name: '告警阈值', value: 280 }"
/>
```

| 名称                    | 说明                                                                                                                                           |
| ----------------------- | ---------------------------------------------------------------------------------------------------------------------------------------------- |
| `categories`            | 分类名称，与 `data` 或各 `series[i].data` 按下标对应。值为数值、`null`，也可传带 `value` 的数据项。                                            |
| `layout`                | 默认 `vertical`。也支持 `horizontal`（标签居左，首项居上）和 `horizontal-above`（标签位于柱条上方，显示灰色轨道）。                            |
| `referenceLine`         | `{ value: number, name?: string, color?: string }`。参考线跟随数值轴，画在柱体下方；指定名称时增加可切换的图例项，名称需与数据系列区分。       |
| `zeroText`              | 全部值均为 `0` 时保留坐标轴，可传文案在绘图区提示，亮色默认 `#A1A7B3`；省略时只保留坐标轴。上方标签布局用灰色轨道表达零值。                    |
| `plotTheme`             | 分类布局的主题覆盖，继承 `PLOT_THEME_TOKEN`；可覆盖辅助文字、轨道、告警和调色板。                                                              |
| `data[i].missingReason` | 与饼图一致，使用 `{ value: null, missingReason: '原因' }` 为一个缺报数据项补充原因。单系列写在 `data`，分组和堆叠写在对应的 `series[i].data`。 |

直接传 `null`、省略 `value`、传入非有限数值或缺少对应数据项时，均会保留分类并显示缺报底条。默认亮色为浅红，暗色为暗红，可用 `plotTheme.missingBackgroundColor` 覆盖。横向上方标签布局的缺报行只显示缺报底条，已上报的行保留轨道。悬浮到缺报位置时，整组缺报的提示只显示分类名和缺报说明，部分缺报时同时显示有效值。未提供原因时显示「–」。`0` 是有效值，只有缺报项才展示 `missingReason`，文案由调用方提供。

页面可自行展示加载占位和 `IxEmpty`，并决定空态文案和后续操作。使用原生加载遮罩时可通过 `loading.text` 传入本地化文案。系列名通过 `name` 或 `series[i].name` 提供，省略时默认使用 `Value` 或 `Series 1` 等英文名称。

多组 `series` 默认并排，配置相同的 `stack` 即可堆叠。每个分类只有一根柱时，按当前可见分类数确定厚度：不超过 3 个为 20px，4–5 个为 10px，超过 5 个为 6px。每个分类有多根并排柱时，各柱固定 6px。也可显式指定 `barWidth`。需要缩略轴时可传 `dataZoom: { type: 'slider' }`。例如，横向示例的 50 条数据默认显示前 5 条，设置 `startValue: 0, endValue: 4` 后可拖动选区浏览其余分类。业务可按场景指定数值轴的 `min` / `max` 来保持相同刻度。

`dataZoom` 未指定目标轴时默认绑定分类轴。通过轴索引或 ID 指定目标时，组件沿用该绑定。

默认图例放在底部，空间不足时按等宽项排列为最多两行。溢出时可用右侧上下箭头或在图例区域内滚动鼠标滚轮，逐行浏览。总量与百分比由调用方用 `legend.formatter` 提供。容器改变宽度时保留当前缩放窗口、图例勾选和分页位置。

分类柱状图的默认提示框每列最多显示 10 个系列值，按系列顺序从上到下排列。空间不足时可在提示框内滚动查看其余列。

悬浮时，灰色底纹从柱体两侧各延伸 6px；并排柱按整组计算，横向图按上下两侧计算。

分类布局跟随 `CHART_THEME_TOKEN` 或图表自身的 `theme` 切换亮色和暗色。坐标轴、图例和提示框沿用图表主题；内置底纹、参考线、零值文字和缩略轴也使用对应模式的颜色。

#### 外部配置覆盖

「外部配置覆盖默认值」示例可切换同一份数据的柱宽、颜色、留白、数值轴上限和提示文案。分类布局按以下规则处理外部配置。

| 配置                                      | 覆盖规则                                                                                                                                                      |
| ----------------------------------------- | ------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| `barWidth`、`series[i].barWidth`、`color` | 显式指定柱宽时使用该值，系列的柱宽优先于顶层柱宽。显式 `color` 优先于 `plotTheme.palette` 和内置配色。                                                        |
| `grid`、`xAxis`、`yAxis`                  | 外部字段与布局默认值合并。例如只传 `grid.left` 会保留其他默认留白，只传 `yAxis.max` 会保留默认轴类型。                                                        |
| `tooltip`                                 | 按第一层字段覆盖。用 `valueFormatter` 修改数值文案可保留默认提示结构，用 `formatter` 可替换整个提示内容。传入 `axisPointer` 会替换默认的 `axisPointer` 对象。 |
| `legend`、`dataZoom`                      | 外部选项参与生成布局。例如显式配置 `legend.type` 或图例位置会使用 ECharts 图例布局，显式指定 `dataZoom` 目标轴则沿用该绑定。                                  |
| `series`                                  | 系列字段覆盖组件提供的默认值，分类布局仍会按 `categories` 对齐数据并生成缺报底条、参考线等辅助系列。                                                          |

#### ECharts 更新策略

`setOptionOpts` 是传给 ECharts `setOption` 的第二个参数。分类布局默认使用 `notMerge: true`，数据缩减或关闭外部配置时会清除旧柱宽、参考线和占位。传入 `:set-option-opts="{ lazyUpdate: true }"` 会保留这个默认值。显式传 `:set-option-opts="{ notMerge: false }"` 则使用 ECharts 的合并更新，由调用方按需清理旧配置。原生入口同样接收 `setOptionOpts`，省略时沿用 ECharts 默认更新行为。

### 悬浮条纹与自定义提示框

在原生布局中，用 `useStripeBarSeries` 生成柱体和悬浮条纹，用 `useStripeBarTooltip` 只显示数据系列的数值。分组时为每组生成一对系列，并通过 `offset` 对齐条纹和对应柱体。

```ts
import { seerColors, useStripeBarSeries, useStripeBarTooltip } from '@idux/charts'

const option = {
  xAxis: { data: ['星期一', '星期二', '星期三'] },
  yAxis: { name: '次' },
  series: useStripeBarSeries({
    series: { name: '访问次数', data: [123, 324, 156] },
    color: seerColors[0]!,
    size: [7, 2],
  }),
  tooltip: useStripeBarTooltip('次'),
}
```

若只需改变值的文案，设置 `tooltip.valueFormatter`。需要自定义结构时，设置 `tooltip.formatter`，并可用 `useTooltipsFormatter(title, items, 10)` 生成每列最多 10 项的提示框。
