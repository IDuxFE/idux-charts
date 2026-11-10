import { test, expect } from './helpers'
import { fixtureBaseURL } from './environment'

for (const [chart, title, snapshot] of [
  ['bar', '简单的鼠标经过显示条纹', 'bar-striped.png'],
  ['bar', '堆叠柱状图', 'bar-stacked.png'],
  ['line', '条纹面积图', 'line-striped-area.png'],
  ['pie', '风险用户数', 'pie-risk-users.png'],
] as const) {
  test(`${chart} ${title} appearance`, async ({ page }) => {
    const fixture =
      chart === 'bar'
        ? snapshot === 'bar-striped.png'
          ? 'legacy-bar-stripe'
          : 'legacy-bar-stack'
        : chart === 'pie'
          ? 'legacy-risk'
          : undefined
    await page.goto(fixture ? `${fixtureBaseURL}?${fixture}` : `components/${chart}`)
    if (!fixture) await page.getByRole('radio', { name: '示例', exact: true }).click()
    const block = fixture
      ? page.locator('#app')
      : page
          .locator('.archive-app-demo')
          .filter({ has: page.getByRole('heading', { name: title, exact: false }) })
    const chartElement = block.locator('[_echarts_instance_]')
    await expect(chartElement).toHaveCount(1)
    await expect(chartElement.locator('svg path').first()).toBeAttached()
    await chartElement.scrollIntoViewIfNeeded()
    // Fractional document offsets can produce an extra screenshot row in WebKit.
    // Align the crop without changing the chart size or its rendering options.
    await chartElement.evaluate(element => {
      const y = element.getBoundingClientRect().top
      element.style.transform = `translateY(${Math.round(y) - y}px)`
    })
    await page.mouse.move(0, 0)
    await expect(chartElement).toHaveScreenshot(snapshot, {
      animations: 'disabled',
      maxDiffPixelRatio: 0.005,
    })
  })
}

test('bar hover tooltip excludes the helper series and preserves appearance', async ({ page }) => {
  await page.goto(`${fixtureBaseURL}?legacy-bar-stripe`)
  const chart = page.locator('#app [_echarts_instance_]')
  await chart.scrollIntoViewIfNeeded()
  const label = chart.locator('svg text').filter({ hasText: /^星期二$/ })
  const labelBox = await label.boundingBox()
  const chartBox = await chart.boundingBox()
  expect(labelBox).not.toBeNull()
  expect(chartBox).not.toBeNull()
  await page.mouse.move(labelBox!.x + labelBox!.width / 2, chartBox!.y + 140)
  const tooltip = chart.locator('.charts-tooltips')
  const row = tooltip.locator('.charts-tooltips-item')
  await expect(tooltip).toBeVisible()
  await expect(row).toHaveCount(1)
  await expect(tooltip).toContainText('324 次')
  // Whole-chart pixel tolerance can miss a small tooltip with missing styles.
  await expect(row).toHaveCSS('display', 'flex')
  await expect(tooltip.locator('.charts-tooltips-title')).toHaveCSS('font-size', '12px')
  const { height, offsets } = await row.evaluate(element => {
    const rowBox = element.getBoundingClientRect()
    const center = rowBox.top + rowBox.height / 2
    const offsets = [
      ...element.querySelectorAll('.charts-tooltips-item-name, .charts-tooltips-item-value'),
    ].map(text => {
      const range = document.createRange()
      range.selectNodeContents(text)
      const box = range.getBoundingClientRect()
      return Math.abs(box.top + box.height / 2 - center)
    })
    return { height: rowBox.height, offsets }
  })
  expect(height).toBe(32)
  expect(offsets).toHaveLength(2)
  for (const offset of offsets) expect(offset).toBeLessThanOrEqual(1)
  await expect(chart).toHaveScreenshot('bar-stripe-hover.png', {
    animations: 'disabled',
    maxDiffPixelRatio: 0.005,
  })
})
