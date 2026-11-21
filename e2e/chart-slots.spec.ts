import { test, expect, expectFillsContainer } from './helpers'
import { fixtureBaseURL } from './environment'

test('default slot fills min-height charts, receives clicks and survives theme recreation', async ({
  page,
}) => {
  await page.goto(`${fixtureBaseURL}/slots.html?minHeight`)
  const host = page.getByTestId('chart-host')
  const content = page.getByTestId('slot-content')
  await expect(host.locator('svg')).toBeVisible()
  await expect(host).toHaveAttribute('aria-label', 'Slot chart')
  await expect(host).toHaveCSS('height', '300px')
  const before = await page.evaluate(() => (window as any).slotState())
  expect(before).toMatchObject({ count: 1, width: 400, height: 300 })
  // The Vue overlay and the ECharts canvas are siblings inside Chart's root.
  await expectFillsContainer(host.locator('..'), '[data-testid=slot-content]')
  await content.click()
  await expect(page.locator('.ix-chart-overlay')).toHaveCount(0)
  expect(await page.evaluate(() => (window as any).slotState())).toMatchObject({
    id: before.id,
    count: 1,
  })
  await page.getByRole('button', { name: 'Toggle overlay' }).click()
  await expect(content).toBeVisible()
  const button = await content.elementHandle()
  await page.getByRole('button', { name: 'Toggle theme' }).click()
  await expect.poll(() => page.evaluate(() => (window as any).slotState().count)).toBe(2)
  expect(await page.evaluate(() => (window as any).slotState())).toMatchObject({
    disposed: true,
    width: 400,
    height: 300,
  })
  expect(await content.evaluate((element, previous) => element === previous, button)).toBe(true)
})

test('default slot renders above a Canvas chart without changing its dimensions', async ({
  page,
}) => {
  await page.goto(`${fixtureBaseURL}/slots.html?renderer=canvas`)
  await expect(page.getByTestId('chart-host').locator('canvas')).toBeVisible()
  await expect(page.getByTestId('slot-content')).toBeVisible()
  expect(await page.evaluate(() => (window as any).slotState())).toMatchObject({
    count: 1,
    width: 400,
    height: 300,
  })
  await page.getByTestId('slot-content').click()
  await expect(page.locator('.ix-chart-overlay')).toHaveCount(0)
})
