import { mkdtemp, rm } from 'node:fs/promises'
import { tmpdir } from 'node:os'
import { join } from 'node:path'
import { fileURLToPath } from 'node:url'

import { chromium } from '@playwright/test'
import { build, preview } from 'vite'

const configFile = fileURLToPath(new URL('../e2e/fixture/vite.config.ts', import.meta.url))
const outDir = await mkdtemp(join(tmpdir(), 'idux-chart-benchmark-'))
const repetitions = 24
let server
let browser

function percentile(samples, p) {
  const sorted = samples.toSorted((left, right) => left - right)
  return sorted[Math.ceil(p * sorted.length) - 1].toFixed(1)
}

try {
  const config = { configFile, mode: 'benchmark', logLevel: 'error', build: { outDir } }
  await build(config)
  server = await preview({ ...config, preview: { host: '127.0.0.1', port: 0 } })
  browser = await chromium.launch()
  const page = await browser.newPage({ viewport: { width: 1100, height: 640 } })
  await page.goto(`http://127.0.0.1:${server.httpServer.address().port}/benchmark.html`)
  await page.waitForFunction(() => typeof window.runChartBenchmark === 'function')

  const results = []
  for (const points of [1_000, 10_000]) {
    for (const workload of ['line', 'stacked-area-with-gaps']) {
      const samples = await page.evaluate(
        ({ workload, points, repetitions }) =>
          window.runChartBenchmark(workload, points, repetitions),
        { workload, points, repetitions },
      )
      for (const [operation, times] of Object.entries(samples)) {
        results.push({
          workload,
          points,
          operation,
          'p50 ms': percentile(times, 0.5),
          'p95 ms': percentile(times, 0.95),
        })
      }
    }
  }
  console.log(
    `Chromium ${browser.version()}, SVG, three series, ${repetitions} samples per workload`,
  )
  console.table(results)
} finally {
  await browser?.close()
  if (server) await new Promise(resolve => server.httpServer.close(resolve))
  await rm(outDir, { recursive: true, force: true })
}
