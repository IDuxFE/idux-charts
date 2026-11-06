import { test, expect } from './helpers'

test('liquid fill demos update waves, boundaries and request states', async ({
  page,
}, testInfo) => {
  const errors: string[] = []
  page.on('pageerror', error => errors.push(error.message))
  await page.goto('components/liquid-fill')
  await page.getByRole('radio', { name: '示例', exact: true }).click()
  const demo = page.locator('.liquid-basic')
  const chart = demo.locator('[_echarts_instance_]')
  await expect(chart.locator('svg')).toBeVisible()
  await expect(demo.locator('.status')).toHaveText('正常')
  await expect(demo.locator('.chart-demo-slider')).toHaveCSS('width', '200px')
  const chartId = await chart.getAttribute('_echarts_instance_')
  const setValue = async (value: number) => {
    const rail = await demo.locator('.ix-slider-rail').boundingBox()
    await page.mouse.click(
      rail!.x + Math.min(rail!.width - 0.5, Math.max(0.5, (rail!.width * value) / 100)),
      rail!.y + rail!.height / 2,
    )
    await expect(demo.getByRole('slider')).toHaveAttribute('aria-valuenow', String(value))
  }
  for (const value of [20, 0, 100, 80, 92, 0, 50]) {
    await setValue(value)
    await expect(chart).toContainText(String(value))
    // Count drawn shapes, excluding the clipping path in defs: two background
    // circles, plus either two waves, a full circle, or nothing at zero.
    await expect
      .poll(() =>
        chart
          .locator('svg path')
          .evaluateAll(
            paths =>
              paths.filter(
                path => !path.closest('defs, clipPath') && path.getAttribute('fill') !== 'none',
              ).length,
          ),
      )
      .toBe(value === 0 ? 2 : value === 100 ? 3 : 4)
    await expect(chart).toHaveAttribute('_echarts_instance_', chartId!)
    await expect(demo.locator('.status')).toHaveText(
      value === 0 ? '' : value >= 90 ? '高危' : value >= 70 ? '中危' : '正常',
    )
  }
  await page.screenshot({ path: testInfo.outputPath('liquid-fill-examples.png'), fullPage: true })
  await demo.getByText('空状态', { exact: true }).click()
  await expect(chart).toHaveCount(0)
  await demo.getByRole('button', { name: '重新加载' }).click()
  await expect(demo.getByRole('status')).toHaveAttribute('aria-busy', 'true')
  await expect(chart.locator('svg')).toBeVisible()
  await demo.getByText('加载中', { exact: true }).click()
  await setValue(0)
  await expect(chart.locator('svg')).toBeVisible()
  await expect(chart).toContainText('0')
  await page.setViewportSize({ width: 480, height: 800 })
  await expect(chart.locator('svg')).toBeVisible()
  expect(errors).toEqual([])
})

test('additional liquid fill examples render and animated waves change shape', async ({
  page,
}, testInfo) => {
  await page.goto('components/liquid-fill')
  await page.getByRole('radio', { name: '示例', exact: true }).click()
  const paths = page.locator('.liquid-basic svg path')
  await expect(paths.first()).toBeVisible()
  const shapes = () =>
    paths.evaluateAll(elements =>
      elements.map(el => getComputedStyle(el).getPropertyValue('d') || el.getAttribute('d')),
    )
  const initial = await shapes()
  await expect.poll(shapes).not.toEqual(initial)
  for (const [title, label] of [
    ['多指标与风险颜色', '内存'],
    ['自定义量程与边界', '存储容量 / 64 GB'],
    ['尺寸与静态模式', '静态小图'],
  ]) {
    await page.getByText(title!, { exact: true }).first().scrollIntoViewIfNeeded()
    await expect(page.getByText(label!, { exact: true })).toBeVisible()
    await page.screenshot({ path: testInfo.outputPath(`${title}.png`) })
  }
})
