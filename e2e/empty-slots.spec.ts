import { test, expect, reloadDemo, expectFillsContainer } from './helpers'

// Each demo is independently shardable; a late failure no longer replays every
// preceding demo on the same showcase page.
for (const [kind, titles] of [
  [
    'bar',
    [
      '基础柱状图-竖向',
      '基础柱状图-横向',
      '基础柱状图-横向上方',
      '分组柱状图-竖向',
      '分组柱状图-横向',
      '堆叠柱状图-竖向',
      '堆叠柱状图-横向',
    ],
  ],
  ['line', ['基础折线图', '基础平滑折线图', '多系列折线图', '流量对比折线图', '双系列平滑折线图']],
  ['area', ['基础面积图（状态示例）', '平滑面积图', '堆叠面积图（状态示例）']],
  ['pie', ['实心饼图', '环形图', '玫瑰图', '多列图例', '图例自定义 Formatter', '卡片环形图']],
  ['radar', ['基础型']],
  ['gauge', ['基础数值型', '纯状态型', '分段仪表盘']],
  ['liquid-fill', ['基础型']],
  ['map', ['状态型', '密度型', '飞线型']],
  ['word-cloud', ['文字词云', '分类矩形标签', '气泡云']],
] as const) {
  for (const title of titles) {
    test(`${kind} ${title} empty slot fills the chart and preserves its instance`, async ({
      page,
    }) => {
      await page.goto(`components/${kind}`)
      await expect(page.getByRole('radio', { name: '示例', exact: true })).toBeChecked()
      const demos = page.locator('.archive-app-demo').filter({
        has: page.getByText('空状态', { exact: true }),
      })
      await expect(demos).toHaveCount(titles.length)
      const escaped = title.replace(/[.*+?^${}()|[\]\\]/g, '\\$&')
      const demo = demos.filter({
        has: page.getByRole('heading', { name: new RegExp(`^${escaped}\\s*#?\\s*$`) }),
      })
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
      await expectFillsContainer(overlay, '.ix-empty')
      const retry = empty.getByRole('button', { name: '重新加载', exact: true })
      if (await retry.count()) {
        await reloadDemo(demo)
      } else {
        await expect(empty).toContainText(
          kind === 'word-cloud'
            ? '暂无词云数据，请调整筛选条件或检查数据源'
            : '未配置数据源，请先配置采集任务',
        )
        await demo.getByText('正常', { exact: true }).click()
      }
      await expect(overlay).toHaveCount(0)
      expect(await ids()).toEqual(before)
      await expect(charts.first().locator('svg')).toBeVisible()
    })
  }
}
