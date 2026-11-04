# Chart Compatibility Playgrounds

English | [简体中文](README.zh.md)

`vue2` uses Vue 2.6.14 with Composition API, and `vue3` uses Vue 3. Each application is an independent pnpm workspace with its own dependencies, lockfile, build configuration, and E2E tests. Neither inherits the root application configuration.

Both applications use Vite 8 and require Node.js >= 22.12.0 and pnpm >= 9.

pnpm 9 reads local tarball overrides from each application's `package.json#pnpm.overrides`; newer versions read them from `pnpm-workspace.yaml`. Keep both in sync, along with the peer dependency settings in `.npmrc` and the workspace configuration. Overrides target transitive dependencies only, preserving relative paths for frozen installs with pnpm 9.0.0. pnpm 9/10 allows required install scripts through `package.json#pnpm.onlyBuiltDependencies`; pnpm 11 uses `allowBuilds` in the workspace configuration.

## First run / Verify local changes

Run from the repository root:

```sh
pnpm playgrounds:prepare
```

This builds the libraries, packages core, plots, and charts, copies the tarballs into both applications' `vendor/` directories, and installs each application separately. All chart dependencies, including transitive dependencies, resolve through local tarballs without linking source files or the parent `node_modules`. Run this command again after changing the libraries to avoid testing outdated artifacts.

Then run either application independently:

```sh
cd playgrounds/vue2 # or playgrounds/vue3
pnpm dev
pnpm build
pnpm exec playwright install chromium # Install the browser on first use
pnpm test:e2e
```

The examples include bar, line, and pie charts, with controls for data and title updates, adding and removing attributes, loading, theme switching, width changes, and unmounting/remounting.

## Automated regression tests

```sh
# Repository root: package and install the latest code, then run both E2E suites
pnpm test:playgrounds

# Full suite: existing unit tests, site E2E tests, and both playgrounds
pnpm test
```

E2E tests run Chromium against production builds to verify actual SVG rendering, ECharts options, data updates, dynamic attributes, loading, theme recreation, resizing, click events, and remounting. They also collect page and console errors. Each application generates its own HTML report with screenshots after theme switching, retaining screenshots and traces on failure. Visual tests maintain default and dark theme baselines for bar, line, and pie charts: 12 screenshots across both applications. Comparisons use `toHaveScreenshot` with a maximum pixel difference ratio of 0.5%, matching the existing site tests.

Do not commit application lockfiles, `vendor/`, build artifacts, or test output. The root workspace, lint, and format commands exclude the playgrounds. Root tests invoke their independent suites explicitly. Do not add workspace dependencies, source aliases, or linked library directories to these applications.

## Update visual baselines

Screenshots live in each application's `e2e/visual.spec.js-snapshots/` directory and should be committed. Normal tests only compare screenshots; they do not accept changes automatically. After confirming that a visual change is expected, run this in the relevant application directory:

```sh
pnpm test:e2e:update
```

Review the updated screenshots before committing. Do not update baselines to bypass unexpected regressions. Screenshot filenames include browser and operating system identifiers; comparisons require the same operating system and browser version. Generate and review separate baselines when adding a new platform.

## CI conventions

The site, behavior test fixture, and both playground E2E suites build first, then start independent preview servers. Local and CI runs use the same mode without reusing development servers or enabling HMR. The site is served under `/common/idux-charts/`. Playwright manages the servers.

Install root dependencies first, then install the browsers and system dependencies required by the pinned Playwright version:

```sh
pnpm exec playwright install --with-deps
CI=true pnpm test
```

If you need a download mirror, you can try [npmmirror](https://registry.npmmirror.com/-/binary/playwright) by setting `PLAYWRIGHT_DOWNLOAD_HOST` for the install command:

```sh
PLAYWRIGHT_DOWNLOAD_HOST=https://registry.npmmirror.com/-/binary/playwright pnpm exec playwright install chromium
```

`pnpm test` handles library packaging, dependency installation for both independent playgrounds, application builds, unit tests, behavior tests, and screenshot comparisons. There is no need to run `pnpm start` beforehand. Pin Node.js, pnpm, Playwright, the operating system, and fonts in CI.

The committed screenshot baselines currently target macOS (`darwin`). For Linux CI, generate and review baselines for the site and both playgrounds in the pinned Linux environment first. Do not rename macOS screenshots as Linux baselines. Normal CI runs must not pass `--update-snapshots`. Archive `playwright-report/` and `test-results/` from the repository root and both playgrounds as test artifacts.
