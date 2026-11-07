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
  for (const shape of ['area', 'radius'] as const) {
    for (const [mode, growth] of [
      ['default', 5],
      ['custom', 24],
      ['disabled', 0],
      ['item', 32],
    ] as const) {
      test(`rose hover stays inside at ${align}, ${shape}, ${mode}`, async ({ page }) => {
        await page.goto('?rose-hover')
        const inspect = () => page.evaluate(() => (window as any).inspectPieHover?.())
        await expect.poll(async () => (await inspect())?.width).toBe(600)
        if (shape === 'radius') {
          await page.getByRole('button', { name: 'Resize' }).click()
          await expect.poll(async () => (await inspect()).width).toBe(320)
        }
        await page.getByRole('combobox', { name: 'Alignment' }).selectOption(align)
        await page.getByRole('combobox', { name: 'Shape' }).selectOption(shape)
        await expect.poll(async () => (await inspect())?.roseType).toBe(shape)
        const checkSectors = async (expectedGrowth: number) => {
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
              .toEqual({
                emphasized: true,
                growth: expect.closeTo(expectedGrowth, 2),
                inside: true,
              })
          }
        }
        await page.getByRole('combobox', { name: 'Emphasis' }).selectOption(mode)
        await checkSectors(growth)
        // Preserve the original item-override to default transition on the same chart.
        if (mode === 'item') {
          await page.getByRole('combobox', { name: 'Emphasis' }).selectOption('default')
          await checkSectors(5)
        }
        await page.getByRole('button', { name: 'Resize' }).click()
        await expect.poll(async () => (await inspect()).width).toBe(shape === 'area' ? 320 : 600)
      })
    }
  }
}
