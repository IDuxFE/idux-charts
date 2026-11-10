import { readdirSync, readFileSync } from 'node:fs'
import { test, expect } from './helpers'

const multiChartDemos: Record<string, number> = {
  'gauge/Basic.vue': 4,
  'gauge/Segmented.vue': 3,
  'gauge/Status.vue': 4,
  'liquid-fill/Metrics.vue': 4,
  'liquid-fill/Range.vue': 3,
  'liquid-fill/Size.vue': 3,
}

for (const chart of ['core', 'bar', 'line', 'area', 'pie', 'radar', 'gauge', 'liquid-fill']) {
  const directory = new URL(`../packages/site/src/components/${chart}/demos/`, import.meta.url)
  const demos = readdirSync(directory)
    .filter(file => file.endsWith('.vue'))
    .map(file => {
      const source = readFileSync(new URL(file, directory), 'utf8')
      const meta = JSON.parse(
        source.match(/<archive-meta[^>]*>([\s\S]*?)<\/archive-meta>/)![1]!,
      ) as { title: string }
      return {
        file,
        title: meta.title,
        count: multiChartDemos[`${chart}/${file}`] ?? 1,
      }
    })

  test(`${chart} demos render charts`, async ({ page }) => {
    // A showcase can mount a dozen charts on slower browser runners.
    test.setTimeout(60_000)
    const response = await page.goto(`components/${chart}`, { waitUntil: 'domcontentloaded' })
    expect(response?.ok()).toBe(true)
    await expect(page.locator('[_echarts_instance_]')).toHaveCount(
      demos.reduce((count, demo) => count + demo.count, 0),
      { timeout: 30_000 },
    )
    for (const demo of demos) {
      await test.step(demo.file, async () => {
        const block = page.locator('.archive-app-demo').filter({
          has: page.getByRole('heading', {
            name: new RegExp(`^${demo.title.replace(/[.*+?^${}()|[\]\\]/g, '\\$&')}\\s*#?\\s*$`),
          }),
        })
        await expect(block).toHaveCount(1)
        const charts = block.locator('[_echarts_instance_]')
        await expect(charts).toHaveCount(demo.count)
        for (const chartElement of await charts.all()) {
          await expect(chartElement).toBeVisible()
          await expect(chartElement.locator('svg path, canvas').first()).toBeAttached()
        }
      })
    }
    if (chart === 'core') {
      const block = page
        .locator('.archive-app-demo')
        .filter({ has: page.getByRole('heading', { name: '函数用法' }) })
      await expect(block.locator('[_echarts_instance_] svg')).toContainText('修改后的标题')
    }
  })
}

test('line demo toggles loading', async ({ page }) => {
  await page.goto('components/line')
  await page.getByRole('radio', { name: '示例', exact: true }).click()
  const demo = page.locator('.archive-app-demo').filter({
    has: page.getByRole('heading', { name: /^基础折线图\s*#?\s*$/ }),
  })
  const chart = demo.locator('[_echarts_instance_]')
  const loading = demo.getByRole('status')
  await expect(chart.locator('svg path').first()).toBeAttached()
  await demo.getByText('加载中', { exact: true }).click()
  await expect(loading).toContainText('图表正在加载中，请稍后...')
  await expect(chart).toHaveCount(0)
  await demo.getByText('正常', { exact: true }).click()
  await expect(loading).toHaveCount(0)
  await expect(chart.locator('svg path').first()).toBeAttached()
})

test('stacked area tooltip shows missing ranges and recovers when data returns', async ({
  page,
}) => {
  await page.goto('components/area')
  const demo = page.locator('.archive-app-demo').filter({
    has: page.getByRole('heading', { name: /^堆叠面积图（状态示例）\s*#?\s*$/ }),
  })
  const chart = demo.locator('[_echarts_instance_]')
  const tooltip = chart.locator('.charts-tooltips')
  const title = tooltip.locator('.charts-tooltips-title')
  const rows = tooltip.locator('.charts-tooltips-item')
  const hoverSample = async (day: string) => {
    const label = chart.locator('svg text').filter({ hasText: new RegExp(`^${day}$`) })
    await label.scrollIntoViewIfNeeded()
    const labelBox = await label.boundingBox()
    const chartBox = await chart.boundingBox()
    expect(labelBox).not.toBeNull()
    expect(chartBox).not.toBeNull()
    await page.mouse.move(labelBox!.x + labelBox!.width / 2, chartBox!.y + 150)
    await expect(tooltip).toBeVisible()
  }

  await demo.getByText('数据未上报（一段值缺失）', { exact: true }).click()
  const instance = await chart.getAttribute('_echarts_instance_')
  await hoverSample('07-03')
  await expect(title).toHaveText('07-02 12:00 – 07-03 00:00')
  await expect(rows).toHaveCount(3)
  await hoverSample('07-05')
  await expect(title).toHaveText('07-05 00:00 – 07-05 12:00')
  await expect(rows).toHaveCount(0)
  await expect(chart).toContainText('采集任务未返回结果')

  await demo.getByText('正常', { exact: true }).click()
  await hoverSample('07-05')
  await expect(title).toHaveText('07-05 00:00')
  await expect(rows).toHaveCount(5)
  await expect(chart).not.toContainText('采集任务未返回结果')
  await expect(chart).toHaveAttribute('_echarts_instance_', instance!)
})

test('built-in Basic demo switches states and reloads', async ({ page }) => {
  await page.goto('components/pie')
  await page.getByRole('radio', { name: '示例', exact: true }).click()
  const demo = page
    .locator('.archive-app-demo')
    .filter({ has: page.getByRole('heading', { name: '实心饼图' }) })
  const chart = demo.locator('[_echarts_instance_]')
  const instance = await chart.getAttribute('_echarts_instance_')
  await demo.getByText('重总数', { exact: true }).click()
  await expect(chart.locator('svg text').filter({ hasText: /^554$/ })).toHaveCSS(
    'font-size',
    '28px',
  )
  await demo.getByText('轻总数', { exact: true }).click()
  await expect(chart.locator('svg text').filter({ hasText: /^554$/ })).toHaveCSS(
    'font-size',
    '16px',
  )
  await expect(chart.locator('svg text').filter({ hasText: /^统计总数$/ })).toHaveCount(1)
  await expect(chart).toHaveAttribute('_echarts_instance_', instance!)
  await demo.getByText('数据缺失', { exact: true }).click()
  await expect(demo.locator('[_echarts_instance_]')).toContainText('数据缺失')
  await demo.getByText('全部数值为 0', { exact: true }).click()
  await expect(demo.locator('[_echarts_instance_]')).toContainText('统计总数')
  await demo.getByText('空状态', { exact: true }).click()
  await expect(demo.locator('[_echarts_instance_]')).toHaveCount(0)
  await demo.getByRole('button', { name: '重新加载' }).click()
  await expect(demo.getByRole('status')).toContainText('图表正在加载中')
  await expect(demo.getByRole('status').locator('svg path')).toHaveCount(1)
  await expect(demo.locator('[_echarts_instance_]')).toContainText('554')
})
