# 子弹图软件设计

[整体架构](architecture.md) · [组件 API](../../packages/site/src/components/bullet/API.md)

## 职责与绘制选择

子弹图表达实际值、目标值与业务范围。实际值采用 ECharts 原生 bar，复用标签、富文本、样式、状态、标记和动画；轨道、范围引导、目标线和缺失提示由专属图形补充。全部自绘会重复承担原生能力，全部使用 bar 又难以表达这些装饰，因此职责按语义分开。

## 模型与模块边界

| 模块                                                                           | 负责的知识                                      |
| ------------------------------------------------------------------------------ | ----------------------------------------------- |
| [resolveBulletModel.ts](../../packages/plots/bullet/src/resolveBulletModel.ts) | 单图／分组、量程、范围校验、缺失归一化及配色    |
| [createBulletOption.ts](../../packages/plots/bullet/src/createBulletOption.ts) | 模型到原生轴、系列、缩略轴、Tooltip 的组合      |
| [renderBullet.ts](../../packages/plots/bullet/src/renderBullet.ts)             | 轨道、目标及范围图元与最终坐标轴的对齐          |
| [bulletBar.ts](../../packages/plots/bullet/src/bulletBar.ts)                   | 原生实际值系列、数据项及默认样式生成            |
| [bulletLayout.ts](../../packages/plots/bullet/src/bulletLayout.ts)             | 原生布局后的条厚、上方布局偏移与零值长度        |
| [bulletLabel.ts](../../packages/plots/bullet/src/bulletLabel.ts)               | 原生标签默认值及无实际条时的缺失标签锚点        |
| [bulletVisual.ts](../../packages/plots/bullet/src/bulletVisual.ts)             | 按原始行索引同步实际条与装饰系列的 Tooltip 色标 |
| [bulletDecal.ts](../../packages/plots/bullet/src/bulletDecal.ts)               | 原生 decal 生成与仅在 emphasis 中使用的悬停纹理 |
| [bulletHover.ts](../../packages/plots/bullet/src/bulletHover.ts)               | 悬停反馈与原生实际值的协调                      |
| [legacyRangeLabels.ts](../../packages/plots/bullet/src/legacyRangeLabels.ts)   | 旧版 ECharts 的范围刻度标签适配                 |
| [Bullet.ts](../../packages/plots/bullet/src/Bullet.ts)                         | 主题、loading、实例及公共交互接入               |

模型先统一缺失、颜色和量程，渲染与 Tooltip 消费同一份结果，避免各自判断出不同业务状态。纯业务解析与依赖最终像素坐标的图元计算分开，调用方不需要维护额外目标坐标。

布局扩展在原生 bar 布局后只调整条厚与上方标签偏移，数值长度、标签排版及状态仍由原生处理，并将真实 0 的长度保持为 0。自绘装饰使用相同条厚规则。实际条置于系列首位，使 dataZoom 预览实际值；各系列独立过滤后，颜色同步按 rawIndex 匹配，不能按过滤后的索引连接。

纹理由 ECharts decal 阶段生成后附加到原生 emphasis，而不是再绘制一条可命中的 bar。显式 decal 和 emphasis.disabled 保持优先。布局、视觉和纹理扩展由组件入口注册并限定目标系列，直接生成 option 时同样需要注册这些扩展。

悬停轨道或目标时的高亮联动由 Vue 组件在 ready 中绑定，通过原生 action 协调对应行的系列；它不属于 option 生成函数的能力，直接 option 消费者需自行安排这种交互。

## 数据与量程约束

`data !== undefined` 表示分组，`data: []` 仍保持分组语义。0 有效；null、缺省或非有限测量表示缺失。分组缺失保留底条及有效目标，单图仅有目标时保留目标与轨道，不能用 0 代替缺失。

实际条从 0 开始，0 不在量程时从最接近 0 的端点开始。最终轴范围和 inverse 同时影响原生实际条与装饰几何；越界在绘制时裁切，Tooltip 保留原值。自动量程与显式数值轴边界在模型中统一，ranges 的上界严格递增并受量程约束。

非法量程或范围生成带字段的诊断并清空生成系列；没有显式替代 series 时也不单独提交残缺的轴／缩放配置，避免原生坐标系初始化失败。正常缺失不是配置错误。调用方显式原生 series 仍可整体替换生成内容。

## 布局与状态

horizontal-above 只改变分类、数值与轨道的排版，量程中的目标线位置不变。零值和缺失不显示该布局的数值标签；全零提示使用显式 zeroText，业务空状态交给插槽。普通分组全零与上方标签布局的保留图元不同，不应合并成一条规则。

稀疏分类的默认条厚与显式原生条宽配置分开处理。分组范围刻度默认与阈值对齐，显式 interval / splitNumber 或非数值轴边界则交还原生刻度。ECharts 6 使用 axisLabel.customValues，旧版把标签画在范围引导中；空间不足时隐藏冲突文本，优先保留量程两端，不为文字移动阈值本身。

组件启用公共数据合并并恢复符合条件的缩略轴／图例状态，loading 和插槽变化不应重建几何闭包。实际值仍由原生 bar 管理，新增样式优先复用原生字段，避免为同一标签或状态再加一套快捷 API。

## 风险与验证

新增量程或布局能力时，同时检查实际条、轨道、目标、阈值、缺失背景和 Tooltip；替换轴类型、多坐标系不属于默认布局的自然扩展。升级 ECharts 时重点检查原生宽度、标签偏移及旧版范围刻度适配。

[模型与选项](../../packages/plots/__tests__/bullet.spec.ts)、[边界](../../packages/plots/__tests__/bullet-edge-cases.spec.ts)、[生命周期](../../packages/plots/__tests__/bullet-lifecycle.spec.ts)、[标签兼容](../../packages/plots/__tests__/bullet-label-compat.spec.ts)及[兼容回归](../../packages/plots/__tests__/bullet-compatibility.spec.ts)保护长期契约；实际示例需检查缩放、阈值控件、长名称和主题。
