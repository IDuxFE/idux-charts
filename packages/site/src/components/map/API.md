---
title: API
---

### IxMapChart

地图使用原生 ECharts `geo`、`series`、`visualMap` 和 `tooltip` 组合。组件管理底图默认样式、主题、加载状态和生命周期；可选生成函数减少常见节点、线路和区域样式的配置量。生成结果是普通 ECharts 配置，可以修改、复用，也可以与手写配置混合。

从 `@idux/charts` 或 `@idux/charts/map` 导入组件、注册函数、生成函数和类型。应用先同步注册 GeoJSON；组件不内置、请求或转换地图几何数据。

```ts
import {
  IxMapChart,
  registerMap,
  createMapNodes,
  createMapLines,
  createMapRegions,
  type MapNodeItem,
} from '@idux/charts/map'
import geometry from './my-map.json'

registerMap('my-map', geometry)
const nodes: MapNodeItem[] = [
  { id: 'sz', name: '深圳站点', coordinate: [114.06, 22.55], value: 160 },
  { id: 'bj', name: '北京站点', coordinate: [116.46, 39.92], value: 180 },
]
const geo = {
  map: 'my-map',
  regions: createMapRegions([{ region: '广东', value: 260, color: '#98C6FF' }], {
    metricName: '区域资产',
    unit: '台',
  }),
}
const series = [
  createMapLines([{ source: 'sz', target: 'bj', value: 35 }], {
    nodes,
    animated: true,
    metricName: '链路时延',
    unit: 'ms',
  }),
  createMapNodes(nodes, { symbol: 'pin', metricName: '站点资产', unit: '台' }),
  {
    type: 'scatter' as const,
    coordinateSystem: 'geo' as const,
    symbol: 'diamond',
    data: [[104.06, 30.67]],
  },
]
```

```vue
<IxMapChart :geo="geo" :series="series" style="height: 480px" />
```

| 属性                   | 类型              | 默认值       | 说明                                                  |
| ---------------------- | ----------------- | ------------ | ----------------------------------------------------- |
| plotTheme              | PlotTheme         | 注入主题     | 组件底图、默认调色板、字体、边界与阴影                |
| geo                    | ECharts geo       | 内置底图配置 | 底图名称 geo.map、交互 geo.roam、布局、区域等原生选项 |
| series                 | ECharts series    | []           | 原生系列，可混合生成函数结果和手写配置                |
| visualMap / tooltip 等 | 对应 ECharts 类型 | 公共默认值   | 原生配置                                              |

底图通过 `geo.map` 指定已注册的地图名称；`geo.roam` 默认 `true`，可设为 `false`、`'scale'` 或 `'move'` 控制缩放和拖动。

`MapChartProps` 接受原生 ECharts 选项，组件不转换或重新生成传入的系列数据。

组件自动注册 map、scatter、lines、geo 和 visualMap；使用 effectScatter、heatmap、custom 等其他原生系列时，由应用通过 ECharts `use()` 注册相应能力。生成函数不依赖组件，可以配合 `IxChart` 或 ECharts 实例使用，调用方需注册对应系列及组件。

支持默认插槽，公共配置和用法见<a href="./core">IxChart API</a>。

### createMapOption

`createMapOption(props)` 返回地图的 ECharts option。

### createMapPieces(thresholds, options?)

业务只需定义 `{ value, color }` 阈值，函数自动按阈值降序排列，生成原生分段的 gt、lte 和 label。此处 value 表示「超过该阈值」，与原生 pieces 中 value 的精确匹配含义不同。

```ts
import { createMapPieces, getMapPieceColor, seerColorsForRisk } from '@idux/charts'

const attackPieces = createMapPieces(
  [
    { value: 700, color: seerColorsForRisk[0]! }, // >700
    { value: 500, color: seerColorsForRisk[1]! }, // (500, 700]
    { value: 300, color: seerColorsForRisk[2]! }, // (300, 500]
    { value: 200, color: seerColorsForRisk[3]! }, // (200, 300]
    { value: 0, color: seerColorsForRisk[4]! }, // (0, 200]
  ],
  { zeroColor: seerColorsForRisk[6] }, // 可选：单独指定数值 0 的颜色。
)
const color = getMapPieceColor(666, attackPieces) // seerColorsForRisk[1]
```

`thresholds: readonly MapThreshold[]`，其中 `MapThreshold` 为 `{ value: number; color: string }`。阈值须为有限且不重复的数值，函数不修改输入。每档使用 `(当前阈值, 下一更高阈值]`，最高档没有上界；文案自动生成 `>700`、`(500, 700]` 等，可准确表达整数或小数边界。恰好等于阈值时使用较低一档。

包含阈值 0 时额外生成精确零值分段；默认沿用该阈值的颜色，可通过 options.zeroColor 覆盖。不包含 0 时不自动新增零值档。其他未覆盖值按缺失处理。仍可直接使用原生 MapPiece[] 定义不连续区间或自定义 label。

`getMapPieceColor(value, pieces, fallback?)` 按同一份分段计算节点或业务图例颜色；区域可直接通过 createMapRegions 的 pieces 使用这些规则。缺失值、非有限数值或未匹配的值返回 fallback，默认 `#F0F3F7`。

### createMapNodes(data, options?)

返回 `ScatterSeriesOption`，默认 `type: 'scatter'`、`coordinateSystem: 'geo'`、`geoIndex: 0`。内置圆点／图钉、边框、标签和 Tooltip 样式。

`data: readonly MapNodeItem[]`：

```ts
interface MapNodeItem {
  id: string
  name: string
  coordinate: [number, number] // 与底图一致的二维坐标；通常为经度、纬度
  value?: number | null
  color?: string
  symbol?: 'circle' | 'pin'
  metrics?: MapMetric[]
}
```

id 在本次生成使用的数据中唯一；name 可以重复。坐标必填，运行时非有限坐标的节点不绘制。数据 color 优先于统一颜色。

`options: MapNodeOptions` 接受除 type、data 外的原生 scatter 选项，并增加 `metricName`、`unit`、`plotTheme`。例如 `symbol: 'pin'`、`symbolSize: 20`、`label: { show: false }`、`itemStyle: { borderWidth: 4 }`。圆点默认 12px，图钉默认 28px；图钉默认带白色中心。

### createMapLines(data, options?)

返回 `LinesSeriesOption`，使用 geo 坐标系。内置虚线、方向渐变、悬停高亮和动画参数；默认关闭动画。

`data: readonly MapRouteItem[]` 支持两种互斥的端点形式：

```ts
{ source: 'sz', target: 'bj' } // 从 options.nodes 查找端点
{ from: '深圳', to: '北京', coords: [[114.06, 22.55], [116.46, 39.92]] } // 独立坐标
```

两种形式均可设置 `id`、`name`、`value`、`color` 和 `metrics`。name 自定义线路名称，默认组合端点展示名；Tooltip 默认以线路名称为标题，metricName 可覆盖标题；color 同时覆盖线条与动画光点。缺失节点引用或非有限端点坐标的线路会被跳过。

`options: MapLineOptions` 接受除 type、data 外的原生 lines 选项，并增加：

| 字段                          | 默认值   | 说明                                                               |
| ----------------------------- | -------- | ------------------------------------------------------------------ |
| nodes                         | []       | 引用端点所需的完整节点集合，可包含不同节点系列的数据               |
| animated                      | false    | effect.show 的便捷设置；显式 effect.show 优先                      |
| gradient                      | true     | 起点透明、终点较深；false 使用原色                                 |
| curveDirection                | `'auto'` | auto 按端点方向让弧线向上；fixed 保留 lineStyle.curveness 的正负号 |
| metricName / unit / plotTheme | 未提供   | Tooltip 标题、单位和生成样式使用的主题                             |

默认线宽 1px、虚线 `[3, 2]`、曲率幅度 0.2；悬停线宽 2px、虚线 `[6, 4]`。`animated: true` 使用 5 秒周期、4px 光点和 0.15 拖尾，可通过原生 effect 覆盖。

### createMapRegions(data, options?)

返回原生 `GeoComponentOption['regions']`，赋给 `geo.regions`。统一生成填色、标签、悬停样式和区域 Tooltip，区域汇总与站点数据独立。

`MapRegionItem`：`region: string`、`name?: string`、`value?: number | null`、`color?: string`、`metrics?: MapMetric[]`。region 是 GeoJSON 区域名或 `geo.nameMap` 映射后的名称；name 仅用于 Tooltip 展示。重复区域会报错，应用应先明确聚合方式。

`MapRegionOptions` 接受单个原生 geo.regions 条目除 name 外的配置，并增加 `pieces`、`metricName`、`unit`、`plotTheme`。不传 pieces 时使用数据 color 或统一区域底色；传 pieces 时按值分段，分段颜色优先，缺失值和分段外值使用 mapEmptyColor。区域标签默认显示，使用 `label: { show: false }` 关闭。

### createMapVisualMap(pieces, options?)

返回原生分段 `VisualMapComponentOption`，内置图例排版。默认 `seriesIndex: []`，仅展示图例；适合搭配已计算填色的 geo.regions 使用，不参与区域筛选。options 接受除 pieces 外的原生 visualMap 选项，并增加 plotTheme。多个图例由应用安排位置。

```ts
const geo = { regions: createMapRegions(data, { pieces: defaultMapPieces }) }
const visualMap = createMapVisualMap(defaultMapPieces)
```

两个生成函数传入同一份 pieces，保持区域颜色和图例含义一致。也可直接配置原生 visualMap，例如为原生 map 系列设置连续色阶。

`MapPiece` 包含 `label`、`color`，以及精确匹配的 `value`，或边界字段 `min`、`max`、`gt`、`gte`、`lt`、`lte`。min/max 包含边界，gt/lt 不包含边界。区间应连续且互不重叠，重叠时区域生成函数取第一个匹配项。

`defaultMapPieces` 提供六级蓝色分段：0、(0, 200]、(200, 400]、(400, 600]、(600, 800]、>800，支持非负整数和小数，需要业务显式引用。

### Tooltip、主题与响应式更新

`MapMetric`：`{ name: string; value: number | string | null; unit?: string }`。生成函数默认 Tooltip 展示单个 value；提供非空 metrics 时按指标逐行展示。0 保留，null 和非有限数值显示 `-`，缺失值不附单位，文本转义 HTML。使用生成函数 options.tooltip.formatter 可替换默认格式；手写系列遵循原生 Tooltip 规则。

组件的 `plotTheme` 作用于底图及公共默认值；节点、线路和区域的主题由对应生成函数的 `options.plotTheme` 设置。生成函数不维护隐式节点关联。

数据、节点坐标或主题会变化时，在 computed 中重新调用生成函数，并传入最新 nodes。生成结果的字段合并优先级为：内部默认值 → options 原生配置 → 单条数据的 color/symbol 或区域分段颜色。需要完全接管某个字段，也可在生成后按原生配置修改。

所有生成函数默认使用第一个 geo。多底图场景可使用原生 geo 数组及系列 geoIndex。坐标必须与几何使用同一坐标系，组件不进行坐标转换。世界地图通过 geo.nameMap 本地化，运行时切换底图前须完成注册。

底图默认带轻微边缘阴影，使用 plotTheme.mapShadowColor 调整颜色，或通过 geo.itemStyle.shadowBlur / shadowOffsetY 覆盖。需要平面区域统计图时可将二者设为 0。状态数据图例可用 createMapVisualMap 配合 inverse: true 和自定义 pieces.label，按输入顺序在图内左下角竖排展示。

### 交互状态与数据诊断

仅刷新数据、删除系列或切换主题时，兼容底图保留用户的中心位置和缩放。多底图使用稳定的 `geo.id`，重排后按 ID 恢复；匿名 geo 按位置匹配。底图、投影、坐标边界、缩放限制或显式 `center` / `zoom` 配置变化时采用新配置。`geo` 数组整体替换默认 geo，各项的交互和样式需自行配置。

`validateMapData({ nodes?, routes?, regions? })` 返回 `MapDataIssue[]`，不修改输入、不输出日志，也不改变生成函数的绘制策略。诊断包含 `kind`（node / route / region）、从 0 开始的 `index`、可选记录 `id` 和 `code`；`missing-node` 还包含缺失的 `nodeId`。

- `invalid-coordinate`：节点或线路端点不是包含两个有限数值的坐标。
- `missing-node`：线路引用的节点不存在。
- `duplicate-id`：节点 ID、已提供的线路 ID 或区域匹配键重复。

```ts
import { validateMapData } from '@idux/charts/map'

const issues = validateMapData({ nodes, routes: [{ id: 'link', source: 'sz', target: 'unknown' }] })
// [{ kind: 'route', index: 0, id: 'link', code: 'missing-node', nodeId: 'unknown' }]
```

校验只检查结构和生成函数能够判定的引用，不验证 GeoJSON 中是否存在某个区域，不检查坐标投影、经纬度范围或业务数值。生成函数继续跳过无效坐标和缺失端点；重复节点或区域仍抛错，需要业务先明确聚合方式。已提供的线路 ID 应保持唯一；未提供 ID 的线路不视为重复。
