# 覆盖率与安全集成

[English](OPEN_SOURCE.md) | 简体中文 | [流水线地图](PIPELINES.zh.md)

配置属于 `IDuxFE/idux-charts`。仓库设置和服务策略须在对应控制台核实，Git 文件不代表当前接入状态。

## 覆盖率与 Codecov

| 命令 / 产物                                               | 用途                                                                     |
| --------------------------------------------------------- | ------------------------------------------------------------------------ |
| `pnpm test:coverage` → `coverage/index.html`              | 单元覆盖率；公共库源码包含未测试文件，排除声明、测试、构建配置和生成产物 |
| `pnpm test:coverage:all` → `coverage/combined/index.html` | 单元测试与 Vue 2 / Vue 3 Chromium 安装包消费者的综合覆盖率               |
| `pnpm coverage:merge`                                     | 合并已采集数据；缺少消费者或源码统计分母变化时失败                       |

报告包含 HTML、LCOV 和 JSON。`CHARTS_COVERAGE=1` 为库构建插入计数器和 source map，正常构建不插桩；站点、Playground 应用代码与第三方依赖不参与统计。CI 分别保留单元和综合产物七天，向 Codecov 上传综合 LCOV。

配置 Codecov：

1. 安装 [Codecov GitHub App](https://github.com/apps/codecov)，激活上游仓库，将其上传令牌保存为 **CODECOV_TOKEN**。
2. 设置 **CODECOV_ENABLED=true** 开启非 PR 上传。上游 PR 不依赖该变量；fork PR 和 Dependabot 使用无令牌上传，不获取 Actions Secret。
3. 确认结果属于 `IDuxFE/idux-charts`；缺少基线时修正令牌或仓库配置，在 main 手动执行 **CI**。

[codecov.yml](../codecov.yml) 要求**变更代码覆盖率至少 95%，无额外容差**，整体覆盖率仅提供信息。上传错误会使 `combined-coverage` 失败；若需阻止覆盖率不足的 PR 合并，还应在分支保护或规则集中要求 **codecov/patch**。

## 依赖更新与 CodeQL

[Dependabot](dependabot.yml) 在每周一北京时间 02:00 检查根 npm 依赖、02:30 检查 Actions，分组常规升级并限制待处理 PR 数。Vitest 与覆盖率插件保持同一精确版本，统一升级。

- Node 22 类型、jsdom 和三处 Playwright 版本人工维护；浏览器升级需评审截图变化，TypeScript 主版本升级需评审编译器 API 兼容性。
- Playground 依赖忽略自动版本与安全升级 PR，安全告警保留人工评估。
- 锁文件不跟踪；安全升级还依赖仓库依赖图与 Dependabot 设置，清单更新不等于完整的实际依赖审计。

[CodeQL](workflows/codeql.yml) 无需安装依赖或构建，扫描 JavaScript / TypeScript。保留现有高级配置，不为同一语言重复开启默认配置；先检查 code-scanning alerts 中的结果，再决定是否要求该检查。

在上游安全设置启用 **Private vulnerability reporting**；报告入口和备用联系方式见 [SECURITY.md](../SECURITY.md)。

## FOSSA

### 接入与扫描范围

1. 选择正确的 [FOSSA 组织](https://app.fossa.com)，配置项目和许可证策略。
2. 将具有分析、结果读取和项目元数据编辑权限的密钥保存为 **FOSSA_API_KEY**，设置 **FOSSA_ENABLED=true**。
3. 在 main 手动执行 **FOSSA**，检查实际依赖与策略结果。

工作流生成扫描用临时锁文件，覆盖公共包、文档站和开发依赖；[.fossa.yml](../.fossa.yml) 排除独立 Playground。先上传分析，再用 `fossa project edit` 对齐项目标题，最后检查策略；不与 Release 串联，PR 代码不获取 FOSSA 凭据。

| 扫描来源   | 项目                                             | 说明                                               |
| ---------- | ------------------------------------------------ | -------------------------------------------------- |
| GitHub App | `idux-charts`（`git+github.com/...`）            | README 徽章与 App 检查                             |
| CLI 工作流 | `idux-charts-cli`（`custom+<organization>/...`） | `.fossa.yml` 固定项目 ID；设置、策略和例外独立管理 |

比较结果前先核对项目范围与策略；修改 CLI 项目标题不会改变身份，也不会迁移 GitHub App 例外。

### 保留的例外记录

接受漏洞例外前先检查兼容修复，依赖升级须经维护者确认。例外限定为 **In this project → Selected version**，记录集成原因并在升级时复核；忽略质量提醒时继续保留漏洞与许可证检查。

| 依赖                                | 版本      | 保留原因 / 问题                                                                                                |
| ----------------------------------- | --------- | -------------------------------------------------------------------------------------------------------------- |
| `vue`                               | `2.6.14`  | CVE-2024-9506：私有兼容性测试接受风险，Vue 2.6 支持策略变化时复核；Vue 为 peer，不打入库，此例外不覆盖生产应用 |
| `jsdom`                             | `28.1.0`  | 过期质量提醒；已验证的测试环境                                                                                 |
| `@types/node`                       | `22.20.5` | 过期质量提醒；Node 22 工具链基线                                                                               |
| `@atlaskit/pragmatic-drag-and-drop` | `1.8.1`   | 质量提醒；iDux CDK 2.11 使用 1.x API                                                                           |
| `entities`                          | `4.5.0`   | 质量提醒；Markdown 14 依赖范围                                                                                 |
| `lru-cache`                         | `7.18.3`  | 质量提醒；Archive 0.5 默认导出构造器                                                                           |
| `mime`                              | `1.6.0`   | 质量提醒；Less 旧 lookup / charsets API                                                                        |
| `nanoid`                            | `3.3.20`  | 质量提醒；PostCSS 8 依赖范围                                                                                   |
| `shiki`                             | `0.11.1`  | 质量提醒；Archive 0.5 / shiki-processor 旧 API                                                                 |
| `vscode-textmate`                   | `6.0.0`   | 质量提醒；现有 Shiki 集成要求                                                                                  |

以上为具体版本的维护记录，不代表控制台当前状态。FOSSA 质量提醒不支持所有版本自动忽略；调整 Stale Package Prevention 会影响共用该策略的依赖。参见 [FOSSA 质量问题说明](https://docs.fossa.com/docs/quality/reviewing-quality-issues)。

根目录的 `@types/node` 依赖固定到记录中的 Node 22 基线。CI 全新安装时会生成未跟踪的锁文件，使用 `^` 范围可能解析到不在指定版本例外中的其他补丁版本。后续主动升级该固定版本时，应复核 CLI 项目的例外，并继续启用许可证与漏洞检查。
