---
title: API
---

### IxLiquidFillChart

从 `@idux/charts` 导入。支持 Vue 2.6（需安装 `@vue/composition-api`）、Vue 2.7 和 Vue 3；容器需要明确高度。

| 名称                        | 说明                                    | 类型                      | 默认值                |
| --------------------------- | --------------------------------------- | ------------------------- | --------------------- |
| value                       | 当前值，null/undefined/非有限值不绘制   | number / null             | —                     |
| min / max                   | 有效量程                                | number                    | 0 / 100               |
| label                       | 底部说明                                | string                    | —                     |
| unit                        | 数值单位；空字符串隐藏单位              | string                    | %                     |
| valueFormatter              | 整段文字格式化（覆盖默认数字/单位排版） | (value: number) => string | 原始 value + 单位     |
| radius                      | 最大圆形半径（px），随容器自动缩小      | number                    | 64                    |
| zeroColor                   | 水位为零时的中性颜色                    | string                    | #E8EAED               |
| waveAnimation               | 启用循环波动                            | boolean                   | true                  |
| color                       | 水波颜色                                | string                    | #20C997               |
| textColor / backgroundColor | 文字和底色                              | string                    | #1F2329 / transparent |

支持 `AdditionalChartOption` 的 `loading`、`theme`、`autoResize`、`onReady` 等选项及图表事件透传。默认生成的自定义系列设置了 `silent: true`，图形本身不响应鼠标事件，也不默认提供数据 tooltip。
额外 ECharts 顶层选项覆盖生成配置的同名字段（整个字段替换，不做深合并）。
默认 `setOptionOpts.notMerge = true`，确保数据缩减、变为空值后不会保留旧图形；可显式覆盖。
ECharts 初始化主题使用 `theme`；自定义图形使用 `plotTheme` 和显式样式属性，详见下文。
空态 UI、重试请求、业务状态文案与多个图表排列由调用方负责。

零是有效值。量程必须有限且 `max > min`。图形比例为 `(value - min) / (max - min)`，有限越界值钳制到 0–1，文字保留原值。`valueFormatter` 接收原始值。

水位按量程计算，默认文字显示原始值，不会自动换算为百分比。例如 `value=48, max=64, unit="GB"` 显示 `48 GB`、水位为 75%；`value=0.5, max=1` 默认显示 `0.5 %`，需要显示 `50%` 时应由调用方格式化。

`textStyle.fontFamily` 配置默认数字部分的字体；默认 `D-DIN-PRO, sans-serif`，字体资源由调用方提供。`radius` 为外圆最大半径，实际半径受宽高限制，提供 `label` 时还会预留文字空间；非正数或非有限半径回退到 64。

### createLiquidFillOption

纯配置构造函数，接收上述简化属性，返回生成的 ECharts 配置，可用于自行组合。生命周期属性和额外覆盖项由组件层处理。

默认数值与 `unit` 使用大号数字和小号单位；`valueFormatter` 提供时直接显示自定义文字。水波使用固定的左浅右深渐变，两层波形反向循环，水位比例为 0 或 1 时不生成波形动画。

#### 视觉主题与局部文字样式

支持 `plotTheme?: PlotTheme`，以及全局 `PLOT_THEME_TOKEN` 注入。完整字段、优先级和响应式用法见[快速上手](/0-guide/GettingStarted.page.md)。未配置时保持原有外观。纯构建器需显式传入主题，不读取注入。

`valueTextStyle?: PlotTextStyle`、`labelTextStyle?: PlotTextStyle` 分别定制主文字和底部标签，支持 `color`、`fontFamily`、`fontSize`、`fontWeight`、`lineHeight`。`textStyle` 提供共同后备；角色样式优先于共同后备，已有显式颜色/字号属性优先于新样式。

```vue
<IxLiquidFillChart
  :value="48"
  label="容量"
  :plot-theme="{ color: '#8754cc', fontFamily: 'Arial, sans-serif' }"
  :value-text-style="{ fontSize: 28, fontWeight: 'bold' }"
  :label-text-style="{ fontSize: 14, color: '#6f7785' }"
/>
```

`unitTextStyle?: PlotTextStyle` 单独控制默认单位文字。`valueFormatter` 返回整段文字时不使用默认数字/单位 rich 分块，`valueTextStyle` 仍作用于整段文字。
