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

### Combined unit and playground coverage / 单测与 Playground 综合覆盖率

```sh
pnpm test:coverage:all
# Rebuild reports from the current run's collected data:
pnpm coverage:merge
```

The full command runs unit coverage, builds and packs coverage-enabled libraries,
then runs both Vue 2 and Vue 3 Chromium playground suites. It retains the unit
report at `coverage/index.html` and writes the combined report to
`coverage/combined/index.html`. Both contain HTML, LCOV, JSON counters and a JSON
summary. Per-test browser counters are stored under `coverage/playgrounds/`.
The regular `pnpm test:coverage` command continues to produce unit coverage only.

Coverage builds opt in with `CHARTS_COVERAGE=1`. The shared library build plugin
instruments modules after TypeScript compilation and records source maps, so
packaged browser execution is mapped back to the same library sources as unit
tests. Normal builds do not include counters. Playground application code and
third-party dependencies are excluded. Collection runs in fixture teardown,
including failed tests, and flushes before navigation. A missing instrumented
build fails the test instead of emitting an empty report.

CI keeps unit and combined reports as separate artifacts. A merge job downloads
the unit and both playground results, normalizes source paths across runners,
and rejects missing Vue versions or a changed coverage denominator. The existing
Codecov upload continues to use the unit report. A failed test run does not
produce a successful combined-coverage check.

完整命令保留 `coverage/index.html` 单测报告，并生成
`coverage/combined/index.html` 综合报告；`pnpm test:coverage` 仍只运行单测。
覆盖率构建使用 `CHARTS_COVERAGE=1`，正常构建不插入计数器。浏览器采集统计打包后
实际执行的库源码，经 source map 回溯后合并，不将示例和第三方依赖加入分母。
CI 分别保留两份报告；缺少任一 Vue 版本数据或合并后分母变化都会报错。
现有 Codecov 上传继续采用单测报告。

To activate Codecov:

1. Install the [Codecov GitHub App](https://github.com/apps/codecov) for
   `IDuxFE/idux-charts` and activate the repository in Codecov.
2. Save the repository upload token in the upstream Actions secret `CODECOV_TOKEN`.
   Use GitHub's secret UI or `gh secret set CODECOV_TOKEN --repo IDuxFE/idux-charts`;
   do not paste the token into source, issues, or pull requests.
3. Set the upstream Actions variable `CODECOV_ENABLED=true` after setup to enable
   uploads from trusted branch pushes and main validation. Upstream pull requests
   attempt uploads directly because fork PRs cannot read upstream configuration
   variables; public fork PRs do not require the upload token.
4. Run CI and confirm a main-branch report arrives. The reusable main validation
   explicitly receives only the Codecov secret. Public fork PRs use the action's
   tokenless fork support; Dependabot uploads use a `dependabot:` branch prefix.
   Neither receives an Actions secret.
5. Add the Codecov-provided badge to both READMEs once it displays real coverage.

启用 Codecov：为上游仓库安装 App 并激活仓库，将上传令牌存为 `CODECOV_TOKEN` Secret，
完成后设置 `CODECOV_ENABLED=true`。确认 main 报告成功接收后，再同步添加中英文徽章。
上游 PR 直接尝试上传，不依赖 fork PR 无法读取的上游配置变量；`CODECOV_ENABLED` 控制可信分支推送和 main 验证的上传。
Fork 和 Dependabot PR 不获取上传令牌，使用公开仓库的无令牌分支上传，同时保留可下载报告。

`codecov.yml` reports project and changed-code coverage as informational results.
There is no invented percentage gate or automatic merge policy. Once a stable
baseline is established, maintainers can review a separate threshold change.
With uploads enabled, upload errors fail the check rather than silently hiding
broken integration.

当前覆盖率仅提供信息，不设置未经验证的百分比门槛。基线稳定后可单独评审门槛。
启用后的上传失败会使检查失败，不会隐藏接入故障。

## Dependency updates / 依赖更新

`.github/dependabot.yml` checks npm manifests for the workspace, plus GitHub
Actions. Both independent playgrounds are excluded. Updates run weekly on Monday
(Asia/Shanghai), with grouped minor/patch updates and a separate Vitest group.
Actions and npm PR counts are limited to avoid flooding the review queue.

Dependabot 每周一按上海时区检查工作区和 GitHub Actions，排除两个独立 playground，
合并次版本、补丁版本更新，并将 Vitest 单独分组；限制并发 PR 数量。

Playwright updates are deliberately excluded: upgrade the root, Vue 2, and Vue 3
copies together and review screenshot changes as described in
[CI and releases](RELEASING.md). TypeScript major upgrades are also excluded
because declaration tooling depends on the TypeScript 6 compiler API.

Playwright 继续人工同步升级三个精确版本并评审截图基线；TypeScript 主版本升级也保留人工评审。

The playground entry explicitly ignores all dependencies, including security
update PRs; setting its version PR limit to zero alone would not disable security
updates. Security alerts remain visible for manual evaluation. Dependabot branch
pushes skip CI because its pull requests already run the complete CI matrix.

playground 条目明确忽略所有依赖的自动升级 PR，包含安全升级；仅将版本 PR 数量设为零无法禁用安全升级。
安全告警仍保留供人工评估。Dependabot 分支推送不重复触发 CI，其 PR 仍执行完整检查。

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

### Compatibility and test-only exceptions / 兼容性与测试依赖例外

Keep Vue 2.6.14 in the private Vue 2 playground and packed-consumer fixtures.
Do not upgrade that fixture to Vue 3 to clear a security warning: it verifies an
explicitly supported consumer environment. Vue is a peer dependency and is not
bundled into the published chart packages.

For CVE-2024-9506 on `vue@2.6.14`, record an accepted-risk exception in FOSSA using
**In this project → Selected version**, scoped to that CVE only. Explain that the
version is intentionally retained in non-production compatibility fixtures, and
review the exception when the Vue 2.6 support policy changes. This is not a claim
that production applications using Vue 2 are unaffected.

For the `Outdated version` quality issues on `jsdom@28.1.0` and
`@types/node@22.20.5`, select the individual issue rows and use
**Actions → Ignore → In this project → Selected version**. These versions belong
to the validated test environment and Node.js 22 tooling baseline. Keep security
issue scanning enabled. If the package version changes, review the new warning
rather than hiding all future issues for the package.

FOSSA quality issues do not support all-version auto-ignore rules. To change
project-wide outdated-version enforcement, adjust the project's quality policy
and its Stale Package Prevention rule where the account plan permits it. That
policy change affects all dependencies using the policy, not just these two
test tools. See [Reviewing quality issues](https://docs.fossa.com/docs/quality/reviewing-quality-issues).

私有 Vue 2 playground 和打包消费端保留 Vue 2.6.14，用于验证旧版本兼容性；
Vue 作为 peer dependency，不打入已发布图表包。
在 FOSSA 中仅为 `vue@2.6.14` 的 CVE-2024-9506 记录“接受兼容性测试风险”例外，
范围选当前项目和当前版本，并在 Vue 2.6 支持策略变更时复核；这不代表生产环境使用 Vue 2 没有风险。

`jsdom@28.1.0`、`@types/node@22.20.5` 的过期质量提醒同样按具体问题、当前项目、当前版本忽略，
原因分别为已验证的测试环境和 Node.js 22 工具链基线。保留安全扫描，版本变化后重新评估提醒。
质量问题不支持“所有版本自动忽略”；如需改变整个项目的过期版本检查，在套餐权限允许时调整项目质量策略的
Stale Package Prevention 规则。该策略会影响使用它的全部依赖，不仅这两个测试工具。

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
