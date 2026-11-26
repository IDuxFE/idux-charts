# 整体软件架构

## 目标与分层

组件库在 ECharts 之上提供 Vue 生命周期、视觉默认值和少量业务布局。设计优先保留原生标签、样式、状态和事件；当原生系列不能直接表达目标形态时，才增加布局适配或 custom 绘制。

| 层                                         | 职责                                                       | 边界                                             |
| ------------------------------------------ | ---------------------------------------------------------- | ------------------------------------------------ |
| [core](../../packages/core/index.ts)       | IxChart、实例生命周期、容器、事件、主题、loading、通用工具 | 不解释具体图表的业务数据                         |
| [plots](../../packages/plots/index.ts)     | 各图表的数据模型、默认配置、布局和必要的原生适配           | 通过 core 使用实例；组件差异保留在所属目录       |
| [charts](../../packages/charts/index.ts)   | 汇总导出、按需入口及样式入口                               | 复用 core / plots 的同一组件与 token，不复制实现 |
| [site](../../packages/site/src/components) | API、示例和演示页面                                        | 不作为组件运行时依赖                             |

典型数据流是“Vue 输入 → 图表选项生成／布局协调 → IxChart → useChart → ECharts”。原生事件反向交给调用方；需要恢复的交互状态由对应层在更新或重建前读取。并非所有组件都强制走同一个生成器：历史原生路径、分类布局和自绘图表承担不同约束。

## 配置与扩展边界

[splitChartOptions](../../packages/core/utils/chartOptions.ts)区分原生 option、Vue 控制项、事件和 DOM 属性。`loading`、`theme`、`initOption`、`autoResize`、`setOptionOpts` 等不能泄漏成系列配置；`chartBackgroundColor` 映射为实例背景，避免与部分图表历史上的背景字段混淆。

[plotOptions.ts](../../packages/plots/shared/plotOptions.ts)集中处理公共合并和更新：对象逐层合并，调用方提供的数组整体替换并复制，避免按索引混入旧条目。使用 `mergeNativePlotOptions` 的生成器将显式原生 `series` 视为生成系列的整体替换。Bar / Line 的分类路径则将输入系列作为业务布局输入，不能把这一规则机械推广为所有入口完全相同。

图表只新增原生语义无法表达的字段；标签、Tooltip、强调态等优先使用 ECharts 配置。领域数据模型各自保持类型：词云权重、地图路线和有轴图表的缺报槽不能合并成一个通用弱类型 data。

公共类型允许原生扩展透传；`KnownProps` 和 `*ChartPublicProps` 改善已知字段提示与 Vue 适配，并非运行时 schema，也不保证所有不支持字段都能在编译期拦截。支持边界需同时在 API 中表达。

## 主题与视觉

- `theme` / `CHART_THEME_TOKEN` 选择 ECharts 实例主题。修改主题或初始化参数会重建实例，由 core 协调交互恢复。
- `plotTheme` / `PLOT_THEME_TOKEN` 为图表生成的颜色、文字、边框、缺报背景等提供默认值；本地定义的字段覆盖注入值，未定义字段继续继承。
- `darkMode` 属于原生 option，也参与部分专属绘制的明暗默认值解析；它与更换实例主题的生命周期不同。
- Bar、Line、Pie 仍有历史组件 token。新增图表不为了形式一致重复引入每图 token，迁移已有 token 需要单独考虑兼容性。

实现入口是[plotTheme.ts](../../packages/plots/shared/plotTheme.ts)。显式原生样式的优先级由所属组件定义，不能假定一处主题覆盖就会改写所有业务样式。

## 更新、布局与交互

[usePlotRender](../../packages/plots/shared/usePlotRender.ts)协调常用图表的输入解析、生成结果、更新策略与公共渲染。它比较布局输入快照，避免只改 loading 或事件就重建 formatter、renderItem 和动画闭包。Bar / Line / Pie 的多模式入口使用同一公共渲染基础，同时保留专属布局协调。

`createPlotUpdater` 把生成结果当作完整快照：默认重建 option，允许合并的图表在删除配置时仍需清掉旧值。Bullet 与 WordCloud 启用数据合并；只有 WordCloud 额外启用身份变化重置，以清除原生选择索引缓存。不能全局启用同一策略，否则会影响其他图表的过渡和交互。

[usePlotLayout.ts](../../packages/plots/shared/usePlotLayout.ts)拥有容器测量与交互快照规则。调用方没有改变相关配置时才恢复图例或缩放；显式配置变化必须能接管状态。core 处理实例重建时的通用恢复，词云等组件处理其领域选择身份，不能假定 core 恢复任意系列的全部内部状态。

分类缩略轴由 [categoryZoomUpdate](../../packages/plots/shared/categoryZoom.ts)区分刷新、尾部追加与重排。在方向、轴身份和调用方缩放配置不变时，同分类刷新保留窗口；仅尾部追加时，全展开继续全展开，贴着旧尾部的局部窗口跟随新尾部，历史窗口保留原索引。删除、重排或显式配置变化不沿用这套追加规则。core 的主题重建恢复另有轴身份检查，不能与分类追加策略混为一谈。

分类图表复用[笛卡尔边界](../../packages/plots/shared/cartesian.ts)、[图例](../../packages/plots/shared/categoryLegend.ts)、[缩略轴](../../packages/plots/shared/categoryZoom.ts)、[分类标签](../../packages/plots/shared/categoryLabel.ts)和[参考线](../../packages/plots/shared/referenceLine.ts)。ECharts 5 / 6 的布局差异集中适配，避免散落到每个示例。

[plotTooltip.ts](../../packages/plots/shared/plotTooltip.ts)将各图表的数据行／缺失原因提取与公共 HTML 排版分开，再复用 core 的 useTooltipsFormatter；默认标题、数值和备注做转义。调用方提供完整 tooltip.formatter 后自行负责输出内容，组件不再替其生成布局。图例滚轮处理由 [useLegendWheel](../../packages/plots/shared/useLegendWheel.ts)限定在可滚动区域，不能抢占页面滚动或覆盖层中的交互。

## 数据状态与资源所有权

原始业务数据保持调用方所有；生成器和合并工具不能就地改写其对象或顺序。`0` 是有效测量值，缺失与全零分别处理；业务空状态、权限和加载失败由默认插槽表达。loading 使用独立覆盖层，更新 loading 不应销毁图表实例。

core 拥有 ECharts 实例和公共观察器；组件或适配模块拥有自己增加的字体监听、动画和事件。每个资源必须沿所属 Vue 卸载或 ECharts view 的 remove / dispose 路径释放。实例重建还会再次触发 ready，因此绑定逻辑必须面向新实例工作。

## 入口与兼容性

[createInstall](../../packages/core/utils/index.ts)将 ECharts 能力注册纳入导出值依赖，并附加 Vue 安装入口。直接生成 option 的消费者仍需注册所用图表能力，尤其是带专属布局扩展的词云。不要把生成函数都描述为可在未注册环境独立运行。

[chartEntries.ts](../../build/chartEntries.ts)让 ESM 汇总入口和子入口共享构建图，维持混合导入时的组件、主题 token 身份。新增组件需同步入口、package exports / typesVersions、类型声明和构建清单。

运行时通过 `vue-demi` 适配 Vue 2 / 3；[withChartProps](../../packages/core/utils/withChartProps.ts)保留配置透传的公开类型及组件推导契约。默认声明和 Vue 2.6 的公开 props 适配方式不同，验证应消费真实打包产物，不能只检查仓库源码。

## 验证与演进

纯函数测试保护数据语义、合并、几何和边界；组件测试保护响应式输入、插槽、事件及清理；[e2e](../../e2e)保护实际演示的视觉与交互；[声明及消费检查](../../scripts/test-declarations.mjs)保护产物入口和 Vue / ECharts 兼容。

修改 ECharts view、processor、布局阶段或图元结构依赖时，要运行涉及的原生集成、生命周期和兼容矩阵。包入口变更需要额外验证混合导入身份。视觉和性能结论需要相应浏览器检查与测量，覆盖率不能替代这些证据。

只在多个真实组件需要同一知识时提取 shared。新需求若引入大数据异步布局、严格 schema 或跨图表统一数据模型，应重新评估取消、状态恢复和兼容成本，而不是把复杂性变成一批调用方必须理解的配置。
