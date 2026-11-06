import { expect, test } from '@playwright/test'
import { fixtureBaseURL } from './environment'

test('special plots render, resize and clear stale data', async ({ page }, testInfo) => {
  const errors: string[] = []
  page.on('pageerror', error => errors.push(error.message))
  await page.goto(`${fixtureBaseURL}/special.html`)
  for (const name of ['radar', 'gauge', 'segmented', 'liquid']) {
    await expect(page.locator(`.${name} svg path`).first()).toBeVisible()
  }
  await page.screenshot({ path: testInfo.outputPath('special-plots.png') })
  const state = () =>
    page.evaluate(() => (window as unknown as { specialState: () => any[] }).specialState())
  await page.locator('#shrink').click()
  await expect.poll(async () => (await state())[1].width).toBe(180)
  await expect.poll(async () => (await state())[0].option.radar[0].indicator.length).toBe(3)
  await page.locator('#zero').click()
  await expect.poll(async () => (await state())[1].option.series[0].data[0]).toBe(0)
  await expect(page.locator('.liquid')).toContainText('0 %')
  await page.locator('#empty').click()
  await expect
    .poll(async () => (await state()).slice(1).map(item => item.option.series.length))
    .toEqual([0, 0, 0])
  await expect.poll(async () => (await state())[0].option.series[0].data.length).toBe(0)
  await page.locator('#full').click()
  await expect(page.locator('.liquid')).toContainText('100 %')
  expect(errors).toEqual([])
})
