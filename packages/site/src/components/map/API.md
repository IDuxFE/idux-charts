---
title: API
---

### IxMapChart

从 `@idux/charts` 或 `@idux/charts/map` 导入 `IxMapChart`、`registerMap`、`createMapOption` 和相关类型。先同步注册 GeoJSON，再渲染组件。地图几何数据由应用管理，组件不内置或请求中国／世界地图，支持自定义区域。

```ts
import { registerMap, IxMapChart } from '@idux/charts/map'
import geometry from './my-map.json'
registerMap('my-map', geometry)
```

世界地图示例使用 [ECharts 官方示例的 world.json](https://echarts.apache.org/examples/data/asset/geo/world.json)，下载到本地后导入，各示例在自己的 Vue 文件中完成注册。该文件包含 217 个区域，使用未压缩的经纬度坐标；中文区域名通过 `geo.nameMap` 映射。

| 属性       | 类型                               | 默认值         | 说明                             |
| ---------- | ---------------------------------- | -------------- | -------------------------------- |
| map        | string                             | 必填           | 已注册的地图名称                 |
| mode       | `'status'`、`'density'`、`'lines'` | `'status'`     | 状态、密度或飞线                 |
| data       | MapDataItem[]                      | []             | 名称、数值、区域与坐标           |
| lines      | MapLineItem[]                      | []             | 飞线起点、终点、坐标及指标       |
| pieces     | MapPiece[]                         | 六级蓝色色阶   | 密度图分段；整体替换默认数组     |
| metricName | string                             | `''`           | 状态／密度 Tooltip 标题          |
| unit       | string                             | `''`           | 数值单位                         |
| roam       | `boolean`、`'scale'`、`'move'`     | true           | 默认支持滚轮缩放和拖动           |
| showLabel  | boolean                            | 密度／飞线显示 | 区域或节点名称                   |
| plotTheme  | PlotTheme                          | 注入主题       | 配色、字体、底图、边界、标签背景 |

`MapDataItem`：`name: string`、`region?: string`（默认 name，须匹配 GeoJSON 的区域名或 nameMap 后的名称）、`value?: number | null`、`coordinate?: [经度, 纬度]`、`color?: string`、`symbol?: 'circle' | 'pin'`。状态型没有坐标时仍着色区域，但不绘制标记。相同区域建议先聚合后传入。数值 0 保留，缺失值显示 `-`。

`MapLineItem`：`from: string`、`to: string`、`coords: [[经度, 纬度], [经度, 纬度]]`、`value?: number | null`、`color?: string`、`metrics?: { name: string; value: number | string; unit?: string }[]`。坐标使用注册地图的坐标系。

`MapPiece`：`label: string`、`color: string`、`min?: number`、`max?: number`、`value?: number`。默认区间为 0、1–200、201–400、401–600、601–800、>800；适用于非负整数计数。其他数值范围请提供自定义 pieces。缺失区域使用独立底色。

状态图例按输入顺序显示，不自动排序；区域与标记使用同一颜色。密度图默认六位十六进制色在悬停时混合 20% 的 `#1C4EFF`；自定义非十六进制色可通过原生 emphasis 配置设置。

飞线默认使用起点较透明、终点较深的颜色渐变，逐条匹配线路方向；`MapLineItem.color` 同时作用于线条和动态光点。

新增主题字段：`mapAreaColor`、`mapBorderColor`、`mapEmptyColor`、`mapShadowColor`、`mapLabelBackgroundColor`。支持公共 `loading`、`onReady`、`getEChartsInstance()`、图表事件及自动 resize。

`geo`、`tooltip`、`visualMap` 等原生选项按字段合并；数组整体替换；显式 `series` 整体替换自动生成的系列。使用 `geo.nameMap` 配置世界地图名称映射。`createMapOption(props)` 与组件使用相同规则，可配合 `IxChart` 使用。地图必须先注册；运行时切换地图前也要完成注册。
