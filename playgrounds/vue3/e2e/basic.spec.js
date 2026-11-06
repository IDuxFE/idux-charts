import { test, expect } from '@playwright/test'

test('automatic pie supports resize, shrinking, missing and empty data', async ({ page }) => {
  const errors = []
  page.on('pageerror', error => errors.push(error.message))
  await page.goto('/?basic')
  const state = () => page.evaluate(() => window.basicPieState())
  await expect.poll(async () => (await state())?.option.title[0].show).toBe(false)
  await expect.poll(async () => (await state()).option.series[2].radius).toBe(60)
  await page.getByRole('button', { name: 'Align', exact: true }).click()
  await expect
    .poll(async () => {
      const s = (await state()).option.series[0]
      return s.center[1] + s.radius
    })
    .toBe(180)
  await expect
    .poll(async () => {
      const s = (await state()).option.series[0]
      return s.center[0] + s.radius
    })
    .toBe(480)
  const originalColumnLeft = (await state()).option.legend[1].left
  await page.getByRole('button', { name: 'Resize', exact: true }).click()
  await expect.poll(async () => (await state()).width).toBe(600)
  await expect
    .poll(async () => (await state()).option.legend[1].left)
    .toBeGreaterThan(originalColumnLeft)
  // Height stays 180; bottom alignment still leaves one background radius below the center.
  await expect
    .poll(async () => {
      const s = (await state()).option.series[0]
      return s.center[1] + s.radius
    })
    .toBe(180)
  await page.getByRole('button', { name: 'Zero', exact: true }).click()
  await expect.poll(async () => (await state()).option.series[2].data.length).toBe(3)
  await expect.poll(async () => (await state()).option.series[1].data[0].value).toBe(1)
  await page.getByRole('button', { name: 'Missing', exact: true }).click()
  await expect(page.locator('.basic-chart')).toContainText('–')
  expect((await state()).option.series[2].name).toBe('')
  await page.getByRole('button', { name: 'Empty', exact: true }).click()
  await expect.poll(async () => (await state()).option.series[2].data).toEqual([])
  expect(errors).toEqual([])
})

test('packaged ring owns its graphics and preserves interaction on presentation changes', async ({
  page,
}) => {
  const errors = []
  page.on('pageerror', error => errors.push(error.message))
  await page.goto('/?basic')
  const state = () => page.evaluate(() => window.basicPieState())
  await expect.poll(async () => (await state())?.option.series.length).toBe(3)
  const id = (await state()).id
  await page.getByRole('button', { name: 'Ring', exact: true }).click()
  await expect(page.locator('.basic-chart')).toContainText('Assets')
  expect((await state()).id).toBe(id)
  expect((await state()).option.series[2].radius).toEqual([52.8, 60])
  await page
    .locator('.basic-chart svg text')
    .filter({ hasText: /^图例1$/ })
    .click()
  await page.getByRole('button', { name: 'Presentation', exact: true }).click()
  await expect(page.locator('.basic-chart svg text').filter({ hasText: /^图例2$/ })).toHaveCSS(
    'font-size',
    '24px',
  )
  expect((await state()).id).toBe(id)
  expect((await state()).option.legend[0].selected['图例1']).toBe(false)
  await page.getByRole('button', { name: 'Zero', exact: true }).click()
  await expect(page.locator('.basic-chart')).toContainText('Assets')
  expect(errors).toEqual([])
})
