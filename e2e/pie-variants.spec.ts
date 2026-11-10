import { readFileSync } from 'node:fs'
import type { Page } from '@playwright/test'
import { test, expect } from './helpers'
import { comparePixels } from './comparePixels'
import { fixtureBaseURL } from './environment'

test.use({ baseURL: fixtureBaseURL })
const font = readFileSync(
  new URL('../packages/site/assets/D-DIN-PRO-Regular.ttf', import.meta.url),
).toString('base64')
const fontStyle = `<style>@font-face{font-family:D-DIN-PRO;src:url(data:font/ttf;base64,${font})}</style>`

// Rose defaults intentionally differ from the frozen CLI; pie-layout.spec.ts verifies their new design.
for (const variant of [
  'BasicTotal',
  'RingPie',
  'RingExternal',
  'LegendPercentage',
  'LegendColumns',
  'CardPie',
  'CardLightweight',
]) {
  test(`${variant} matches the frozen CLI drawing in normal, zero and missing states`, async ({
    page,
  }, testInfo) => {
    await page.goto('?variants')
    await page.getByRole('combobox', { name: 'Variant', exact: true }).selectOption(variant)
    const actual = page.getByTestId('actual')
    if (['BasicTotal', 'RingExternal', 'RoseTotal'].includes(variant))
      await actual.getByText('重总数', { exact: true }).click()
    for (const [state, caption] of [
      ['normal', '正常'],
      ['allZero', '全部数值为 0'],
      ['missing', '数据缺失'],
    ] as const) {
      if (variant === 'CardLightweight' && state !== 'normal') continue
      await page.getByRole('combobox', { name: 'Reference state', exact: true }).selectOption(state)
      if (variant !== 'CardLightweight') await actual.getByText(caption, { exact: true }).click()
      await expect(actual.locator('[_echarts_instance_] svg')).toBeVisible()
      await page.mouse.move(0, 0)
      // ECharts uses requestAnimationFrame, not CSS animations. Wait for both
      // rendered charts before serializing their SVGs into static comparison images.
      await expect
        .poll(() => page.evaluate(() => (window as any).variantAnimationsFinished?.()))
        .toBe(true)
      // Rasterize both SVG outputs on the same opaque surface. Direct captures
      // across the demo's different DOM ancestors can change SVG gradient rasterization.
      const capture = async (id: string) => {
        const svg = await page
          .getByTestId(id)
          .locator('[_echarts_instance_] svg')
          .evaluate(el => el.outerHTML)
        await page.evaluate(
          async svg => {
            document.getElementById('comparison-surface')?.remove()
            const image = document.createElement('img')
            image.id = 'comparison-surface'
            image.src = `data:image/svg+xml;charset=utf-8,${encodeURIComponent(svg)}`
            image.style.cssText = 'position:fixed;left:8px;top:50px;z-index:99999;background:white'
            document.body.append(image)
            await image.decode()
          },
          svg.replace('</svg>', `${fontStyle}</svg>`),
        )
        const image = await page.locator('#comparison-surface').screenshot()
        await page.locator('#comparison-surface').evaluate(el => el.remove())
        return image
      }
      let reference: Buffer | undefined, result: Buffer | undefined
      try {
        await expect
          .poll(
            async () => {
              reference = await capture('reference')
              result = await capture('actual')
              return comparePixels(reference, result).matches
            },
            { message: `${variant}/${state} rendered pixels`, timeout: 5000 },
          )
          .toBe(true)
      } finally {
        if (reference && result) {
          await testInfo.attach(`${state}-diff`, {
            body: comparePixels(reference, result).diff,
            contentType: 'image/png',
          })
          await testInfo.attach(`${state}-reference`, {
            body: reference,
            contentType: 'image/png',
          })
          await testInfo.attach(`${state}-actual`, { body: result, contentType: 'image/png' })
        }
      }
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
