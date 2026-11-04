import { test, expect } from '@playwright/test'

test('renders charts and preserves dynamic behavior', async ({ page }, testInfo) => {
  const errors = []
  page.on('pageerror', error => errors.push(error.message))
  page.on('console', message => {
    if (message.type() === 'error') errors.push(message.text())
  })
  await page.goto('/')
  await expect(page.getByRole('heading', { level: 1 })).toHaveText('Vue 3 Chart Compatibility')
  const state = () => page.evaluate(() => window.chartState())
  await expect
    .poll(async () => (await state()).map(chart => chart.type))
    .toEqual(['bar', 'line', 'pie'])
  await expect(page.locator('.chart svg')).toHaveCount(3)
  await expect
    .poll(async () =>
      (await state()).every(chart => chart.width > 0 && chart.height === 280 && chart.svg),
    )
    .toBe(true)
  await page.getByTestId('data').click()
  await expect
    .poll(async () => (await state()).map(chart => chart.title))
    .toEqual(['bar 1', 'line 1', 'pie 1'])
  await expect.poll(async () => (await state())[0].data).toEqual([15, 25, 35])
  await expect
    .poll(async () => (await state())[2].data.map(item => item.value))
    .toEqual([15, 25, 35])
  await page.getByTestId('attrs').click()
  await expect
    .poll(async () =>
      (await state()).every(chart =>
        chart.graphic?.[0]?.elements?.some(el => el.style?.text === 'Extra marker'),
      ),
    )
    .toBe(true)
  await page.getByTestId('attrs').click()
  await expect.poll(async () => (await state()).every(chart => !chart.graphic?.length)).toBe(true)
  await page.getByTestId('loading').click()
  await expect.poll(async () => (await state()).every(chart => chart.loading)).toBe(true)
  await page.getByTestId('loading').click()
  await expect.poll(async () => (await state()).every(chart => !chart.loading)).toBe(true)
  const beforeTheme = await state()
  await page.getByTestId('theme').click()
  await expect
    .poll(async () =>
      (await state()).every(
        (chart, i) =>
          chart.id !== beforeTheme[i].id && chart.background !== beforeTheme[i].background,
      ),
    )
    .toBe(true)
  await expect
    .poll(async () =>
      (await state()).every(chart => !chart.graphic?.length && chart.title.endsWith('1')),
    )
    .toBe(true)
  await testInfo.attach('charts-dark', {
    body: await page.screenshot({ fullPage: true }),
    contentType: 'image/png',
  })
  const initialWidth = (await state())[0].width
  await page.getByTestId('size').click()
  await expect.poll(async () => (await state())[0].width).toBeLessThan(initialWidth)
  const box = await page.locator('.chart').first().boundingBox()
  const point = (await state())[0].point
  await page.mouse.click(box.x + point[0], box.y + point[1])
  await expect(page.getByTestId('clicks')).not.toHaveText('Chart clicks: 0')
  const beforeUnmount = (await state()).map(chart => chart.id)
  await page.getByTestId('mount').click()
  await expect(page.locator('.chart')).toHaveCount(0)
  await page.getByTestId('mount').click()
  await expect
    .poll(async () => (await state()).map(chart => chart.type))
    .toEqual(['bar', 'line', 'pie'])
  await expect
    .poll(async () => (await state()).every((chart, i) => chart.id !== beforeUnmount[i]))
    .toBe(true)
  expect(errors).toEqual([])
})
