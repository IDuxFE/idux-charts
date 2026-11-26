# 雷达图软件设计

[整体架构](architecture.md) · [组件 API](../../packages/site/src/components/radar/API.md)

## 职责与取舍

[Radar.ts](../../packages/plots/radar/src/Radar.ts)通过公共渲染层消费[createRadarOption.ts](../../packages/plots/radar/src/createRadarOption.ts)。生成器组合原生 radar 坐标系、radar 系列、图例和 Tooltip，封装默认网格与视觉，不自绘轮廓，也不把各维度归一化为业务综合分。

## 维度与坐标系

indicator 和数据向量按索引对应。clockwise 通过保留首维、反转后续维度实现，同时变换指标与生成系列的数值，避免名称与数值错位；转换不修改原数组。显式传入原生 series 时不替调用方重排数值。

第一个 radar 坐标系承接默认值，显式 radar.indicator（数组时为首项）优先于简化 indicator；额外坐标系保留调用方配置。原生 series 通过 radarId / radarIndex 关联实际坐标系，Tooltip 也从同一坐标系读取维度名称。没有有效 indicator 的系列被排除，不能在没有维度时绘制无意义轮廓。

## 维护与验证

维度量程由业务提供，组件不自动改变不同对象的评分口径。扩展排序或坐标系能力时，必须同时维护指标、数据和 Tooltip 的对应关系。显式原生 series 使用整体替换语义，不能混入一份自动生成的数据系列。

[雷达图测试](../../packages/plots/__tests__/radar.spec.ts)保护维度重排、原始数据、坐标系关联和样式覆盖；[组件测试](../../packages/plots/__tests__/components.spec.ts)及打包消费检查保护公共生命周期和入口。
