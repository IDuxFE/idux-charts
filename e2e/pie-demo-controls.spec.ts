import { test, expect, hoverPieSector, hoverSvg, clickSvg } from './helpers'

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
  await hoverPieSector(chart)
  await expect(chart.locator('.charts-tooltips')).toContainText('资产分布')
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
    has: page.getByRole('heading', { name: heading('轻量卡片环形图') }),
  })
  const chart = block.locator('[_echarts_instance_]')
  await hoverPieSector(chart)
  const tooltip = chart
    .locator('div')
    .filter({ hasText: /^图例\d: \d+$/ })
    .last()
  await expect(tooltip).toBeVisible()
  await expect(tooltip).toHaveCSS('font-size', '12px')
})

test('multi-column legend updates default row spacing when category count changes', async ({
  page,
}) => {
  await page.goto('components/pie')
  await page.getByRole('radio', { name: '示例', exact: true }).click()
  const block = page.locator('.archive-app-demo').filter({
    has: page.getByRole('heading', { name: heading('多列图例') }),
  })
  const chart = block.locator('[_echarts_instance_]')
  await expect(chart.locator('svg')).toBeVisible()
  const id = await chart.getAttribute('_echarts_instance_')
  const slider = block.getByRole('slider')
  let current = 12
  for (const [count, gap] of [
    [12, 16],
    [6, 20],
    [7, 16],
    [3, 20],
    [12, 16],
  ] as const) {
    while (current !== count) {
      await slider.press(current > count ? 'ArrowLeft' : 'ArrowRight')
      current += current > count ? -1 : 1
    }
    await expect(block).toContainText(`${count} 个分类`)
    await expect(async () => {
      const first = await chart
        .locator('svg text')
        .filter({ hasText: /^图例1$/ })
        .boundingBox()
      const second = await chart
        .locator('svg text')
        .filter({ hasText: /^图例2$/ })
        .boundingBox()
      expect(second!.y - first!.y).toBeCloseTo(12 + gap, 0)
    }).toPass({ timeout: 5000 })
    await expect(chart).toHaveAttribute('_echarts_instance_', id!)
  }
})

test('multi-column legend paging icons align with the values', async ({ page }) => {
  await page.goto('components/pie')
  await page.getByRole('radio', { name: '示例', exact: true }).click()
  const block = page.locator('.archive-app-demo').filter({
    has: page.getByRole('heading', { name: heading('多列图例') }),
  })
  for (let i = 0; i < 8; i++) await block.getByRole('slider').press('ArrowRight')
  await expect(block).toContainText('20 个分类')
  const chart = block.locator('[_echarts_instance_]')
  await chart.scrollIntoViewIfNeeded()
  const arrows = chart.locator('svg image')
  await expect(arrows).toHaveCount(2)
  const value = chart.locator('svg text').filter({ hasText: /^56$/ })
  await expect(value).toHaveAttribute('text-anchor', 'end')
  await expect(async () => {
    // Compare both layout edges in SVG coordinates: glyph overhang and WebKit's
    // screen transforms should not change this alignment contract.
    const iconRight = await arrows.last().evaluate(node => {
      const image = node as SVGImageElement
      return new DOMPoint(
        Number(image.getAttribute('x') ?? 0) + Number(image.getAttribute('width') ?? 0),
        Number(image.getAttribute('y') ?? 0),
      ).matrixTransform(image.getCTM()!).x
    })
    const valueRight = await value.evaluate(node => {
      const text = node as SVGTextElement
      return new DOMPoint(
        Number(text.getAttribute('x') ?? 0),
        Number(text.getAttribute('y') ?? 0),
      ).matrixTransform(text.getCTM()!).x
    })
    expect(iconRight).toBeCloseTo(valueRight, 0)
  }).toPass({ timeout: 5000 })
  await clickSvg(chart.locator('svg'), arrows.last())
  await expect(chart.locator('svg text').filter({ hasText: /^图例17$/ })).toBeVisible()
  await clickSvg(chart.locator('svg'), arrows.first())
  await expect(value).toBeVisible()
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
  await clickSvg(chart.locator('svg'), arrows.last())
  await expect(async () => {
    expect((await firstLabel.boundingBox())!.y).toBeLessThan(before!.y)
  }).toPass({ timeout: 5000 })
  await clickSvg(chart.locator('svg'), arrows.first())
  await expect(async () => {
    expect((await firstLabel.boundingBox())!.y).toBeCloseTo(before!.y)
  }).toPass({ timeout: 5000 })

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
  await hoverPieSector(riskChart)
  await expect(riskChart.locator('.charts-tooltips')).toBeVisible()
  await expect(riskChart.locator('.charts-tooltips')).toContainText('占全部风险')
  await expect(riskChart.locator('.charts-tooltips')).toContainText('当前筛选范围')
  await page.mouse.move(0, 0)
  const legendLabel = riskChart.locator('svg text').filter({ hasText: /^严重$/ })
  await hoverSvg(riskChart.locator('svg'), legendLabel)
  const legendTooltip = riskChart.locator('.charts-tooltips')
  await expect(legendTooltip).toBeVisible()
  await expect(legendTooltip).toContainText('严重')
  await expect(legendTooltip).toContainText('风险数量')
  await expect(legendTooltip).toContainText('30')
  await expect(legendTooltip).toContainText('6.2%')
  await expect(legendTooltip).toContainText('当前筛选范围')
})
