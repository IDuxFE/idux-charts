import { test, expect } from './helpers'

for (const name of ['basic', 'status', 'segmented']) {
  test(`gauge ${name} demo supports sizes, zero and request states`, async ({ page }) => {
    await page.goto('components/gauge')
    await page.getByRole('radio', { name: '示例', exact: true }).click()
    const demo = page.locator(`.gauge-${name}`)
    const charts = demo.locator('[_echarts_instance_]')
    await expect(charts.first().locator('svg')).toBeVisible()
    await demo.getByText('中', { exact: true }).first().click()
    await expect(charts.first()).toHaveCSS('width', '144px')
    await demo.getByText('数值为 0', { exact: true }).click()
    await expect(charts.first()).toContainText(name === 'status' ? '高危' : '0')
    await demo.getByText('空状态', { exact: true }).click()
    await expect(charts).toHaveCount(0)
    await demo.getByRole('button', { name: '重新加载' }).click()
    await expect(demo.getByRole('status')).toHaveAttribute('aria-busy', 'true')
    await expect(charts.first().locator('svg')).toBeVisible()
    await demo.getByText('加载中', { exact: true }).click()
    await expect(demo.getByRole('status')).toBeVisible()
    await demo.getByText('正常', { exact: true }).click()
    await expect(charts.first().locator('svg')).toBeVisible()
  })
}

test('gauge business scenarios and responsive layout', async ({ page }, testInfo) => {
  await page.goto('components/gauge')
  await page.getByRole('radio', { name: '示例', exact: true }).click()
  const segmented = page.locator('.gauge-segmented')
  await segmented.getByText('评分等级', { exact: true }).click()
  await expect(segmented.locator('[_echarts_instance_]')).toHaveCount(4)
  await expect(segmented.locator('svg').first()).toContainText('18 分')
  const range = page.locator('.gauge-range')
  await range.getByText('80 GB（超量程）', { exact: true }).click()
  await expect(range.locator('svg')).toContainText('80')
  await page.screenshot({ path: testInfo.outputPath('gauge-examples.png'), fullPage: true })
  await page.setViewportSize({ width: 480, height: 800 })
  await expect(page.locator('.gauge-basic svg').first()).toBeVisible()
})
