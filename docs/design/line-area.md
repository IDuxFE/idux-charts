# 折线与面积图软件设计

[整体架构](architecture.md) · [折线 API](../../packages/site/src/components/line/API.md) · [面积 API](../../packages/site/src/components/area/API.md)

## 共享实现与模式边界

面积图由折线的 area / areaStyle 能力实现，`IxAreaChart` 是默认开启填充的轻量入口，内部直接渲染 `IxLineChart`，共用其实现。[Line.ts](../../packages/plots/line/src/Line.ts)协调历史原生路径与分类路径，分类模式由 `categories !== undefined` 选择。没有 categories 时保留[useLineOption](../../packages/plots/line/src/useLineOption.ts)的原生配置兼容。

分类轴的采样槽等距排列。实际时间间隔不均且需要表达其距离时，调用方使用原生时间轴；组件不会根据业务时间自动重新解释 categories。

## 模块职责与数据流

| 模块                                                                                       | 负责的决策                                       |
| ------------------------------------------------------------------------------------------ | ------------------------------------------------ |
| [useCategoryLineOption.ts](../../packages/plots/line/src/useCategoryLineOption.ts)         | 输入、容器、主题、图例／缩放恢复和更新协调       |
| [createCategoryLineOption.ts](../../packages/plots/line/src/createCategoryLineOption.ts)   | 多系列、缺报形态、面积、参考线及原生 option 组合 |
| [categoryLineData.ts](../../packages/plots/line/src/categoryLineData.ts)                   | 测量值归一化、原始索引、缺报背景与 Tooltip       |
| [categoryLineInterpolation.ts](../../packages/plots/line/src/categoryLineInterpolation.ts) | 绘图插值坐标与对外原始数据的分离                 |
| [categoryLineGapClipping.ts](../../packages/plots/line/src/categoryLineGapClipping.ts)     | 根据最终缺报背景裁剪各条线的缺口                 |
| [echartsLineGeometry.ts](../../packages/plots/line/src/echartsLineGeometry.ts)             | 原生线／面积路径识别及堆叠基线适配               |
| [useLineChartAreaStripe.ts](../../packages/plots/line/src/useLineChartAreaStripe.ts)       | 普通与堆叠面积的纹理填充                         |

数据先按分类槽归一化，再决定孤立缺点或连续缺报区间的表达，最后生成原生 line 和专属标记。孤立缺点的候选坐标取左右有效测量的均值；符合堆叠／平滑等条件时用原生内联 symbol，并在 processor 中提供绘图坐标，先于堆叠与缩放范围计算，再通过 getDataParams 恢复原始采样。其余适用情形使用静默 markPoint，调用方显式 markPoint 保持优先；不能把估计坐标当成业务实测值暴露给 Tooltip。

## 缺报与几何约束

`0` 与缺失分开处理，缺报不能删除分类槽或压缩数组。孤立缺点可使用插值标记，连续或边缘缺报通过背景区间表达；connectNulls 和堆叠配置会影响具体策略。各系列缺报位置不一致时，不能用一层全局遮罩擦掉其他系列的有效数据。

裁剪依据已渲染的缺报背景边界，随缩略轴变化更新；保留 ECharts 父组原生动画与 grid clip。退出缺报状态时移除本扩展增加的裁剪，不删除不属于自己的原生 clip。

面积填充继续由原生 line 承载。单面积的条纹渐变在 post-update 和动画 finished 后按实际多边形边界校准；堆叠面积使用纵向重复纹理，避免每个堆叠带出现不一致的渐变。纹理处理与原生路径几何适配分开：前者拥有视觉资源，后者拥有对 ECharts 结构的知识。

几何适配先检查路径类型、点数组和所需方法，无法识别时保留原生绘制，不强行改写未知结构。堆叠缺报需要同步屏蔽缺失顶点的基线，退出对应状态时恢复原始 buildPath；这些内部结构不作为调用方 API。

## 更新、风险与扩展

普通数据刷新保留符合恢复条件的图例／缩放状态；显式相关配置变化接管状态。空、全零、缺失、loading 和插槽是不同状态，不能通过共用一条“无数据”分支抹平。

原生 processor 时序和线／面积路径结构是主要升级风险。新增插值或缺报样式时，同时核对多系列混合缺报、connectNulls、堆叠和缩放。

## 验证入口

[分类折线](../../packages/plots/__tests__/category-line.spec.ts)、[插值](../../packages/plots/__tests__/category-line-interpolation.spec.ts)、[缺报裁剪](../../packages/plots/__tests__/category-line-gap-clipping.spec.ts)、[原生几何](../../packages/plots/__tests__/echarts-line-geometry.spec.ts)及[面积纹理](../../packages/plots/__tests__/area-stripe-render.spec.ts)分别保护数据、适配和渲染。路径结构或纹理变化需要结合实际演示的浏览器回归。
