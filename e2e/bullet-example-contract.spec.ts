import { test, expect, hoverSvg } from './helpers'

for (const [title, actualLabel] of [
  ['单子弹图——无范围区间', '实际值'],
  ['单子弹图——有范围区间', '实际值'],
  ['卡片场景', '完成率'],
  ['数据展示场景', '完成率'],
]) {
  test(`bullet ${title} formats tooltip names and percentages`, async ({ page }) => {
    await page.goto('components/bullet', { waitUntil: 'domcontentloaded' })
    const demo = page.locator('.archive-app-demo').filter({
      has: page.getByRole('heading', { name: new RegExp(`^${title}\\s*#?\\s*$`) }),
    })
    const chart = demo.locator('[_echarts_instance_]')
    const bar = chart.locator('svg path[filter^="url("]').first()
    await hoverSvg(chart, bar)
    const tooltip = chart.locator('.charts-tooltips')
    await expect(tooltip).toBeVisible()
    const rows = tooltip.locator('.charts-tooltips-item')
    await expect(rows).toHaveCount(2)
    await expect
      .soft(rows.first().locator('.charts-tooltips-item-name'))
      .toHaveText(actualLabel!, { timeout: 1000 })
    await expect
      .soft(rows.first().locator('.charts-tooltips-item-value'))
      .toHaveText(/^\d+(\.\d+)?%$/, { timeout: 1000 })
    await expect
      .soft(rows.last().locator('.charts-tooltips-item-value'))
      .toHaveText(/^\d+(\.\d+)?%$/, { timeout: 1000 })
  })
}
