import { test, expect } from '../fixture.js'

test('core slots can be added after mounting without a slot or recreating the chart', async ({
  page,
}) => {
  await page.goto('/?core-slots&initially-absent')
  await expect(page.locator('.ix-chart-canvas svg')).toBeVisible()
  await expect(page.locator('.ix-chart-overlay')).toHaveCount(0)
  const state = () => page.evaluate(() => window.slotFixtureState())
  const before = await state()
  expect(before).toMatchObject({ width: 400, height: 240, readyCount: 1 })
  expect(before.id).toEqual(expect.any(String))
  await page.getByRole('button', { name: 'Show content', exact: true }).click()
  await expect(page.getByRole('button', { name: 'Retry', exact: true })).toBeVisible()
  expect(await state()).toEqual(before)
})

test('core conditional slots can disappear and return without warnings or instance recreation', async ({
  page,
}) => {
  const warnings = []
  page.on('console', message => {
    if (message.text().includes('slots.default() got called')) warnings.push(message.text())
  })
  await page.goto('/?core-slots')
  await expect(page.getByRole('button', { name: 'Retry', exact: true })).toBeVisible()
  const state = () => page.evaluate(() => window.slotFixtureState())
  const before = await state()
  expect(before).toMatchObject({ width: 400, height: 240, readyCount: 1 })
  expect(before.id).toEqual(expect.any(String))
  for (let index = 0; index < 3; index++) {
    await page.getByRole('button', { name: 'Remove slot', exact: true }).click()
    await expect(page.locator('.ix-chart-overlay')).toHaveCount(0)
    expect(await state()).toEqual(before)
    await page.getByRole('button', { name: 'Show content', exact: true }).click()
    await expect(page.getByRole('button', { name: 'Retry', exact: true })).toBeVisible()
    expect(await state()).toEqual(before)
  }
  expect(warnings).toEqual([])
})

for (const kind of ['bar', 'area']) {
  test(`${kind} overlay slots handle content, text and empty states without replacing the chart`, async ({
    page,
  }) => {
    await page.goto(kind === 'area' ? '/?slots&area' : '/?slots')
    const state = () => page.evaluate(() => window.slotFixtureState())
    await expect(page.getByRole('button', { name: 'Retry', exact: true })).toBeVisible()
    const before = await state()
    expect(before).toMatchObject({
      width: 400,
      height: 240,
      readyCount: 1,
      areaFill: kind === 'area',
    })
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
}
