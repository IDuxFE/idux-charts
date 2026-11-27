import { test, expect, reloadDemo } from './helpers'
import { selectMapControl as select, expectMapGeometry } from './mapDemoHelpers'
import { openDemo } from './demoFixtures'

for (const [title, key] of [
  ['状态型', 'map-status'],
  ['密度型', 'map-density'],
  ['飞线型', 'map-lines'],
] as const) {
  for (const scope of ['世界地图', '中国地图']) {
    test(`${title} recovers data states on ${scope} without replacing its instance`, async ({
      page,
    }) => {
      const demo = await openDemo(page, key)
      const chart = demo.locator('[_echarts_instance_]')
      const svg = chart.locator('svg')
      await expect(svg).toBeVisible()
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
      await expect(chart).toHaveAttribute('_echarts_instance_', instance!)
      const placeholder = demo.getByText('暂无数据', { exact: true })
      await expect(placeholder).toBeVisible()
      const stage = demo.locator('.ix-chart-overlay')
      expect((await stage.boundingBox())!.height).toBeCloseTo(height, 0)
      await reloadDemo(demo)
      await expect(svg).toBeVisible()
      await expect(chart.locator('.ix-chart-loading')).toHaveCount(0)
      await expect(chart).toHaveAttribute('_echarts_instance_', instance!)
      await select(demo, '地图范围', scope === '世界地图' ? '中国地图' : '世界地图')
      await expectMapGeometry(chart, scope === '世界地图' ? 'china' : 'world')
      await expect(chart.locator('.ix-chart-loading')).toHaveCount(0)
      await expect(chart.locator('.ix-chart-overlay .ix-empty')).toHaveCount(0)
    })
  }
}

test('core map example renders and component menu labels preserve navigation', async ({ page }) => {
  await page.setViewportSize({ width: 1920, height: 1000 })
  await page.goto('components/core')
  const demo = page.locator('.archive-app-demo').filter({
    has: page.getByRole('heading', { name: /^地图\s*#?\s*$/, level: 3 }),
  })
  await expect(demo.locator('svg path').first()).toBeVisible()
  await expect(page.getByRole('menuitem', { name: '基础组件', exact: true })).toHaveText(
    'Chart基础组件',
  )
  const map = page.getByRole('menuitem', { name: '地图', exact: true })
  await expect(map).toHaveText('MapChart地图')
  await map.click()
  await expect(page).toHaveURL(/components\/map$/)
  await expect(page.locator('.map-density-chart svg')).toBeVisible()
})
