import { defineConfig, devices } from '@playwright/test'

import { fixtureBaseURL, isCI, serverHost, siteBaseURL, sitePreviewPort } from './e2e/environment'

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
  reporter: [['html', { open: 'never' }]],
  use: {
    screenshot: 'only-on-failure',
    baseURL: siteBaseURL,
    trace: isCI ? 'on-first-retry' : 'retain-on-failure',
  },
  projects: [
    { name: 'chromium', use: { ...devices['Desktop Chrome'] } },
    { name: 'firefox', use: { ...devices['Desktop Firefox'] } },
    { name: 'webkit', use: { ...devices['Desktop Safari'] } },
  ],
  webServer: [
    {
      // A fresh production preview avoids HMR/reoptimization during concurrent
      // library builds and never attaches tests to a developer's running server.
      command: guardedServer(
        `pnpm build:site && pnpm preview --host ${serverHost} --port ${sitePreviewPort} --strictPort`,
      ),
      url: siteBaseURL,
      reuseExistingServer: false,
      timeout: 180_000,
    },
    {
      command: guardedServer(
        'pnpm exec vite build --config e2e/fixture/vite.config.ts && pnpm exec vite preview --config e2e/fixture/vite.config.ts',
      ),
      url: fixtureBaseURL,
      reuseExistingServer: false,
      timeout: 120_000,
    },
  ],
})
