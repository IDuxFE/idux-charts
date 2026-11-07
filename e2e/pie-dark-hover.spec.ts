import { test, expect } from './helpers'

for (const title of [
  '实心饼图',
  '环形图',
  '玫瑰图',
  '多列图例',
  '图例自定义 Formatter',
  '卡片环形图',
  '轻量卡片饼图',
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
    const tooltip = chart.locator('div[style*="z-index: 9999999"]')
    for (const dark of [true, false]) {
      await chart.scrollIntoViewIfNeeded()
      await expect(chart.locator('svg')).toBeVisible()
      // Sweep the plot itself, not the legend, to trigger real sector emphasis.
      await expect(async () => {
        await page.mouse.move(0, 0)
        const box = (await chart.boundingBox())!
        for (let x = 8; x < Math.min(300, box.width / 2); x += 8) {
          await page.mouse.move(box.x + x, box.y + box.height / 2)
          if (await tooltip.isVisible()) break
        }
        await expect(tooltip).toBeVisible({ timeout: 500 })
      }).toPass({ timeout: 5000 })
      await expect(tooltip).toHaveCSS(
        'background-color',
        dark ? 'rgb(10, 12, 15)' : 'rgba(251, 253, 255, 0.88)',
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
    const point = await label.evaluate(element => {
      const text = element as SVGTextElement
      const p = new DOMPoint(
        text.x.baseVal.getItem(0).value + text.getComputedTextLength() / 2,
        text.y.baseVal.getItem(0).value,
      ).matrixTransform(text.getScreenCTM()!)
      return { x: p.x, y: p.y }
    })
    await page.mouse.move(point.x, point.y)
    const tooltip = chart.locator('.charts-tooltips')
    await expect(tooltip).toBeVisible()
    await expect(tooltip.locator('..')).toContainText(missing ? '缺失原因' : '当前筛选范围')
    await expect(tooltip.locator('..')).toHaveCSS('background-color', 'rgb(10, 12, 15)')
    await expect(tooltip.locator('.charts-tooltips-title')).toHaveCSS('color', 'rgb(244, 248, 255)')
  })
}
