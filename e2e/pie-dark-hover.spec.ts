import { test, expect, hoverPieSector, hoverSvg } from './helpers'

for (const title of [
  '实心饼图',
  '环形图',
  '玫瑰图',
  '多列图例',
  '图例自定义 Formatter',
  '卡片环形图',
  '轻量卡片环形图',
  '九宫格对齐',
  '形态与自适应',
  '大尺寸：基础形态与加载',
  '大尺寸：风险分布',
  '大尺寸：多层装饰环图',
]) {
  test(`${title} sector tooltip follows dark and light themes`, async ({ page }) => {
    await page.emulateMedia({ colorScheme: 'dark' })
    await page.goto('components/pie')
    const demo = page.locator('.archive-app-demo').filter({
      has: page.getByRole('heading', { name: new RegExp(`^${title}\\s*#?\\s*$`) }),
    })
    const chart = demo.locator('[_echarts_instance_]')
    const tooltip = chart.locator('.ix-chart-tooltip')
    const decorated = title === '大尺寸：多层装饰环图'
    for (const dark of [true, false]) {
      await chart.scrollIntoViewIfNeeded()
      await expect(chart).toHaveAttribute('data-ix-chart-theme', dark ? 'dark' : 'light')
      await expect(chart.locator('svg')).toBeVisible()
      if (decorated) {
        const box = (await chart.boundingBox())!
        const radius = Math.min(box.width, box.height) / 2
        await page.mouse.move(0, 0)
        await page.mouse.move(box.x + box.width / 2 - radius * 0.75, box.y + box.height / 2)
      } else {
        await hoverPieSector(chart)
      }
      await expect(tooltip).toBeVisible()
      await expect(tooltip).toHaveCSS(
        'background-color',
        dark ? 'rgb(10, 12, 15)' : 'rgba(251, 253, 255, 0.72)',
      )
      if (dark) {
        await expect(tooltip).toHaveCSS('color', 'rgb(244, 248, 255)')
        for (const item of await tooltip
          .locator('.charts-tooltips-title, .charts-tooltips-item')
          .all()) {
          await expect(item).toHaveCSS('color', 'rgb(244, 248, 255)')
        }
        await page.getByRole('button', { name: '切换到亮色模式' }).click()
      }
    }
  })
}

for (const missing of [false, true]) {
  test(`dark pie legend tooltip supports ${missing ? 'missing data' : 'risk details'}`, async ({
    page,
  }) => {
    await page.emulateMedia({ colorScheme: 'dark' })
    await page.goto('components/pie')
    const demo = page.locator('.archive-app-demo').filter({
      has: page.getByRole('heading', {
        name: missing ? /^实心饼图\s*#?\s*$/ : /^大尺寸：风险分布\s*#?\s*$/,
      }),
    })
    if (missing) await demo.getByText('数据缺失', { exact: true }).click()
    const chart = demo.locator('[_echarts_instance_]')
    await chart.scrollIntoViewIfNeeded()
    const label = chart.locator('svg text').filter({ hasText: missing ? /^图例4$/ : /^严重$/ })
    await hoverSvg(chart.locator('svg'), label)
    const tooltip = chart.locator('.charts-tooltips')
    await expect(tooltip).toBeVisible()
    await expect(tooltip.locator('..')).toContainText(missing ? '缺失原因' : '当前筛选范围')
    await expect(tooltip.locator('..')).toHaveCSS('background-color', 'rgb(10, 12, 15)')
    await expect(tooltip.locator('.charts-tooltips-title')).toHaveCSS('color', 'rgb(244, 248, 255)')
  })
}
