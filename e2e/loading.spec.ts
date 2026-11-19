import { test, expect } from './helpers'
import { fixtureBaseURL } from './environment'

const state = (page: import('@playwright/test').Page) =>
  page.evaluate(() => (window as any).loadingState())

test('useChart demo toggles the generic loading state without replacing the chart', async ({
  page,
}) => {
  await page.goto('components/core')
  const demo = page.locator('.archive-app-demo').filter({
    has: page.getByRole('heading', { name: /^函数用法\s*#?\s*$/ }),
  })
  const chart = demo.locator('[_echarts_instance_]')
  await expect(chart.locator('svg')).toBeVisible()
  const instance = await chart.getAttribute('_echarts_instance_')
  const toggle = demo.getByRole('button', { name: '加载中', exact: true })
  await toggle.click()
  const overlay = chart.locator('.ix-chart-loading')
  await expect(overlay).toBeVisible()
  await expect(overlay).toHaveText('图表正在加载中，请稍后...')
  await expect(overlay).toHaveCSS('gap', '0px')
  await expect
    .poll(() => overlay.locator('img').evaluate(image => (image as HTMLImageElement).naturalWidth))
    .toBe(90)
  await toggle.click()
  await expect(overlay).toHaveCount(0)
  await expect(chart).toHaveAttribute('_echarts_instance_', instance!)
})

test('all loading illustrations render, adapt to dark mode, and work before data arrives', async ({
  page,
}, testInfo) => {
  await page.setViewportSize({ width: 1320, height: 900 })
  await page.goto(`${fixtureBaseURL}/?loading`)
  const images = page.locator('.ix-chart-loading img')
  await expect(images).toHaveCount(12)
  for (const image of await images.all()) {
    await expect(image).toBeVisible()
    await expect.poll(() => image.evaluate(el => (el as HTMLImageElement).naturalWidth)).toBe(90)
  }
  const sources = await images.evaluateAll(elements =>
    elements.map(el => (el as HTMLImageElement).src),
  )
  expect(new Set(sources).size).toBe(11)
  await page.screenshot({ path: testInfo.outputPath('loading-light.png'), fullPage: true })
  await page.getByTestId('dark').click()
  await expect(page.locator('.ix-chart-loading').first()).toHaveCSS(
    'background-color',
    'rgb(10, 12, 15)',
  )
  await expect
    .poll(async () => (await images.first().getAttribute('src')) !== sources[0])
    .toBe(true)
  await page.screenshot({ path: testInfo.outputPath('loading-dark.png'), fullPage: true })
  const ids = await state(page)
  await page.getByTestId('empty').click()
  await expect(images).toHaveCount(12)
  expect(Object.keys(await state(page))).toHaveLength(12)
  for (const [name, current] of Object.entries(await state(page))) {
    expect((current as any).id).toBe(ids[name].id)
  }
  await page.getByTestId('loading').click()
  await expect(images).toHaveCount(0)
})

test('loading preserves zoom, legend selection and instances through repeated toggles and resize', async ({
  page,
}) => {
  await page.goto(`${fixtureBaseURL}/?loading`)
  await expect(page.locator('.ix-chart-loading')).toHaveCount(12)
  await page.getByTestId('loading').click()
  await page.evaluate(() => (window as any).selectLoadingInteractions())
  const before = await state(page)
  for (let i = 0; i < 3; i++) {
    await page.getByTestId('loading').click()
    await expect(page.locator('.ix-chart-loading')).toHaveCount(12)
    await page.setViewportSize({ width: 1100 + i * 20, height: 850 })
    const loading = page.locator('[data-case="line"] .ix-chart-loading')
    const chart = page.locator('[data-case="line"] [_echarts_instance_]')
    expect(await loading.boundingBox()).toEqual(await chart.boundingBox())
    await page.getByTestId('loading').click()
    await expect(page.locator('.ix-chart-loading')).toHaveCount(0)
    expect(await state(page)).toEqual(before)
  }
})

test('loading preserves application positioning, default icons, and blocks legend wheel paging', async ({
  page,
}) => {
  await page.goto(`${fixtureBaseURL}/?loading`)
  const images = page.locator('.ix-chart-loading img')
  await expect(images).toHaveCount(12)
  const sources = () =>
    images.evaluateAll(elements => elements.map(el => (el as HTMLImageElement).src))
  const defaults = await sources()
  await page.evaluate(() => (window as any).setLoadingRegressionInputs())
  await expect.poll(sources).toEqual(defaults)
  const custom = `data:image/svg+xml,${encodeURIComponent('<svg xmlns="http://www.w3.org/2000/svg" width="90" height="90"><circle cx="45" cy="45" r="30" fill="orange"/></svg>')}`
  await page.evaluate(icon => (window as any).setLoadingIcon(icon), custom)
  await expect.poll(sources).toEqual(Array(12).fill(custom))
  await page.evaluate(() => (window as any).setLoadingIcon(undefined))
  await expect.poll(sources).toEqual(defaults)

  const pie = page.locator('[data-case="pie"] [_echarts_instance_]')
  const id = await pie.getAttribute('_echarts_instance_')
  const label = pie.locator('svg text').filter({ hasText: /^Legend 0$/ })
  await expect(label).toBeAttached()
  const box = (await label.boundingBox())!
  const wheel = () =>
    pie.evaluate(
      (host, point) => {
        const target = document.elementFromPoint(point.x, point.y)!
        target.dispatchEvent(
          new WheelEvent('wheel', {
            bubbles: true,
            cancelable: true,
            deltaY: 120,
            clientX: point.x,
            clientY: point.y,
          }),
        )
      },
      { x: box.x + box.width / 2, y: box.y + box.height / 2 },
    )
  await wheel()
  await page.evaluate(() => new Promise<void>(resolve => requestAnimationFrame(() => resolve())))
  expect(await page.evaluate(() => (window as any).loadingLegendRow())).toBe(0)

  // Simulate application positioning updates while the overlay owns a temporary relative position.
  const area = page.locator('[data-case="area"] [_echarts_instance_]')
  await area.evaluate(host => (host.style.position = 'absolute'))
  await page.getByTestId('loading').click()
  await expect(images).toHaveCount(0)
  await expect(area).toHaveCSS('position', 'absolute')
  await area.evaluate(host => (host.style.position = ''))
  await wheel()
  await expect.poll(() => page.evaluate(() => (window as any).loadingLegendRow())).toBe(1)
  await expect(pie).toHaveAttribute('_echarts_instance_', id!)
})
