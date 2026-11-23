# 示例地图数据

[English](README.md) | 简体中文

这里的 GeoJSON 文件是本地示例资源，不包含在发布的图表库中。各 Vue 示例自行导入并注册地图，运行时不需要下载。

## 世界地图

- 文件：[world.json](./world.json)。
- 来源：[Apache ECharts 示例数据](https://echarts.apache.org/examples/data/asset/geo/world.json)。
- 本地 JSON 保留了来源数据中 217 个地区的几何和属性，并为每个 feature 补充 GeoJSON 的 `type: "Feature"` 标识。坐标为未压缩的经纬度，包含 CRS84 元数据。
- 地区名称来自 `properties.name`。状态和密度示例通过 `geo.nameMap` 翻译示例数据所需的名称，保留来源数据的几何和名称。

## 中国地图

- 文件：[china.json](./china.json)。
- 来源：[ECharts 3.8.5 china.json](https://raw.githubusercontent.com/apache/echarts/3.8.5/map/json/china.json)。
- 文件使用 `UTF8Encoding`，ECharts 会在注册时解码压缩坐标。
- 来源版本许可证：BSD 3-Clause License，Copyright (c) 2017, Baidu Inc.
- [上游许可证](https://raw.githubusercontent.com/apache/echarts/3.8.5/LICENSE)。
- [随仓库分发的中国地图许可证](../../../../public/china-map-data-LICENSE.txt)。

上述 ECharts 3.8.5 署名和许可证适用于中国地图来源。世界地图的下载来源单独记录于上方。地理边界沿用各自来源数据集。
