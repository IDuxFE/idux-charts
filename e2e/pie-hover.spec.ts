import { test, expect } from './helpers'
import { fixtureBaseURL } from './environment'

test.use({ baseURL: fixtureBaseURL })

for (const align of [
  'top-start',
  'top-center',
  'top-end',
  'center-start',
  'center',
  'center-end',
  'bottom-start',
  'bottom-center',
  'bottom-end',
]) {
  test(`rose hover stays inside the container at ${align}`, async ({ page }) => {
    await page.goto('?rose-hover')
    await page.getByRole('combobox', { name: 'Alignment' }).selectOption(align)
    const inspect = () => page.evaluate(() => (window as any).inspectPieHover?.())
    await expect.poll(async () => (await inspect())?.width).toBe(600)
    for (const shape of ['area', 'radius']) {
      await page.getByRole('combobox', { name: 'Shape' }).selectOption(shape)
      for (const [mode, growth] of [
        ['default', 5],
        ['custom', 24],
        ['disabled', 0],
        ['item', 32],
        ['default', 5],
      ] as const) {
        await page.getByRole('combobox', { name: 'Emphasis' }).selectOption(mode)
        for (let index = 0; index < 4; index++) {
          await page.mouse.move(0, 0)
          const point = (await inspect()).sectors[index]
          await page.mouse.move(point.x, point.y)
          await expect
            .poll(
              async () => {
                const state = await inspect()
                const sector = state.sectors[index]
                const b = sector.bounds
                return {
                  emphasized: sector.emphasized,
                  growth: sector.radius - sector.baseRadius,
                  inside:
                    b.x >= -1 &&
                    b.y >= -1 &&
                    b.x + b.width <= state.width + 1 &&
                    b.y + b.height <= state.height + 1,
                }
              },
              { message: `${align}, ${shape}, ${mode}, sector ${index}` },
            )
            .toEqual({ emphasized: true, growth: expect.closeTo(growth, 2), inside: true })
        }
      }
      await page.getByRole('button', { name: 'Resize' }).click()
      await expect.poll(async () => (await inspect()).width).toBe(shape === 'area' ? 320 : 600)
    }
  })
}
