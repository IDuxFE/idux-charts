import { test, expect } from '@playwright/test'

for (const theme of ['light', 'dark']) {
  test(`preserves ${theme} chart appearance`, async ({ page }) => {
    const errors = []
    page.on('pageerror', error => errors.push(error.message))
    page.on('console', message => {
      if (message.type() === 'error') errors.push(message.text())
    })
    await page.goto('/')
    const state = () => page.evaluate(() => window.chartState())
    await expect
      .poll(async () => (await state()).map(chart => chart.type))
      .toEqual(['bar', 'line', 'pie'])
    if (theme === 'dark') {
      const before = await state()
      await page.getByTestId('theme').click()
      await expect
        .poll(async () => (await state()).every((chart, i) => chart.id !== before[i].id))
        .toBe(true)
    }
    for (const [index, kind] of ['bar', 'line', 'pie'].entries()) {
      const chart = page.locator('.chart').nth(index)
      await expect(chart.locator('svg path').first()).toBeAttached()
      await chart.scrollIntoViewIfNeeded()
      await page.mouse.move(0, 0)
      // Fractional positions change SVG rasterization and screenshot crop bounds.
      const box = await chart.boundingBox()
      expect(box).not.toBeNull()
      expect(box.y).toBe(Math.round(box.y))
      expect(box.height).toBe(280)
      await expect(chart).toHaveScreenshot(`${kind}-${theme}.png`, {
        animations: 'disabled',
        maxDiffPixelRatio: 0.005,
      })
    }
    expect(errors).toEqual([])
  })
}
