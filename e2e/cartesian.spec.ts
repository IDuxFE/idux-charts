import { test, expect } from './helpers'
import { fixtureBaseURL } from './environment'

for (const portal of ['', 'body', 'host']) {
  for (const index of [0, 1]) {
    test(`cartesian ${index} portal=${portal || 'chart'} renders markers, multi-axis units and theme-aware tooltips`, async ({
      page,
    }) => {
      await page.goto(`${fixtureBaseURL}cartesian.html?portal=${portal}`)
      const chart = page.locator(`.chart-${index}`)
      for (const dark of [false, true, false]) {
        for (const label of ['Threshold', 'Peak', 'Window']) {
          await expect(chart.locator('svg text').filter({ hasText: label }).first()).toBeVisible()
        }
        await page.evaluate(index => (window as any).showCartesianTooltip(index), index)
        await expect(chart).toHaveAttribute('data-ix-chart-theme', dark ? 'dark' : 'light')
        const tooltip = page.locator(`.demo-tooltip-${index} .charts-tooltips`)
        if (portal === 'body')
          await expect(page.locator(`body > .demo-tooltip-${index}`)).toHaveCount(1)
        if (portal === 'host')
          await expect(page.locator(`#tooltip-host > .demo-tooltip-${index}`)).toHaveCount(1)
        await expect(tooltip).toBeVisible()
        await expect(tooltip).toContainText('10 ms')
        await expect(tooltip).toContainText('40 %')
        await expect(tooltip.locator('.charts-tooltips-item-border').first()).toHaveCSS(
          'background-color',
          'rgb(69, 143, 255)',
        )
        await expect(tooltip.locator('.charts-tooltips-item').first()).toHaveCSS(
          'background-color',
          dark ? 'rgb(28, 35, 46)' : 'rgb(255, 255, 255)',
        )
        await expect(tooltip.locator('.charts-tooltips-item').first()).toHaveCSS(
          'box-shadow',
          dark ? 'rgba(0, 0, 0, 0.25) 0px 4px 12px 0px' : 'rgba(2, 55, 179, 0.1) 0px 4px 12px 0px',
        )
        await expect(tooltip.locator('.charts-tooltips-item-border').first()).toHaveCSS(
          'box-shadow',
          dark ? 'none' : 'rgb(232, 244, 255) 0px 2px 8px 0px',
        )
        const pointerColor = await page.evaluate(
          index => (window as any).cartesianPointerColor(index),
          index,
        )
        if (!dark) expect(pointerColor.toUpperCase()).toBe(index === 1 ? '#D3D7DE' : '#E1E5EB')
        else expect(pointerColor.toUpperCase()).not.toBe('#D3D7DE')
        const colors = await tooltip.evaluate(element => {
          const parent = getComputedStyle(element.parentElement!)
          return {
            parent: parent.color,
            title: getComputedStyle(element.querySelector('.charts-tooltips-title')!).color,
            row: getComputedStyle(element.querySelector('.charts-tooltips-item')!).color,
            background: parent.backgroundColor,
          }
        })
        expect(colors.title).toBe(colors.parent)
        expect(colors.row).toBe(colors.parent)
        if (dark) expect(colors.background).not.toBe('rgba(251, 253, 255, 0.88)')
        await page.locator('#theme').click()
      }
    })
  }
}

test('portalled tooltips keep independent themes on the same page', async ({ page }) => {
  await page.goto(`${fixtureBaseURL}cartesian.html?portal=body&mixed`)
  for (const swapped of [false, true]) {
    for (const index of [0, 1]) {
      await expect(page.locator(`.chart-${index} svg`)).toBeVisible()
      await page.evaluate(index => (window as any).showCartesianTooltip(index), index)
      const row = page.locator(`body > .demo-tooltip-${index} .charts-tooltips-item`).first()
      await expect(row).toBeVisible()
      const dark = index === 1 ? !swapped : swapped
      await expect(row).toHaveCSS(
        'background-color',
        dark ? 'rgb(28, 35, 46)' : 'rgb(255, 255, 255)',
      )
    }
    await page.locator('#theme').click()
  }
})
