import type { Locator } from '@playwright/test'
import { test, expect } from './helpers'

async function select(demo: Locator, group: string, name: string) {
  const label = demo
    .locator(`[aria-label="${group}"]`)
    .locator('label')
    .filter({
      has: demo.page().getByText(name, { exact: true }),
    })
  await label.click()
  await expect(label.getByRole('radio')).toBeChecked()
}

for (const title of ['状态型', '密度型', '飞线型']) {
  test(`${title} switches geometry and data states without stale loading or blank maps`, async ({
    page,
  }) => {
    await page.goto('components/map')
    const demo = page.locator('.archive-app-demo').filter({
      has: page.getByRole('heading', { name: new RegExp(`^${title}\\s*#?\\s*$`), level: 3 }),
    })
    const chart = demo.locator('[_echarts_instance_]')
    const svg = chart.locator('svg')
    await expect(svg).toBeVisible()
    for (const scope of ['世界地图', '中国地图']) {
      await select(demo, '地图范围', scope)
      await expect.poll(() => svg.locator('path').count()).toBeGreaterThan(20)
      await select(demo, '数据状态', '数值为 0')
      await expect(svg).toBeVisible()
      const instance = await chart.getAttribute('_echarts_instance_')
      await select(demo, '数据状态', '加载中')
      await expect(chart.locator('.ix-chart-loading')).toBeVisible()
      await expect(chart).toHaveAttribute('_echarts_instance_', instance!)
      await select(demo, '数据状态', '正常')
      await expect(chart.locator('.ix-chart-loading')).toHaveCount(0)
      await expect(chart).toHaveAttribute('_echarts_instance_', instance!)
      const height = (await chart.boundingBox())!.height
      await select(demo, '数据状态', '空状态')
      await expect(chart).toHaveCount(0)
      const placeholder = demo.getByText('暂无数据', { exact: true })
      await expect(placeholder).toBeVisible()
      const stage = placeholder.locator('xpath=ancestor::div[contains(@class,"placeholder")]')
      expect((await stage.boundingBox())!.height).toBeCloseTo(height, 0)
      await demo.getByRole('button', { name: '重新加载', exact: true }).click()
      await expect(svg).toBeVisible()
      await expect(chart.locator('.ix-chart-loading')).toHaveCount(0)
      await expect(chart).not.toHaveAttribute('_echarts_instance_', instance!)
    }
  })
}

test('core map example renders and component menu labels preserve navigation', async ({ page }) => {
  await page.setViewportSize({ width: 1920, height: 1000 })
  await page.goto('components/core')
  const demo = page.locator('.archive-app-demo').filter({
    has: page.getByRole('heading', { name: /^地图\s*#?\s*$/, level: 3 }),
  })
  await expect(demo.locator('svg path').first()).toBeVisible()
  await page.waitForLoadState('networkidle')
  await expect(page.getByRole('menuitem', { name: '基础组件', exact: true })).toContainText(
    'IxChart',
  )
  const map = page.getByRole('menuitem', { name: '地图', exact: true })
  await expect(map).toContainText('IxMapChart')
  await map.click()
  await expect(page).toHaveURL(/components\/map$/)
  await expect(page.locator('.map-density-chart svg')).toBeVisible()
})
