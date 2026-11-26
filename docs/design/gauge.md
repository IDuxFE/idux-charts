# 仪表盘软件设计

[整体架构](architecture.md) · [组件 API](../../packages/site/src/components/gauge/API.md)

## 职责与实现选择

[Gauge.ts](../../packages/plots/gauge/src/Gauge.ts)使用公共渲染层，[createGaugeOption.ts](../../packages/plots/gauge/src/createGaugeOption.ts)生成无坐标系的 custom 系列。当前仪表盘由轨道、渐变分段、刻度、指示形状和中心文字组成；在同一个 renderItem 中计算全部图元，能让它们在 resize 后继续共享视口与几何。

这是对目标视觉的集中封装，不能因为属性类型允许原生 gauge 配置透传，就声称生成结果等同于 ECharts 原生 gauge。需要完整原生系列时由 series 替换生成内容。

## 数值与几何约束

[valueRatio](../../packages/plots/shared/value.ts)校验有限值和有效量程，把有效数值映射并限制到 [0, 1]，原始 value 仍用于读数。空值和无效量程不生成图形；0 是有效值。有限端点相减仍可能溢出，归一化在公共函数中处理，不能在每个 renderItem 重新直接相除。

segments 使用归一化上界，必须严格递增，非空时最后一项为 1。当前比例命中的分段提供颜色与默认标签，显式 label 优先于分段标签；文本 formatter 只改变显示文字，不改变指示位置。无效分段清空生成系列，不拼出部分有效的仪表盘。

有分段时完整量程绘制各区间颜色，指示形状表达当前比例；无分段时渐变填充到当前比例。轨道色使用 trackColor，历史 backgroundColor 作为别名保留，chartBackgroundColor 才控制实例背景。

半径、弧度与阴影根据最终视口和 size 计算，主文字字号单独控制。自绘文字通过 graphicTextStyle 转换到图元 fill 等字段；显式文字参数覆盖默认值。更新时使用 `$mergeChildren: false`，避免分段数量减少后保留旧图元。

## 扩展与验证

生成系列为 silent，默认关闭动画，点击和状态能力不能按原生 gauge 推断。新增指示形态需继续在同一视口计算，新增业务阈值保持归一化语义，不引入第二套数值量程。

[仪表盘测试](../../packages/plots/__tests__/gauge.spec.ts)、[归一化测试](../../packages/plots/__tests__/value.spec.ts)和[特殊图表测试](../../packages/plots/__tests__/special-plots.spec.ts)保护量程、极值、分段与样式；尺寸或图元变化需检查真实示例的读数、弧线和边缘裁切。
