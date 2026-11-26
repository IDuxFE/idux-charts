# 词云组件实现与 API 设计

状态：已实现，当前审查结论见 [架构评估](component-architecture-review.md)。本文记录实现决策；最终使用约定见 [组件 API](../../packages/site/src/components/word-cloud/API.md)，检查结果见 [验证记录](word-cloud-validation.md)。

## 1. 结论与适用范围

新增 `IxWordCloudChart`，覆盖纯文字词云、矩形标签云、圆形气泡云。自行实现布局，不增加 `echarts-wordcloud` 或其他布局依赖。

优先复用 ECharts 原生 `graph` 的节点绘制，使用空连线集合，通过专属布局扩展计算节点位置与默认尺寸。标签、富文本、图形样式、分类、图例、Tooltip、强调、弱化、选中和动画尽量保持原生语义。业务不需要编写坐标、`renderItem` 或理解 graph 的连线配置。

这一方案比“所有元素都用 custom 自绘”更贴近当前子弹图的原则：子弹图实际值使用原生 bar，词云节点使用原生 graph；组件补充 ECharts 没有提供的布局能力。

首版支持水平文字、矩形包围盒避让和圆形避让。纯文字按完整文字包围盒排布，不做字形像素级穿插。不包含任意旋转、图片遮罩、任意轮廓填充、三维球面、拖拽、缩放漫游和连线。持续漂浮通过可选 motion 提供，见下文补充设计。

## 2. 从参考图落实的能力

| 参考效果                             | 组件方案                            | 配置入口                                  |
| ------------------------------------ | ----------------------------------- | ----------------------------------------- |
| 图 1 普通标签，名称与次数同行        | 矩形标签云，自动测量文字和背景      | `shape: 'rect'`、`label.formatter`        |
| 图 1 前若干项较大                    | 原生按项尺寸配置；业务决定排名分档  | `data[].symbolSize`、`data[].label`       |
| 图 1 威胁与非威胁颜色及图例          | 原生 graph 分类，默认不改变标签字号 | `categories`、`data[].category`、`legend` |
| 图 2 文字按词频变大                  | 字号映射与矩形避让                  | `shape: 'text'`、`sizeRange`              |
| 图 2 搜索高亮                        | 原生强调态及批量动作，位置不变      | `data[].label`（独立搜索样式）            |
| 图 3 圆形气泡，名称与次数分行        | 圆形避让，默认按权重映射面积        | `shape: 'circle'`、`label.formatter`      |
| 图 3、4 大屏矩形，尺寸、渐变、透明度 | 自定义矩形样式（CustomRect.vue）    | `symbolSize`、`itemStyle`、`label`        |
| 图 4 背景轻度层叠                    | 可控矩形背景重叠，允许遮挡文字      | `overlap`                                 |

“前 3 项/前 5 项”“危险等级”“TOP10”属于业务规则，组件不内置对应字段和阈值。卡片标题可用原生 `title` 或外部卡片，科技感边框由业务容器承担。

## 3. 对外 API

### 3.1 导出方式

沿用现有组件入口：

```ts
import { IxWordCloudChart } from '@idux/charts'
// 或按需导入
import {
  IxWordCloudChart,
  createWordCloudOption,
  type WordCloudChartProps,
  type WordCloudChartPublicProps,
  type WordCloudChartDataItem,
} from '@idux/charts/word-cloud'
```

`createWordCloudOption` 生成原生 ECharts option，其中系列类型为 `graph`，不是新注册的 `wordCloud` 系列。组件入口负责注册 GraphChart、词云专属布局扩展及必要组件，沿用仓库 `createInstall` 机制。直接消费 option 时，也必须先通过同一入口完成注册；不声称 option 可在未安装布局扩展的 ECharts 环境独立运行。

### 3.2 仅增加四个布局配置

| 属性        | 类型                           | 默认值                 | 含义                                                |
| ----------- | ------------------------------ | ---------------------- | --------------------------------------------------- |
| `shape`     | `'text' \| 'rect' \| 'circle'` | `'text'`               | 节点布局和默认外观                                  |
| `sizeRange` | `[number, number]`             | 见下表                 | 未显式指定尺寸时，权重映射的最小值与最大值，单位 px |
| `gap`       | `number`                       | 文字 4、圆形 8、矩形 8 | 不重叠时完整碰撞边界的间距，矩形至少 8px            |
| `overlap`   | `number`                       | `0`                    | 仅矩形背景允许的重叠比例，范围 `[0, 0.3]`           |

`shape` 是组件扩展，不伪装成 ECharts 原生字段；它描述节点类型，不表示整个词云的外轮廓。`sizeRange` 参考既有词云配置习惯；不为字体、标签、状态颜色再创建平行 API。

| shape    | sizeRange 默认值 | 映射对象                     | 默认标签          |
| -------- | ---------------- | ---------------------------- | ----------------- |
| `text`   | `[12, 48]`       | 文字字号，线性映射           | 仅名称 `{b}`      |
| `rect`   | `[24, 40]`       | 背景的建议最小高度，线性映射 | 名称，默认字号 14 |
| `circle` | `[48, 120]`      | 圆直径，按面积映射           | 名称，默认字号 14 |

两端相等表示固定尺寸。矩形的高度还必须容纳最终文字与 padding，不能把文字裁进更小的默认背景。显式 `symbolSize` 控制真实背景尺寸；圆形模式只接受标量或相同宽高，拒绝把不等宽高解释为圆。

### 3.3 复用的系列配置

以下属性直接使用 `GraphSeriesOption` 相应字段的类型和含义，像子弹图一样平铺在组件外层。

| 配置                                                | 作用                                                          |
| --------------------------------------------------- | ------------------------------------------------------------- |
| `id`、`name`                                        | 系列标识与系列名称                                            |
| `label`                                             | 名称、数值、字体、颜色、富文本、背景、padding、文本尺寸和省略 |
| `itemStyle`                                         | 节点背景填充、渐变、描边、阴影和背景透明度                    |
| `symbolSize`                                        | 矩形或圆形背景尺寸，支持 ECharts 原生值和回调                 |
| `categories`                                        | 分类名称和分类默认样式，使用原生 graph 分类结构               |
| `emphasis`、`blur`、`select`                        | 强调、弱化、选中态的 `label` 与 `itemStyle`                   |
| `selectedMode`                                      | `false`、`single`、`multiple` 等原生选中模式                  |
| `labelLayout`                                       | 原生标签二次布局，受下文碰撞保证边界约束                      |
| `silent`、`cursor`、`legendHoverLink`               | 原生鼠标响应与图例联动                                        |
| `left`、`right`、`top`、`bottom`、`width`、`height` | 布局区域，使用 graph 原生盒模型，支持像素和百分比             |
| `z`、`zlevel`                                       | 整个系列的绘制层级                                            |

`left/right/top/bottom` 默认 16px；同时传入 width/height 时按 ECharts 盒模型解析，不另定义优先顺序。标题和图例不会自动替用户挤占布局空间，需通过 top/bottom 等留位。

原生 `symbol` 不作为内置布局配置开放：text 使用透明矩形承载标签，rect 使用矩形，circle 使用圆。需要完全自定义图形时整体替换 `series`。这避免 `shape: 'circle'` 与 `symbol: 'rect'` 相互矛盾。

### 3.4 公共图表能力

复用公共 `tooltip`、`legend`、`title`、`color`、`backgroundColor`、`chartBackgroundColor`、`animation*`、`darkMode`、`theme`、`plotTheme`、`loading`、`initOption`、`autoResize`、`setOptionOpts`、默认插槽、原生事件和 `getEChartsInstance()`。

`plotTheme.palette` 接入原生调色板管线，显式 `color` 优先；未设置调色板时使用 `plotTheme.color` 或公共主色。分类按调色板取色，未分类节点沿用原生单系列同色，保留原生样式覆盖规则。`title` 类型复用公共组件约定，允许传 `null` 并由公共生命周期清除已有标题。

`tooltip.trigger` 默认 `item`，无坐标轴触发语义。默认 Tooltip 复用公共标题、色条与数值行模板及明暗主题样式，标题显示完整名称，行名称取系列 `name`（默认“数值”），行数值为原始数值。`tooltip.valueFormatter` 只格式化 Tooltip，不影响标签；`tooltip.formatter` 可整体覆盖内容。

`series` 延续子弹图约定：传入后整体替换生成系列，词云布局不再接管。不是把 `series[0]` 当作内置词云的局部覆盖入口。

内置布局不接管 xAxis/yAxis/grid/dataZoom、markLine/markArea/markPoint、dataset/encode、large/progressive、force、links/edges、roam、draggable、node x/y。公共类型中的透传能力不等于内置布局支持这些行为。声明只列出内置支持字段，不直接继承整个 GraphSeriesOption。

完整 Props 声明轮廓如下。原生字段清单同时作为运行时 props 注册来源，防止类型允许但配置没有传到系列。

```ts
type WordCloudShape = 'text' | 'rect' | 'circle'

type WordCloudNativeSeriesKey =
  | 'id'
  | 'name'
  | 'label'
  | 'itemStyle'
  | 'symbolSize'
  | 'categories'
  | 'emphasis'
  | 'blur'
  | 'select'
  | 'selectedMode'
  | 'labelLayout'
  | 'silent'
  | 'cursor'
  | 'legendHoverLink'
  | 'left'
  | 'right'
  | 'top'
  | 'bottom'
  | 'width'
  | 'height'
  | 'z'
  | 'zlevel'

interface WordCloudChartProps
  extends
    Omit<BaseChartOption<GraphSeriesOption>, 'dataset' | 'grid' | 'dataZoom'>,
    AdditionalChartOption,
    Pick<GraphSeriesOption, WordCloudNativeSeriesKey>,
    Pick<EChartsOption, 'color'> {
  data?: WordCloudChartDataItem[]
  shape?: WordCloudShape
  sizeRange?: [number, number]
  gap?: number
  overlap?: number
  plotTheme?: PlotTheme
}

type WordCloudChartPublicProps = KnownProps<WordCloudChartProps>
```

实际类型继续沿用公共层的 color、animation 等图表字段；实现时检查 ComposeOption 生成的字段和运行时注册一致，不能只因 TypeScript 接受一个字段就宣称运行时已支持它。

### 3.5 数据项

拟定声明轮廓如下，实际声明以 ECharts 类型 Pick/Omit 为来源，不手抄原生字段。

```ts
type NativeGraphNode = Extract<NonNullable<GraphSeriesOption['data']>[number], { name?: unknown }>

interface WordCloudChartDataItem extends Pick<
  NativeGraphNode,
  | 'id'
  | 'category'
  | 'symbolSize'
  | 'itemStyle'
  | 'label'
  | 'emphasis'
  | 'blur'
  | 'select'
  | 'selected'
  | 'cursor'
> {
  name: string
  value: number
}

// Props 由公共图表配置、受支持的原生 graph 字段及四个布局字段组成。
// 不新增 textColor、tagColor、hoverColor、onWordClick、showValue 等替代 API。
```

业务数据可通过泛型或结构类型携带额外字段，如 `eventId`、`level`、`url`；不使用宽泛的 any 索引签名掩盖配置拼写错误。

原始输入不可变。优先使用调用方 `id`；未传 id 时在克隆数据中生成基于名称和同名出现序号的稳定 id。事件里的 `params.data` 可能包含补齐的 id，保留原始 name/value 和业务字段，不掺入布局坐标。重复名称可独立出现；已有重复显式 id 属于配置错误。

0 是有效权重，以最小尺寸展示。空名称、负值、NaN、Infinity、null 和缺失权重不绘制；保留原始数据索引，不通过重排输入或物理删除数据改变事件索引。开发诊断合并输出，不逐项刷屏；空数组不告警。

整体配置校验与子弹图一致：sizeRange 必须是有限正数且上界不小于下界，gap 为有限非负数，overlap 在规定区间；违反时清空生成系列并输出 `[IxWordCloudChart]` 诊断，修正后恢复。非 rect 模式传入非零 overlap 时告警并按 0 处理。symbolSize 回调返回无效尺寸时仅跳过对应项；重复显式 id 清空生成系列，避免错误复用节点。显式替换 series 时优先使用调用方系列，不执行内置词云校验。

### 3.6 尺寸和样式优先级

| 项目                 | 优先规则                                                                    |
| -------------------- | --------------------------------------------------------------------------- |
| text 字号            | 项级 `label.fontSize` → 分类级 → 外层 `label.fontSize` → sizeRange 权重映射 |
| rect/circle 背景尺寸 | 项级 `symbolSize` → 分类级 → 外层 `symbolSize` → 自动尺寸                   |
| 标签样式             | 原生项级、分类级、系列级继承，再回落到组件主题默认值                        |
| 背景配色             | 原生节点样式和分类/调色盘管线；显式项级样式优先                             |
| 文字配色             | 显式 `label.color` 优先；rect/circle 默认主题文字色，text 默认主色          |

在 text 模式，symbolSize 只改变透明命中区域的下限，不改变字号；要控制词的大小用 `label.fontSize` 或 `sizeRange`。排布始终包含完整文字边界，不能用小 symbolSize 绕过碰撞。

文字节点不用 `symbol: 'none'` 隐藏背景，以免原生节点连同标签被取消绘制。节点保留原生配色，默认 itemStyle.opacity 为 0、label.opacity 按当前有效数据的数值线性映射到 0.35–1（最小值最淡，最大值不透明；数值相同时均为 1），显式 label.opacity 优先，标签可通过 color: inherit 复用节点色；命中范围按文字矩形计算。

rect 背景样式用 itemStyle；纯文字的搜索高亮底色用 emphasis.label.backgroundColor。两者职责不同。矩形需要精确圆角时使用 `label.backgroundColor + label.borderRadius + label.padding`，透明节点负责命中和排布；不发明 `itemStyle.borderRadius`，graph 普通节点未承诺该字段。首版不增加可变半径的自绘矩形通道。

`itemStyle.opacity` 是背景透明度，`label.opacity` 是文字透明度；需要整项一起变淡时同时配置二者，示例明确展示，不新增整体透明度字段。

## 4. 使用示例

以下为评审用 API 示例，不是已可运行的组件实现。

### 4.1 纯文字词云

```vue
<script setup lang="ts">
import { IxWordCloudChart } from '@idux/charts/word-cloud'

const data = [
  { id: 'taste', name: '味道', value: 100 },
  { id: 'meal', name: '套餐', value: 78 },
  { id: 'delivery', name: '外卖', value: 42 },
]
</script>

<template>
  <IxWordCloudChart
    :data="data"
    :size-range="[14, 64]"
    :label="{ color: '#6294ff' }"
    :tooltip="{ valueFormatter: value => `${value} 次` }"
    style="height: 320px"
  />
</template>
```

不必传 `shape: 'text'`。标签默认名称；要显示次数使用 `label: { formatter: '{b} {c}' }`。

### 4.2 矩形标签及离散尺寸

```ts
const options: WordCloudChartProps = {
  shape: 'rect',
  sizeRange: [28, 28],
  gap: 8,
  label: {
    formatter: '{b} {c}',
    fontSize: 14,
    color: '#6F7785',
    padding: [4, 10],
    width: 180,
    overflow: 'truncate',
  },
  itemStyle: { color: '#E8F0FF' },
  emphasis: {
    scale: false,
    itemStyle: { color: '#1F6BFF' },
    label: { color: '#fff' },
  },
  data: [
    { id: 'report', name: '汇报文档', value: 21, symbolSize: [160, 40] },
    { id: 'project', name: '项目管理', value: 7 },
  ],
}
```

`label.width` 为原生文本内容宽度，不是整个标签宽度，padding 另计。默认自动宽度只对超长文本施加 `min(240px, 可用区域宽度减 padding)` 的内容上限，并设置 truncate；显式 label.width 覆盖该默认。显式背景尺寸不强行压缩原生文本宽度，必要时调用方同时设置 label.width/height；排布包含两者的并集。

### 4.3 威胁分类、图例和单项颜色

```ts
const options: WordCloudChartProps = {
  shape: 'rect',
  sizeRange: [28, 28],
  bottom: 56,
  categories: [
    {
      name: '受到威胁',
      itemStyle: { color: '#FCE8E8' },
      label: { color: '#E02020' },
    },
    {
      name: '未受威胁',
      itemStyle: { color: '#EDF1F7' },
      label: { color: '#6F7785' },
    },
  ],
  legend: { bottom: 0, data: ['受到威胁', '未受威胁'] },
  label: { formatter: '{b} {c}', padding: [4, 10] },
  emphasis: { scale: false },
  data: [
    { id: 'shell', name: 'WEBSHELL后门', value: 21, category: '受到威胁' },
    { id: 'spark', name: 'Apache Spark命令注入', value: 0, category: '未受威胁' },
  ],
}
```

图例原生筛选 category；筛选后剩余节点重新排布。图例颜色沿用 categories 的 itemStyle，若标签底色很浅而图例需深色，显式配置 `legend.data[].itemStyle`，不新增 legendColor。

### 4.4 气泡云

```ts
const options: WordCloudChartProps = {
  shape: 'circle',
  sizeRange: [56, 128],
  gap: 10,
  label: {
    formatter: '{b}\n{c}',
    color: '#fff',
    fontSize: 14,
    lineHeight: 22,
  },
  itemStyle: {
    color: {
      type: 'radial',
      x: 0.5,
      y: 0.3,
      r: 0.8,
      colorStops: [
        { offset: 0, color: '#3B727F' },
        { offset: 1, color: '#123B7B' },
      ],
    },
  },
  emphasis: { scale: false },
  data: [
    { id: 'sz', name: '广东 深圳', value: 234 },
    { id: 'gz', name: '广东 广州', value: 136 },
    { id: 'sh', name: '上海', value: 56 },
  ],
}
```

`symbolSize: value => ...` 可覆盖默认映射。圆形默认字号不随权重无限放大；若内文过长，按照圆内可用矩形限制宽度和高度，并省略，Tooltip 保留全文。显式标签尺寸或位置可以越出圆，此时按圆和文字边界一起避让。

### 4.5 大屏分档矩形

```ts
const data = rows.map(row => {
  const large = row.rank <= 3
  const medium = row.rank <= 6
  const opacity = large ? 1 : medium ? 0.75 : 0.5
  return {
    ...row,
    symbolSize: large ? [300, 56] : medium ? [220, 48] : [150, 32],
    itemStyle: { color: row.danger ? '#541D29' : '#143D7B', opacity },
    label: {
      fontSize: large ? 16 : medium ? 14 : 12,
      opacity,
      width: large ? 240 : medium ? 164 : 110,
      overflow: 'truncate',
    },
  }
})

const options: WordCloudChartProps = {
  shape: 'rect',
  gap: 0,
  overlap: 0.15,
  label: { formatter: '{b}（{c}）', color: '#E7EDF7' },
  emphasis: { scale: false, itemStyle: { opacity: 1 }, label: { opacity: 1 } },
  data,
}
```

尺寸和排名规则由调用方决定；组件不通过 value 推断危险等级。上述尺寸是 API 示例，正式示例按参考图和实际容器校准。

### 4.6 搜索高亮与持久选中

组件引用通过公共 `getEChartsInstance()` 获取实例。搜索输入和匹配规则由业务实现。

```ts
const chart = chartRef.value?.getEChartsInstance()
chart?.dispatchAction({ type: 'downplay', seriesIndex: 0 })
chart?.dispatchAction({
  type: 'highlight',
  batch: matchedRawIndices.map(dataIndex => ({ seriesIndex: 0, dataIndex })),
})
```

配套 `emphasis.label: { color: '#fff', backgroundColor: '#1F6BFF', padding: [2, 4], borderRadius: 2 }`，并保持 `emphasis.scale: false`。搜索、鼠标悬停共同使用 ECharts 强调态；如果业务要求两种高亮相互独立，应使用持久选中或逐项正常样式更新，不依赖两套并存的 emphasis。

持久选中使用 `selectedMode`、`select.label/itemStyle`、`data[].selected` 和原生 select/unselect/toggleSelect 动作；事件使用 `@click`、`@selectchanged`。不新增 selectedKeys、highlightWords 或自定义 click 事件参数。

## 5. 布局算法与稳定性

### 5.1 权重映射

所有有效数据计算固定的权重范围，分类筛选和容器缩放不会重新标定权重，避免取消一类后其他词突然变大。数据值真正更新时重新计算。

文字字号与矩形建议高度：`minSize + t * (maxSize - minSize)`，其中 `t = (value - minValue) / (maxValue - minValue)`。全相等数据使用尺寸区间中值，全零数据使用最小值。

圆形使用面积线性映射：`diameter = sqrt(minDiameter² + t * (maxDiameter² - minDiameter²))`。这是限定直径区间的相对编码，不能把带最小直径的气泡面积宣称为原始数值的严格比例。显式 symbolSize 不参与默认映射。

### 5.2 测量与碰撞

使用 ECharts 暴露的图形/文字能力测量，不另外维护中文字符宽度估算表。测量最终 formatter 输出、fontFamily、fontSize、fontWeight、lineHeight、rich、width/height、padding、换行、省略和标签偏移。

text/rect 的碰撞边界包含实际文字、标签背景和节点背景；circle 采用圆形精确距离检测，圆外文字另做矩形检测。gap 施加到边界上；阴影不计入普通碰撞边界。

默认标签居中；允许原生 label.position/distance/offset，但排布必须测量最终位置。支持标签几何属性的原生方式，不把“支持 label 类型”误写成任意 labelLayout 改写后仍保证避让。

文字状态需要特别处理：预先测量 normal/emphasis/select/blur 中明确配置的文字与背景几何，保留最大外扩空间。状态改变只更新绘制、不重排；原生 emphasis.scale 默认设为 false。显式打开缩放或 labelLayout 在布局完成后移动/旋转标签，会超出避让保证，文档说明其作用，不悄悄覆盖用户配置。

### 5.3 矩形排布

按权重降序，实际占用面积作为次级排序，同值同面积按稳定 id 排序。只对布局索引排序，不改原始 data 顺序。

从区域中心向外生成确定性的椭圆螺旋候选点，使用空间网格索引筛选可能相交节点，然后执行矩形精确相交检测。候选必须满足容器边界与 gap。无需随机数，不暴露随机种子和网格精度参数。

重绘同一配置应得到同一结果；字体环境不同不承诺逐像素一致。

### 5.4 圆形排布

采用确定性的圆形切线候选放置：从中心的大圆开始，围绕已放置圆生成切线候选，按边界约束、离中心距离和稳定顺序选择。空间索引缩小碰撞检测集合；候选不足时用有界螺旋搜索补充。无需持续运行的力导向模拟，不使用 graph.force 碰运气得到“不重叠”。

### 5.5 重叠策略

rect 的 gap 默认且最小为 8px。overlap = 0 时完整背景和标签保持至少 max(8, gap) 的间距。overlap > 0 时，每对背景要么保持该间距，要么交叠区域宽、高均至少 6px，且 `交叠面积 / 较小背景面积 <= overlap`。每个节点最多与另外两个节点重叠，避免过多节点交叉遮挡；允许背景遮挡文字，通过半透明填充控制可读性；不满足约束时继续寻找位置，空间不足则隐藏低优先项。开启 overlap 后，motion 各自自由漂浮，上述规则仅约束静态布局，不限制运动中的交叠；仅预留容器边缘空间。未开启重叠时仍预留完整运动包络。

绘制顺序固定为小权重在后、大权重在前，hover/select 使用 ECharts 原生提升层级。命中由 ECharts 处理，同一点由最上方可命中节点响应，不增加跨层穿透点击。

允许重叠时不再强制保护文字不被其他背景覆盖；文字可读性由业务填充透明度控制。最小交叠尺寸和面积上限仍然生效。

### 5.6 更新与容器变化

每次布局都用确定性算法从相同输入重建，不依赖历史坐标决定最终位置，保证可复现。id 用于原生元素复用和位置过渡。首版只保证样式更新、高亮和选中不重排；增删数据、权重、字体、formatter、尺寸、gap、分类筛选变化会重新排布，不承诺所有旧节点位置不动。

纯颜色、描边颜色、透明度和 Tooltip 变化复用几何缓存；描边宽度、文字尺寸、文本内容和状态几何变化使缓存失效。缓存按图实例隔离，包含字体和容器尺寸键，设置容量限制，实例销毁时释放。

ResizeObserver 继续调用 chart.resize；布局位于 ECharts 原生 layout 阶段，因此手动 resize 也会触发重排。0×0 隐藏容器不进行搜索，待恢复有效尺寸后布局。切换主题时只在文字测量参数改变时重测。

自定义 Web 字体应在挂载前加载；后加载字体通过浏览器字体完成事件触发布局失效及一次 resize，监听只在浏览器环境注册并在销毁时移除。不会通过每帧测量监听字体。

### 5.7 放不下时的行为

不自动缩小显式字号、symbolSize、gap 或 padding。布局默认优先大权重，放不下的节点不绘制，不截出容器，也不把 Tooltip 或业务数值改小。

未放置节点保持数据身份，通过非有限布局坐标等与原生渲染兼容的隐藏方式排除绘制和命中；不能隐藏后仍留下透明可点击区域。隐藏实现需在 5.4.3/6.1.0 兼容验证中确认。

使用方需承诺一个适当的显示数量，例如先取 TOP10/TOP50。首版不新增分页、自动滚动和隐藏项统计事件，也不暗设 maxCount 截掉数据。零可放置项时保持空画布，由默认插槽呈现业务空状态。

搜索使用固定候选次数上限，布局复杂度和内存有界；不会无限重试。验收使用 20/100/300 项、短中文/长中文/中英混排及小容器；性能指标在实现后测量记录，当前不承诺未经实测的毫秒数。

## 6. ECharts 接入方案

### 6.1 管线

```text
Vue props 与公共原生配置
  → 配置校验、不可变数据副本、稳定 id
  → createWordCloudOption：一个原生 graph 系列，空 edges
  → 原生 category/legend 过滤与样式计算
  → 词云专属 layout：测量、尺寸映射、避让、设置节点位置
  → 原生 GraphView：节点、原生标签、状态、命中、动画
```

生成 graph 的 layout 固定为 none，roam/draggable 关闭。通过私有标记识别本组件系列，扩展注册幂等，不通过固定 seriesIndex/系列名称识别；同页其他 graph 不受影响。只有生成系列携带标记，用户替换 series 后不会被布局扩展接管。

不从 echarts/lib 内部路径导入 GraphView、SymbolDraw 或图数据类，也不修改 ECharts 原型。通过 echarts/core 的公开扩展注册入口安装布局，沿用子弹图 registerLayout 的方式；SeriesData 和 view 坐标适配封装在单一模块，限制内部模型耦合。

布局发生在原生分类、symbolSize 和视觉计算之后、原生 GraphView 绘制之前；最终阶段优先级以两个支持版本源码和兼容测试确定。自动尺寸只在没有显式原生尺寸时写入 item visual，不能覆盖用户 symbolSize 回调结果。

### 6.2 坐标与尺寸

碰撞在屏幕逻辑像素中计算，使用 graph 原生 view 坐标系的 pointToData 转回节点坐标。禁止把像素坐标直接写入后再被 view transform 二次缩放。默认不设置业务 node x/y，不使用拟造坐标维度承载 value。

node symbol、label 与碰撞尺寸要在最终 view 变换下保持一致，特别验证宽高比变化、单项数据、空数据及不同 DPR。若原生 view 产生额外节点缩放，适配模块需消除该缩放或同步换算，不能仅凭静态截图判定完成。

### 6.3 标签自动字号

原生 label.fontSize 不引入回调新类型。自动文字字号在布局适配层对 ECharts 自有的项级模型副本补齐；不改调用方对象，不把映射值回写为显式业务配置。每次重算时区分自动值与显式值，避免首次生成字号锁死后续更新。

文字测量和 GraphView 最终使用同一份已解析标签配置，测量结果按文字和几何配置缓存。formatter 继续由原生流程调用，不约定调用次数；回调需保持纯函数，与其他图表一样，不支持依赖副作用产生不同文案。

### 6.4 回调与原生动作

label.formatter、symbolSize、itemStyle.color、tooltip.formatter 都沿用原生参数；`{a}` 为系列名，`{b}` 为名称，`{c}` 为原始数值。params.value 始终是原始数值，不变成 `[x, y, value]`。原生事件 seriesType 为 graph、dataType 为 node，不伪造 wordCloud。

graph 的 category 筛选、highlight/downplay、select/unselect/toggleSelect、showTip/hideTip 都走原生机制；不添加一个 custom 装饰系列与 graph 双向同步鼠标事件。

动态主题重建实例时，沿用既有 legend 状态恢复。词云还需按稳定 id 保存用户选中状态，并区分调用方显式更新 data[].selected；不能依赖现有公共机制已经恢复所有 select 状态。程序化临时 highlight 不跨实例重建自动恢复，业务需要时在 ready 后重放。

### 6.5 原生能力验证边界

graph 不是原生词云，因此接入可行性仍需实测，尤其是字号注入、状态标签外扩、view 坐标换算、未放置节点隐藏、category 样式覆盖顺序及 selected 状态恢复。如果必须通过大量未公开内部字段才能维持契约，应回到评审调整承载方式，不把不稳定适配藏进实现。

visualMap 不列为首版稳定 API：它能参与 graph 原生视觉管线，但本方案需验证多维 value、尺寸映射和文字颜色的语义；首版 value 明确为标量。分类配色用 categories，连续业务配色可用原生 itemStyle.color 回调。

GraphChart 会引入该 ECharts 模块本身及其内置布局代码；没有额外第三方依赖不代表包体一定更小。接入后记录按需入口的产物变化，与 custom 备选方案比较，避免为复用原生能力付出未经评估的体积成本。

## 7. 模块和仓库接入

实现位于 `packages/plots/word-cloud/`，组件入口沿用 withChartProps、usePlotRender、公共主题、loading、实例方法与事件机制。

| 模块职责       | 内容                                                      |
| -------------- | --------------------------------------------------------- |
| 类型与选项生成 | 支持字段清单、布局及 motion 配置、校验、graph option 生成 |
| 测量与解析     | 原生标签配置、formatter 文案、字号及节点边界              |
| 布局算法       | 纯函数矩形/圆形布局、空间索引、固定候选上限               |
| ECharts 适配   | 专属 layout 注册、项级视觉与字号、view 坐标换算、缓存     |
| Vue 生命周期   | 主题与 resize 接入、字体监听清理、选中状态恢复            |

纯算法与 ECharts 适配分离，测试不需要启动浏览器才能验证碰撞规则。只将确定跨图表复用的能力放入 shared，不为了词云先重构整个公共层。完整的跨组件设计评估见 [架构审查](component-architecture-review.md)。

总入口和 word-cloud 子入口、package exports/typesVersions、全局组件声明、构建入口及图表注册清单需同步维护。正式使用约定由站点 API/指南、英文指南和各包 README 共同承载；本文件记录架构决策，不替代正式 API。

## 8. 验证与验收

实施顺序：先验证原生 graph 承载契约，再做矩形布局，随后文字字号映射和圆形布局，最后接入大屏层叠、完整演示与兼容矩阵。每一步依照评审通过的 API 实施；影响公共契约的偏差另行说明。

| 维度       | 验收要求                                                        |
| ---------- | --------------------------------------------------------------- |
| 原生参数   | formatter、颜色回调、尺寸回调收到原始数值和业务数据             |
| 原生状态   | hover/highlight/downplay/select/blur 与图例筛选正确，无重复事件 |
| 几何正确   | 普通和状态外扩边界避让、完整背景命中、越界和隐藏项不命中        |
| 稳定性     | 相同输入重复布局一致；只改颜色/高亮不移动；数据顺序未被修改     |
| 动态更新   | 增删、权重更新、分类筛选、字号和 formatter 变化后正确重排       |
| 尺寸环境   | 隐藏后恢复、手动 resize、自动 resize、单项、空数组、长文本      |
| 字体与内容 | 中文/英文/混排、富文本、多行、省略、Web 字体加载                |
| 样式       | 渐变、边框、label 背景和圆角、背景/文字独立透明度、主题切换     |
| 生命周期   | 多实例不串缓存、不影响普通 graph，卸载后无监听和定时器残留      |
| 打包兼容   | ECharts 5.4.3/6.1.0，Vue 2.6/2.7/3，按现有声明消费矩阵验证      |
| 文档与演示 | 四类参考效果、原生配置覆盖、搜索高亮、分类筛选、拥挤容器        |

浏览器验证按仓库现有工具进行，任务完成或中断后关闭本任务启动的浏览器并复查所属进程。实际执行结果单独登记在验证记录中，不将设计要求等同于检查已通过。

## 9. 已采用的设计决策

1. 一个 IxWordCloudChart，通过 shape 切换 text/rect/circle；不拆三个组件。
2. 使用原生 graph 节点与自定义布局，保持原生 label/itemStyle/categories/状态配置。
3. 新增布局配置为 shape、sizeRange、gap、overlap；sizeRange 在三种形态下映射不同尺寸，motion 可选开启持续漂浮。
4. 纯文字首版使用矩形避让，接受字形空隙没有完全填满。
5. 默认不重叠；矩形可轻度背景层叠，允许背景遮挡文字。
6. 放不下时优先保留高权重，不自动缩小显式尺寸；调用方控制 TOP 数量。
7. 数据增删可重排；首版不承诺增量布局保留所有旧位置。

## 10. 设计依据

- 当前子弹图：`packages/plots/bullet/src/types.ts`、`createBulletOption.ts`、`bulletLayout.ts`、`renderBullet.ts`；原生 bar 与局部自定义图形协作。
- 当前公共层：`packages/plots/shared/usePlotRender.ts`、`plotOptions.ts`、`packages/core/composables/useChart.ts`；选项覆盖、实例生命周期、原生事件和 resize。
- 当前 ECharts 6.1.0 源码：graph 的 GraphSeries、GraphView、categoryVisual、categoryFilter、createView、simpleLayout；用于核对实际承载能力，不作为已通过运行验证的证明。
- [ECharts 5.4.3 GraphView](https://github.com/apache/echarts/blob/5.4.3/src/chart/graph/GraphView.ts)、[createView](https://github.com/apache/echarts/blob/5.4.3/src/chart/graph/createView.ts)：支持版本的坐标和原生节点绘制依据。
- [ECharts custom series](https://echarts.apache.org/handbook/en/how-to/custom-series/)：备选绘制方式。若 graph 承载验证不通过，再评估 custom 方案及需要自己适配的原生能力范围。

## 持续漂浮补充设计

新增 motion: boolean | WordCloudMotion，默认关闭。true 等价于 amplitude: 12（范围 0–20px）、amplitudeRatio: [1, 1]、duration: 6000、pauseOnHover: true。amplitudeRatio 为两个有限非负数，归一化后决定横纵振幅比例，总位移仍受 amplitude 控制；[0, 0] 关闭漂浮。原生 animation 保留布尔语义，false 同时关闭持续运动。每个词以稳定 id 生成相位、方向和周期变化；权重大词的位移略小。

未开启重叠时膨胀文字与背景的碰撞边界来预留运动范围；矩形开启 overlap 后仅扩张容器边界预留范围，节点间仍按静态尺寸排布，运动中不再约束交叠。每个节点的方向、相位和周期独立计算，不共享同步动画。运动沿横纵幅度均衡的二维轨迹循环，不改变字号、颜色和透明度。通过原生 graph Symbol 首个子路径的 x/y 偏移实现，父节点位置、路径缩放及状态样式仍由 ECharts 管理；不改变 Symbol 子元素结构。循环使用 ZRender Animator，与 graph 的入场、位置和尺寸过渡分离。

动画在 graph 的 post-update 阶段同步；字体重排或零时长原生更新中止循环时，按当前偏移恢复。稳定节点及未被中止的循环直接复用。图例过滤停止隐藏节点的循环，恢复后重新绑定。实例视图的 remove/dispose 负责清理动画，dispose 同时释放 DOM、可见性、减少动态效果和 loading 的监听。该生命周期同时覆盖组件和直接使用 createWordCloudOption 的应用。

指针命中实际词条文字或背景、页面隐藏、组件 loading 时原地暂停；移到画布空白处、离开画布或恢复后继续，图例不触发暂停。减少动态效果启用时归零并停止漂浮；关闭后重新启动。SSR 不启动持续运动。原生 emphasis.scale、labelLayout 与旋转仍超出避让保证，更新重排过渡也不保证路径无交叉。
