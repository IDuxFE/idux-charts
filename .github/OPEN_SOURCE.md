# Open source integrations / 开源集成

These integrations belong to `IDuxFE/idux-charts`. Forks can run normal CI but
do not upload upstream scans or publish packages. Maintainers merge all changes;
none of these integrations enable automatic merging.

以下配置属于上游 `IDuxFE/idux-charts`。Fork 可以执行常规 CI，但不上传上游扫描或发布包。
所有变更由维护者合并，以下配置不启用自动合并。

## What works where / 生效范围

| Integration / 功能                     | Before merge / 合并前                                                      | After merge / 合并后                                                   |
| -------------------------------------- | -------------------------------------------------------------------------- | ---------------------------------------------------------------------- |
| README badges and avatars / 徽章与头像 | Preview the branch README / 分支 README 可预览                             | Default repository README displays them / 默认首页展示                 |
| Coverage / 覆盖率                      | `pnpm test:coverage`; PR CI uploads an artifact / 本地运行、PR CI 上传产物 | Main validation generates the same reports / main 验证生成同样的报告   |
| CodeQL                                 | Runs on PRs to upstream main / 上游 PR 执行                                | Runs on main pushes and weekly / main 推送和每周执行                   |
| Issue and PR templates / 模板          | YAML and Markdown can be checked locally / 可检查本地文件                  | GitHub uses templates from the default branch / 默认分支合并后正式使用 |
| Dependabot                             | Review configuration / 检查配置                                            | Weekly dependency update PRs / 每周提交依赖升级 PR                     |
| Codecov                                | Requires app authorization and credentials / 需 App 授权和凭证             | Uploads when explicitly enabled / 显式启用后上传                       |
| FOSSA                                  | Review configuration; no PR execution / 检查配置，不在 PR 执行             | Main-only scans when explicitly enabled / 显式启用后扫描 main          |

GitHub settings such as private vulnerability reporting and Dependabot security
alerts take effect independently of merging configuration files. Verify settings
in the upstream repository; their state is not stored in Git.

私密漏洞报告和 Dependabot 安全告警等仓库设置不依赖配置文件合并；
请在上游仓库确认，这些设置状态不会存储在 Git 中。

## Coverage and Codecov / 覆盖率

Vitest and `@vitest/coverage-v8` are pinned to the same version and grouped for
Dependabot updates. `pnpm check:ci` replaces the ordinary unit-test invocation
with coverage collection, so CI does not run the same unit suite twice.

Vitest 与覆盖率插件保持相同的精确版本，由 Dependabot 分组升级。
`pnpm check:ci` 以覆盖率测试替换普通单测，不重复运行同一套测试。

```sh
pnpm test:coverage
```

Reports are written to `coverage/index.html`, `coverage/lcov.info`, and
`coverage/coverage-summary.json`. All public library source is eligible, including
untested files; type declarations, tests, build configuration, and generated
output are excluded. The site and playgrounds are outside this unit coverage
scope. CI retains the full report as `unit-coverage-*` for seven days, including
reports produced during a failed check. Missing reports fail the artifact step.

报告位于以上三个路径。公共库源码包含未测试文件；类型声明、测试、构建配置和生成产物不参与统计，
文档站和 playground 不在单元覆盖率范围。CI 将完整报告保留七天，检查失败时也尽量保留；
缺失报告会使上传产物步骤失败。

To activate Codecov:

1. Install the [Codecov GitHub App](https://github.com/apps/codecov) for
   `IDuxFE/idux-charts` and activate the repository in Codecov.
2. Save the repository upload token in the upstream Actions secret `CODECOV_TOKEN`.
   Use GitHub's secret UI or `gh secret set CODECOV_TOKEN --repo IDuxFE/idux-charts`;
   do not paste the token into source, issues, or pull requests.
3. Set the upstream Actions variable `CODECOV_ENABLED=true` only after setup.
4. Run CI and confirm a main-branch report arrives. The reusable main validation
   explicitly receives only the Codecov secret. Public fork PRs use the action's
   tokenless fork support; Dependabot uploads use a `dependabot:` branch prefix.
   Neither receives an Actions secret.
5. Add the Codecov-provided badge to both READMEs once it displays real coverage.

启用 Codecov：为上游仓库安装 App 并激活仓库，将上传令牌存为 `CODECOV_TOKEN` Secret，
完成后设置 `CODECOV_ENABLED=true`。确认 main 报告成功接收后，再同步添加中英文徽章。
Fork 和 Dependabot PR 不获取上传令牌，使用公开仓库的无令牌分支上传，同时保留可下载报告。

`codecov.yml` reports project and changed-code coverage as informational results.
There is no invented percentage gate or automatic merge policy. Once a stable
baseline is established, maintainers can review a separate threshold change.
With uploads enabled, upload errors fail the check rather than silently hiding
broken integration.

当前覆盖率仅提供信息，不设置未经验证的百分比门槛。基线稳定后可单独评审门槛。
启用后的上传失败会使检查失败，不会隐藏接入故障。

## Dependency updates / 依赖更新

`.github/dependabot.yml` checks npm manifests for the workspace and both
independent playgrounds, plus GitHub Actions. Updates run weekly on Monday
(Asia/Shanghai), with grouped minor/patch updates and a separate Vitest group.
Actions and npm PR counts are limited to avoid flooding the review queue.

Dependabot 每周一按上海时区检查工作区、两个独立 playground 和 GitHub Actions，
合并次版本、补丁版本更新，并将 Vitest 单独分组；限制并发 PR 数量。

Playwright updates are deliberately excluded: upgrade the root, Vue 2, and Vue 3
copies together and review screenshot changes as described in
[CI and releases](RELEASING.md). TypeScript major upgrades are also excluded
because declaration tooling depends on the TypeScript 6 compiler API.

Playwright 继续人工同步升级三个精确版本并评审截图基线；TypeScript 主版本升级也保留人工评审。

Lockfiles remain untracked. Dependabot's manifest updates do not provide a
complete, committed transitive dependency graph; inspect security alerts and
actual install/CI results rather than treating an empty alert list as proof that
all resolved dependencies are safe. Security updates additionally require the
repository's dependency graph, Dependabot alerts, and security updates settings.

锁文件继续不纳入版本管理，因此清单更新不等于完整的间接依赖审计。
安全更新还需要仓库的依赖图、安全告警和安全更新设置；结合实际安装和 CI 判断。

## CodeQL and private reports / 安全扫描与私密报告

`codeql.yml` uses the JavaScript/TypeScript analyzer without installing or
executing project dependencies. It runs on PRs, main pushes, a weekly schedule,
and manual dispatch. Findings appear under the upstream repository's security
code scanning alerts. This is advanced setup; do not also enable default setup
for the same language. Review the first successful scan before requiring its
check in branch protection.

CodeQL 不安装或执行项目依赖，扫描 JS/TS；支持 PR、main 推送、每周和手动执行。
这是高级配置，不要为相同语言重复开启默认配置。首轮成功后再决定是否设为分支保护必需检查。

[SECURITY.md](../SECURITY.md) points to GitHub's private reporting entry and the
existing IDuxFE contact mailbox as fallback. Enable **Private vulnerability
reporting** in the upstream security settings. The same existing public project
mailbox is the conduct contact; no response SLA or additional support address
has been invented.

安全政策使用 GitHub 私密报告入口，现有 IDuxFE 项目邮箱作为备用；行为准则使用相同联系邮箱。
需在上游安全设置启用私密报告，不额外承诺响应时限。

## FOSSA / 依赖许可证扫描

FOSSA is opt-in because it needs an organization account and API key:

1. Sign in to [FOSSA](https://app.fossa.com) and use the intended organization.
   Import the upstream repository or let its first authenticated CLI scan create
   the project. Confirm that it identifies the upstream Git URL.
2. Set the upstream Actions secret `FOSSA_API_KEY` to an API key permitted to
   analyze the project and read scan results (`fossa test` needs read access).
3. Configure the intended license policy in FOSSA, then set the upstream Actions
   variable `FOSSA_ENABLED=true`.
4. After merging, manually run **FOSSA** on main and inspect discovered packages
   and the dependency graph. An empty scan is not evidence of compliance.
5. Copy the project's status badge or large-card Markdown from FOSSA settings
   into both READMEs after a valid scan. Its URL depends on the registered project;
   do not fabricate a success badge before onboarding is complete.

FOSSA 需先登录组织账号，导入上游仓库并配置许可证策略；将有分析和读取权限的 API Key
存为 `FOSSA_API_KEY`，再设置 `FOSSA_ENABLED=true`。合并后在 main 手动执行并检查依赖图，
确认不是空扫描后，复制实际项目卡片到两份 README。

The workflow generates an ignored, scan-only pnpm lockfile from the installed
workspace. `.fossa.yml` excludes independent playgrounds; the workspace includes
the public packages, documentation app, and development dependencies. Scheduled
scans re-resolve the declared ranges, matching the repository's existing install
policy. `fossa test` fails the FOSSA job when its configured policy finds issues;
it is not added to the release workflow or required checks automatically.
No FOSSA secret is exposed to pull-request code.

扫描会生成不纳入版本管理的临时 pnpm 锁文件，覆盖公共包、文档站及开发依赖，排除独立 playground。
定时扫描按照现有策略重新解析版本范围。违反配置策略时 FOSSA 任务失败，
但不会自动加入发布流程或分支保护必需检查；PR 代码不获取 FOSSA 凭证。
