import { test, expect } from '../fixture.js'

test('default overlay slots handle content, text and empty states without replacing the chart', async ({
  page,
}) => {
  await page.goto('/?slots')
  const state = () => page.evaluate(() => window.slotFixtureState())
  await expect(page.getByRole('button', { name: 'Retry', exact: true })).toBeVisible()
  const before = await state()
  expect(before).toMatchObject({ width: 400, height: 240, readyCount: 1 })
  await page.getByRole('button', { name: 'Text content', exact: true }).click()
  await expect(page.locator('.ix-chart-overlay')).toHaveText('Slot notice')
  await page.getByRole('button', { name: 'Blank content', exact: true }).click()
  await expect(page.locator('.ix-chart-overlay')).toHaveCount(0)
  await page.getByRole('button', { name: 'Empty content', exact: true }).click()
  await expect(page.locator('.ix-chart-overlay')).toHaveCount(0)
  expect(await state()).toEqual(before)
  await page.getByRole('button', { name: 'Show content', exact: true }).click()
  const slot = await page.getByRole('button', { name: 'Retry', exact: true }).elementHandle()
  await page.getByRole('button', { name: 'Change theme', exact: true }).click()
  await expect.poll(async () => (await state()).readyCount).toBe(2)
  expect((await state()).id).not.toBe(before.id)
  expect(
    await page
      .getByRole('button', { name: 'Retry', exact: true })
      .evaluate((element, previous) => element === previous, slot),
  ).toBe(true)
  await page.getByRole('button', { name: 'Retry', exact: true }).click()
  await expect(page.locator('.ix-chart-overlay')).toHaveCount(0)
})
