# CI 与发布

[English](RELEASING.md) | 简体中文 | [流水线地图](PIPELINES.zh.md)

## 贡献与验证

向个人 fork 推送功能分支，再向 `IDuxFE/idux-charts:main` 提交 PR。main 推送由 Release 调用完整 CI；fork 不执行发布写操作。

已发布包的行为变更使用 `pnpm changelog`，选择受影响包和版本级别，提交简明的英文 changeset；仅文档、测试或工具变更通常无需添加。版本、CHANGELOG 和内部依赖由 Changesets 更新，不手工修改。三个公共包（`@idux/charts-core`、`@idux/charts-plots`、`@idux/charts`）组成固定版本组，按最高升级级别统一发版；新增公共库包应加入该组。

| 验证            | 范围                                                                                                       |
| --------------- | ---------------------------------------------------------------------------------------------------------- |
| `pnpm check:ci` | Lint、格式、类型、单元覆盖率与覆盖率合并测试                                                               |
| 浏览器 CI       | 共享站点 / fixture 构建；用例随机分为不重叠的三组，分配给 WebKit、Firefox、Chromium；Intel macOS 15        |
| Playgrounds     | macOS Chromium 上的 Vue 2.6 / Vue 3 实际安装包消费者                                                       |
| 兼容性          | Vue 2.7.16 / 3.5.44 × ECharts 5.4.3 / 6.1.0，另加 Vue 2.6.14 + ECharts 6.1.0；安装包声明与 Chromium 运行时 |
| 文档            | 域名根路径 `/` 与项目子路径 `/idux-charts/` 的生产站点冒烟测试                                             |

先运行 `pnpm build:lib`，再用 `pnpm test:declarations --runtime` 执行兼容性验证；`IDUX_DECLARATION_TARGET=2.7.16/5.4.3` 可指定一组。Vue 2.7 / 3 使用 `skipLibCheck: false`，Vue 2.6 保留适配层的 `skipLibCheck: true` 边界。

根目录与两个 Playground 的 Playwright 保持同一精确版本。共享站点样式变更应在三个浏览器运行 `pnpm exec playwright test e2e/site-layout.spec.ts e2e/visual.spec.ts`；评审尺寸与图片后仅更新受影响基线，再不带 `--update-snapshots` 重跑，保留原有容差。重试、报告和针对性命令见 [E2E 维护说明](../e2e/README.zh.md)，性能测试见[性能基线](../e2e/PERFORMANCE.zh.md)。

CI 使用 Node.js 22.14.0、pnpm 11.8.0。锁文件不跟踪，每次安装重新解析声明范围；pnpm store 缓存不冻结版本。共享 setup 为 checks 与版本更新保留安装脚本和 canvas，轻量任务跳过根安装脚本；消费者仍执行自身脚本以初始化 vue-demi。

## 上游配置

在 `IDuxFE/idux-charts` 配置：

1. 启用 Actions 和 **Allow GitHub Actions to create and approve pull requests**。仓库默认权限可保持只读，各 job 单独申请写权限。
2. main 要求 PR 评审和 **CI result**，由维护者使用 rebase 合并；发布任务不作为 PR 合并条件。
3. 创建 **npm** environment，仅允许 main，可选配置审批。
4. 设置 **RELEASE_GITHUB_TOKEN**：仅限本仓库，具有 Contents、Pull requests 读写权限的 PAT，以触发机器人 release PR 的 CI。未设置时使用 `GITHUB_TOKEN` 创建 PR，维护者需关闭并重新打开 PR 触发检查。
5. 完成下方 npm 配置后设置 **RELEASE_ENABLED=true**；启用前 main 验证仍执行，规划与发布写操作关闭。

在**每个**公共包的 npm **Settings → Trusted publishing** 配置：

| 字段                      | 值                       |
| ------------------------- | ------------------------ |
| Provider                  | GitHub Actions           |
| Organization / repository | `IDuxFE` / `idux-charts` |
| Workflow / environment    | `release.yml` / `npm`    |
| Allowed action            | npm publish              |

发布使用 OIDC（`id-token: write`），无需 `NPM_TOKEN` 或 `NODE_AUTH_TOKEN`。信任关系的激活要求以 npm 配置页面为准。

## 发布操作

1. 合并带 changeset 的功能 PR；用 `pnpm exec changeset status --output /tmp/idux-charts-release-plan.json` 检查规划。
2. 完整 CI 与规划并行；`version` 模式创建或更新包含版本与 CHANGELOG 的 release PR，可累积多个功能 PR 后统一发布。
3. 评审 release PR，等待 CI，通过 rebase 合并。
4. 新一轮 main 运行验证提交；`publish` 模式重新构建并发布未发布版本，推送标签、创建 GitHub Releases。若配置 npm 审批，则批准后发布。

版本更新与 npm 发布共用不取消写任务的锁，`queue: max` 保留排队任务。两者固定使用已验证 SHA，写前发现 main 已更新则跳过；仅写操作串行，验证按 SHA 独立执行。

重试时在 main 手动运行 **Release**。即使没有待发布 changeset，Changesets 也可能发布 main 上已有的未发布版本；启用或重试前核对版本。部分失败后先检查 npm 和日志，不为已发布包重复升版，也不通过删除待发布 changeset 推迟发布。

## 文档部署

npm 新包发布成功后，携带发布 SHA 派发 **Deploy documentation**。仅文档更新或重试，在 **Actions → Deploy documentation → Run workflow → main** 执行：`source_sha` 留空使用派发提交 SHA，或指定 main 历史中的完整 SHA。文档部署独立于 npm 审批和发布重试。

- Pages 设置：**Deploy from a branch → gh-pages → /(root)**；域名 `charts.idux.site`，DNS 目标 `iduxfe.github.io`。
- Secret：**PAGES_DEPLOY_TOKEN**，仅限本仓库且具有 Contents 读写权限的 PAT；未设置时复用 **RELEASE_GITHUB_TOKEN**。`GITHUB_TOKEN` 推送不能触发分支式 Pages 构建。
- build 验证来源提交并执行 Chromium 冒烟；deploy 仅复制已测试的 `documentation` 产物，删除旧资源、保留分支历史，内容相同不提交。
- 同时检查 **Deploy documentation** 和平台 **pages build and deployment**，再刷新站点图表路由；回滚时以新提交恢复已知正常的静态文件。

| 构建变量      | 默认值 | 用途                               |
| ------------- | ------ | ---------------------------------- |
| `SITE_BASE`   | `/`    | 资源与路由根路径，构建和预览须一致 |
| `SITE_DOMAIN` | 未设置 | 可选 CNAME，项目子路径部署留空     |

生产使用 `/` 和 `charts.idux.site`；变量通过 shell 在构建时传入。构建包含 `.nojekyll`，并将 `index.html` 复制为 `404.html`；深链接保留参数，但仍返回 GitHub Pages 的 HTTP 404 状态。

```sh
SITE_BASE=/idux-charts/ SITE_DOMAIN= pnpm build:site
SITE_BASE=/idux-charts/ SITE_DOMAIN= pnpm preview
SITE_BASE=/idux-charts/ SITE_DOMAIN= pnpm exec playwright test e2e/pages.spec.ts
```
