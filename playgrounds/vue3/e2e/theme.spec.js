import { test, expect } from '@playwright/test'

test('reactive global theme, local styles and explicit Pie modes work in the packaged build', async ({
  page,
}) => {
  const errors = []
  page.on('pageerror', error => errors.push(error.message))
  await page.goto('/?theme')
  const state = () => page.evaluate(() => window.themePlotState())
  await expect.poll(async () => (await state()).pie?.option.series.length).toBe(3)
  const id = (await state()).pie.id
  await page.getByRole('button', { name: 'Theme', exact: true }).click()
  await expect
    .poll(async () => (await state()).radar.option.radar[0].axisName.color)
    .toBe('#345678')
  await expect(page.locator('.theme-gauge svg text').filter({ hasText: /^50$/ })).toHaveAttribute(
    'fill',
    '#123456',
  )
  expect((await state()).pie.id).toBe(id)
  await page.getByRole('button', { name: 'Local theme', exact: true }).click()
  await expect(page.locator('.theme-gauge svg text').filter({ hasText: /^50$/ })).toHaveAttribute(
    'fill',
    '#abcdef',
  )
  await page.getByRole('button', { name: 'Clear local', exact: true }).click()
  await expect(page.locator('.theme-gauge svg text').filter({ hasText: /^50$/ })).toHaveAttribute(
    'fill',
    '#123456',
  )
  await page.getByRole('button', { name: 'Text styles', exact: true }).click()
  await expect(page.locator('.theme-gauge svg text').filter({ hasText: /^50$/ })).toHaveCSS(
    'font-size',
    '26px',
  )
  await expect(page.locator('.theme-liquid svg text').filter({ hasText: /^Capacity$/ })).toHaveCSS(
    'font-size',
    '17px',
  )
  expect((await state()).pie.option.series[2].itemStyle.borderWidth).toBe(4)
  await page.getByRole('button', { name: 'Text styles', exact: true }).click()
  await expect
    .poll(async () => (await state()).pie.option.series[2].itemStyle.borderWidth)
    .toBe(1.5)
  await page.getByRole('button', { name: 'Native', exact: true }).click()
  await expect.poll(async () => (await state()).pie.option.series.length).toBe(1)
  await page.getByRole('button', { name: 'Auto', exact: true }).click()
  await expect.poll(async () => (await state()).pie.option.series.length).toBe(3)
  await page.getByRole('button', { name: 'Empty', exact: true }).click()
  await expect.poll(async () => (await state()).gauge.option.series.length).toBe(0)
  await expect.poll(async () => (await state()).liquid.option.series.length).toBe(0)
  await page.getByRole('button', { name: 'Restore', exact: true }).click()
  await page.getByRole('button', { name: 'Clear theme', exact: true }).click()
  await expect(page.locator('.theme-gauge svg text').filter({ hasText: /^50$/ })).toHaveAttribute(
    'fill',
    '#1F2329',
  )
  expect(errors).toEqual([])
})
