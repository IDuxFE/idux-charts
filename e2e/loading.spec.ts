import { test, expect, expectFillsContainer } from './helpers'
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
}) => {
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
  await page.getByTestId('dark').click()
  await expect(page.locator('.ix-chart-loading').first()).toHaveCSS(
    'background-color',
    'rgb(10, 12, 15)',
  )
  await expect
    .poll(async () => (await images.first().getAttribute('src')) !== sources[0])
    .toBe(true)
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
    const chart = page.locator('[data-case="line"] [_echarts_instance_]')
    await expectFillsContainer(chart, '.ix-chart-loading')
    await page.getByTestId('loading').click()
    await expect(page.locator('.ix-chart-loading')).toHaveCount(0)
    expect(await state(page)).toEqual(before)
  }
})

test('loading preserves application positioning, default icons, and blocks legend wheel paging', async ({
  page,
}) => {
  await page.setViewportSize({ width: 1320, height: 1000 })
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
  const row = () => page.evaluate(() => (window as any).loadingLegendRow())
  await expect.poll(row).toBe(0)
  const wheel = async (blocked: boolean) => {
    await pie.scrollIntoViewIfNeeded()
    // Resolve the current glyph after every layout change, including removal of
    // the loading overlay and the neighboring chart's positioning changes.
    const point = await label.evaluate(element => {
      const text = element as SVGTextElement
      const p = new DOMPoint(
        text.x.baseVal.getItem(0).value + text.getComputedTextLength() / 2,
        text.y.baseVal.getItem(0).value,
      ).matrixTransform(text.getScreenCTM()!)
      return { x: p.x, y: p.y }
    })
    const recording = await pie.evaluateHandle(host => {
      const state = { received: false, blocked: false }
      const listener = (event: Event) => {
        if (!(event instanceof WheelEvent) || event.deltaY <= 0) return
        if (!(event.target instanceof Node) || !host.contains(event.target)) return
        state.received = true
        state.blocked =
          event.target instanceof Element && !!event.target.closest('.ix-chart-loading')
        host.ownerDocument.removeEventListener('wheel', listener, true)
      }
      // The outer chart wrapper consumes legend wheels during capture. Observe
      // at document level before that handler, rather than below it on canvas.
      host.ownerDocument.addEventListener('wheel', listener, { capture: true })
      return { state, stop: () => host.ownerDocument.removeEventListener('wheel', listener, true) }
    })
    try {
      await page.mouse.move(point.x, point.y)
      await page.mouse.wheel(0, 120)
      // A negative paging assertion is meaningful only if a real wheel event
      // reached the chart and its target was the overlay being tested.
      await expect.poll(() => recording.evaluate(({ state }) => state.received)).toBe(true)
      expect(await recording.evaluate(({ state }) => state.blocked)).toBe(blocked)
      await page.evaluate(
        () =>
          new Promise<void>(resolve => {
            requestAnimationFrame(() => requestAnimationFrame(() => resolve()))
          }),
      )
    } finally {
      if (!page.isClosed()) await recording.evaluate(({ stop }) => stop())
      await recording.dispose()
    }
  }
  await wheel(true)
  expect(await page.evaluate(() => (window as any).loadingLegendRow())).toBe(0)

  // Simulate application positioning updates while the overlay owns a temporary relative position.
  const positioningHost = page.locator('[data-case="fallback"] [_echarts_instance_]')
  await page.getByTestId('loading').click()
  await expect(images).toHaveCount(0)
  const originalPosition = await positioningHost.evaluate(host => host.style.position)
  await positioningHost.evaluate(host => (host.style.position = 'static'))
  await page.getByTestId('loading').click()
  await expect(images).toHaveCount(12)
  await expect(positioningHost).toHaveCSS('position', 'relative')
  await positioningHost.evaluate(host => (host.style.position = 'absolute'))
  await page.getByTestId('loading').click()
  await expect(images).toHaveCount(0)
  await expect(positioningHost).toHaveCSS('position', 'absolute')
  await positioningHost.evaluate(
    (host, position) => (host.style.position = position),
    originalPosition,
  )
  await wheel(false)
  await expect.poll(row).toBe(1)
  await expect(pie).toHaveAttribute('_echarts_instance_', id!)
})
