import { test, expect } from './helpers'

for (const [chart, title, labels] of [
  ['bar', '图例多列排列（以分组柱状图为例）', /^(服务器|终端|分支|设备类别 \d+)$/],
  [
    'line',
    '图例多列排列（以多系列折线图为例）',
    /^(迅雷|爱奇艺|微信|QQ|DIM|微博|知乎|bilibili|谷歌|飞书|企业邮件|文件传输|远程桌面|视频会议|应用 \d+)$/,
  ],
  ['area', '图例多列排列（以堆叠面积图为例）', /^(迅雷|爱奇艺|DIM|微信|QQ|应用 \d+)$/],
] as const) {
  test(`${chart} multi-row legends keep columns aligned with a 16px row gap`, async ({ page }) => {
    await page.setViewportSize({ width: 1500, height: 900 })
    await page.goto(`components/${chart}`)
    await page.getByRole('radio', { name: '示例', exact: true }).click()
    const block = page.locator('.archive-app-demo').filter({
      has: page.getByRole('heading', { name: new RegExp(`^${title}\\s*#?\\s*$`) }),
    })
    await block.getByRole('radiogroup', { name: '系列数量' }).getByText('50 个系列').click()
    const svg = block.locator('svg')
    const legendLabels = svg.locator('text').filter({ hasText: labels })
    await expect(async () => {
      const rows = await legendLabels.evaluateAll(nodes => {
        const rows = new Map<number, number[]>()
        for (const node of nodes) {
          const { x, y } = node.getBoundingClientRect()
          const key = Math.round(y)
          rows.set(key, [...(rows.get(key) ?? []), x])
        }
        return [...rows].sort(([a], [b]) => a - b)
      })
      expect(rows).toHaveLength(2)
      expect(rows[1]![0] - rows[0]![0]).toBe(30)
      expect(rows[1]![1]).toEqual(rows[0]![1])
    }).toPass()
    const arrows = svg.locator('path[stroke-linecap="round"][stroke-linejoin="round"]')
    await expect(arrows).toHaveCount(2)
    const first = await legendLabels.first().textContent()
    await arrows.last().click({ force: true })
    await expect(legendLabels.first()).not.toHaveText(first!)
    await arrows.first().click({ force: true })
    await expect(legendLabels.first()).toHaveText(first!)
    await block.getByRole('radiogroup', { name: '系列数量' }).getByText('3 个系列').click()
    await expect(legendLabels).toHaveCount(3)
    await expect(arrows).toHaveCount(0)
  })
}
