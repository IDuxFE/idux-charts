import { test, expect } from './helpers'

const heading = (title: string) => new RegExp(`^${title}\\s*#?\\s*$`)

test('merged pie examples switch totals without remounting or leaving stale text', async ({
  page,
}) => {
  await page.goto('components/pie')
  await page.getByRole('radio', { name: '示例', exact: true }).click()
  for (const title of ['实心饼图', '环形图', '玫瑰图']) {
    const block = page
      .locator('.archive-app-demo')
      .filter({ has: page.getByRole('heading', { name: heading(title) }) })
    const chart = block.locator('[_echarts_instance_]')
    await expect(chart.locator('svg')).toBeVisible()
    const id = await chart.getAttribute('_echarts_instance_')
    for (const [mode, size] of [
      ['重总数', '28px'],
      ['轻总数', '16px'],
    ] as const) {
      await block.getByText(mode, { exact: true }).click()
      await expect(chart.locator('svg text').filter({ hasText: /^554$/ })).toHaveCSS(
        'font-size',
        size,
      )
      await expect(chart.locator('svg text').filter({ hasText: /^统计总数$/ })).toHaveCount(1)
      await expect(chart).not.toContainText('资产总数')
      await expect(chart).toHaveAttribute('_echarts_instance_', id!)
    }
    if (title === '环形图') {
      await block.getByText('总数在饼图中间', { exact: true }).click()
      await expect(chart.locator('svg text').filter({ hasText: /^554$/ })).toHaveCSS(
        'font-size',
        '24px',
      )
      await expect(chart).toContainText('资产总数')
      await expect(chart).not.toContainText('统计总数')
      await expect(chart).toHaveAttribute('_echarts_instance_', id!)
    }
  }
})

test('iDux responsive controls change both dimensions and keep large examples at the end', async ({
  page,
}) => {
  await page.goto('components/pie')
  await page.getByRole('radio', { name: '示例', exact: true }).click()
  const block = page
    .locator('.archive-app-demo')
    .filter({ has: page.getByRole('heading', { name: heading('形态与自适应') }) })
  const chart = block.locator('[_echarts_instance_]')
  await expect(chart.locator('svg')).toHaveAttribute('height', '240')
  await block
    .getByRole('group', { name: '高度', exact: true })
    .getByRole('slider')
    .press('ArrowRight')
  await expect(chart.locator('svg')).toHaveAttribute('height', '250')
  await block
    .getByRole('group', { name: '宽度', exact: true })
    .getByRole('slider')
    .press('ArrowRight')
  await expect(chart.locator('svg')).toHaveAttribute('width', '490')
  await block.getByText('环图', { exact: true }).click()
  await block.getByRole('button', { name: '图例', exact: true }).click()
  await expect(chart).not.toContainText('分类 1')
  await block.getByRole('button', { name: '业务标题', exact: true }).click()
  await expect(chart).toContainText('统计总数')
  await expect(chart.locator('svg text').filter({ hasText: /^210$/ })).toHaveCSS(
    'font-size',
    '28px',
  )
  await block.getByText('30 项', { exact: true }).click()
  await expect(chart).toContainText('4650')
  await block.getByRole('button', { name: '业务标题', exact: true }).click()
  await expect(chart).not.toContainText('统计总数')
  await block.getByText('实心', { exact: true }).click()
  await chart.scrollIntoViewIfNeeded()
  const box = await chart.boundingBox()
  await expect(async () => {
    await page.mouse.move(0, 0)
    await page.mouse.move(box!.x + box!.width / 2 + 30, box!.y + box!.height / 2 + 10)
    await expect(chart.locator('.charts-tooltips')).toContainText('资产分布', { timeout: 500 })
  }).toPass({ timeout: 5000 })
  await expect(chart.locator('.charts-tooltips')).toContainText('分类')
  await page.mouse.move(0, 0)
  const titles = await page
    .locator('.archive-app-demo')
    .evaluateAll(nodes =>
      nodes.map(node =>
        node.querySelector('h1,h2,h3,h4,h5,h6')?.textContent?.replace(/#$/, '').trim(),
      ),
    )
  expect(titles.slice(0, 3)).toEqual(['实心饼图', '环形图', '玫瑰图'])
  expect(titles.slice(-3)).toEqual([
    '大尺寸：基础形态与加载',
    '大尺寸：风险分布',
    '大尺寸：多层装饰环图',
  ])
})

test('lightweight card tooltip uses 12px text', async ({ page }) => {
  await page.goto('components/pie')
  await page.getByRole('radio', { name: '示例', exact: true }).click()
  const block = page.locator('.archive-app-demo').filter({
    has: page.getByRole('heading', { name: heading('轻量卡片饼图') }),
  })
  const chart = block.locator('[_echarts_instance_]')
  await chart.scrollIntoViewIfNeeded()
  const box = await chart.boundingBox()
  await page.mouse.move(box!.x + 55, box!.y + 30)
  const tooltip = chart
    .locator('div')
    .filter({ hasText: /^图例\d: \d+$/ })
    .last()
  await expect(tooltip).toBeVisible()
  await expect(tooltip).toHaveCSS('font-size', '12px')
})

test('single-column legend shares compact paging controls and pages both ways', async ({
  page,
}) => {
  await page.goto('components/pie')
  await page.getByRole('radio', { name: '示例', exact: true }).click()
  const block = page.locator('.archive-app-demo').filter({
    has: page.getByRole('heading', { name: heading('形态与自适应') }),
  })
  const width = block.getByRole('group', { name: '宽度', exact: true }).getByRole('slider')
  for (let i = 0; i < 7; i++) await width.press('ArrowLeft')
  const height = block.getByRole('group', { name: '高度', exact: true }).getByRole('slider')
  for (let i = 0; i < 4; i++) await height.press('ArrowRight')
  await block.getByRole('button', { name: '业务标题', exact: true }).click()
  await block.getByText('环图', { exact: true }).click()
  await block.getByText('30 项', { exact: true }).click()
  const chart = block.locator('[_echarts_instance_]')
  const arrows = chart.locator('svg image')
  await expect(arrows).toHaveCount(2)
  await expect(arrows.last()).toHaveAttribute('width', '16')
  await expect(chart).not.toContainText('1/')
  await chart.scrollIntoViewIfNeeded()
  const firstLabel = chart.locator('svg text').filter({ hasText: /^分类 1$/ })
  const before = await firstLabel.boundingBox()
  await arrows.last().click()
  await expect(async () => {
    expect((await firstLabel.boundingBox())!.y).toBeLessThan(before!.y)
  }).toPass()
  await arrows.first().click()
  await expect(async () => {
    expect((await firstLabel.boundingBox())!.y).toBeCloseTo(before!.y)
  }).toPass()

  const secondLabel = chart.locator('svg text').filter({ hasText: /^分类 2$/ })
  const rowHeight = (await secondLabel.boundingBox())!.y - before!.y
  const chartBox = (await chart.boundingBox())!
  const firstLabelY = async () => (await firstLabel.boundingBox())?.y ?? NaN
  await page.mouse.move(before!.x + before!.width / 2, before!.y + before!.height / 2)
  await page.mouse.wheel(0, 120)
  await expect.poll(firstLabelY).toBeCloseTo(before!.y - rowHeight)
  await page.mouse.wheel(0, -120)
  await expect.poll(firstLabelY).toBeCloseTo(before!.y)
  expect((await chart.boundingBox())!.y).toBeCloseTo(chartBox.y)

  await page.mouse.move(chartBox.x + 4, chartBox.y + chartBox.height / 2)
  await page.mouse.wheel(0, 120)
  await expect.poll(async () => (await chart.boundingBox())!.y).toBeLessThan(chartBox.y)
})

test('large pie demos switch shapes and loading and show business tooltips', async ({ page }) => {
  await page.goto('components/pie')
  await page.getByRole('radio', { name: '示例', exact: true }).click()
  const basic = page.locator('.archive-app-demo').filter({
    has: page.getByRole('heading', { name: heading('大尺寸：基础形态与加载') }),
  })
  const chart = basic.locator('[_echarts_instance_]')
  await expect(chart.locator('svg')).toHaveAttribute('width', '600')
  await expect(chart.locator('svg')).toHaveAttribute('height', '300')
  for (const shape of ['环形', '玫瑰', '实心']) {
    await basic.getByText(shape, { exact: true }).click()
    await expect(chart).toContainText('图例 A')
  }
  await basic.getByRole('button', { name: '大尺寸图表加载', exact: true }).click()
  await expect(chart).toContainText('加载中...')
  await basic.getByRole('button', { name: '大尺寸图表加载', exact: true }).click()
  await expect(chart).not.toContainText('加载中...')

  const risk = page.locator('.archive-app-demo').filter({
    has: page.getByRole('heading', { name: heading('大尺寸：风险分布') }),
  })
  const riskChart = risk.locator('[_echarts_instance_]')
  await riskChart.scrollIntoViewIfNeeded()
  await expect(async () => {
    const box = await riskChart.boundingBox()
    await page.mouse.move(0, 0)
    // Sweep the plot area to hit a ring sector regardless of legend width.
    for (let x = 30; x < 300; x += 15) {
      await page.mouse.move(box!.x + x, box!.y + 150)
      if (await riskChart.locator('.charts-tooltips').isVisible()) break
    }
    await expect(riskChart.locator('.charts-tooltips')).toBeVisible({ timeout: 500 })
    await expect(riskChart.locator('.charts-tooltips')).toContainText('占全部风险')
    await expect(riskChart.locator('.charts-tooltips')).toContainText('当前筛选范围')
  }).toPass({ timeout: 5000 })
  await page.mouse.move(0, 0)
  const legendLabel = riskChart.locator('svg text').filter({ hasText: /^严重$/ })
  // Resolve the glyph position from SVG coordinates: WebKit's text bounding box
  // can include the icon origin, which makes locator.hover() hit the icon.
  const legendPoint = await legendLabel.evaluate(element => {
    const text = element as SVGTextElement
    const point = new DOMPoint(
      text.x.baseVal.getItem(0).value + text.getComputedTextLength() / 2,
      text.y.baseVal.getItem(0).value,
    ).matrixTransform(text.getScreenCTM()!)
    return { x: point.x, y: point.y }
  })
  await page.mouse.move(legendPoint.x, legendPoint.y)
  const legendTooltip = riskChart.locator('.charts-tooltips')
  await expect(legendTooltip).toBeVisible()
  await expect(legendTooltip).toContainText('严重')
  await expect(legendTooltip).toContainText('风险数量')
  await expect(legendTooltip).toContainText('30')
  await expect(legendTooltip).toContainText('6.2%')
  await expect(legendTooltip).toContainText('当前筛选范围')
})
