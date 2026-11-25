import { test, expect } from './helpers'

for (const demo of [
  { title: '单子弹图——有范围区间', label: 'bullet-range-label', lower: 30, upper: 60, max: 100 },
  {
    title: '分组子弹图——有特定范围区间',
    label: 'bullet-grouped-range-label',
    lower: 50,
    upper: 100,
    max: 150,
  },
]) {
  for (const boundary of ['minimum', 'maximum', 'collision'] as const) {
    test(`bullet ${demo.label} keeps valid intervals at ${boundary}`, async ({ page }) => {
      await page.goto('components/bullet', { waitUntil: 'domcontentloaded' })
      const block = page.locator('.archive-app-demo').filter({
        has: page.getByRole('heading', { name: new RegExp(`^${demo.title}\\s*#?\\s*$`) }),
      })
      const chart = block.locator('[_echarts_instance_]')
      await expect(chart.locator('svg path').first()).toBeAttached()
      const instance = await chart.getAttribute('_echarts_instance_')
      const thumbs = block.locator(`[aria-labelledby="${demo.label}"] .ix-slider-thumb`)
      await expect(thumbs).toHaveCount(2)
      const lower = boundary === 'minimum'
      const thumb = thumbs.nth(lower ? 0 : 1)
      const key = boundary === 'maximum' ? 'ArrowRight' : 'ArrowLeft'
      const steps = lower
        ? demo.lower + 1
        : boundary === 'maximum'
          ? demo.max - demo.upper + 1
          : demo.upper - demo.lower
      for (let step = 0; step < steps; step++) await thumb.press(key)
      const description = block.getByText(/待提升：0–/)
      await expect
        .poll(async () => {
          const text = (await description.textContent())!.replace(/\s/g, '')
          const match = text.match(/待提升：0–(\d+)；良好：(\d+)–(\d+)；优秀：(\d+)–(\d+)/)
          if (!match) return false
          const first = Number(match[1]),
            second = Number(match[3])
          return (
            first > 0 &&
            first < second &&
            second < demo.max &&
            (boundary !== 'minimum' || first === 1) &&
            (boundary !== 'maximum' || second === demo.max - 1) &&
            (boundary !== 'collision' || second === first + 1)
          )
        })
        .toBe(true)
      await expect(chart).toHaveAttribute('_echarts_instance_', instance!)
      await expect(chart.locator('svg path').first()).toBeAttached()
    })
  }
}

for (const title of [
  '单子弹图——无范围区间',
  '单子弹图——有范围区间',
  '分组子弹图——无特定范围区间',
  '分组子弹图——有特定范围区间',
]) {
  test(`bullet ${title} uses caller-provided zero text`, async ({ page }) => {
    await page.goto('components/bullet', { waitUntil: 'domcontentloaded' })
    const demo = page.locator('.archive-app-demo').filter({
      has: page.getByRole('heading', { name: new RegExp(`^${title}\\s*#?\\s*$`) }),
    })
    const chart = demo.locator('[_echarts_instance_]')
    const zeroText = chart.locator('svg text').filter({ hasText: /^暂无数据$/ })
    await expect(chart.locator('svg path').first()).toBeAttached()
    await expect(zeroText).toHaveCount(0)
    await demo.getByText('全部值为 0', { exact: true }).click()
    await expect(zeroText).toHaveCount(1)
    await demo.getByText('正常', { exact: true }).click()
    await expect(zeroText).toHaveCount(0)
  })
}
