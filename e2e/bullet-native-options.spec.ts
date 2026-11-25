import { test, expect, hoverSvg, clickSvg } from './helpers'

for (const title of [
  '单子弹图——无范围区间',
  '单子弹图——有范围区间',
  '分组子弹图——无特定范围区间',
  '分组子弹图——有特定范围区间',
  '分组子弹图——上方标签',
]) {
  test(`bullet preserves hover hatching in ${title}`, async ({ page }) => {
    await page.goto('components/bullet', { waitUntil: 'domcontentloaded' })
    const demo = page.locator('.archive-app-demo').filter({
      has: page.getByRole('heading', { name: new RegExp(`^${title}\\s*#?\\s*$`) }),
    })
    const chart = demo.locator('[_echarts_instance_]')
    const bar = chart.locator('svg path[filter^="url("]').first()
    const stripes = chart.locator('svg path[fill*="-p"]')
    await expect(bar).toBeAttached()
    await expect(stripes).toHaveCount(0)
    await hoverSvg(chart, bar)
    await expect.poll(() => stripes.count()).toBeGreaterThan(0)
    // Native decals must stay within the same bounds as their bar.
    await expect
      .poll(() =>
        chart.evaluate(element => {
          const bodies = [
            ...element.querySelectorAll<SVGPathElement>('svg path[fill]:not([fill*="-p"])'),
          ]
          const decals = [...element.querySelectorAll<SVGPathElement>('svg path[fill*="-p"]')]
          return (
            decals.length > 0 &&
            decals.every(decal => {
              const texture = decal.getBBox()
              return bodies.some(body => {
                const bounds = body.getBBox()
                return (
                  Math.abs(bounds.x - texture.x) < 0.01 &&
                  Math.abs(bounds.y - texture.y) < 0.01 &&
                  Math.abs(bounds.width - texture.width) < 0.01 &&
                  Math.abs(bounds.height - texture.height) < 0.01
                )
              })
            })
          )
        }),
      )
      .toBe(true)
    await page.mouse.move(0, 0)
    await expect(stripes).toHaveCount(0)
  })
}

test('bullet native configuration demo applies representative overrides', async ({ page }) => {
  await page.goto('components/bullet', { waitUntil: 'domcontentloaded' })
  const demo = page.locator('.archive-app-demo').filter({
    has: page.getByRole('heading', { name: /^自定义 ECharts 配置\s*#?\s*$/ }),
  })
  const chart = demo.locator('[_echarts_instance_]')
  await expect(chart.locator('svg text').filter({ hasText: /^72$/ })).toHaveCount(1)
  await expect(chart.locator('svg text').filter({ hasText: /^100%$/ })).toHaveCount(1)
  await expect(chart.locator('svg path[fill="#8399BF"]').first()).toBeAttached()
  const bar = chart.locator('svg path[fill^="url("]').first()
  await hoverSvg(chart, bar)
  await expect.poll(() => chart.locator('svg path[fill*="-p"]').count()).toBeGreaterThan(0)
  await clickSvg(chart, bar)
  await page.mouse.move(0, 0)
  await expect
    .poll(() =>
      chart
        .locator('svg path')
        .evaluateAll(paths =>
          paths.some(path => getComputedStyle(path).fill === 'rgb(145, 173, 221)'),
        ),
    )
    .toBe(true)
})
