import { mkdir, writeFile } from 'node:fs/promises'
import { join } from 'node:path'
import { performance } from 'node:perf_hooks'
import type { Browser, WorkerInfo } from '@playwright/test'

/** Initialize only the browser engine; application loading stays inside each test. */
export async function prepareBrowser(browser: Browser, browserName: string, info: WorkerInfo) {
  if (browserName === 'webkit') return
  const started = performance.now()
  const context = await browser.newContext()
  try {
    const page = await context.newPage()
    if (page.url() !== 'about:blank')
      throw new Error('Browser preparation must stay on about:blank')
  } finally {
    await context.close()
  }
  const duration = performance.now() - started
  const directory = join(info.project.outputDir, 'browser-startup')
  await mkdir(directory, { recursive: true })
  await writeFile(
    join(directory, `${info.workerIndex}.json`),
    JSON.stringify({ project: info.project.name, browserName, worker: info.workerIndex, duration }),
  )
  process.stdout.write(
    `Browser engine preparation (${browserName}, worker ${info.workerIndex}): ${(duration / 1000).toFixed(3)}s\n`,
  )
}
