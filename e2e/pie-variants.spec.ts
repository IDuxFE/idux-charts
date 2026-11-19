import type { Page } from '@playwright/test'
import { test, expect } from './helpers'
import { fixtureBaseURL } from './environment'

test.use({ baseURL: fixtureBaseURL })
// Current site demos intentionally change the frozen CLI's spacing, dimensions,
// ordering and lightweight chart shape. Check their new rendered contract here;
// pie-basic.spec.ts separately compares explicit legacy styles to the frozen drawing.
for (const variant of [
  'BasicTotal',
  'RingPie',
  'RingExternal',
  'LegendPercentage',
  'LegendColumns',
  'CardPie',
  'CardLightweight',
]) {
  test(`${variant} renders the revised layout and retains category positions across states`, async ({
    page,
  }, testInfo) => {
    await page.goto('?variants')
    await page.getByRole('combobox', { name: 'Variant', exact: true }).selectOption(variant)
    const actual = page.getByTestId('actual')
    if (['BasicTotal', 'RingExternal'].includes(variant))
      await actual.getByText('重总数', { exact: true }).click()
    const chart = actual.locator('[_echarts_instance_]')
    await expect(chart.locator('svg')).toBeVisible()
    const instance = await chart.getAttribute('_echarts_instance_')
    const values =
      variant === 'LegendColumns'
        ? [172, 160, 149, 145, 138, 126, 124, 118, 115, 106, 95, 92]
        : [145, 124, 118, 92, 54, 21]
    const lightweight = variant === 'CardLightweight'
    await expect(chart).toHaveCSS(
      'width',
      lightweight ? '84px' : variant.startsWith('Legend') ? '720px' : '480px',
    )
    await expect(chart).toHaveCSS('height', lightweight ? '84px' : '180px')
    for (const [state, caption] of [
      ['normal', '正常'],
      ['allZero', '全部数值为 0'],
      ['missing', '数据缺失'],
    ] as const) {
      if (lightweight && state !== 'normal') continue
      if (!lightweight) await actual.getByText(caption, { exact: true }).click()
      const expected = values.map((value, index) => ({
        name: `图例${index + 1}`,
        value: state === 'allZero' || (state === 'missing' && index === 3) ? 0 : value,
      }))
      await expect
        .poll(() =>
          page.evaluate(() => {
            const option = (window as any).variantState()[1]
            const series = option?.series.find((item: any) => item.id === 'ix-pie-data')
            return series?.data.map(({ name, value }: any) => ({ name, value }))
          }),
        )
        .toEqual(expected)
      await expect(chart).toHaveAttribute('_echarts_instance_', instance!)
      if (state === 'missing') await expect(chart).toContainText('数据缺失')
      await expect
        .poll(() => page.evaluate(() => (window as any).variantAnimationsFinished()))
        .toBe(true)
      // Check real text bounds so compact layouts cannot silently clip their labels.
      const overflow = await chart.locator('svg').evaluate(svg => {
        const box = svg.getBoundingClientRect()
        return [...svg.querySelectorAll('text')]
          .filter(text => {
            const rect = text.getBoundingClientRect()
            return (
              rect.width > 0 &&
              (rect.left < box.left - 1 ||
                rect.right > box.right + 1 ||
                rect.top < box.top - 1 ||
                rect.bottom > box.bottom + 1)
            )
          })
          .map(text => text.textContent)
      })
      expect(overflow, `${variant}/${state}: clipped text`).toEqual([])
      const radius = await page.evaluate(
        () =>
          (window as any).variantState()[1].series.find((item: any) => item.id === 'ix-pie-data')
            .radius,
      )
      expect(Array.isArray(radius) ? radius[0] > 0 : false).toBe(variant !== 'BasicTotal')
      await testInfo.attach(`${variant}-${state}`, {
        body: await chart.screenshot({ animations: 'disabled' }),
        contentType: 'image/png',
      })
    }
  })
}

async function openColumns(page: Page) {
  await page.goto('?variants')
  await page.getByRole('combobox', { name: 'Variant', exact: true }).selectOption('LegendColumns')
  const actual = page.getByTestId('actual')
  const slider = actual.getByRole('slider')
  await expect(slider).toHaveAttribute('aria-valuenow', '12')
  const setCount = async (value: number) => {
    const current = Number(await slider.getAttribute('aria-valuenow'))
    const key = value < current ? 'ArrowLeft' : 'ArrowRight'
    // Move directly from the current value instead of repeatedly pressing
    // against the minimum before every scenario.
    for (let step = 0; step < Math.abs(value - current); step++) await slider.press(key)
    await expect(slider).toHaveAttribute('aria-valuenow', String(value))
  }
  return { actual, setCount }
}

for (const start of [1, 6, 11, 16]) {
  test(`multi-column legend renders category counts ${start} through ${start + 4}`, async ({
    page,
  }) => {
    const { actual, setCount } = await openColumns(page)
    const count = () =>
      page.evaluate(() => (window as any).variantState()?.[1]?.series[2].data.length)
    for (let value = start; value < start + 5; value++) {
      await setCount(value)
      await expect.poll(count).toBe(value)
      await expect(actual.locator('svg path[d="M0 0l24 0l0 24l-24 0Z"]')).toHaveCount(
        value > 12 ? 2 : 0,
      )
    }
  })
}

test('multi-column paging leaves the first eight categories fixed and recovers after shrinking', async ({
  page,
}) => {
  const { actual, setCount } = await openColumns(page)
  await setCount(15)
  const legends = () => page.evaluate(() => (window as any).variantState()[1].legend)
  await expect.poll(async () => (await legends()).map((l: any) => l.data.length)).toEqual([4, 4, 7])
  await expect(actual.locator('svg text').filter({ hasText: /xx|\d+\/\d+/ })).toHaveCount(0)
  await actual.locator('svg image').last().click()
  await expect.poll(async () => (await legends())[2].scrollDataIndex).toBeGreaterThan(0)
  expect((await legends()).slice(0, 2).flatMap((l: any) => l.data.map((d: any) => d.name))).toEqual(
    Array.from({ length: 8 }, (_, i) => `图例${i + 1}`),
  )
  await setCount(12)
  await expect(actual.locator('svg path[d="M0 0l24 0l0 24l-24 0Z"]')).toHaveCount(0)
  await setCount(4)
  await expect
    .poll(async () => (await legends()).map((l: any) => l.show))
    .toEqual([true, false, false])
  await expect(actual.locator('svg text').filter({ hasText: /^图例5$/ })).toHaveCount(0)
})
