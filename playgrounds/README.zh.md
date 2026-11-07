# 图表兼容性 Playgrounds

[English](README.md) | 简体中文

`vue2` 使用 Vue 2.6.14 + Composition API，`vue3` 使用 Vue 3。两者均为独立 pnpm workspace，各自维护依赖、锁文件、构建配置和 E2E，不继承根应用配置。

两个应用使用 Vite 8，需要 Node.js >= 22.12.0、pnpm >= 9。

pnpm 9 从各应用的 `package.json#pnpm.overrides` 读取本地 tarball 覆盖，较新版本从 `pnpm-workspace.yaml` 读取；两处须保持一致。`.npmrc` 与 workspace 中的 peer 配置也须保持一致。覆盖规则仅针对传递依赖，保留直接依赖的相对路径，兼容 pnpm 9.0.0 的冻结锁文件安装。pnpm 9/10 通过 `package.json#pnpm.onlyBuiltDependencies` 放行必要安装脚本，pnpm 11 使用 workspace 中的 `allowBuilds`。

## 首次运行 / 验证本地修改

在仓库根目录执行：

```sh
pnpm playgrounds:prepare
```

该命令构建库，将 core、plots、charts 打包并复制到两个应用的 `vendor/`，然后分别安装。全部图表依赖（包含传递依赖）均通过本地 tarball 解析，不链接源码或外层 node_modules。更新库后须重新执行，避免验证旧产物。

然后任选一个目录独立运行：

```sh
cd playgrounds/vue2 # 或 playgrounds/vue3
pnpm dev
pnpm build
pnpm exec playwright install chromium # 首次使用的机器需要安装浏览器
pnpm test:e2e
```

示例提供柱状图、折线图和饼图，支持数据/标题更新、属性增删、loading、主题、宽度切换及卸载挂载。

## 自动回归

```sh
# 根目录：打包安装最新代码，然后依次执行两套 E2E
pnpm test:playgrounds

# 包含现有单测、站点 E2E 和两个 playground 的完整测试
pnpm test
```

E2E 针对生产构建运行 Chromium，验证真实 SVG 渲染、ECharts 配置、数据更新、动态属性、loading、主题重建、resize、点击事件及重新挂载，并收集页面和控制台错误。每个应用独立生成 HTML 报告，并附带主题切换后的截图；失败时保留截图；CI 在首次重试时记录 trace，本地运行则保留失败用例的 trace。视觉测试为柱状图、折线图、饼图分别保存默认主题和深色主题的基准截图，共 12 张；使用 `toHaveScreenshot` 对比，允许最多 0.5% 像素差异，保持与现有站点测试一致。

应用锁文件、`vendor/`、构建产物和测试输出不提交。根 workspace、lint、format 均排除 playground；根测试通过显式命令调用其独立测试。不要给这些应用添加 workspace 依赖、源码 alias 或链接库目录。

## 更新视觉基准

截图保存在各自的 `e2e/visual.spec.js-snapshots/`，应随代码提交。正常测试只比较，不自动接受变化。确认视觉变化符合预期后，在对应应用目录执行：

```sh
pnpm test:e2e:update
```

更新后检查截图再提交；不要用更新基准来绕过非预期回归。截图文件包含浏览器和系统标记，需要在相同系统及浏览器版本下比较；新增运行平台时应单独生成并审核对应基准。

## CI 执行约定

站点、行为测试 fixture 和两个 playground 的 E2E 都先构建，再启动独立的 preview 服务；本地与 CI 使用相同模式，不复用开发服务器，不启用 HMR。站点通过 `/` 根路径访问，与 `https://charts.idux.site/` 一致，服务由 Playwright 启停。

流水线先安装根依赖，再安装与锁定 Playwright 版本对应的浏览器及系统依赖：

```sh
pnpm exec playwright install --with-deps
CI=true pnpm test
```

如需使用下载镜像，可尝试 [npmmirror](https://registry.npmmirror.com/-/binary/playwright)，为安装命令设置 `PLAYWRIGHT_DOWNLOAD_HOST`：

```sh
PLAYWRIGHT_DOWNLOAD_HOST=https://registry.npmmirror.com/-/binary/playwright pnpm exec playwright install chromium
```

`pnpm test` 自动完成图表库打包、两个独立 playground 的依赖安装、各应用构建、单测、行为测试和截图对比，无需预先运行 `pnpm start`。流水线应固定 Node.js、pnpm、Playwright、操作系统及字体环境。

当前提交的截图基准为 macOS（`darwin`）。如果流水线采用 Linux，需先在对应的固定 Linux 环境中生成并审核站点及两个 playground 的基准，不能直接把 macOS 的截图重命名成 Linux 基准。普通 CI 不传 `--update-snapshots`，并归档根目录和两个 playground 的 `playwright-report/`、`test-results/` 作为测试产物。

## 主题与局部配置验证

两个应用均可打开 `/?theme`，使用打包后的 Pie、Radar、Gauge、LiquidFill，验证全局响应式主题、局部覆盖及移除、数字/标签样式、Pie auto/native 模式与主系列样式，以及空数据恢复。`/?basic` 保留原有 Pie 兼容场景，默认页继续验证 Bar/Line/Pie 生命周期和事件。修改库后从根目录运行 `pnpm test:playgrounds`，重新打包再测试。

主题页还覆盖 `CHART_THEME_TOKEN`：修改注入的 ECharts 主题对象、验证实例重建、设置组件显式主题并恢复继承。Vue 2 和 Vue 3 均使用打包产物执行这些检查。

根 E2E 本地使用 4 个 worker，CI 每个分片使用 2 个 worker，同一文件内的独立用例也并行运行。两个 playground 各使用 2 个 worker。`pnpm test:playgrounds` 只构建、打包一次库，并行安装两个应用，再使用独立端口并行执行测试。可通过 `pnpm playgrounds:prepare vue2` 或 `vue3` 只准备一个应用。资源较少时可用 `pnpm test:e2e --workers=2` 降低并发。不要在同一 checkout 同时启动多个根 E2E 命令，它们共享构建目录、预览端口和报告目录；CI 分片使用独立 runner。
