import { test, expect } from './helpers'
import { fixtureBaseURL } from './environment'

for (const renderer of ['svg', 'canvas']) {
  test(`${renderer} preserves original chart geometry across sizing and layout styles`, async ({
    page,
  }) => {
    test.setTimeout(120_000)
    for (const scenario of [
      'plain',
      'min-height',
      'padding-content-box',
      'padding-border-box',
      'static',
      'absolute',
      'fixed',
      'flex',
      'grid',
      'display-flex',
      'display-grid',
      'display-block',
      'relative',
      'sticky',
      'transform',
      'class-padding',
      'static-padding-min-height',
    ]) {
      await test.step(scenario, async () => {
        await page.goto(`${fixtureBaseURL}/layout.html?renderer=${renderer}&scenario=${scenario}`)
        await expect(
          page.locator('[data-rig="current"] .chart-root').locator(renderer),
        ).toBeVisible()
        const state = () => page.evaluate(() => (window as any).layoutState())
        const compare = async () => {
          await expect(async () => {
            const { legacy, current } = await state()
            for (const key of ['width', 'height', 'root', 'viewport', 'sibling']) {
              if (Array.isArray(current[key])) {
                current[key].forEach((value: number, index: number) =>
                  expect(value, `${scenario}: ${key}[${index}]`).toBeCloseTo(legacy[key][index], 1),
                )
              } else {
                expect(current[key], `${scenario}: ${key}`).toEqual(legacy[key])
              }
            }
            current.overlay.forEach((value: number, index: number) =>
              expect(value, `${scenario}: overlay[${index}]`).toBeCloseTo(
                current.viewport[index],
                1,
              ),
            )
          }).toPass({ timeout: 5000 })
        }
        await compare()
        const before = (await state()).current.id
        await page.getByRole('button', { name: 'Resize parent', exact: true }).click()
        await compare()
        await page.getByRole('button', { name: 'Resize chart', exact: true }).click()
        await compare()
        await page.getByRole('button', { name: 'Toggle visibility', exact: true }).click()
        await expect(page.locator('[data-rig="current"] .chart-root')).not.toBeVisible()
        await page.getByRole('button', { name: 'Toggle visibility', exact: true }).click()
        await compare()
        expect((await state()).current.id).toBe(before)
      })
    }
  })
}
