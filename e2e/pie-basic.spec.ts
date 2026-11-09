import { test, expect } from './helpers'
import { comparePixels } from './comparePixels'
import { fixtureBaseURL } from './environment'

test.use({ baseURL: fixtureBaseURL })

test('automatic pie preserves the original Basic proportions and presentation', async ({
  page,
}, testInfo) => {
  await page.goto('?basic')
  const reference = page.getByTestId('reference').locator('[_echarts_instance_]')
  const actual = page.getByTestId('actual').locator('[_echarts_instance_]')
  await expect(actual.locator('svg')).toBeVisible()
  await page.addStyleTag({
    content:
      '[data-testid=reference],[data-testid=actual] { position: absolute; left: 8px; top: 50px } [data-testid=actual] { visibility: hidden }',
  })
  for (const size of ['original']) {
    if (size === 'resized') await page.getByRole('button', { name: 'Resize', exact: true }).click()
    for (const state of ['Normal', 'Zero', 'Missing']) {
      await page.getByRole('button', { name: state, exact: true }).click()
      await page.mouse.move(0, 0)
      await expect(actual).toContainText(state === 'Missing' ? '数据缺失' : '统计总数')
      // Wait for the ResizeObserver and Vue update, then compare independently
      // rendered charts in the same browser, fonts and device scale.
      await expect
        .poll(async () => actual.locator('svg').getAttribute('width'))
        .toBe(size === 'original' ? '480' : '600')
      await page.getByTestId('actual').evaluate(el => {
        el.style.visibility = 'hidden'
      })
      await page.getByTestId('reference').evaluate(el => {
        el.style.visibility = 'visible'
      })
      const baseline = await reference.screenshot({ animations: 'disabled' })
      await page.getByTestId('reference').evaluate(el => {
        el.style.visibility = 'hidden'
      })
      await page.getByTestId('actual').evaluate(el => {
        el.style.visibility = 'visible'
      })
      const result = await actual.screenshot({ animations: 'disabled' })
      await testInfo.attach(`${size}-${state}-reference`, {
        body: baseline,
        contentType: 'image/png',
      })
      await testInfo.attach(`${size}-${state}-actual`, { body: result, contentType: 'image/png' })
      const comparison = comparePixels(baseline, result)
      await testInfo.attach(`${size}-${state}-diff`, {
        body: comparison.diff,
        contentType: 'image/png',
      })
      expect(
        comparison.differentPixels,
        `${size}/${state}: differing content pixels`,
      ).toBeLessThanOrEqual(comparison.maxDiffPixels)
    }
  }
})

test('built-in pie retains interaction and cleanly switches to an explicit layout', async ({
  page,
}) => {
  await page.goto('?basic')
  const actual = page.getByTestId('actual')
  await expect(page.getByTestId('ready-count')).toHaveText('1')
  const box = await actual.locator('svg').boundingBox()
  await page.mouse.move(box!.x + 100, box!.y + 60)
  await expect(actual.locator('.charts-tooltips')).toContainText('图例1')
  await page.mouse.click(box!.x + 100, box!.y + 60)
  await expect(page.getByTestId('click-count')).toHaveText('1')
  await page.mouse.move(0, 0)
  const legend = actual.locator('svg text').filter({ hasText: /^图例2$/ })
  const label = await legend.boundingBox()
  await page.mouse.click(label!.x + label!.width / 2, label!.y + label!.height / 2)
  await expect(actual).toContainText('554')
  await page.getByRole('button', { name: 'Toggle layout', exact: true }).click()
  await expect(page.getByTestId('ready-count')).toHaveText('2')
  await expect(actual).not.toContainText('统计总数')
  await page.getByRole('button', { name: 'Toggle layout', exact: true }).click()
  await expect(page.getByTestId('ready-count')).toHaveText('3')
  await expect(actual).toContainText('统计总数')
  await page.getByRole('button', { name: 'Resize', exact: true }).click()
  await expect(actual.locator('svg')).toHaveAttribute('width', '600')
  await expect(page.getByTestId('ready-count')).toHaveText('3')
})

test('all nine alignment positions update reactively without recreating the chart', async ({
  page,
}) => {
  await page.goto('?basic')
  const state = () => page.evaluate(() => (window as any).pieAlignmentState())
  await expect(page.getByTestId('ready-count')).toHaveText('1')
  const original = await state()
  const r = original.option.series[0].radius
  const centers: Record<string, number[]> = {}
  for (const row of ['top', 'center', 'bottom']) {
    for (const column of ['start', 'center', 'end']) {
      const align = row === 'center' && column === 'center' ? 'center' : `${row}-${column}`
      await page.getByRole('combobox', { name: 'Alignment' }).selectOption(align)
      await expect
        .poll(async () => (await state()).option.series[0].center[1])
        .toBe({ top: r, center: 90, bottom: 180 - r }[row]!)
      centers[`${row}-${column}`] = (await state()).option.series[0].center
      expect((await state()).id).toBe(original.id)
      expect((await state()).option).not.toHaveProperty('align')
    }
    expect(centers[`${row}-start`]![0]).toBe(r)
    expect(centers[`${row}-end`]![0]).toBe(480 - r)
    const endOption = (await state()).option
    expect(endOption.legend[0].left).toBeLessThan(endOption.legend[1].left)
    expect(endOption.legend[1].left).toBeLessThan(480 - 2 * r)
    expect(centers[`${row}-center`]![0]).toBeGreaterThan(r)
    expect(centers[`${row}-center`]![0]).toBeLessThan(480 - r)
  }
  await page.getByRole('button', { name: 'Resize', exact: true }).click()
  await expect
    .poll(async () => {
      const s = (await state()).option.series[0]
      return [s.center[0] + s.radius, s.center[1] + s.radius]
    })
    .toEqual([600, 240])
  await page.getByRole('combobox', { name: 'Alignment' }).selectOption({ label: 'Default' })
  await expect
    .poll(async () => {
      const s = (await state()).option.series[0]
      return [s.center[0] - s.radius, s.center[1]]
    })
    .toEqual([0, 120])
  await expect(page.getByTestId('ready-count')).toHaveText('1')
})

test('hidden content, ring/rose shapes and crowded layouts remain responsive', async ({
  page,
}, testInfo) => {
  await page.goto('?basic')
  const state = () => page.evaluate(() => (window as any).pieAlignmentState())
  await expect(page.getByTestId('ready-count')).toHaveText('1')
  const original = await state()
  await page.getByRole('combobox', { name: 'Alignment' }).selectOption('center')
  await page.getByRole('button', { name: 'Toggle legend', exact: true }).click()
  await expect.poll(async () => (await state()).option.legend.every((l: any) => !l.show)).toBe(true)
  await page.getByRole('button', { name: 'Toggle title', exact: true }).click()
  await expect.poll(async () => (await state()).option.series[2].center).toEqual([240, 90])
  for (const shape of ['ring', 'rose', 'pie']) {
    await page.getByRole('combobox', { name: 'Shape' }).selectOption(shape)
    await expect.poll(async () => (await state()).option.series[2].center[0]).toBeCloseTo(240)
    await expect.poll(async () => (await state()).option.series[2].center[1]).toBeCloseTo(90)
    expect((await state()).id).toBe(original.id)
    if (shape === 'ring')
      await expect.poll(async () => (await state()).option.series[2].radius[0]).toBeCloseTo(63)
    if (shape === 'pie')
      await expect.poll(async () => (await state()).option.series[2].roseType).toBeNull()
    if (shape === 'rose')
      await expect.poll(async () => (await state()).option.series[2].roseType).toBe('area')
    await testInfo.attach(`center-no-legend-${shape}`, {
      body: await page.getByTestId('actual').screenshot(),
      contentType: 'image/png',
    })
  }
  await page.getByRole('button', { name: 'Toggle legend', exact: true }).click()
  await page.getByRole('button', { name: 'Crowded', exact: true }).click()
  await expect.poll(async () => (await state()).option.legend[0].type).toBe('scroll')
  expect((await state()).option.legend[0].data).toHaveLength(30)
  expect((await state()).option.legend[1].show).toBe(false)
  const actual = page.getByTestId('actual')
  await expect(actual.locator('svg')).toHaveAttribute('width', '280')
  await testInfo.attach('narrow-scroll-legend', {
    body: await actual.screenshot(),
    contentType: 'image/png',
  })
  // The built-in pager uses graphic images and intentionally hides native page text.
  await actual.locator('svg image').last().click()
  await expect.poll(async () => (await state()).option.legend[0].scrollDataIndex).toBeGreaterThan(0)
  await page.getByRole('button', { name: 'Restore', exact: true }).click()
  // Data updates can reach ECharts before the animation-frame resize restores
  // the second legend column. Wait for the complete restored layout.
  await expect(actual.locator('svg')).toHaveAttribute('width', '480')
  await expect
    .poll(async () => {
      const { legend } = (await state()).option
      return {
        type: legend[0].type,
        secondColumn: legend[1].show,
        lengths: legend.map((l: any) => l.data.length),
      }
    })
    .toEqual({ type: 'plain', secondColumn: true, lengths: [3, 3, 0] })
  await expect(page.getByTestId('ready-count')).toHaveText('1')
})

test('automatic pie expands into freed space and shrinks when the legend returns', async ({
  page,
}, testInfo) => {
  await page.goto('?basic')
  const state = () => page.evaluate(() => (window as any).pieAlignmentState())
  await page.getByRole('combobox', { name: 'Alignment' }).selectOption('center')
  await page.getByRole('button', { name: 'Toggle title', exact: true }).click()
  await page.getByRole('button', { name: 'Tall', exact: true }).click()
  await expect(page.getByTestId('actual').locator('svg')).toHaveAttribute('height', '300')
  const before = await state()
  await page.getByRole('button', { name: 'Toggle legend', exact: true }).click()
  await expect.poll(async () => (await state()).option.series[2].radius).toBe(130)
  expect((await state()).option.series[2].radius).toBeGreaterThan(before.option.series[2].radius)
  expect((await state()).option.series[2].center).toEqual([240, 150])
  expect((await state()).id).toBe(before.id)
  await testInfo.attach('expanded-without-legend', {
    body: await page.getByTestId('actual').screenshot(),
    contentType: 'image/png',
  })
  await page.getByRole('button', { name: 'Toggle legend', exact: true }).click()
  await expect
    .poll(async () => (await state()).option.series[2].radius)
    .toBe(before.option.series[2].radius)
  expect((await state()).id).toBe(before.id)
})

test('native presentation updates retain the instance and legend selection', async ({ page }) => {
  await page.goto('?basic')
  const actual = page.getByTestId('actual')
  await expect(page.getByTestId('ready-count')).toHaveText('1')
  const state = () => page.evaluate(() => (window as any).pieAlignmentState())
  const original = await state()
  // WebKit hit-tests ECharts' transparent legend hit area instead of the SVG
  // text node. Click the visible label coordinates and assert the real selection.
  const label = actual.locator('svg text').filter({ hasText: /^图例1$/ })
  // Scroll the stable wrapper: ECharts may replace SVG labels while laying out.
  await actual.scrollIntoViewIfNeeded()
  let point = { x: 0, y: 0 }
  await expect(async () => {
    const box = await label.boundingBox()
    expect(box).not.toBeNull()
    point = { x: box!.x + box!.width / 2, y: box!.y + box!.height / 2 }
  }).toPass({ timeout: 10_000 })
  await page.mouse.click(point.x, point.y)
  await expect.poll(async () => (await state()).option.legend[0].selected['图例1']).toBe(false)
  await page.getByRole('button', { name: 'Presentation', exact: true }).click()
  await expect(actual).toContainText('Assets')
  const updated = await state()
  expect(updated.id).toBe(original.id)
  expect(updated.option.series).toHaveLength(3)
  expect(updated.option.legend[0].selected['图例1']).toBe(false)
  expect(updated.option.legend[0].itemGap).toBe(8)
  await expect(actual.locator('svg text').filter({ hasText: /^图例2$/ })).toHaveCSS(
    'font-size',
    '24px',
  )
  await expect(page.getByTestId('ready-count')).toHaveText('1')
})
