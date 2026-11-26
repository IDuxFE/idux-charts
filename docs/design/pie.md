# 饼图软件设计

[整体架构](architecture.md) · [组件 API](../../packages/site/src/components/pie/API.md)

## 两种布局契约

[Pie.ts](../../packages/plots/pie/src/Pie.ts)保留[usePieOption](../../packages/plots/pie/src/usePieOption.ts)的历史原生路径，另由[useDefaultPieOption](../../packages/plots/pie/src/useDefaultPieOption.ts)选择自动布局。自动布局拥有饼图、标题和图例的空间分配，不只是给原生 option 增加几项默认值。

`layoutMode: 'native'` 使用原生路径；auto 模式在没有 center、series、dataset、graphic 或数组 title / legend 等显式接管条件时生成自动布局。未指定 layoutMode 时，align 是启用新布局的入口，同时仍检查调用方是否显式定位 title / legend。保留这套选择规则是为了不改变旧调用的几何与主题行为。

## 模块职责

| 模块                                                                                | 隐藏的复杂性                                         |
| ----------------------------------------------------------------------------------- | ---------------------------------------------------- |
| [useDefaultPieOption.ts](../../packages/plots/pie/src/useDefaultPieOption.ts)       | 模式选择、容器与 CSS token、分页状态、图例／选择恢复 |
| [createDefaultPieOption.ts](../../packages/plots/pie/src/createDefaultPieOption.ts) | 文字测量、饼半径、标题、图例列宽／行高及翻页图形     |
| [Pie.ts](../../packages/plots/pie/src/Pie.ts)                                       | 原生／自动结果的渲染、业务系列定位与 loading 形态    |
| [公共布局模块](../../packages/plots/shared/usePlotLayout.ts)                        | 尺寸观察与交互快照                                   |

自动布局通过容器与字体测量给图形、标题及多列图例分配空间。原生 label、roseType、radius 和图例 formatter 仍参与布局；只有调用方接管几何时才切换模式，不能把所有样式覆盖都当成退出自动布局的信号。

## 数据与状态约束

输入顺序保留给业务，组件不默认排序。自动布局把非法、负值和缺失数值归一化为缺报；为保留分类位置，提交原生饼系列时使用零占位，但图例与 Tooltip 仍区分缺报和有效 0。全零占位仅在非空且全部为有效 0 时启用，全缺报不能误判为全零。

历史原生路径在未指定 title.text 时按系列数据计算默认总数；自动布局不自动求合计，标题内容由调用方提供。label.position 为 center 时，自动布局另用 graphic 放置中心文字，formatter 上下文以首项为准，不能把它当成自动汇总值。

自动布局在真实数据系列之前生成背景和零态装饰，因此需要通过稳定 id `ix-pie-data` 定位业务系列，不能假定 series[0] 永远是真实数据。seriesStyle 只把公开的样式、标签线和状态字段应用到真实数据系列，避免让装饰系列参与业务命中或选择。

图例列宽需要计入格式化文字、数值列、缺报文本和图标；不能用字符串长度代替最终渲染宽度。主题与容器变化必须同步更新图例和饼图几何，避免只缩放饼图导致文本覆盖。

刷新时恢复条件未变的图例选择与数据选中态；名称序列变化（包括重排）时重置图例翻页起点。调用方显式选中配置变化优先，不能用旧快照覆盖。

## 扩展与验证

新增布局优先在纯生成器中完成几何，Vue 层只提供测量、状态和回调。支持新的原生几何接管字段时，要同步模式选择规则，防止组件与调用方同时安排同一空间。

[默认饼图测试](../../packages/plots/__tests__/default-pie.spec.ts)保护文本、图例、零态与布局；[兼容测试](../../packages/plots/__tests__/pie-compatibility.spec.ts)保护原生与自动路径。视觉检查需覆盖窄容器、长名称、多列／分页、实心／环形／玫瑰图及明暗主题。
