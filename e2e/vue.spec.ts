import { readdirSync, readFileSync } from 'node:fs'
import { test, expect } from './helpers'

for (const chart of ['core', 'bar', 'line', 'pie']) {
  const directory = new URL(`../packages/site/src/components/${chart}/demos/`, import.meta.url)
  const demos = readdirSync(directory)
    .filter(file => file.endsWith('.vue'))
    .map(file => {
      const source = readFileSync(new URL(file, directory), 'utf8')
      const meta = JSON.parse(
        source.match(/<archive-meta[^>]*>([\s\S]*?)<\/archive-meta>/)![1]!,
      ) as { title: string }
      return { file, title: meta.title }
    })

  test(`${chart} demos render charts`, async ({ page }) => {
    const response = await page.goto(`components/${chart}`)
    expect(response?.ok()).toBe(true)
    await expect
      .poll(() =>
        page.getByAltText('logo').evaluate(image => (image as HTMLImageElement).naturalWidth),
      )
      .toBeGreaterThan(0)
    await page.getByRole('radio', { name: '示例', exact: true }).click()
    await expect(page.locator('[_echarts_instance_]')).toHaveCount(demos.length)
    for (const demo of demos) {
      await test.step(demo.file, async () => {
        const block = page.locator('.archive-app-demo').filter({
          has: page.getByRole('heading', {
            name: new RegExp(`^${demo.title.replace(/[.*+?^${}()|[\]\\]/g, '\\$&')}\\s*#?\\s*$`),
          }),
        })
        await expect(block).toHaveCount(1)
        const chartElement = block.locator('[_echarts_instance_]')
        await expect(chartElement).toBeVisible()
        await expect(chartElement.locator('svg path, canvas').first()).toBeAttached()
        const size = await chartElement.boundingBox()
        expect(size?.width).toBeGreaterThan(0)
        expect(size?.height).toBeGreaterThan(0)
      })
    }
    if (chart === 'core') {
      const block = page
        .locator('.archive-app-demo')
        .filter({ has: page.getByRole('heading', { name: '函数用法' }) })
      await expect(block.locator('[_echarts_instance_] svg')).toContainText('修改后的标题')
    }
  })

  // The category bar and pie loading states have dedicated coverage.
  if (chart === 'line') {
    test(`${chart} demo toggles loading`, async ({ page }) => {
      await page.goto(`components/${chart}`)
      await page.getByRole('radio', { name: '示例', exact: true }).click()
      const block = page
        .locator('.archive-app-demo')
        .filter({ has: page.getByRole('heading', { name: '加载中状态' }) })
      const chartElement = block.locator('[_echarts_instance_]')
      await expect(chartElement).toContainText('加载中...')
      await block.locator('.ix-switch').click()
      await expect(chartElement).not.toContainText('加载中...')
      await expect(chartElement.locator('svg path').first()).toBeAttached()
      await block.locator('.ix-switch').click()
      await expect(chartElement).toContainText('加载中...')
    })
  }
}

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
