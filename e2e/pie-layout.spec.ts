import { PNG } from 'pngjs'
import { test, expect } from './helpers'
import { fixtureBaseURL } from './environment'

test.use({ baseURL: fixtureBaseURL })

test('rose defaults render a transparent 32px hole and a bordered 28px gradient circle', async ({
  page,
}, testInfo) => {
  await page.goto('?pie-layout')
  const inspect = () => page.evaluate(() => (window as any).inspectPieLayout?.())
  await expect.poll(async () => (await inspect())?.radius).toEqual([16, 82])
  for (const shape of ['radius', 'area']) {
    await page.getByRole('combobox', { name: 'Shape' }).selectOption(shape)
    for (const state of ['normal', 'zero', 'missing']) {
      await page.getByRole('combobox', { name: 'State' }).selectOption(state)
      await expect
        .poll(async () => {
          const option = await inspect()
          return {
            radius: option.radius,
            background: option.background,
            width: option.center?.bounds.width,
            height: option.center?.bounds.height,
            border: option.center?.lineWidth,
          }
        })
        .toEqual({ radius: [16, 82], background: 'transparent', width: 28, height: 28, border: 1 })
    }
  }
  await page.getByRole('combobox', { name: 'State' }).selectOption('normal')
  const option = await inspect()
  expect(option.center.fill.colorStops.map((stop: any) => stop.color)).toEqual([
    'rgba(69, 143, 255, 0.1)',
    'rgba(69, 143, 255, 0)',
  ])
  expect(option.center.stroke.colorStops.map((stop: any) => stop.color)).toEqual([
    'rgba(69, 143, 255, 0.16)',
    'rgba(69, 143, 255, 0)',
  ])
  for (const background of ['#ffffff', '#eef4fa', '#0a0c0f']) {
    await page.getByTestId('layout-chart').evaluate((element, color) => {
      element.style.background = color
    }, background)
    const image = await page.screenshot({
      scale: 'css',
      clip: {
        x: option.centerPosition.x - 16,
        y: option.centerPosition.y - 16,
        width: 32,
        height: 32,
      },
    })
    await testInfo.attach(`rose-center-${background.slice(1)}`, {
      body: image,
      contentType: 'image/png',
    })
    const png = PNG.sync.read(image)
    const pixel = (x: number, y: number) =>
      Array.from(png.data.subarray((y * png.width + x) * 4, (y * png.width + x) * 4 + 3))
    const surface = [1, 3, 5].map(index => parseInt(background.slice(index, index + 2), 16))
    // At the midpoint the 10%-to-transparent gradient blends about 5% blue
    // into the host surface, including non-white light and dark backgrounds.
    const blue = [69, 143, 255]
    pixel(16, 16).forEach((channel, index) => {
      const expected = surface[index]! * 0.95 + blue[index]! * 0.05
      expect(Math.abs(channel - expected)).toBeLessThanOrEqual(2)
    })
    if (background === '#0a0c0f') {
      expect(pixel(16, 6)[2]).toBeGreaterThan(pixel(16, 24)[2]!)
      expect(pixel(16, 16).every(channel => channel < 50)).toBe(true)
    } else {
      expect(pixel(16, 6)[0]).toBeLessThan(pixel(16, 24)[0]!)
    }
  }
  for (const [mode, expected] of [
    ['custom', [8, 60]],
    ['solid', [0, 60]],
    ['default', [16, 82]],
  ] as const) {
    await page.getByRole('combobox', { name: 'Radius' }).selectOption(mode)
    await expect.poll(async () => (await inspect()).radius).toEqual(expected)
    await expect
      .poll(async () => (await inspect()).center?.bounds.width ?? 0)
      .toBe(mode === 'custom' ? 12 : mode === 'solid' ? 0 : 28)
  }
  await page.getByRole('combobox', { name: 'Shape' }).selectOption('pie')
  await expect.poll(async () => (await inspect()).center).toBeNull()
  await page.getByRole('combobox', { name: 'Shape' }).selectOption('radius')
  await page.getByRole('spinbutton', { name: 'Width' }).fill('600')
  await page.getByRole('spinbutton', { name: 'Height' }).fill('300')
  await expect.poll(async () => (await inspect()).width).toBe(600)
  expect((await inspect()).radius[0]).toBe(16)
  expect((await inspect()).center.bounds.width).toBe(28)
})

test('legend reduces columns without losing names or clipping at 450px, and restores them on resize', async ({
  page,
}) => {
  await page.goto('?pie-layout')
  const inspect = () => page.evaluate(() => (window as any).inspectPieLayout?.())
  await page.getByRole('combobox', { name: 'Shape' }).selectOption('pie')
  await page.getByRole('spinbutton', { name: 'Height' }).fill('340')
  await page.getByRole('spinbutton', { name: 'Count' }).fill('30')
  for (const [width, columns] of [
    [720, 3],
    [450, 2],
    [280, 1],
    [720, 3],
  ]) {
    await page.getByRole('spinbutton', { name: 'Width' }).fill(String(width))
    await expect
      .poll(async () => {
        const state = await inspect()
        return [state?.width, state?.legends.length]
      })
      .toEqual([width, columns])
    const state = await inspect()
    for (const legend of state.legends) {
      expect(legend.bounds.x).toBeGreaterThanOrEqual(-1)
      expect(legend.bounds.x + legend.bounds.width).toBeLessThanOrEqual(width! + 1)
      expect(legend.labelWidth).toBeGreaterThan(12)
    }
    expect(state.legends.flatMap((legend: any) => legend.names)).toEqual(
      Array.from({ length: 30 }, (_, i) => `分类 ${i + 1}`),
    )
    expect(state.legends.at(-1).type).toBe('scroll')
    await expect(
      page
        .getByTestId('layout-chart')
        .locator('svg text')
        .filter({ hasText: /^分类 1$/ }),
    ).toBeVisible()
  }
  await page.getByRole('spinbutton', { name: 'Count' }).fill('12')
  await page.getByRole('combobox', { name: 'Name mode' }).selectOption('long')
  await expect.poll(async () => (await inspect()).legends.length).toBe(2)
  await expect(
    page
      .getByTestId('layout-chart')
      .locator('svg text')
      .filter({ hasText: /^Long category name 1$/ }),
  ).toBeVisible()
  await page.getByRole('combobox', { name: 'Name mode' }).selectOption('short')
  await expect.poll(async () => (await inspect()).legends.length).toBe(3)
})
