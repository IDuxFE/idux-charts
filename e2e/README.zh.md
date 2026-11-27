# 端到端测试

[English](README.md) | 简体中文

本地完整套件会在 Chromium、Firefox 和 WebKit 中分别运行所有用例。CI 将完整用例目录随机分成数量均衡的三组，每个浏览器执行一组，因此每次 CI 中每个用例只运行一次。新工作流运行会改变分配；重跑同一次工作流沿用原随机种子，便于复现。

Chromium 任务还会固定执行中文上方标签的视觉回归，使用独立输出目录，保留随机分组的结果及执行回执。

单次 CI 不代表每个用例都通过了全部三个浏览器。请保留已评审的 macOS 截图基线及现有像素容差。Vue 2、Vue 3 Playground 分别测试打包后的包，兼容性任务也保留全部五种 Vue/ECharts 组合。

`visual.spec.ts-snapshots` 使用文档站实际 Demo，为 Bar、Line、Area、Pie、Radar、Gauge、LiquidFill、Map、Bullet 和 WordCloud 建立亮暗主题的三浏览器视觉基线。Gauge 覆盖基础、状态和分段示例，Map 覆盖状态、密度和路线，Bullet 覆盖单值、分段、分组和上方标签。测试夹具直接导入实际 Demo 组件与站点主题配置，保留 Demo 配置及组件自身的尺寸规则，使用固定 974px 桌面容器，仅在夹具中通过公开主题接口提供固定的 OFL 中文字体，避免宿主字体度量差异；组件默认字体行为不变。将动画推进到结束状态后截图；原有 Bar/Pie 历史基线单独保留。使用 `pnpm exec playwright test e2e/visual.spec.ts --grep "demo visual baseline" --update-snapshots=missing` 只生成缺失基线，检查图片后去掉更新参数复跑。

## 覆盖范围与执行边界

| 范围       | 执行方式                                     | 保留的检查                                                                                       |
| ---------- | -------------------------------------------- | ------------------------------------------------------------------------------------------------ |
| 图表尺寸   | 每种渲染器和 CSS 场景独立测试                | SVG、Canvas 下的全部 17 种布局、尺寸变化、可见性和实例身份                                       |
| 玫瑰图高亮 | 每种对齐与形状共用页面，通过具名步骤检查模式 | 全部 9 种对齐 × 2 种形状 × 4 种模式、全部四个扇区、从数据项回到默认状态，以及每种模式下的 resize |
| 空状态插槽 | 每个具名示例独立测试                         | 全部 32 个示例、完整示例数量、覆盖层几何、重新加载与正常恢复、实例身份                           |
| 柱图图例   | 分开检查图例目录、换行和分页交互             | 顺序、总数、换行、分页、缩放、选择、滚轮传递和 resize 锚点                                       |
| 站点渲染   | 每次断言轮询读取一次 DOM 快照                | 全部源码示例、预期图表数量、可见性，以及已渲染的路径或 Canvas                                    |
| 外观       | 现有截图及同浏览器参考图比较                 | 全部已评审基线、像素检查和 tooltip 样式断言                                                      |
| 主题与控件 | 真实页面交互和持久化偏好                     | 深浅色切换、响应式控件、键盘、跨标签页存储和地图主题                                             |
| 包消费者   | 独立 Vue Playground 与兼容性矩阵             | 打包导入、响应式数据、主题、插槽、生命周期和截图                                                 |

连续状态转换测试会有意在同一个图表上执行相关操作。拆分不相关场景时，不能用新页面断言替代实例保留或取消行为检查。

`demoFixtures.ts` 通过 `demo.html?demo=...` 挂载单个实际文档组件，复用站点 setup、正常示例字体及响应式尺寸。柱状图控件、多行图例、子弹图键盘和地图控件使用这个入口，避免每个用例初始化整页图表。目录、导航、站点主题控件和整页布局仍检查真实站点。视觉夹具继续保留固定容器、固定 CJK 字体和既有基线。

数据状态与 loading / empty 恢复拆为独立测试，各自保留实例身份断言。打包饼图用例使用独立 HTML 入口，导入同一个 Basic 组件，避免加载不相关的 Playground 模块。图例分页、选择与滚轮行为、resize 锚点和 tooltip 多列布局分开验证。地图几何和数据测试局部启用减少动态效果；原生视角缩放、加载遮罩、过期响应和过渡中的主题重建继续使用正常动画。`test.step` 不会产生独立超时预算，所有用例保留现有的 30 秒超时。

## 稳定交互规则

- 先滚动稳定的图表或 SVG 容器，再定位其子元素。ECharts 可能在滚动、resize、高亮或主题重建时替换文本和路径。
- SVG 命中目标使用 `helpers.ts` 中的 `clickSvg`、`hoverSvg`、`hoverCategory`。它们等待当前几何并发送真实指针事件，也处理 WebKit 的透明图例命中区域；点击操作本身不会重放。
- 多扇区饼图测试从实际填充的 SVG 弧形中寻找内部点，等待几何稳定，并排除静默整圆背景。装饰多层示例明确命中 70–80% 的交互环，不把静默装饰层当作数据。
- 等待需要断言的可观察状态，避免固定 sleep。`reloadDemo` 在点击前观察真实加载转换，防止较慢 runner 错过短暂 loader，同时检查加载与空状态恢复。取消回归显式控制页面时钟。
- 只读几何轮询需要明确、有上限的时间预算；`toPass` 不继承全局 expect 超时。不能把会切换状态的输入操作包进重试轮询。
- 初始化期间，就绪探针要允许模型或图形元素暂时不存在。比较完整的变更结果：只检查 y 坐标、未变化的标题或 SVG 外壳，可能错误接受旧状态。
- 负向交互检查必须证明真实输入确实送达目标。加载覆盖层的滚轮回归先记录事件送达，再验证移除覆盖层后可分页；每次操作都重新解析坐标。
- 检查图表集合时必须断言预期数量。空集合也能通过 `every()`，仅靠它无法证明重新挂载成功。
- 等 ResizeObserver 和渲染稳定后再检查几何。尽量在同一次读取中获取相关边界，避免比较不同帧的数据。
- 保留参与图像断言的截图调用。无断言的成功截图会增加栅格化和报告 I/O；失败截图和 trace 已能提供诊断，无需截取所有成功状态。
- Pages 冒烟测试会有意等待静态动态导入完成后再刷新文档。不要把 network idle 当作通用的图表就绪判据。

## CI 与报告

Linux 的 browser-build 任务统一构建站点和 fixture，随后 WebKit、Firefox、Chromium 在同一个 macOS 矩阵中复用这些生产产物。环境准备、产物下载、浏览器安装、测试执行是独立步骤，可分别比较耗时。不设置 `max-parallel`；实际启动时间由 GitHub runner 容量决定。三个浏览器任务加两个 Playground 任务需要五个 macOS 槽位才能同时执行，其他工作流运行也可能争用这些资源。

`scripts/e2e-ci.mjs` 收集真实 Playwright 用例目录，以工作流 run ID 和完整用例身份计算哈希，再将打乱后的用例轮流分给三个浏览器，数量最多相差 1。运行前会核对 Playwright 实际的 `--test-list` 选择是否与计划一致，防止模糊标题造成遗漏或重复。随机种子、完整分配及各浏览器的选中列表会保存在报告产物的 `test-results/ci-plan/` 下。最终 CI 门禁比较三个回执，验证覆盖完整、无重叠且数量均衡。用 `IDUX_E2E_SEED` 可以复现某次分配。这种随机策略通过多轮运行提供跨浏览器覆盖；单次完整的三浏览器回归请使用全量命令。

`IDUX_E2E_PREBUILT=1` 用于本地重复检查时复用显式构建的产物。`IDUX_E2E_TARGET=site` 可在部署冒烟任务中跳过不用的 fixture 服务；`fixture` 则在只测试 fixture 时跳过站点服务。该变量只选择启动哪些服务，不筛选测试。未设置这些变量时，本地命令仍会构建两套产物。

Chromium 和 Firefox 每个项目限制为一个 worker，Playground 的 CI 配置也使用一个 worker，避免首批页面初始化和 SVG 的内存竞争；WebKit 保留现有 worker 预算。比较单浏览器 CI 耗时时，应分别运行各浏览器项目。

Chromium/Firefox 的 worker 会先创建并关闭独立的 `about:blank` 页面，只初始化浏览器引擎，不加载应用、字体或示例。每个用例仍使用全新的上下文和页面，应用加载与交互全部计入用例耗时。引擎准备沿用现有超时预算，在任务摘要中单独记录，总耗时仍包含它，避免把一次性启动成本归到随机排在首位的用例。

保留现有重试预算：主套件在 CI 中重试两次，Playground 重试一次，本地默认不重试。不要靠增加重试、超时或图像容差掩盖失败。`scripts/e2e-summary.mjs` 在 Actions 摘要中列出首轮失败、flaky 用例、尝试次数和慢用例；重试后成功也会产生警告。另一个不限制数量的表格列出所有单次执行超过 10 秒的用例，分别显示首次、最慢、累计耗时和重试次数。HTML、JSON、trace 和失败截图仍可作为产物下载。

pnpm store 缓存可避免重新下载未变化的包，但仓库不跟踪锁文件，因此每次运行仍会解析版本范围。浏览器、构建、消费者、发布规划、覆盖率合并及仅分析任务的根工作区安装会跳过脚本。单元验证仍保留 canvas 构建依赖。消费者安装仍正常执行自身脚本，确保 vue-demi 选择正确的 Vue 环境。release PR 版本更新也保留正常脚本，因为其版本命令会重新安装工作区依赖。

`scripts/ci-timing.mjs` 把原生环境准备和工作区安装耗时写入日志及 Actions 摘要，命令失败时也会记录。Playground 准备分别记录库构建、打包和每个消费者安装耗时；Playground 的 Chromium 安装也单独计时。这些数据用于区分环境开销和实际测试耗时，不改变重试预算。

## 验证命令

仅在适合本地执行时运行以下命令。本地套件默认使用四个 worker，`pnpm test` 按顺序执行各套件，避免浏览器和构建资源争用。

针对性交互检查：

```sh
pnpm exec playwright test e2e/bar-demo-controls.spec.ts e2e/category-legend-spacing.spec.ts e2e/pie-dark-hover.spec.ts e2e/pie-demo-controls.spec.ts --workers=1
```

fixture 几何及完整玫瑰图矩阵：

```sh
IDUX_E2E_TARGET=fixture pnpm exec playwright test e2e/chart-layout.spec.ts e2e/pie-hover.spec.ts --workers=1
```

完整三浏览器覆盖及包消费者：

```sh
pnpm test:e2e:full
pnpm test:playgrounds
```

显式构建新产物后，复现预构建产物路径：

```sh
pnpm build:site
pnpm exec vite build --config e2e/fixture/vite.config.ts
IDUX_E2E_PREBUILT=1 pnpm test:e2e
```

部署构建和预览应使用匹配的 `SITE_BASE`、`SITE_DOMAIN`；不能把根路径构建产物复用于子路径冒烟测试。运行结束后，无论成功、失败或中断，都应只关闭本次启动的浏览器和预览服务，并复查其子进程已退出。

复现一组 CI 浏览器分配，三个浏览器必须使用相同种子：

```sh
IDUX_E2E_SEED=12345 pnpm test:e2e:ci webkit
IDUX_E2E_SEED=12345 pnpm test:e2e:ci firefox
IDUX_E2E_SEED=12345 pnpm test:e2e:ci chromium
```

添加 `--plan-only` 可仅检查并验证分配，不启动浏览器。

## 词云视觉与交互回归

`visual.spec.ts-snapshots/demo-word-cloud-*.png` 提供 30 张经过检查的 macOS 基线：文字、矩形标签、气泡、搜索高亮和重叠矩形，分别覆盖明暗主题及 Chromium、Firefox、WebKit。fixture 导入实际文档示例；截图前启用减少动态效果并结束原生入场动画，不修改发布组件行为。固定 CJK 字体补齐示例汉字，Chromium 额外检查实际使用的字体。

仅生成缺失基线：`pnpm exec playwright test e2e/visual.spec.ts --grep "word-cloud .* demo visual baseline" --update-snapshots=missing`。检查图片后去掉更新参数重跑，既有基线应保持不变。

词云功能用例覆盖真实鼠标悬停暂停/恢复、减少动态效果、选中、图例筛选、搜索位置稳定，以及加载和空状态恢复。通用示例渲染、主题和空插槽清单也包含词云；Vue 2/3 打包消费测试通过真实 SVG 点击验证 Tooltip、分类筛选与非法尺寸恢复，并参与浏览器覆盖率合并。

## 地图几何、数值与视觉回归

`map-demo-drilldown.spec.ts` 验证真实区域／标记点击、级联选择联动、直辖市分组、缺少边界及过期响应处理，并记录可选过渡 helper 切换地图时的原生视角缩放。

`map-demo-controls.spec.ts` 验证真实站点的加载、空状态恢复及导航。`map-demo-state.spec.ts` 在 fixture 中挂载实际文档示例，每个示例均切换中国与世界地图，检查实时 geo 模型的区域名称、所有业务区域与底图的匹配情况、真实鼠标悬停显示的正常值与零值、实际填色变化、缺失密度数据与零值的区别，以及恢复正常后的数据。状态图的节点值和飞线图的线路指标也通过实时图表配置验证。

地图视觉矩阵覆盖状态、密度、飞线三类示例的中国与世界范围、深浅主题及 Chromium、Firefox、WebKit，共 36 张截图。原有默认范围的截图名称保持不变，另一范围的文件名包含 `china` 或 `world`。仅生成缺失基线，检查图片后再关闭基线更新复跑：

```sh
IDUX_E2E_TARGET=fixture pnpm exec playwright test e2e/visual.spec.ts --grep 'map (status|density|lines)' --update-snapshots=missing
IDUX_E2E_TARGET=fixture pnpm exec playwright test e2e/map-demo-state.spec.ts e2e/visual.spec.ts --grep 'map (status|density|lines)'
```
