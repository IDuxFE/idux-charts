import { defineConfig } from '@playwright/test'
export default defineConfig({
  forbidOnly: !!process.env.CI,
  testDir: './e2e',
  projects: [{ name: 'chromium', use: { browserName: 'chromium' } }],
  fullyParallel: true,
  workers: 2,
  reporter: [['list'], ['html', { open: 'never' }]],
  retries: process.env.CI ? 1 : 0,
  failOnFlakyTests: !!process.env.CI,
  use: {
    viewport: { width: 1280, height: 900 },
    deviceScaleFactor: 1,
    colorScheme: 'light',
    baseURL: 'http://127.0.0.1:5183',
    trace: process.env.CI ? 'on-first-retry' : 'retain-on-failure',
    screenshot: 'only-on-failure',
  },
  webServer: {
    command: 'pnpm build && pnpm preview --port 5183 --strictPort',
    url: 'http://127.0.0.1:5183',
    reuseExistingServer: false,
  },
})
