import { fileURLToPath } from 'node:url'
import { defineConfig } from '@playwright/test'
export default defineConfig({
  globalSetup:
    process.env.CHARTS_COVERAGE === '1'
      ? fileURLToPath(new URL('../testing/coverage-setup.js', import.meta.url))
      : undefined,
  forbidOnly: !!process.env.CI,
  testDir: './e2e',
  projects: [{ name: 'chromium', use: { browserName: 'chromium' } }],
  fullyParallel: true,
  workers: process.env.CI ? 1 : 4,
  reporter: [
    ['list'],
    ['html', { open: 'never' }],
    ['json', { outputFile: 'test-results/results.json' }],
  ],
  retries: process.env.CI ? 1 : 0,
  failOnFlakyTests: false,
  use: {
    viewport: { width: 1280, height: 900 },
    deviceScaleFactor: 1,
    colorScheme: 'light',
    baseURL: 'http://127.0.0.1:5182',
    trace: process.env.CI ? 'on-first-retry' : 'retain-on-failure',
    screenshot: 'only-on-failure',
  },
  webServer: {
    command: 'pnpm build && pnpm preview --port 5182 --strictPort',
    url: 'http://127.0.0.1:5182',
    reuseExistingServer: false,
  },
})
