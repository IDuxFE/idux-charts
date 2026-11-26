# 柱状图软件设计

[整体架构](architecture.md) · [组件 API](../../packages/site/src/components/bar/API.md)

## 原生与分类模式

[Bar.ts](../../packages/plots/bar/src/Bar.ts)以 `categories !== undefined` 选择分类布局，其余输入保留历史[useBarOption](../../packages/plots/bar/src/useBarOption.ts)路径。判断依据是输入契约，空 categories 仍表示分类模式；不能因为数据暂时为空就切换渲染模型。

两条路径分别承担历史原生配置兼容和业务默认布局。强制统一会让已有坐标系、注入默认值与数据更新受到影响，因此入口只协调模式、尺寸、交互和渲染，不把所有判断塞进同一个选项生成函数。

## 模块职责

| 模块                                                                                  | 隐藏的复杂性                                                  |
| ------------------------------------------------------------------------------------- | ------------------------------------------------------------- |
| [createCategoryBarOption.ts](../../packages/plots/bar/src/createCategoryBarOption.ts) | 分类数据、方向、分组／堆叠、坐标、图例、缺失与 Tooltip 的组合 |
| [categoryBarWidth.ts](../../packages/plots/bar/src/categoryBarWidth.ts)               | 可见分类、系列分组与条宽、轴悬停带宽及上方标签留位的换算      |
| [barLabel.ts](../../packages/plots/bar/src/barLabel.ts)                               | 普通值标签、堆叠总数与图例状态的协调                          |
| [barShadow.ts](../../packages/plots/bar/src/barShadow.ts)                             | 原生柱条阴影的颜色与随最终条宽／长度变化的模糊半径            |
| [shared](../../packages/plots/shared)                                                 | 分类标签、图例、缩略轴、参考线与笛卡尔边界                    |

分类路径按 categories 的索引匹配数值；多系列配置在此路径参与生成原生 bar，而非绕过整个布局。组件拥有默认轴与布局，原生配置用于覆盖支持范围内的细节。完整接管坐标和系列时应明确评估模式，不能沿用普通生成器的 series 替换假设。

## 几何与数据约束

竖向、横向和 horizontal-above 共用分类模型，条宽与轴悬停带宽需随缩放窗口、图例和容器变化同步。默认宽度计算与显式原生 barWidth 等配置分开处理；依赖最终原生布局的宽度在 ready、缩放、图例和 rendered 后同步，避免仅用初始容器尺寸推断。悬停带使用 Tooltip 的 axisPointer 并置于数据后方，柱条阴影则在视觉阶段根据最终 fill 与几何解析，二者不是同一层图元。

数值 0 保持有效，缺失数据保留分类槽并生成缺失背景及原因提示。全零提示只由显式 zeroText 提供，业务空状态交给默认插槽。horizontal-above 的零值标签隐藏规则属于该布局，不应扩散为全部柱图默认行为。

默认标签按柱列数量控制密度：单柱列展示数值，多个并排柱列隐藏标签；单柱列堆叠时只在最后一个可见有效段显示同 stack 的总数，随图例重新计算。显式 label 覆盖这些默认值。长分类名称的省略与完整悬停文本由公共分类标签模块负责，避免另建一份 DOM tooltip。

## 更新与扩展

分类布局在相关配置未改变时恢复图例与缩略轴状态；模式切换重置所属布局上下文。新增布局需要同时检查方向、类别轴、宽度、缺失背景、标签和 Tooltip，不能只改变 series 的方向。

条宽等柱图知识保留在 Bar；barShadow 还被 Bullet 入口复用，依靠内部 auto 标记识别需要适配的阴影，显式业务阴影配置继续生效。ECharts 升级时重点核对 bar 带宽、视觉阶段、边界布局及阴影裁切。

## 验证入口

[分类柱图](../../packages/plots/__tests__/category-bar.spec.ts)、[标签](../../packages/plots/__tests__/bar-label.spec.ts)、[阴影边界](../../packages/plots/__tests__/bar-shadow-boundaries.spec.ts)和[分类几何](../../packages/plots/__tests__/category-geometry.spec.ts)保护核心规则；实际示例的浏览器检查覆盖标签、缩放、图例、主题和缺失状态。尺寸或文字布局变化需检查真实容器下的视觉结果。
