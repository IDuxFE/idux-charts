import { test, expect } from './helpers'

for (const width of [768, 1280, 1920]) {
  test(`core documentation fits the content area at ${width}px`, async ({ page }) => {
    await page.setViewportSize({ width, height: 900 })
    await page.goto('components/core')
    const content = page.locator('main')
    const chart = page.locator('[_echarts_instance_]').first()
    await expect(chart.locator('svg')).toBeVisible()
    // Check after ECharts has rendered: its fixed-size SVG can prevent flex
    // items from shrinking beside the table of contents.
    await expect
      .poll(() => content.evaluate(element => element.scrollWidth - element.clientWidth))
      .toBeLessThanOrEqual(1)

    await page.getByRole('radio', { name: 'API', exact: true }).click()
    await expect(
      page.getByRole('heading', { name: 'AdditionalChartOption', exact: true }),
    ).toBeVisible()
    await expect
      .poll(() => content.evaluate(element => element.scrollWidth - element.clientWidth))
      .toBeLessThanOrEqual(1)
  })
}
