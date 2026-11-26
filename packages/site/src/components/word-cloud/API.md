---
title: API
---

### IxWordCloudChart

可从 `@idux/charts` 或 `@idux/charts/word-cloud` 导入组件、选项生成函数和类型。不需要安装 `echarts-wordcloud`。

```vue
<script setup lang="ts">
import { IxWordCloudChart } from '@idux/charts/word-cloud'
const data = [
  { id: 'taste', name: '味道', value: 100 },
  { id: 'meal', name: '套餐', value: 60 },
]
</script>
<template>
  <IxWordCloudChart :data="data" :size-range="[14, 56]" style="height: 320px" />
</template>
```

支持公共图表配置、原生事件、默认插槽和 `getEChartsInstance()`，详见 [IxChart API](./core)。默认插槽承载业务空状态，`loading` 使用词云加载插画。

### WordCloudChartProps

| 属性                                  | 类型                                | 默认值或说明                                                                         |
| ------------------------------------- | ----------------------------------- | ------------------------------------------------------------------------------------ |
| `data`                                | `WordCloudChartDataItem[]`          | `[]`；不修改输入顺序或对象                                                           |
| `shape`                               | `'text' \| 'rect' \| 'circle'`      | `'text'`，分别是文字、矩形标签和圆形气泡                                             |
| `sizeRange`                           | `[number, number]`                  | text `[12, 48]` 字号；rect `[24, 40]` 建议最小高度；circle `[48, 120]` 直径，单位 px |
| `gap`                                 | `number`                            | text 默认 4、circle 默认 8；rect 默认且最小 8；不重叠时完整碰撞边界的间距            |
| `overlap`                             | `number`                            | `0`；仅 rect 背景可重叠，取值 `[0, 0.3]`；交叠宽高均至少 6px；允许遮挡文字           |
| `id`、`name`                          | `GraphSeriesOption` 对应字段        | 系列标识和名称                                                                       |
| `label`                               | `GraphSeriesOption['label']`        | 默认显示名称，居中；字号、颜色、富文本、背景、padding 和省略沿用原生配置             |
| `itemStyle`                           | `GraphSeriesOption['itemStyle']`    | 节点背景填充、渐变、描边和透明度；text 的背景默认透明                                |
| `symbolSize`                          | `GraphSeriesOption['symbolSize']`   | 原生尺寸或回调，覆盖默认背景尺寸；text 字号仍由 label.fontSize 或 sizeRange 控制     |
| `categories`                          | `GraphSeriesOption['categories']`   | 原生分类名称和样式，配合 data[].category、legend 使用                                |
| `emphasis`、`blur`、`select`          | `GraphSeriesOption` 对应字段        | 原生状态；默认 emphasis.scale 为 false                                               |
| `selectedMode`                        | `GraphSeriesOption['selectedMode']` | 原生选中模式                                                                         |
| `labelLayout`                         | `GraphSeriesOption['labelLayout']`  | 原生标签二次布局；主动移动标签后不再保证节点避让                                     |
| `left`、`right`、`top`、`bottom`      | `GraphSeriesOption` 对应字段        | 默认各 16px，支持原生像素、百分比和对齐方式                                          |
| `width`、`height`                     | `GraphSeriesOption` 对应字段        | 原生布局区域宽高；不是组件 DOM 容器宽高                                              |
| `silent`、`cursor`、`legendHoverLink` | `GraphSeriesOption` 对应字段        | 原生鼠标行为和图例联动                                                               |
| `z`、`zlevel`                         | `GraphSeriesOption` 对应字段        | 系列绘制层级                                                                         |
| `plotTheme`                           | `PlotTheme`                         | 复用公共字体、主色和文字颜色                                                         |
| `motion`                              | `boolean \| WordCloudMotion`        | `false`；开启布局完成后的持续漂浮，`true` 使用默认配置                               |

两端相同的 sizeRange 表示固定尺寸。矩形自动高度至少容纳最终文字和 padding，圆形按面积映射权重；全相同非零权重使用区间中值，全零使用最小尺寸。数据增删和数值变化会重新计算权重范围；图例筛选不重新标定尺寸。

### WordCloudMotion

```vue
<IxWordCloudChart
  :data="data"
  :motion="{ amplitude: 12, amplitudeRatio: [1, 1], duration: 6000, pauseOnHover: true }"
/>
```

| 属性             | 类型               | 默认值   | 说明                                                                             |
| ---------------- | ------------------ | -------- | -------------------------------------------------------------------------------- |
| `amplitude`      | `number`           | `12`     | 距离布局中心的最大位移，单位 px，必须为 [0, 20] 内的有限数；大词自动略稳         |
| `amplitudeRatio` | `[number, number]` | `[1, 1]` | 横、纵振幅的相对比例，均为有限非负数；归一化后总位移不超过 amplitude             |
| `duration`       | `number`           | `6000`   | 基准循环周期，单位 ms，必须为有限正数；每个词生成稳定的 ±20% 周期差异            |
| `pauseOnHover`   | `boolean`          | `true`   | 指针命中词条文字或背景时暂停全部词条；移到空白处或离开画布后继续，图例不触发暂停 |

`amplitudeRatio: [2, 1]` 表示横向振幅是纵向的两倍；`[1, 0]` 只横向运动，`[0, 1]` 只纵向运动，`[0, 0]` 不启动漂浮。比例只改变轨迹形状，整体幅度仍由 amplitude 控制。

`<IxWordCloudChart motion />` 等价于 `:motion="true"`；关闭时显式传入 `:motion="false"`。`motion: true` 等价于默认配置对象。`motion: false` 只关闭漂浮，保留入场和更新过渡；原生 `animation: false` 是总开关，同时关闭漂浮。`amplitude: 0` 不启动循环。非法配置会给出诊断并关闭漂浮，词云仍正常展示。

文字、背景和命中区域同步移动，方向和相位由稳定 id 决定，不改变字号、颜色和透明度。未开启重叠时预留完整运动范围以保持避让，可能容纳更少词条；rect 开启 overlap 后只预留容器边缘的运动范围，各节点独立自由漂浮，静态布局的间距、交叠尺寸、面积和数量限制不约束漂浮过程。数据更新、字体加载与 resize 后继续漂浮；更新重排的过渡路径与原生行为一致，不保证两个布局之间的过渡全程无交叉。

页面隐藏和组件 loading 时暂停，恢复后继续；系统开启“减少动态效果”时停止漂浮，关闭该设置后自动恢复。SSR 只输出静态图形，实例销毁时释放动画和监听。普通原生 graph 系列不受影响；使用 createWordCloudOption 时也需加载组件入口注册的扩展。主动使用 emphasis.scale、labelLayout 或旋转文字时，仍遵循下文的避让限制。

### WordCloudChartDataItem

| 属性                         | 类型               | 说明                                                      |
| ---------------------------- | ------------------ | --------------------------------------------------------- |
| `id`                         | 原生节点 id        | 建议提供唯一稳定 id，用于数据更新、元素复用和选中状态恢复 |
| `name`                       | `string`           | 完整名称；原生标签 formatter 的 `{b}`                     |
| `value`                      | `number`           | 有限非负权重；`0` 有效；`{c}` 和回调参数保留原始数值      |
| `category`                   | `number \| string` | 原生分类索引或名称；名称在生成 option 时解析成分类索引    |
| `symbolSize`                 | 原生节点尺寸       | 覆盖分类和外层尺寸；circle 要求相同宽高                   |
| `label`、`itemStyle`         | 原生节点对应字段   | 逐项覆盖分类与外层默认值                                  |
| `emphasis`、`blur`、`select` | 原生节点对应字段   | 逐项状态配置                                              |
| `selected`                   | `boolean`          | 原生初始选中状态；动态显式变更覆盖用户选择                |
| `cursor`                     | `string`           | 原生光标                                                  |

可通过结构类型携带业务字段，formatter、Tooltip 和点击事件的 `params.data` 保留这些字段。未提供 id 时生成基于名称和同名序号的 id；重复名称可以展示，但重复显式 id 会清空生成系列并给出诊断。

### ECharts 配置与交互

```ts
const options: WordCloudChartProps = {
  shape: 'rect',
  sizeRange: [28, 28],
  label: { formatter: '{b} {c}', padding: [4, 10], fontSize: 14 },
  itemStyle: { color: '#E8F0FF' },
  emphasis: {
    scale: false,
    itemStyle: { color: '#1F6BFF' },
    label: { color: '#fff' },
  },
  tooltip: { valueFormatter: value => `${value} 次` },
  selectedMode: 'single',
}
```

`label.formatter` 支持 `{a}`、`{b}`、`{c}` 和原生回调；Tooltip 使用独立的 formatter/valueFormatter。背景透明度使用 itemStyle.opacity，文字透明度使用 label.opacity。矩形标签默认圆角为 2px，可通过数值型 `itemStyle.borderRadius` 覆盖（设为 0 使用直角）。组件为 graph 矩形节点补充圆角渲染。矩形标签只需配置 `itemStyle.color`：普通状态默认 `itemStyle.opacity: 0.15`，强调与选中状态默认背景不透明（`opacity: 1`）、文字白色，强调保留原色。可通过对应状态的 `itemStyle` 和 `label` 覆盖；这些默认值不影响 text 和 circle。图例名称与颜色自动继承 `categories`，无需重复配置 `legend.data`；矩形标签的图例默认不透明，可通过 `legend.itemStyle.opacity` 覆盖。普通与选中状态默认 `borderWidth: 0`，可通过 `itemStyle.borderWidth`、`select.itemStyle.borderWidth` 显式覆盖。

原生 `color` 调色盘参与节点配色；text 默认通过 label.color: inherit 继承节点色，而背景 opacity 为 0、文字 opacity 按当前有效数据的数值线性映射到 0.35–1（最小值最淡，最大值不透明；数值相同时均为 1）；可用 label.opacity 显式覆盖（设为 1 可统一为不透明）。显式 label.color 优先。文字 hover 时默认使用 ECharts 原生颜色提亮规则并变为完全不透明，移开后恢复；可通过 emphasis.label.color 和 emphasis.label.opacity 覆盖。

默认主色复用其他图表的 Seer 主蓝，标签底色由同色透明度生成。示例里的气泡复用柱状图渐变，状态分类复用 Seer 珊瑚红和中性色；容器和文字使用全局主题 token。

文字形态默认设置 label.padding: [2, 4]、borderRadius: 2 和 backgroundColor: 'transparent'，为搜索背景预留空间；可通过 label 或单个词条配置覆盖。

搜索输入与匹配由业务处理。需要独立于 hover 的搜索高亮时，更新匹配词条的 label.color、opacity 和 backgroundColor，不改变字号和内边距，保持布局稳定。搜索示例保留默认 hover，不启用 select，清空关键词后恢复普通样式。

原生 highlight/downplay 与 hover 共用 emphasis 状态，设置 emphasis.disabled: true 会同时禁用两者。它们不能作为独立的搜索高亮状态。需要选择交互时才启用 selectedMode 与 select。可使用 `@click`、`@selectchanged`，事件的 seriesType 为 graph、dataType 为 node，dataIndex 保留原始索引，不改成布局排序后的索引。

### 使用范围

纯文字使用矩形包围盒避让，首版只面向水平文字。改变字体、文案、尺寸、gap 或筛选结果会重排；只改变颜色、高亮或选中不会移动节点。状态标签的明确几何配置会提前预留空间；主动打开 emphasis.scale、使用 labelLayout 移动标签，或旋转文字会超出内置避让保证。

长名称默认限制文字宽度并省略；Tooltip 保留全文。label.width 是文本内容宽度，padding 另计；显式 symbolSize 不会悄悄压缩 label.width，碰撞区域包括文字和背景的并集。

容器拥挤时优先放置高权重项，放不下的项不绘制、不命中，不自动缩小显式字号、尺寸或间距。调用方可先选取 TOP10/TOP50；组件不暗设显示数量上限。空数据和全无可放置项保持空画布，业务提示通过默认插槽提供。

支持 title、legend、tooltip、color、animation*、主题及公共控制配置。标题和图例需用 top/bottom 等预留空间。传入 series 会整体替换生成系列，不对 series[0] 局部合并；替换后的系列由调用方负责。

`plotTheme.palette` 沿用其他图表的调色板配置，传入原生颜色管线；显式 `color` 优先于主题调色板，`plotTheme.color` 为未设置调色板时的单色默认值。分类按调色板取色，未分类节点保持原生单系列同色；itemStyle、分类及逐项颜色继续遵循原生覆盖规则。`title: null` 复用基础组件的标题移除逻辑，可在更新时清除已有标题。

默认 tooltip 复用其他图表的标题、色条与数值行样式，并跟随全局明暗主题。标题显示完整名称，数值行名称取系列 `name`，未设置时为“数值”。`tooltip.valueFormatter` 只格式化提示框数值；传入 `tooltip.formatter` 可整体覆盖内容。

内置布局不支持 dataset/encode、坐标轴、dataZoom、mark*、force、连线、拖拽、漫游、large/progressive、图片遮罩、任意轮廓及字形像素级穿插。visualMap 不属于首版稳定 API。createWordCloudOption 需和组件入口注册的 ECharts 扩展一起使用。

### 校验与排错

非法 shape、尺寸区间、gap 或 overlap，以及重复显式 id，会输出带 `[IxWordCloudChart]` 前缀的警告并清空生成系列；稀疏尺寸区间也属于非法配置。非法词条与非法 symbolSize 仅跳过相应项，保留其他有效项的原始索引。非法 motion 只关闭漂浮。输入应遵循 TypeScript 契约，组件不负责把任意 JSON 转为词条。

词条消失时先检查容器实际尺寸、标题/图例留位、label 与各状态的几何、symbolSize 回调结果以及 motion 预留空间，再减少数据量。调用 `getEChartsInstance()` 检查 `getOption()` 中的原始配置，或用 `resize()` 验证尺寸恢复；不要依赖 `__ixWordCloud` 等内部字段。布局候选和空间网格分配有上限；极大尺寸或 gap 使用有限扫描回退，可能只能放置一个词条。

组件负责异步字体的重新测量；直接消费 `createWordCloudOption` 时，应用需在字体就绪后调用 `chart.resize()`。选中按稳定 id 保留；移除某项后其选择记录会删除，再加入时使用该项的初始 selected 值。同名项未提供 id 时按出现序号区分，业务重排重复名称时应显式提供 id。

组件在 id、名称或显式 selected 变化时重建选项，避免原生选择索引缓存残留；数值更新仍尽可能复用节点。重排、重命名与选择配置变化可能重新触发入场效果。ECharts 原生选择以名称为键，同名节点的选择会联动；稳定 id 不会改变这一原生限制，需要独立选择时应提供不同名称。
