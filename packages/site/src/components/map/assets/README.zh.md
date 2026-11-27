# 示例地图数据

[English](README.md) | 简体中文

[前往 @idux/geo-areas 官网查看完整文档和交互示例](https://iduxfe.github.io/geo-areas/)。

站点从仅安装于 site 的 `@idux/geo-areas` 依赖导入 GeoJSON，地图数据不包含在发布的图表库中。各 Vue 示例同步注册导入的地图，无需运行时访问地理数据服务。

## 世界地图

- 导入路径：`@idux/geo-areas/geojson/world.json`。
- 包含 217 个地区，`properties.name` 为中文名称，另保留双语 `properties.names` 和原始 `properties.sourceName`。
- 状态和密度示例直接使用中文地区名匹配数据。
- 来源：Apache ECharts 世界地图，由 `@idux/geo-areas` 规范化。
- [随站点分发的 Apache-2.0 许可证](../../../../public/world-map-data-LICENSE.txt)及 [NOTICE](../../../../public/world-map-data-NOTICE.txt)。

## 中国地图

- 导入路径：`@idux/geo-areas/geojson/china.json`（`CN-provinces.json` 的别名）。
- 包含 34 个省级地区，使用 `北京市`、`广东省` 等完整中文名称，示例数据与之对应。
- 来源：ECharts 3.8.5 中国地图，由 `@idux/geo-areas` 解码为标准 GeoJSON。
- [随站点分发的 BSD 3-Clause 许可证](../../../../public/china-map-data-LICENSE.txt)。

下钻示例通过 `loadGeoJSON(adcode)` 按需加载区域边界，并从上级地图提取区县轮廓；这些边界的来源、覆盖范围和使用条款见 [geo-areas 官网](https://iduxfe.github.io/geo-areas/)。

数据版本、上游来源、转换和覆盖范围由 [@idux/geo-areas](https://github.com/IDuxFE/geo-areas) 维护，其包内包含来源清单和第三方许可证。`public/` 下的副本用于在构建后的站点中保留地图署名信息。
