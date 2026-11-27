# 地图软件设计

[整体架构](architecture.md) · [组件 API](../../packages/site/src/components/map/API.md)

## 原生组合与资产边界

地图采用原生 geo 与 scatter、effectScatter、lines 等系列组合。[Map.ts](../../packages/plots/map/src/Map.ts)接入公共渲染，[createMapOption.ts](../../packages/plots/map/src/createMapOption.ts)只提供底图和原生 option 的视觉默认值，不把地图压成互斥的单一 mode。

GeoJSON 的获取、授权、坐标系与注册由应用管理，不进入组件包。区域、站点与路线可以独立组合，同一区域允许多个站点；业务的风险等级、聚合口径和状态颜色不由组件按站点顺序猜测。

## 模块职责

| 模块                                                                  | 隐藏的复杂性                             |
| --------------------------------------------------------------------- | ---------------------------------------- |
| [createMapOption.ts](../../packages/plots/map/src/createMapOption.ts) | geo 默认样式与 ECharts 版本布局差异      |
| [mapHelpers.ts](../../packages/plots/map/src/mapHelpers.ts)           | 节点、路线、区域、分段图例的原生配置生成 |
| [mapValidation.ts](../../packages/plots/map/src/mapValidation.ts)     | 坐标、重复身份、路线引用与诊断位置       |
| [mapDefaults.ts](../../packages/plots/map/src/mapDefaults.ts)         | 默认分段与样式约定                       |
| [mapStyle.ts](../../packages/plots/map/src/mapStyle.ts)               | 图钉、悬停及颜色辅助                     |
| [mapTransition.ts](../../packages/plots/map/src/mapTransition.ts)     | 可选视角过渡、画布淡化、取消与资源清理   |
| [types.ts](../../packages/plots/map/src/types.ts)                     | 领域输入与原生配置的公开边界             |

helpers 返回标准 ECharts 配置，可与其他原生系列组合，不要求把整个应用绑定到 Map 组件。调用方提供本次完整输入，数据与主题更新时重新生成；helper 不维护全局站点注册表。

## 数据与布局约束

路线可以直接提供坐标或引用显式传入的节点集合，不能依赖 series 声明顺序解析 source / target。校验返回带类型、索引、身份和原因的记录，供业务诊断；它不代替地图注册、坐标转换和 GeoJSON 内容校验。

validateMapData 只返回诊断，不记录日志、不改变渲染策略。生成器则有明确的处理边界：createMapNodes 跳过无效坐标，createMapLines 跳过无法解析坐标的路线，两者建立节点索引时遇到重复节点 id 会抛错，避免引用含糊。过滤后系列索引不等于输入索引，定位原始记录使用校验结果及业务 id。有效性只要求二维有限数，不擅自限定经纬度范围或进行投影转换。

区域统计使用分段映射与匹配键，站点位置使用坐标。缺失与 0 的业务含义由应用表达；组件不把区域填色等同于点密度计算。底图、节点和路线必须使用一致的坐标系。

ECharts 6 的底图布局使用边界与 preserveAspect，旧版本使用 layoutCenter / layoutSize；差异集中在生成器中。缩放、平移与选项刷新通过公共实例及 geo 交互恢复处理，显式 geo 配置仍可接管视口。

## 扩展与验证

新地图效果优先新增可组合的 helper 或直接原生 series；只有多个效果确实共享领域知识时才扩充公共模型。不能把示例附带的中国／世界资产和本地化名称硬编码成组件运行时依赖。

`createMapTransition` 将原生视角缩放、画布淡入淡出和取消清理封装为可选控制器。应用先准备并注册边界，再用 `run('drilldown' | 'back', update)` 提交新配置；helper 不识别行政树或发起请求。新调用取消旧过渡，卸载时 `dispose()` 清理监听、定时器和遮罩；已提交的业务状态不回滚。过渡结束恢复调用方的动画设置，系统减少动态效果时直接更新。组件默认行为和原生 option 接口不增加下钻状态。

[helper 测试](../../packages/plots/__tests__/map-helpers.spec.ts)、[数据校验](../../packages/plots/__tests__/map-validation.spec.ts)、[组件测试](../../packages/plots/__tests__/map-component.spec.ts)及[兼容测试](../../packages/plots/__tests__/map-compatibility.spec.ts)保护引用、样式、视口和版本边界。几何注册、缩放拖动和路线动画需要实际浏览器验证。
