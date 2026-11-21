# 参与 iDux Charts

[English](CONTRIBUTING.md) | 简体中文

欢迎提交问题、改进文档、补充测试和贡献代码。请遵守[行为准则](CODE_OF_CONDUCT.md)，
安全漏洞请按[安全政策](SECURITY.md)私下报告。

## 开始开发

使用 Node.js 22.14+（22.x）、24.x 或 26+，以及 pnpm 10+。
Fork 仓库后，从 `IDuxFE/idux-charts:main` 创建功能分支。

```sh
pnpm install
pnpm start
```

访问 <http://localhost:8080/> 查看文档站。公共库代码位于 `packages/core`、
`packages/plots` 和 `packages/charts`，示例位于 `packages/site`，
独立的 Vue 2、Vue 3 消费端位于 `playgrounds`。

## 提交 PR 前

每个 PR 聚焦一个主题，使用英文说明问题、变更后的行为及验证结果。
Issue 和讨论可以使用中文或英文。

```sh
pnpm check
pnpm build:lib
```

行为变更应补充回归测试，按需覆盖初始化失败、控制属性独立更新、交互保留、配置删除及卸载清理。浏览器或视觉变更需运行相关 Playwright 测试，并检查有意修改的
截图基线；关闭自己启动的浏览器，并复查 Chrome/Chromium 主进程和子进程；确认归属后再清理残留。公共 API 变更通过 `pnpm test:declarations`
检查打包后的消费端，加入 `--runtime` 可进一步验证浏览器运行行为。
完整兼容矩阵、视觉基线流程和浏览器测试命令见 [CI 与发布指南](.github/RELEASING.md)。

中英文文档保持同步。影响已发布包行为的变更需执行 `pnpm changelog`；
纯文档、测试和工具变更通常无需 changeset。不要手动修改包版本和生成的更新日志。

`pnpm test:coverage` 会为公共库源码生成终端摘要、`coverage/index.html`、LCOV 和 JSON 摘要，
包含尚无测试的源码文件。统计不包含文档站、playground 和浏览器测试。
本地 Git hooks 在提交前检查暂存文件，在推送前检查 lint 和类型；CI 执行发布指南中的完整检查。

PR 目标为 `IDuxFE/idux-charts:main`。维护者负责评审与合并；
自动化只提交依赖更新和发布建议，不自动合并。
