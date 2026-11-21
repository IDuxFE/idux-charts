import { test, expect, hoverCategory } from './helpers'

test('external overrides keep the hover band behind the bar and stripes above it', async ({
  page,
}) => {
  await page.goto('components/bar')
  const demo = page.locator('.archive-app-demo').filter({
    has: page.getByRole('heading', { name: '外部配置覆盖默认值', exact: false }),
  })
  const chart = demo.locator('[_echarts_instance_]')
  await expect(chart).toHaveCount(1)
  await demo.getByRole('button', { name: '应用外部配置', exact: true }).click()
  await expect(chart.locator('svg path[fill="#8352cc" i]:not([transform])')).toHaveCount(5)
  const label = chart.locator('svg text').filter({ hasText: /^周一$/ })
  await hoverCategory(chart.locator('svg'), label, 140)
  await expect(chart.locator('.charts-tooltips')).toBeVisible()
  await expect(chart.locator('.charts-tooltips-item')).toHaveCount(1)
  await expect(chart.locator('.charts-tooltips')).toContainText('120 次')

  // The silent stripe series must not hide or duplicate the bar's default value label.
  await expect(chart.locator('svg').getByText('120', { exact: true })).toHaveCount(1)

  // SVG paints in document order. Check the rendered band, bar and stripes.
  await expect
    .poll(async () =>
      chart.locator('svg').evaluate(svg => {
        const paths = [...svg.querySelectorAll('path')]
        const band = paths.findIndex(
          path =>
            path.getAttribute('stroke') === '#E1E5EB' &&
            Number(path.getAttribute('stroke-width')) > 10,
        )
        const bar = paths.findIndex(
          path =>
            path.getAttribute('fill')?.toLowerCase() === '#8352cc' &&
            !path.hasAttribute('transform'),
        )
        const stripe = paths.findIndex(
          path =>
            path.getAttribute('fill') === 'rgb(255,255,255)' &&
            Number(path.getAttribute('fill-opacity') ?? 1) > 0,
        )
        return { bandFound: band >= 0, barAfterBand: bar > band, stripeAfterBar: stripe > bar }
      }),
    )
    .toEqual({ bandFound: true, barAfterBand: true, stripeAfterBar: true })
  await page.mouse.move(0, 0)
  await expect(chart.locator('.charts-tooltips')).not.toBeVisible()
  await expect
    .poll(async () =>
      chart
        .locator('svg path[fill="rgb(255,255,255)"]')
        .evaluateAll(paths =>
          paths.every(path => Number(path.getAttribute('fill-opacity') ?? 1) === 0),
        ),
    )
    .toBe(true)
  await demo.getByRole('button', { name: '应用外部配置', exact: true }).click()
  await expect(chart.locator('svg path[fill="#8352cc" i]:not([transform])')).toHaveCount(0)
  await expect(chart.locator('svg path[fill="rgb(255,255,255)"]')).toHaveCount(0)
})
