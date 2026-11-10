import { test, expect } from './helpers'
import { fixtureBaseURL } from './environment'

for (const [chart, title, snapshot, fixture] of [
  ['bar', '简单的鼠标经过显示条纹', 'bar-striped.png', 'legacy-bar-stripe'],
  ['bar', '堆叠柱状图', 'bar-stacked.png', 'legacy-bar-stack'],
  ['pie', '风险用户数', 'pie-risk-users.png', 'legacy-risk'],
] as const) {
  test(`${chart} ${title} appearance`, async ({ page }) => {
    await page.goto(`${fixtureBaseURL}?${fixture}`)
    const chartElement = page.locator('#app [_echarts_instance_]')
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

test('single-series area keeps its fitted stripe during hover', async ({ page }) => {
  await page.goto('components/area')
  const demo = page.locator('.archive-app-demo').filter({
    has: page.getByRole('heading', { name: '基础面积图（状态示例）', exact: false }),
  })
  const chart = demo.locator('[_echarts_instance_]')
  const stripe = chart.locator('svg pattern[width="4"]')
  await expect(stripe).toHaveAttribute('height', '320')
  await chart.scrollIntoViewIfNeeded()
  const bounds = await chart.boundingBox()
  expect(bounds).not.toBeNull()
  await page.mouse.move(bounds!.x + bounds!.width * 0.55, bounds!.y + 190)
  await expect(chart.locator('.charts-tooltips')).toBeVisible()
  await expect(stripe).toHaveAttribute('height', '320')
})

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
