---
title: API
---

### IxRadarChart

从 `@idux/charts` 导入，自动注册雷达系列和雷达坐标系。支持 Vue 2.6（需安装 `@vue/composition-api`）、Vue 2.7 和 Vue 3。容器需要明确高度。

| 名称        | 说明                                           | 类型                                | 默认值           |
| ----------- | ---------------------------------------------- | ----------------------------------- | ---------------- |
| indicator   | 维度名称及各自的 min/max 量程                  | `RadarComponentOption['indicator']` | `[]`             |
| data        | 对比对象；支持数值数组或带 name/value 的数据项 | `RadarSeriesOption['data']`         | `[]`             |
| area        | 系列默认区域填充，开启时透明度为 0.12          | `boolean`                           | `false`          |
| gridStyle   | 网格背景；line 仅线框，area 交替填充           | `'line' \| 'area'`                  | `'area'`         |
| splitNumber | 网格分段数，应为正整数                         | `number`                            | `5`              |
| clockwise   | 从首轴开始顺时针排列，同时调整对应数值         | `boolean`                           | `false`          |
| center      | 中心横纵坐标，支持像素或百分比                 | `RadarComponentOption['center']`    | `['50%', '50%']` |
| radius      | 半径，支持像素或百分比                         | `RadarComponentOption['radius']`    | `'65%'`          |

类型 `RadarComponentOption` 来自 `echarts/components`，`RadarSeriesOption` 来自 `echarts/charts`。组件还导出 `RadarChartProps` 和用于 Vue 2.6 适配的 `RadarChartPublicProps`。

#### 数据与方向

- `data[i].value[j]` 对应 `indicator[j]`，每组数值应与维度数一致；显示图例时为各对象提供唯一的 `name`。
- 首轴默认位于顶部，其余轴默认按逆时针排列。`clockwise` 保留首轴，反转剩余维度及数值，不修改输入数组和数据项。
- `clockwise` 只调整生成的配置，不改变业务数据。ECharts 提示框和事件回调中的 `value` 使用绘制顺序；需要原始顺序时可用 `dataIndex` 读取传入的对象。
- 量程由各维度独立提供，建议显式设置有限的 `min < max`。公共库不限制对象数、维度数，不补齐缺失值、不裁剪数值，也不把无效值转换成零。
- `0` 是有效测量值。全零数据在 `min = 0` 时收拢到中心，保留图例和网格；`data = []` 清除对象图形，但不会自动显示空态 UI。

#### 样式与配置覆盖

默认圆形数据点大小为 7，线宽为 2。数据项可通过 `itemStyle`、`lineStyle`、`areaStyle` 覆盖系列样式，因此单个对象的 `areaStyle` 可以覆盖 `area` 的效果。

额外 ECharts 顶层选项（例如 `legend`、`tooltip`、`radar`、`series`）会**整个字段替换**生成配置，不做深合并。例如仅传 `radar: { shape: 'circle' }` 会丢失生成的维度和网格配置。需要局部定制时，先调用 `createRadarOption`，再展开对应字段，参见「样式与提示框定制」示例。直接覆盖 `radar` 或 `series` 后，调用方负责保持维度与数值对应。

支持 `theme`，但生成配置中显式指定的轴文字、轴线、网格颜色优先于 ECharts 主题。可以通过 `plotTheme` 局部调整这些颜色，保留自动生成的维度与网格；仅切换 ECharts `theme` 不会自动替换这些显式颜色。

#### 生命周期、加载与事件

支持 `AdditionalChartOption` 中的 `loading`、`theme`、`autoResize`、`initOption`、`onReady` 等选项，以及 IxChart 的图表事件透传。

- `loading: true` 或配置对象显示原生加载遮罩；不会清空 `data`，也不会发起请求。
- 默认 `setOptionOpts.notMerge = true`，保证对象/维度缩减、数据清空后不保留旧配置。完整替换也可能重置图例选择等交互状态，需要保留时可显式传入 `legend.selected`。
- 可覆盖 `setOptionOpts`；设置 `notMerge: false` 后，需要自行处理 ECharts 的合并与旧数据清理。
- 容器尺寸变化由 IxChart 的自动尺寸管理处理。固定像素半径不会随容器缩小，窄屏可使用百分比半径或由外层提供横向滚动。

### createRadarOption

```ts
import { createRadarOption } from '@idux/charts'

const base = createRadarOption({
  indicator: ['覆盖率', '稳定性', '自动化'].map(name => ({ name, min: 0, max: 100 })),
  data: [{ name: '当前方案', value: [80, 90, 70] }],
  clockwise: true,
  area: true,
})
const option = {
  ...base,
  radar: { ...base.radar, shape: 'circle' as const },
}
```

纯配置构造函数，只读取表格中的简化属性，返回 `tooltip`、`legend`、`radar` 和 `series` 配置；不处理额外顶层覆盖、`loading`、事件、实例生命周期和 `setOptionOpts`。函数调用本身不创建实例。将结果传给 `IxRadarChart` 可继续使用组件的注册及生命周期能力。

#### 视觉主题与局部文字样式

支持 `plotTheme?: PlotTheme`，以及全局 `PLOT_THEME_TOKEN` 注入。完整字段、优先级和响应式用法见[快速上手](/0-guide/GettingStarted.page.md)。未配置时保持原有外观。纯构建器需显式传入主题，不读取注入。
