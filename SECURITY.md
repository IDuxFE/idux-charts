# Security policy / 安全政策

## Supported versions / 支持版本

Security fixes target the latest published stable release. Older releases do not
have a separate security backport commitment; upgrade to the latest stable version.

安全修复以最新已发布的稳定版为目标。旧版本不单独承诺安全补丁回移，请升级至最新稳定版。

Use ECharts 6.1.0 or later and lodash-es 4.18.1 or later for patched dependency
versions. The legacy ECharts 5 compatibility line remains available, but versions
before ECharts 6.1.0 are affected by CVE-2026-45249; compatibility coverage is not
a security guarantee for those legacy dependencies.

修复版本应使用 ECharts 6.1.0 及以上、lodash-es 4.18.1 及以上。
ECharts 5 的历史兼容范围仍保留，但低于 ECharts 6.1.0 的版本受 CVE-2026-45249 影响；
历史版本的兼容性测试不代表其依赖漏洞已修复。

## Reporting a vulnerability / 报告漏洞

Use GitHub's [private vulnerability reporting](https://github.com/IDuxFE/idux-charts/security/advisories/new)
to contact the maintainers. If that entry is unavailable, email the existing IDuxFE
project contact at <idux.feteam@gmail.com> with the subject `iDux Charts security report`.
Do not disclose vulnerability details in public issues or pull requests.

请通过 GitHub 的[私密漏洞报告入口](https://github.com/IDuxFE/idux-charts/security/advisories/new)
联系维护者。如果入口不可用，请发送邮件至 IDuxFE 项目联系邮箱 <idux.feteam@gmail.com>，
主题为 `iDux Charts security report`。请勿在公开 Issue 或 PR 中披露漏洞详情。

Include the affected package and version, Vue/ECharts versions, a minimal
reproduction, the impact, and any suggested mitigation. Remove secrets and
personal data from reproductions. Maintainers will investigate and coordinate
fixes and disclosure with the reporter; no fixed response deadline is promised.

请提供受影响的包和版本、Vue/ECharts 版本、最小复现、影响和可能的缓解方式，
并移除复现中的密钥与个人数据。维护者会调查问题，并与报告者协调修复和披露；不承诺固定响应时限。
