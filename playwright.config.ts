import { defineConfig, devices } from '@playwright/test'

import { fixtureBaseURL, isCI, serverHost, siteBaseURL, sitePreviewPort } from './e2e/environment'

const prebuilt = process.env.IDUX_E2E_PREBUILT === '1'
const target = process.env.IDUX_E2E_TARGET
if (target && target !== 'site' && target !== 'fixture') {
  throw new Error('IDUX_E2E_TARGET must be site or fixture')
}

function guardedServer(command: string) {
  // exec preserves the process-group leader PID assigned by Playwright.
  const exec = process.platform === 'win32' ? '' : 'exec '
  return `${exec}node scripts/e2e-web-server.mjs ${process.pid} "${command}"`
}

export default defineConfig({
  testDir: './e2e',
  timeout: 30_000,
  expect: { timeout: 10_000 },
  forbidOnly: isCI,
  retries: isCI ? 2 : 0,
  failOnFlakyTests: false,
  fullyParallel: true,
  workers: isCI ? 2 : 4,
  reporter: [
    ['list'],
    ['html', { open: 'never' }],
    ['json', { outputFile: 'test-results/results.json' }],
  ],
  use: {
    screenshot: 'only-on-failure',
    baseURL: siteBaseURL,
    trace: isCI ? 'on-first-retry' : 'retain-on-failure',
  },
  projects: [
    // Chromium/Firefox fresh-page setup competes for memory on CI. Keep their
    // per-project cap in local runs too; WebKit retains the global worker budget.
    { name: 'chromium', workers: 1, use: { ...devices['Desktop Chrome'] } },
    { name: 'firefox', workers: 1, use: { ...devices['Desktop Firefox'] } },
    { name: 'webkit', use: { ...devices['Desktop Safari'] } },
  ],
  webServer: [
    ...(target === 'fixture'
      ? []
      : [
          {
            // A fresh production preview avoids HMR/reoptimization during concurrent
            // library builds and never attaches tests to a developer's running server.
            command: guardedServer(
              `${prebuilt ? '' : 'pnpm build:site && '}pnpm preview --host ${serverHost} --port ${sitePreviewPort} --strictPort`,
            ),
            url: siteBaseURL,
            reuseExistingServer: false,
            timeout: 180_000,
          },
        ]),
    ...(target === 'site'
      ? []
      : [
          {
            command: guardedServer(
              `${prebuilt ? '' : 'pnpm exec vite build --config e2e/fixture/vite.config.ts && '}pnpm exec vite preview --config e2e/fixture/vite.config.ts`,
            ),
            url: fixtureBaseURL,
            reuseExistingServer: false,
            timeout: 120_000,
          },
        ]),
  ],
})
