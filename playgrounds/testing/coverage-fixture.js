import { mkdir, writeFile } from 'node:fs/promises'
import { randomUUID } from 'node:crypto'
import { fileURLToPath } from 'node:url'
import { prepareBrowser } from '../../e2e/browserStartup.ts'

/** Keep each test's counters separate so parallel workers never overwrite them. */
export function createCoverageTest(base) {
  return base.extend({
    browserStartup: [
      async ({ browser, browserName }, use, workerInfo) => {
        await prepareBrowser(browser, browserName, workerInfo)
        await use()
      },
      { scope: 'worker', auto: true },
    ],
    page: async ({ page }, use, testInfo) => {
      if (process.env.CHARTS_COVERAGE !== '1') return use(page)
      const project = testInfo.config.rootDir.includes('/vue2/') ? 'vue2' : 'vue3'
      const directory = fileURLToPath(
        new URL(`../../coverage/playgrounds/${project}/`, import.meta.url),
      )
      await mkdir(directory, { recursive: true })
      let collected = false
      const save = async coverage => {
        if (!coverage || !Object.keys(coverage).length) return
        collected = true
        await writeFile(`${directory}/${randomUUID()}.json`, JSON.stringify({ project, coverage }))
      }
      await page.exposeFunction('__saveChartsCoverage', save)
      await page.addInitScript(() => {
        window.addEventListener('beforeunload', () =>
          window.__saveChartsCoverage(window.__coverage__),
        )
      })
      try {
        await use(page)
      } finally {
        if (!page.isClosed()) await save(await page.evaluate(() => window.__coverage__))
      }
      if (!collected)
        throw new Error('Missing playground coverage; prepare packages with CHARTS_COVERAGE=1')
    },
  })
}
