# 水波图软件设计

[整体架构](architecture.md) · [组件 API](../../packages/site/src/components/liquid-fill/API.md)

## 职责与实现选择

[LiquidFill.ts](../../packages/plots/liquid-fill/src/LiquidFill.ts)通过公共渲染层消费[createLiquidFillOption.ts](../../packages/plots/liquid-fill/src/createLiquidFillOption.ts)。无坐标系的 custom 系列统一绘制容器、裁剪区、前后波形、主读数、单位和说明，不依赖独立水波扩展包。

组件负责单值的水位表达，业务负责单位、说明和空状态。它不计算多个对象的容量汇总，也不从标签文字推断水位。

## 水位与动画约束

水位复用[valueRatio](../../packages/plots/shared/value.ts)的有限值、量程及截断规则，显示文字保留原值。无效值不生成系列；归一化水位为 0（原值不大于 min）时使用零态颜色且没有波形，为 1（原值不小于 max）时直接填充内圆。原始值 0 是否为空水位取决于量程，不能直接用 value === 0 判断。

renderItem 根据实际宽高和说明文字留位计算半径。波形在内圆中裁剪，振幅在 0 和满值附近收敛；前后波形有独立的相位和周期。动画改变多边形的相位而非平移整块填充，保持水平渐变锚定在圆内。

波形组使用 `$mergeChildren: false`，因此水位归零时可以清除旧波形及其动画，不能依赖按索引合并自动删除子元素。waveAnimation 控制持续波动，原生 animation 控制总动画开关，生成器还默认将入场／更新时长置零；循环波形不依靠入场时长驱动。

## 样式、扩展与验证

容器填色、图表背景、数值和单位文字分别有自己的职责；历史 backgroundColor 作为容器颜色别名保留，图表背景使用 chartBackgroundColor。富文本的 value / unit 与普通说明文字需分别转换样式，不能假定系列 textStyle 能覆盖全部自绘图元。

新容器形态应同时改变边界、裁剪和半径策略；新动画应保持端点、水位和渐变语义。生成系列是 silent，需要交互能力时必须明确新增命中契约。

[特殊图表测试](../../packages/plots/__tests__/special-plots.spec.ts)、[选项测试](../../packages/plots/__tests__/options.spec.ts)和[归一化测试](../../packages/plots/__tests__/value.spec.ts)保护零／满／缺失、波形与主题。动画和裁剪变化需要浏览器视觉检查，尤其是动态归零及 resize。
