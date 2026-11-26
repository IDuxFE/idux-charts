import type { Locator } from '@playwright/test'
import { test, expect, clickSvg, hoverSvg } from './helpers'

function sampleTravel(label: Locator) {
  return label.evaluate(async element => {
    const before = element.getBoundingClientRect()
    for (let frame = 0; frame < 5; frame++)
      await new Promise<void>(resolve => requestAnimationFrame(() => resolve()))
    const after = element.getBoundingClientRect()
    return Math.hypot(after.x - before.x, after.y - before.y)
  })
}

for (const shape of ['文字', '矩形标签', '圆形气泡']) {
  test(`word cloud ${shape} floats and honors reduced motion`, async ({ page }) => {
    await page.emulateMedia({ reducedMotion: 'no-preference' })
    await page.goto('components/word-cloud')
    const demo = page.locator('.archive-app-demo').filter({
      has: page.getByRole('heading', { name: /^持续漂浮\s*#?\s*$/ }),
    })
    await demo.getByText(shape, { exact: true }).click()
    const label = demo.locator('svg text').filter({ hasText: /^数据分析$/ })
    await expect(label).toBeVisible()
    // Scroll the stable host: moving text never satisfies Playwright's stability check.
    await demo.locator('[_echarts_instance_]').scrollIntoViewIfNeeded()
    await page.mouse.move(0, 0)
    const position = () =>
      label.evaluate(element => {
        const box = element.getBoundingClientRect()
        return [box.x, box.y]
      })
    const initial = await position()
    await expect
      .poll(async () => {
        const next = await position()
        return Math.hypot(next[0]! - initial[0]!, next[1]! - initial[1]!)
      })
      .toBeGreaterThan(0.1)
    await hoverSvg(demo.locator('[_echarts_instance_]'), label)
    await expect(demo.locator('.charts-tooltips')).toBeVisible()
    await expect.poll(() => sampleTravel(label)).toBeLessThan(0.01)
    const hovered = await position()
    await page.mouse.move(0, 0)
    await expect
      .poll(async () => {
        const next = await position()
        return Math.hypot(next[0]! - hovered[0]!, next[1]! - hovered[1]!)
      })
      .toBeGreaterThan(0.1)
    await page.emulateMedia({ reducedMotion: 'reduce' })
    await expect.poll(() => sampleTravel(label)).toBeLessThan(0.01)
    const paused = await position()
    await page.emulateMedia({ reducedMotion: 'no-preference' })
    await expect
      .poll(async () => {
        const next = await position()
        return Math.hypot(next[0]! - paused[0]!, next[1]! - paused[1]!)
      })
      .toBeGreaterThan(0.1)
  })
}

test('word cloud tags support real pointer selection, legend filtering and state recovery', async ({
  page,
}) => {
  await page.goto('components/word-cloud')
  const demo = page.locator('.archive-app-demo').filter({
    has: page.getByRole('heading', { name: /^分类矩形标签\s*#?\s*$/ }),
  })
  const chart = demo.locator('[_echarts_instance_]')
  const label = chart.locator('svg text').filter({ hasText: /^黑链 132$/ })
  await expect(label).toBeVisible()
  const instance = await chart.getAttribute('_echarts_instance_')
  await clickSvg(chart.locator('svg'), label)
  await page.mouse.move(0, 0)
  await expect(label).toHaveCSS('fill', 'rgb(255, 255, 255)')
  await clickSvg(chart.locator('svg'), label)
  await page.mouse.move(0, 0)
  await expect(label).not.toHaveCSS('fill', 'rgb(255, 255, 255)')
  const legend = chart.locator('svg text').filter({ hasText: /^受到威胁$/ })
  await clickSvg(chart.locator('svg'), legend)
  await expect(label).toHaveCount(0)
  await expect(chart.locator('svg text').filter({ hasText: /^Bisonal$/ })).toBeVisible()
  await clickSvg(chart.locator('svg'), legend)
  await expect(label).toBeVisible()
  await demo.getByText('加载中', { exact: true }).click()
  await expect(demo.locator('.ix-chart-loading')).toBeVisible()
  await demo.getByText('空状态', { exact: true }).click()
  await expect(demo.getByText('暂无词云数据，请调整筛选条件或检查数据源')).toBeVisible()
  await demo.getByText('正常', { exact: true }).click()
  await expect(label).toBeVisible()
  await expect(chart).toHaveAttribute('_echarts_instance_', instance!)
})

test('word cloud search highlights without moving labels and clears the match', async ({
  page,
}) => {
  await page.goto('components/word-cloud')
  const demo = page.locator('.archive-app-demo').filter({
    has: page.getByRole('heading', { name: /^搜索高亮\s*#?\s*$/ }),
  })
  const chart = demo.locator('[_echarts_instance_]')
  await chart.scrollIntoViewIfNeeded()
  const input = demo.getByRole('textbox', { name: '搜索词云关键词' })
  const label = chart.locator('svg text').filter({ hasText: /^味道$/ })
  await expect(label).toBeVisible()
  await page.mouse.move(0, 0)
  const positions = () =>
    chart.locator('svg text').evaluateAll(nodes =>
      nodes.map(node => {
        const box = node.getBoundingClientRect()
        return [node.textContent, box.x, box.y]
      }),
    )
  const before = await positions()
  await input.fill('味道')
  await page.mouse.move(0, 0)
  await expect(label).toHaveCSS('fill', 'rgb(255, 255, 255)')
  expect(await positions()).toEqual(before)
  await input.fill('不存在的关键词')
  await expect(label).not.toHaveCSS('fill', 'rgb(255, 255, 255)')
  expect(await positions()).toEqual(before)
  await input.fill('')
  expect(await positions()).toEqual(before)
})
