import { test, expect, hoverSvg } from './helpers'
import { fixtureBaseURL } from './environment'

for (const type of ['bar', 'bullet']) {
  test(`${type} long labels retain full hover text across missing, zero, zoom and theme changes`, async ({
    page,
  }) => {
    await page.goto(`${fixtureBaseURL}?long-categories`)
    const chart = page.locator(`.long-${type} [_echarts_instance_]`)
    const svg = chart.locator('svg')
    const tooltip = page.locator(`.long-tooltip-${type}`)
    const title = tooltip.locator('.charts-tooltips-category')
    await page.locator('#short').click()
    const short = svg.locator('text').filter({ hasText: /^正常类别$/ })
    await expect(short).toBeVisible()
    const shortBox = await short.evaluate(element => {
      const text = element as SVGTextElement
      const width = text.getComputedTextLength()
      const anchor = new DOMPoint(0, 0).matrixTransform(text.getScreenCTM()!)
      return { x: anchor.x - width, width }
    })
    const chartBox = await chart.boundingBox()
    expect(shortBox.x - chartBox!.x).toBeLessThan(24)
    expect(shortBox.width).toBeLessThan(60)
    await page.locator('#short').click()
    await page.evaluate(type => (window as any).showLongCategoryTooltip(type), type)
    const dataTitle = tooltip.locator('.charts-tooltips-title')
    await expect(dataTitle).toHaveText(`正常类别${'超长类别名称'.repeat(20)}<生产集群02>`)
    const dataLayout = await dataTitle.evaluate(element => ({
      width: element.clientWidth,
      height: element.clientHeight,
      scroll: element.scrollWidth,
    }))
    expect(dataLayout.width).toBeLessThanOrEqual(320)
    expect(dataLayout.height).toBeGreaterThan(20)
    expect(dataLayout.scroll).toBeLessThanOrEqual(dataLayout.width)
    for (const prefix of ['正常类别', '缺失类别', '零值类别']) {
      const label = svg.locator('text').filter({ hasText: new RegExp(`^${prefix}`) })
      await expect(label).toContainText('...')
      const width = await label.evaluate(element =>
        (element as SVGTextElement).getComputedTextLength(),
      )
      expect(width).toBeLessThanOrEqual(187)
      await hoverSvg(svg, label)
      await expect(title).toHaveText(`${prefix}${'超长类别名称'.repeat(20)}<生产集群02>`)
      await expect(tooltip).toBeVisible()
      const layout = await title.evaluate(element => ({
        width: element.clientWidth,
        height: element.clientHeight,
        scroll: element.scrollWidth,
      }))
      expect(layout.width).toBeLessThanOrEqual(320)
      expect(layout.height).toBeGreaterThan(20)
      expect(layout.scroll).toBeLessThanOrEqual(layout.width)
    }
    await page.locator('#zero').click()
    await page.locator('#dark').click()
    await page.locator('#narrow').click()
    await page.locator('#zoom').click()
    const label = svg.locator('text').filter({ hasText: /^缺失类别/ })
    await hoverSvg(svg, label)
    await expect(title).toHaveText(`缺失类别${'超长类别名称'.repeat(20)}<生产集群02>`)
    await expect(tooltip).toHaveAttribute('data-ix-chart-theme', 'dark')
    await page.mouse.move(0, 0)
    await expect(tooltip).not.toBeVisible()
  })
}
