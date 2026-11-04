import { test, expect } from './helpers'

for (const [chart, title, snapshot] of [
  ['bar', '简单的鼠标经过显示条纹', 'bar-striped.png'],
  ['bar', '堆叠柱状图', 'bar-stacked.png'],
  ['line', '条纹面积图', 'line-striped-area.png'],
  ['pie', '风险用户数', 'pie-risk-users.png'],
] as const) {
  test(`${chart} ${title} appearance`, async ({ page }) => {
    await page.goto(`components/${chart}`)
    await page.getByText('示例', { exact: true }).click()
    const block = page
      .locator('.archive-app-demo')
      .filter({ has: page.getByRole('heading', { name: title, exact: false }) })
    const chartElement = block.locator('[_echarts_instance_]')
    await expect(chartElement).toHaveCount(1)
    await expect(chartElement.locator('svg path').first()).toBeAttached()
    await chartElement.scrollIntoViewIfNeeded()
    await page.mouse.move(0, 0)
    await expect(chartElement).toHaveScreenshot(snapshot, {
      animations: 'disabled',
      maxDiffPixelRatio: 0.005,
    })
  })
}

test('bar hover tooltip excludes the helper series and preserves appearance', async ({ page }) => {
  await page.goto('components/bar')
  await page.getByText('示例', { exact: true }).click()
  const chart = page
    .locator('.archive-app-demo')
    .filter({ has: page.getByRole('heading', { name: '简单的鼠标经过显示条纹' }) })
    .locator('[_echarts_instance_]')
  await chart.scrollIntoViewIfNeeded()
  const label = chart.locator('svg text').filter({ hasText: /^星期二$/ })
  const labelBox = await label.boundingBox()
  const chartBox = await chart.boundingBox()
  expect(labelBox).not.toBeNull()
  expect(chartBox).not.toBeNull()
  await page.mouse.move(labelBox!.x + labelBox!.width / 2, chartBox!.y + 140)
  const tooltip = chart.locator('.charts-tooltips')
  await expect(tooltip).toBeVisible()
  await expect(tooltip.locator('.charts-tooltips-item')).toHaveCount(1)
  await expect(tooltip).toContainText('324 次')
  await expect(chart).toHaveScreenshot('bar-stripe-hover.png', {
    animations: 'disabled',
    maxDiffPixelRatio: 0.005,
  })
})
