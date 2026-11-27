import { test as base } from '@playwright/test'
import { prepareBrowser } from './browserStartup'

export const test = base.extend<{}, { browserStartup: void }>({
  browserStartup: [
    async ({ browser, browserName }, use, workerInfo) => {
      await prepareBrowser(browser, browserName, workerInfo)
      await use()
    },
    { scope: 'worker', auto: true },
  ],
})
export { expect } from '@playwright/test'
