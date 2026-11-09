---
title: API
---

### IxGaugeChart

从 `@idux/charts` 导入。支持 Vue 2（含 Vue 2.6）和 Vue 3，Vue 2.6 需安装并注册 `@vue/composition-api`；容器需要明确高度。

| 名称                        | 说明                                  | 类型                      | 默认值                 |
| --------------------------- | ------------------------------------- | ------------------------- | ---------------------- |
| value                       | 当前值，null/undefined/非有限值不绘制 | number / null             | —                      |
| min / max                   | 有效量程                              | number                    | 0 / 100                |
| segments                    | 分段配置                              | GaugeSegment[]            | []                     |
| label                       | 底部说明，优先于分段名称              | string                    | —                      |
| valueFormatter              | 主文字格式化，可用于状态文字          | (value: number) => string | String(value)          |
| size                        | 轨道粗细规格                          | 'lg' / 'md'               | lg                     |
| valueFontSize               | 主文字字号，不随 lg/md 缩放           | number                    | 数值 32，格式化文字 16 |
| valueFontFamily             | 主文字字体                            | string                    | sans-serif             |
| labelColor                  | 底部说明颜色                          | string                    | #6F7785                |
| color                       | 非分段仪表颜色                        | string                    | #4089FF                |
| textColor / backgroundColor | 文字和轨道颜色                        | string                    | #1F2329 / #D8DDE5      |

支持 `AdditionalChartOption` 的 `loading`、`theme`、`autoResize`、`onReady` 等选项及图表事件透传。默认生成的自定义系列设置了 `silent: true`，图形本身不响应鼠标事件，也不默认提供数据 tooltip。
额外 ECharts 顶层选项覆盖生成配置的同名字段（整个字段替换，不做深合并）。
默认 `setOptionOpts.notMerge = true`，确保数据缩减、变为空值后不会保留旧图形；可显式覆盖。
ECharts 初始化主题使用 `theme`；自定义图形使用 `plotTheme` 和显式样式属性，详见下文。
空态 UI、重试请求、业务状态文案与多个图表排列由调用方负责。

默认示例尺寸：大号容器宽 162px，灰色底环外径/内径为 162px/116px，彩色圆环外径/内径为 150px/128px，单侧环宽 11px（直径差 22px）；中号容器宽 134px，灰色底环外径/内径为 134px/104px，彩色圆环外径/内径为 126px/112px，单侧环宽 7px（直径差 14px）。灰色底环在彩色圆环内外两侧分别扩展 6px（大号）、4px（中号）。圆弧扫过角度为大号 190°、中号 210°，左右对称，中号比大号露出更多圆周。最内部渐变圆的默认直径为大号 100px、中号 88px（不含指示尖角），与灰色底环内缘间隔 8px。圆盘直径随容器自适应，`size` 控制圆环厚度和阴影尺寸。

零是有效值。量程必须有限且 `max > min`。图形比例为 `(value - min) / (max - min)`，有限越界值钳制到 0–1，文字保留原值。`valueFormatter` 接收原始值。

`GaugeSegment` 为 `{ upper: number; color: string; label?: string }`。
`upper` 是 0–1 的比例上界，必须严格递增且最后为 1；精确边界属于前一段。
非法分段配置不绘制。风险级别及阈值由业务提供，组件不推断风险。

### createGaugeOption

纯配置构造函数，接收上述简化属性，返回生成的 ECharts 配置，可用于自行组合。生命周期属性和额外覆盖项由组件层处理。

#### 视觉主题与局部文字样式

支持 `plotTheme?: PlotTheme`，以及全局 `PLOT_THEME_TOKEN` 注入。完整字段、优先级和响应式用法见[快速上手](/0-guide/GettingStarted.page.md)。未配置时保持原有外观。纯构建器需显式传入主题，不读取注入。

`valueTextStyle?: PlotTextStyle`、`labelTextStyle?: PlotTextStyle` 分别定制主文字和底部标签，支持 `color`、`fontFamily`、`fontSize`、`fontWeight`、`lineHeight`。`textStyle` 提供共同后备；角色样式优先于共同后备，已有显式颜色/字号属性优先于新样式。

```vue
<IxGaugeChart
  :value="48"
  label="容量"
  :plot-theme="{ color: '#8754cc', fontFamily: 'Arial, sans-serif' }"
  :value-text-style="{ fontSize: 28, fontWeight: 'bold' }"
  :label-text-style="{ fontSize: 14, color: '#6f7785' }"
/>
```
