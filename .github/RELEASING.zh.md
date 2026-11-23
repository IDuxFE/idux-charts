# CI 与发布

[English](RELEASING.md) | 简体中文

贡献者向自己的 fork 推送功能分支，再向 `IDuxFE/idux-charts:main` 提交 PR。CI 在功能分支推送和 PR 上运行；main 推送通过 Release 工作流执行相同检查。Fork 不执行版本更新或发布任务。

## 贡献流程

涉及已发布包的行为变更时，运行 `pnpm changelog`，选择受影响的包和版本变更级别，填写简明的英文说明，将生成的 `.changeset/*.md` 与代码一起提交。仅文档、测试或开发工具变更通常不需要 changeset。

创建 Git 提交不会自动生成 changeset。贡献者自行决定何时添加、影响哪些包及版本级别；在 release PR 消费之前，说明和版本影响都可以通过正常代码评审修改。

不要手工修改包版本或生成的 CHANGELOG。Changesets 会同步更新版本和内部依赖。三个公共包 `@idux/charts-core`、`@idux/charts-plots`、`@idux/charts` 在 `.changeset/config.json` 中组成一个固定版本组。任一成员发布时，三个包均以相同版本升级并发布，包括没有代码变更的包。贡献者仍按实际影响选择包和版本级别，Changesets 将最高升级级别应用到整个组。私有文档站不参与发布；新增公共库包应加入该组。

合并带发布影响的 PR 前，可运行以下命令检查规划版本：

```sh
pnpm exec changeset status --output /tmp/idux-charts-release-plan.json
```

不要用 `linked` 组替代该策略：它不要求每个成员都发布。

本地 pre-push hook 会执行仓库级 lint 并强制重新检查 TypeScript。CI 在 Linux 上并行执行 lint、格式、类型和带覆盖率的单元测试。覆盖率报告保留为产物；可选 Codecov 上传及社区、安全集成见[开源集成](OPEN_SOURCE.md)。浏览器与截图测试运行于 Intel macOS 15。每次 CI 把完整用例目录随机分成三组，分别交给三个浏览器，每个用例只执行一次。工作流 run ID 是可复现种子，报告保留完整分配。单次 CI 不验证每个用例在全部三个浏览器中的表现；本地 `pnpm test:e2e:full` 执行全量回归。

Linux 任务统一构建共享站点和 fixture 产物，WebKit、Firefox、Chromium 在同一 macOS 矩阵中消费产物，分别展示环境准备、产物下载、浏览器安装和测试耗时。矩阵没有显式并发上限，实际并发由 GitHub runner 容量决定。两个 Vue Playground 保留独立 macOS 任务与现有截图基线，五种 Vue/ECharts 组合在 Linux 上独立运行。域名与子路径部署检查只启动站点服务，不构建不用的 fixture。

构建、浏览器、消费者、规划、覆盖率合并和仅分析任务的根工作区安装会跳过脚本与原生 canvas 环境准备。单元验证保留 canvas；消费者安装正常执行自身脚本，以正确初始化 vue-demi。release PR 版本更新保留正常脚本，因为版本命令会重新安装工作区。`scripts/ci-timing.mjs` 将准备阶段耗时记录到日志和任务摘要；Playground 库构建、打包、消费者安装分别计时，与 Chromium 安装和测试耗时区分。

矩阵采用 `fail-fast: false`，保留全部组合的检查证据；`CI result` 要求所有任务成功，包括 WebKit 和共享浏览器构建。过时的 PR、功能分支运行会取消，main/release 验证不取消。报告包括 HTML、JSON，以及列出首轮失败、重试成功和十个最慢用例的任务摘要。

CI 保留现有兜底重试：主浏览器套件两次，每个 Playground 一次。重试成功的用例允许通过但会标记 flaky，并通过 Actions 警告和摘要展示；耗尽重试仍失败。首次重试记录 trace，失败时截图。本地失败保留 trace，默认四个 worker；聚合测试命令按顺序执行套件和 Playground。

Playground 锁文件和本地 tarball 不纳入版本管理。浏览器报告、共享构建保留七天。共享构建和覆盖率产物在同次工作流中使用稳定名称，生产任务重跑时覆盖，因此可以只重跑失败的下游任务，无需重建成功的上游任务。runner 镜像或浏览器渲染变化时应评审截图差异，CI 不会自动接受新基线。覆盖边界和针对性命令见 [E2E 维护说明](../e2e/README.zh.md)。

文档布局变化也会影响图表截图尺寸。修改共享站点样式的 PR 提交前，应在全部三个浏览器运行：

```sh
pnpm exec playwright test e2e/site-layout.spec.ts e2e/visual.spec.ts
```

若布局变更有意改变基线，先评审图表与尺寸，仅更新受影响图片，再不带 `--update-snapshots` 重跑。不要提高截图容差来让布局变更通过。

根目录和两个 Playground 的 Playwright 必须固定为相同的精确版本，使浏览器升级与截图变化一起评审。CI 也通过各 Playground 自己的 Playwright CLI 安装 Chromium。

构建后，`pnpm test:declarations` 会打包实际库，并在独立的 Vue 2.6、Vue 2.7、Vue 3 项目中检查与 ECharts 5.4.3、6.1.0 的兼容性。Vue 2.7、Vue 3 使用 `skipLibCheck: false`，检查推断的 props、事件、作用域插槽、setup 绑定、data、computed 和 methods；Vue 2.6 在现有 `skipLibCheck: true` 适配边界内检查 props 类型别名。

加上 `--runtime`，还会在 Chromium 中验证打包后的 JS：渲染、数据更新、主题重建、缩放保留（包括地图刷新及主题重建后的 geo center/zoom）、图表容器属性、销毁和重新挂载，覆盖七种 plot 组件、基础图表与面积图布局；也检查仅组合式 API 导入、聚合与模块入口共享实例、折线子路径排除其他系列，且 gzip 后的 JS 包更小。每个兼容性 CI 任务都执行这些检查。`IDUX_DECLARATION_TARGET=2.7.16/5.4.3` 可选择一个组合，未设置时本地覆盖完整矩阵。

本地性能检查使用 `pnpm benchmark:charts`；负载及参考数据见[性能基线](../e2e/PERFORMANCE.zh.md)。

根依赖锁文件同样不跟踪。CI 与发布安装使用 `pnpm install --no-lockfile --no-frozen-lockfile`，每次按声明范围解析依赖，轻量任务额外使用 `--ignore-scripts`。pnpm 内容寻址缓存按操作系统、架构和依赖清单区分，复用缓存不等于冻结依赖解析。精确固定的依赖以及显式固定的 Node.js、pnpm 版本保持固定；该策略不提供锁文件级的可复现性。

## 上游 GitHub 的一次性配置

这些设置属于 **IDuxFE/idux-charts**，不是贡献者的 fork。

1. 启用 GitHub Actions，允许工作流引用的 action。
2. 在 **Settings → Actions → General → Workflow permissions** 启用 **Allow GitHub Actions to create and approve pull requests**。任务自行申请权限，仓库默认可以保持只读。
3. 创建名为 **npm** 的 environment，将部署分支限制为 **main**，可选设置发布前需要维护者批准。
4. 保护 `main`：要求 PR、评审，以及 CI 工作流的 **CI result** 检查。首次 PR 运行后选择实际检查项，不要要求发布任务作为 PR 合并条件。
5. 若要机器人创建的 release PR 自动触发 CI，添加仓库 Secret **RELEASE_GITHUB_TOKEN**，使用仅能访问本仓库的 fine-grained PAT，授予 **Contents: read/write** 和 **Pull requests: read/write**，令牌所有者须有仓库访问权限。若扩展工作流生成 GitHub App installation token，也可用其替代 PAT。未设置时使用 `GITHUB_TOKEN`，它能创建 PR 但不会触发该 PR 的 CI；维护者应关闭并重新打开 release PR 来触发 `pull_request` 检查，不可绕过必需检查。
6. 完成下方 npm 配置后，将仓库 Actions 变量 **RELEASE_ENABLED** 设为 **true**。发布准备就绪前保持未设置。

不需要 `NPM_TOKEN` 或 `NODE_AUTH_TOKEN` Secret。仅发布任务获得 `id-token: write`。所有使用公共 setup 的任务显式安装 pnpm 11.8.0 和 Node.js 22.14.0。

## npm 的一次性配置

有权管理现有 `@idux/*` 包的 npm owner/maintainer，必须为每一个包配置 GitHub Actions **Trusted Publisher**：

- `@idux/charts`
- `@idux/charts-core`
- `@idux/charts-plots`

在各包 **Settings → Trusted publishing** 中填写：

| 字段                 | 值             |
| -------------------- | -------------- |
| Provider             | GitHub Actions |
| Organization or user | `IDuxFE`       |
| Repository           | `idux-charts`  |
| Workflow filename    | `release.yml`  |
| Environment          | `npm`          |
| Allowed action       | npm publish    |

仓库、工作流文件名和 environment 必须精确匹配。这些是现有包，fork 不会授予发布其名称的权限。Trusted publishing 在 GitHub 托管 runner 上使用短期 OIDC 凭据。pnpm 11 支持这种认证，并为公开仓库发布的公共包自动附加 provenance；包的 repository 元数据继续指向上游。

请临近首次计划发布时配置信任关系。原英文指南记录的 npm 规则要求新 trusted publisher 在两天内完成首次发布；配置时若 npm 页面规则有变化，以页面展示为准。

## 发布流程

1. 将带 changeset 的功能 PR 合并到 `main`。
2. 验证通过后，Changesets 创建或更新 release PR，更新包版本、CHANGELOG 和内部依赖。PR 标题与发布提交说明包含规划版本，例如 `chore(release): v1.6.1`，并随发布计划变化而更新。
3. 评审生成的 release PR，等待 CI 后由维护者合并。
4. main 工作流验证合并提交、重新构建库，将尚未发布的版本发布到 npm，同时推送包标签、创建 GitHub Releases。若 npm environment 有审批要求，由维护者批准。

多个功能 PR 可以累积到同一个未关闭的 release PR，待整批准备好再合并；每次合并功能 PR 并不直接生成新 npm 版本。release PR 消费待发布 changeset 文件，并在各包 CHANGELOG 中保留记录。不要靠手工删除待发布 changeset 推迟发布。

release PR 的 CI 由 PR 事件触发。Changesets 临时分支、发布分支的推送不触发 push CI，避免重复运行。

在 `RELEASE_ENABLED=true` 前，release PR 生成与发布都关闭。启用后，可在 **main** 上手动选择 **Release → Run workflow** 启动或重试，main 推送也会触发。Changesets 会查询 npm 未发布版本，因此即使没有待发布 changeset，也可能发布 main 上已有的未发布版本。启用前须检查当前版本。部分失败后重跑，不需要再次提升已经发布的包版本，应先核对 npm 和工作流日志，绝不能尝试覆盖已有 npm 版本。

## 参考资料

- [Changesets 自动化](https://changesets.dev/guide/automating)
- [Changesets Action](https://github.com/changesets/action)
- [npm trusted publishing](https://docs.npmjs.com/trusted-publishers/)
- [pnpm 发布](https://pnpm.io/cli/publish)

## 工具链与依赖边界

- 开发使用 Node.js 22.14+（22.x）、24.x 或 26+，pnpm 10+。`.nvmrc`、CI、engine 声明和 Node 类型沿用 Node 22 基线。Changesets 3 要求 pnpm 10+；独立 Playground 不运行发布工具链，保留 pnpm 9 兼容性。
- 声明生成、Vue 工具和 AST 规范化使用 TypeScript 6.x 编译器 API。未使用的 TypeScript 7 原生编译器依赖已移除；以后迁移编译器 API 必须通过打包消费者矩阵。
- 发布包的 ECharts peer 明确支持 5.x 和 6.x。文档应用沿用开发使用的 6.x 基线。`vue-demi` 0.14.10 和可选 Composition API peer 仍是 Vue 2 兼容边界所需。
- core、plots 入口执行 ECharts 注册，并标记有副作用；发布 CSS 同样标记有副作用。浏览器检查既覆盖组件导入，也覆盖独立打包的仅 `useChart` 导入。
- Archive 文档工具仍声明 Vite 4、archive-app 0.2 peer，而当前工作区使用 Vite 8、archive-app 0.5。现有组合由站点构建和浏览器套件覆盖。可选 Vue 2.6 Composition API peer 也可能在 Vue 3 开发工作区产生警告。不要扩大上游 peer 声明来隐藏警告；打包消费者项目针对各个受支持 Vue 版本严格验证 peer。

## 文档站部署

文档由独立的 **Deploy documentation** 工作流部署。Changesets 成功发布新 npm 包（`published == 'true'`）后，Release 使用精确的发布提交 SHA 派发该工作流。创建 release PR、普通合并、没有新包的发布运行都不部署。派发使用带 `actions: write` 的 `GITHUB_TOKEN`；`workflow_dispatch` 属于 GitHub 令牌触发限制的例外。派发失败以警告报告，不改变 npm 发布成功的结果。

仅文档更新或重试部署时，在 `IDuxFE/idux-charts` 选择 **Actions → Deploy documentation → Run workflow → main**。`source_sha` 留空部署所选 main 提交，或填写完整发布提交 SHA 以重试该版本。源提交必须已在 main 上，并包含文档构建、测试工具。Fork 和其他分支不能部署。文档失败可独立重试，无需重新发布 npm 包。

保留 **Settings → Pages → Source** 为 **Deploy from a branch**，分支 **gh-pages**、目录 **/(root)**。保留自定义域名 **charts.idux.site**，DNS 指向 **iduxfe.github.io**。

仓库 Secret **PAGES_DEPLOY_TOKEN** 使用对上游仓库具有 **Contents: read/write** 的 fine-grained PAT，令牌所有者须有向 `gh-pages` 推送的权限。未配置时复用 **RELEASE_GITHUB_TOKEN**。这里没有 `GITHUB_TOKEN` 兜底，因为该令牌的推送不会触发基于分支的 Pages 构建。凭据只存 Actions Secrets，不写入源码或静态产物。

build 任务构建生产站点，并执行 Chromium 冒烟检查：Pages 式 404 回退、深链接刷新、query/hash 保留、导航与图表渲染。浏览器报告、失败 trace 保留七天。部署产物仅包含 `packages/site/dist/`。独立 deploy 任务将产物复制到 `gh-pages`，移除旧资源，以普通提交记录来源 SHA。保留现有分支历史，内容相同不产生提交，不发布源码或依赖。

构建时通过 shell 环境变量配置：

| 变量          | 默认值 | 用途                                            |
| ------------- | ------ | ----------------------------------------------- |
| `SITE_BASE`   | `/`    | 资源与路由的绝对路径，缺少末尾斜杠时自动补齐    |
| `SITE_DOMAIN` | 未设置 | 可选的 `CNAME` 域名；`github.io` 项目站点应留空 |

构建、预览无自定义域名的项目站点示例：

```sh
SITE_BASE=/idux-charts/ SITE_DOMAIN= pnpm build:site
SITE_BASE=/idux-charts/ SITE_DOMAIN= pnpm preview
```

构建与预览必须使用相同 `SITE_BASE`。它们是构建工具环境变量，不是运行时配置，也不会自动加载 `.env`。开发仍使用 `/`。生产部署工作流显式设置 `SITE_BASE=/`、`SITE_DOMAIN=charts.idux.site`，保留官方站点；其他构建不继承该域名。未设置或清空 `SITE_DOMAIN` 会移除生成的旧 `CNAME`；配置自定义域名还需匹配 GitHub Pages 设置及 DNS。上游部署仍固定指向官方域名，本地构建其他目标不会改变部署目标。

本地执行子路径冒烟测试：

```sh
SITE_BASE=/idux-charts/ SITE_DOMAIN= pnpm exec playwright test e2e/pages.spec.ts
```

CI 同时检查默认根路径和 Chromium 子路径回归。必需的 Ubuntu 冒烟任务使用与部署相同的配置，更广泛的浏览器与截图套件仍在 macOS 上执行。构建以 `index.html` 的同一应用入口生成 `404.html`，让 history 路由无需重定向即可加载，并保留 URL 参数。GitHub Pages 对这些深链接仍返回 HTTP 404，这是静态托管本身的行为。始终包含 `.nojekyll`；仅配置 `SITE_DOMAIN` 时包含 `CNAME`。

工作流推送后，GitHub 还会执行独立的 **pages build and deployment** 流程。除推送工作流外，也检查该部署，再打开 <https://charts.idux.site/> 并刷新图表路由。npm environment 审批不控制文档工作流。回滚时，将已知正常的 `gh-pages` 提交中的静态文件恢复到新提交后推送，不要强推抹掉部署历史。

发布规划与验证并行。每次 main 运行独立验证自己的 SHA，较早的慢运行不再串行阻塞后续验证。仅 release PR 更新和 npm 发布共用写锁，正在执行的写任务不被取消。`queue: max` 保留等待中的写任务，防止较早提交的验证晚完成后，替换掉较新提交的待执行发布任务。两者都要求规划及完整验证成功。检出内容固定为已验证 SHA，写入前立即检查 main，若该 SHA 已过时则跳过，由较新的 main 运行处理新发布工作。库构建仍按包依赖顺序执行，消费者测试前仍先打包和安装。
