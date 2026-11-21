import { test, expect } from './helpers'

for (const [kind, count] of [
  ['bar', 7],
  ['line', 5],
  ['area', 3],
  ['pie', 6],
  ['radar', 1],
  ['gauge', 3],
  ['liquid-fill', 1],
  ['map', 3],
] as const) {
  test(`${kind} empty-state demos use full-size slots and retain chart instances`, async ({
    page,
  }) => {
    test.setTimeout(90_000)
    await page.goto(`components/${kind}`)
    const examples = page.getByRole('radio', { name: '示例', exact: true })
    await expect(examples).toBeChecked()
    const demos = page
      .locator('.archive-app-demo')
      .filter({ has: page.getByText('空状态', { exact: true }) })
    await expect(demos).toHaveCount(count)
    for (const demo of await demos.all()) {
      const charts = demo.locator('[_echarts_instance_]')
      await expect(charts.first().locator('svg')).toBeVisible()
      const ids = () =>
        charts.evaluateAll(elements =>
          elements.map(element => element.getAttribute('_echarts_instance_')),
        )
      const before = await ids()
      await demo.getByText('空状态', { exact: true }).click()
      const overlay = demo.locator('.ix-chart-overlay')
      await expect(overlay).toHaveCount(1)
      const empty = overlay.locator('.ix-empty')
      await expect(empty).toBeVisible()
      await expect(empty).toHaveCSS('margin', '0px')
      expect(await ids()).toEqual(before)
      const box = await empty.boundingBox()
      const overlayBox = await overlay.boundingBox()
      expect(box).toEqual(overlayBox)
      const retry = empty.getByRole('button', { name: '重新加载', exact: true })
      if (await retry.count()) {
        await retry.click()
        await expect(overlay).toHaveCount(0)
        await expect(demo.locator('.ix-chart-loading')).toHaveCount(0)
      } else {
        await expect(empty).toContainText('未配置数据源，请先配置采集任务')
        await demo.getByText('正常', { exact: true }).click()
        await expect(overlay).toHaveCount(0)
      }
      expect(await ids()).toEqual(before)
      await expect(charts.first().locator('svg')).toBeVisible()
    }
  })
}
