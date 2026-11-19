# Contributing to iDux Charts

English | [简体中文](CONTRIBUTING.zh.md)

Bug reports, documentation improvements, tests, and code contributions are welcome.
Please follow our [Code of Conduct](CODE_OF_CONDUCT.md). Report vulnerabilities
privately using the [security policy](SECURITY.md).

## Getting started

Use Node.js 22.14+ (22.x), 24.x or 26+, and pnpm 10+. Fork the repository and
create a feature branch from `IDuxFE/idux-charts:main`.

```sh
pnpm install
pnpm start
```

Open <http://localhost:8080/> for the documentation site. Public library code lives
in `packages/core`, `packages/plots`, and `packages/charts`; examples live in
`packages/site`. Independent Vue 2 and Vue 3 consumers live in `playgrounds`.

## Before opening a pull request

Keep each pull request focused. Describe the problem, resulting behavior, and
validation in English; issues and discussions may use English or Chinese.

```sh
pnpm check
pnpm build:lib
```

Add regression coverage for behavior changes. Run relevant Playwright tests for
browser or visual changes and review intentional screenshot changes. Close any
browser sessions you start. For public API changes, verify the packed consumers
with `pnpm test:declarations`; use `--runtime` for browser runtime validation.
See [CI and releases](.github/RELEASING.md) for the complete compatibility matrix,
visual baseline workflow, and browser test commands.

Keep English and Chinese documentation synchronized. Run `pnpm changelog` for
changes that affect published package behavior. Documentation, tests, and tooling
alone normally do not require a changeset. Do not manually edit package versions
or generated changelogs.

`pnpm test:coverage` generates a terminal summary, `coverage/index.html`, LCOV,
and JSON summary for the public library source, including untested files.
Coverage does not include the documentation app, playgrounds, or browser tests.
Local Git hooks check staged files before commits and lint/types before pushes;
CI runs the broader checks described in the release guide.

Open your PR against `IDuxFE/idux-charts:main`. Maintainers review and merge PRs;
automation proposes dependency and release changes but does not merge them.
