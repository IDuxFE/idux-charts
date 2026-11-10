import type { Page } from '@playwright/test'
import { test, expect } from './helpers'
import { fixtureBaseURL } from './environment'

test.use({ baseURL: fixtureBaseURL })

interface ChartState {
  id: string
  width: number
  height: number
  disposed: boolean[]
  allDisposed: boolean
  option: {
    series: { data: (number | { name: string; value: number })[] }[]
    title: { text: string }[]
    legend: { selected: Record<string, boolean> }[]
  }
}
declare global {
  interface Window {
    chartTest: { state: () => ChartState; point: () => { x: number; y: number } }
  }
}
const state = (page: Page) => page.evaluate(() => window.chartTest.state())
const clickButton = (page: Page, name: string) =>
  page.getByRole('button', { name, exact: true }).click()
async function open(page: Page, kind: string) {
  await page.goto(`?kind=${kind}`)
  await expect(page.getByTestId('ready')).toHaveText('1')
}
async function clickData(page: Page) {
  const point = await page.evaluate(() => window.chartTest.point())
  // Hover can repaint SVG paths (pie emphasis) or canvas hit areas. Let that
  // update finish before pressing the mouse, so WebKit does not lose a click
  // when its target is replaced between pointer entry and mouseup.
  await page.mouse.move(point.x, point.y)
  await page.evaluate(
    () =>
      new Promise<void>(resolve => {
        requestAnimationFrame(() => requestAnimationFrame(() => resolve()))
      }),
  )
  await page.mouse.click(point.x, point.y)
}

for (const kind of ['bar', 'line', 'pie']) {
  test.describe(`${kind} browser behavior`, () => {
    test.beforeEach(async ({ page }) => open(page, kind))

    test('updates replaced and nested data, clears and restores it without recreating the instance', async ({
      page,
    }) => {
      const initial = await state(page)
      const values = async () =>
        (await state(page)).option.series[0]!.data.map(item =>
          typeof item === 'number' ? item : item.value,
        )
      await clickButton(page, 'Replace data')
      await expect.poll(values).toEqual([30, 50, 70])
      await clickButton(page, 'Mutate data')
      await expect.poll(values).toEqual([90, 50, 70])
      if (kind === 'pie')
        await expect.poll(async () => (await state(page)).option.title[0]!.text).toBe('210')
      await clickButton(page, 'Clear data')
      await expect.poll(values).toEqual([])
      await clickButton(page, 'Replace data')
      await expect.poll(values).toEqual([30, 50, 70])
      expect((await state(page)).id).toBe(initial.id)
      await expect(page.getByTestId('ready')).toHaveText('1')
    })

    test('forwards real clicks, payloads and once listeners through the wrapper', async ({
      page,
    }) => {
      await clickData(page)
      await expect(page.getByTestId('clicks')).toHaveText('1')
      await expect(page.getByTestId('once')).toHaveText('1')
      const payload = JSON.parse(await page.getByTestId('payload').innerText())
      expect(payload).toMatchObject({ name: 'A', dataIndex: 0, value: 20 })
      await clickButton(page, 'Mutate data')
      await clickData(page)
      await expect(page.getByTestId('clicks')).toHaveText('2')
      await expect(page.getByTestId('once')).toHaveText('1')
    })

    test('resizes to parent dimensions and honors autoResize changes', async ({ page }) => {
      await clickButton(page, 'Resize container')
      await expect
        .poll(async () => [(await state(page)).width, (await state(page)).height])
        .toEqual([450, 280])
      await clickButton(page, 'Toggle resize')
      await clickButton(page, 'Resize container')
      await expect(page.getByTestId('container')).toHaveCSS('width', '600px')
      // Wait two frames and the throttle interval before asserting disabled behavior.
      await page.evaluate(
        () =>
          new Promise(resolve =>
            requestAnimationFrame(() => requestAnimationFrame(() => setTimeout(resolve, 40))),
          ),
      )
      expect([(await state(page)).width, (await state(page)).height]).toEqual([450, 280])
      await clickButton(page, 'Toggle resize')
      await expect
        .poll(async () => [(await state(page)).width, (await state(page)).height])
        .toEqual([600, 320])
    })

    test('reinitializes for theme and renderer changes while preserving behavior', async ({
      page,
    }) => {
      const initial = await state(page)
      await clickButton(page, 'Change theme')
      await expect(page.getByTestId('ready')).toHaveText('2')
      expect((await state(page)).id).not.toBe(initial.id)
      await clickButton(page, 'Toggle loading')
      await expect(page.getByTestId('container')).toContainText('Loading...')
      await clickButton(page, 'Change renderer')
      await expect(page.getByTestId('ready')).toHaveText('3')
      await expect(page.getByTestId('container').locator('canvas')).toBeVisible()
      await clickButton(page, 'Toggle loading')
      await clickData(page)
      await expect(page.getByTestId('clicks')).toHaveText('1')
      await clickButton(page, 'Resize container')
      await expect.poll(async () => (await state(page)).width).toBe(450)
      expect((await state(page)).disposed).toEqual([true, true])
      expect((await state(page)).option.series[0]!.data).toHaveLength(3)
    })

    test('disposes on unmount and remounts repeatedly without duplicate events', async ({
      page,
    }) => {
      for (let i = 0; i < 3; i++) {
        await clickButton(page, 'Toggle chart')
        await expect(page.locator('[_echarts_instance_]')).toHaveCount(0)
        expect((await state(page)).allDisposed).toBe(true)
        await clickButton(page, 'Toggle chart')
        await expect(page.getByTestId('ready')).toHaveText(String(i + 2))
      }
      expect((await state(page)).disposed).toEqual([true, true, true])
      await clickData(page)
      await expect(page.getByTestId('clicks')).toHaveText('1')
      await expect(page.getByTestId('once')).toHaveText('1')
    })

    test('shows a tooltip from actual mouse hover and toggles a legend item', async ({ page }) => {
      const point = await page.evaluate(() => window.chartTest.point())
      await page.mouse.move(point.x, point.y)
      const tooltip = page.locator('.charts-tooltips')
      await expect(tooltip).toBeVisible()
      await expect(tooltip).toContainText('A')
      await expect(tooltip).toContainText('Visits')
      await expect(tooltip).toContainText(kind === 'pie' ? '20' : '20 次')
      await clickButton(page, 'Custom tooltip')
      await page.mouse.move(0, 0)
      await page.mouse.move(point.x, point.y)
      await expect(tooltip).toContainText('Custom title')
      await expect(tooltip).toContainText('20 个')
      await page.mouse.move(0, 0)
      const label = kind === 'pie' ? 'B' : 'Other'
      const legendLabel = page
        .getByTestId('container')
        .locator('svg text')
        .filter({ hasText: new RegExp(`^${label}$`) })
        .last()
      const legendBox = await legendLabel.boundingBox()
      expect(legendBox).not.toBeNull()
      // ECharts adds a transparent hit area over SVG legend text in WebKit.
      await page.mouse.click(
        legendBox!.x + legendBox!.width / 2,
        legendBox!.y + legendBox!.height / 2,
      )
      await expect
        .poll(async () => (await state(page)).option.legend[0]!.selected[label])
        .toBe(false)
      await expect(page.getByTestId('legend')).toContainText(`"${label}":false`)
    })
  })
}
