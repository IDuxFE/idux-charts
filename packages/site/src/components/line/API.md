---
title: API
---

### IxLineChart

折线图组件。

#### LineChartProps

> 除以下表格之外还支持 `ECharts` 的[所有配置](https://echarts.apache.org/zh/option.html)。
> 除以下表格之外还支持 `AdditionalChartOption` 的[所有配置](/components/core#additionalchartoption)。
> 下表格中的配置，其实就是 `LineSeriesOption` 中的[部分配置](https://echarts.apache.org/zh/option.html#series-line)

| 名称        | 说明             | 类型                | 默认值 | 全局配置 | 备注                                                                                                                                                                          |
| ----------- | ---------------- | ------------------- | ------ | -------- | ----------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| `data`      | 数据内容         | `Array`             | -      | -        | 参见 [series-line.data](https://echarts.apache.org/zh/option.html#series-line.data)                                                                                           |
| `areaStyle` | 区域填充样式     | `AreaStyleOption`   | -      | -        | 设置后显示成区域面积图,参见 [series-line.areaStyle](https://echarts.apache.org/zh/option.html#series-line.areaStyle)                                                          |
| `label`     | 图形上的文本标签 | `SeriesLabelOption` | -      | -        | 可用于说明图形的一些数据信息，比如值，名称等, 参见 [series-line.label](https://echarts.apache.org/zh/option.html#series-line.label)                                           |
| `name`      | 系列名称         | `string`            | -      | -        | 用于 tooltip 的显示，legend 的图例筛选，在 setOption 更新数据和配置项时用于指定对应的系列,参见 [series-line.name](https://echarts.apache.org/zh/option.html#series-line.name) |
| `markArea`  | 图表标域         | `MarkAreaOption `   | -      | -        | 常用于标记图表中某个范围的数据，例如标出某段时间投放了广告, 参见 [series-line.markArea](https://echarts.apache.org/zh/option.html#series-line.markArea)                       |
| `smooth`    | 是否平滑曲线显示 | `boolean`           | -      | -        | 参见 [series-line.smooth](https://echarts.apache.org/zh/option.html#series-line.smooth)                                                                                       |
| `stack`     | 数据堆叠         | `string`            | -      | -        | 参见 [series-line.stack](https://echarts.apache.org/zh/option.html#series-line.stack)                                                                                         |

### useLineOption

创建原生折线图配置的函数。分类布局通过组件的 `categories` 启用。

```ts
export function useLineOption(
  props: LineSeriesOption,
  attrs: LineChartProps,
): ComputedRef<LineChartProps>
```

### 分类趋势图

传入 `categories` 启用内置布局，`data` 或 `series[].data` 按索引对应同一条 X 轴。各系列可以通过 `yAxisIndex` 或 `yAxisId` 选择 Y 轴。多系列默认显示图例，优先排成一行，超出两行时可翻页。显式设置 ECharts 图例类型或位置可自行控制布局。

| 配置            | 说明                                                                                                  |
| --------------- | ----------------------------------------------------------------------------------------------------- |
| `categories`    | 有序的分类或采样时间标签。传入此属性时，X 轴使用这些分类。                                            |
| `area`          | `true` 使用渐变填充，`'striped'` 使用条纹填充。单个系列可通过 `areaStyle` 自定义。                    |
| `referenceLine` | `{ value, name?, color? }`，在第一个 Y 轴上绘制水平虚线。提供独立的 `name` 后可以通过图例切换参考线。 |
| `zeroText`      | 所有采样值均为 0 时的可选提示，仍保留坐标轴、系列和缩略轴。                                           |
| `plotTheme`     | 分类布局使用的可选色板、文字颜色和异常色，可通过 `PLOT_THEME_TOKEN` 提供默认值。                      |

内部的孤立缺报点用与系列同色的白描边圆点标记插值位置。堆叠面积图的圆点随各系列的堆叠高度移动。连续缺失点占用各自的采样槽，共同组成缺报底纹。默认亮色为浅红，暗色为暗红，可用 `plotTheme.missingBackgroundColor` 覆盖。底纹覆盖 Y 轴辅助线和缺报系列，缺报系列的连线与底纹边缘对齐，同一区间内其他系列的有效走势绘制在底纹上。首尾缺失点使用底纹。内置 Tooltip 只列出已上报的系列，`0` 也是有效值。可用 `{ value: null, missingReason }` 在 Tooltip 中补充缺报原因。

插值坐标用于绘制，缺报点的自定义 Tooltip 和事件回调通过 `params.data` 和 `params.value` 读取原始采样项和采样值。

```vue
<IxLineChart
  :categories="['07-01', '07-02', '07-03']"
  :data="[85, { value: null, missingReason: '采集任务未返回结果' }, 155]"
  name="上行流量"
  :y-axis="{ name: 'Kbps' }"
  :data-zoom="{ type: 'slider' }"
  :reference-line="{ name: '异常', value: 120 }"
  style="height: 320px"
/>
```

### 原生配置

省略 `categories` 时沿用原生配置的合并方式。可继续传入 ECharts 的坐标轴、`dataset`、`series`、`areaStyle`、`theme` 和 `setOptionOpts`，用于时间轴、多个坐标系等自定义场景。分类布局始终以 `notMerge: true` 替换生成的 option，缩减或清空数据时会清除旧系列、缺报图形和参考线。加载骨架、空状态和卡片由调用方按业务场景组合。
