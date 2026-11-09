import type { Page } from '@playwright/test'
import { test, expect } from './helpers'

async function openRadar(page: Page) {
  await page.goto('components/radar')
  await page.getByRole('radio', { name: '示例', exact: true }).click()
  const block = page.locator('.radar-demo')
  const chart = block.locator('[_echarts_instance_]')
  await expect(chart.locator('svg')).toBeVisible()
  return { block, chart }
}

test('radar demo updates object counts', async ({ page }) => {
  const { block, chart } = await openRadar(page)
  const select = async (label: string, value: number) => {
    await block.getByRole('group', { name: label, exact: true }).locator('.ix-selector').click()
    // The dropdown slides while opening; a click during that transition can
    // land on the adjacent option in Firefox.
    const overlay = page.locator('.ix-select-overlay:visible')
    await expect(overlay).not.toHaveClass(/-enter-/)
    await overlay
      .locator('.ix-select-option')
      .filter({ hasText: new RegExp(`^${value}$`) })
      .click()
  }
  for (const count of [4, 3, 1, 2]) {
    await select('对象个数', count)
    for (let index = 0; index < 4; index++) {
      await expect(
        chart.locator('svg text').filter({ hasText: `攻击${String.fromCharCode(65 + index)}` }),
      ).toHaveCount(index < count ? 1 : 0)
    }
  }
})

for (const counts of [
  [12, 11],
  [10, 9],
  [8, 7],
  [6, 5],
  [4, 3],
]) {
  test(`radar demo updates dimension counts ${counts.join(' to ')}`, async ({ page }) => {
    const { block, chart } = await openRadar(page)
    for (const count of counts) {
      await block
        .getByRole('group', { name: '变量个数', exact: true })
        .locator('.ix-selector')
        .click()
      const overlay = page.locator('.ix-select-overlay:visible')
      await expect(overlay).not.toHaveClass(/-enter-/)
      await overlay
        .locator('.ix-select-option')
        .filter({ hasText: new RegExp(`^${count}$`) })
        .click()
      await expect(
        chart.locator('svg text').filter({
          hasText:
            /^(攻击路径|可用性影响|影响范围|权限要求|攻击难度|攻击手法|扩散风险|攻击坦度|保密性影响|完整性影响|用户交互|修复成本)$/,
        }),
      ).toHaveCount(count)
    }
  })
}

test('radar demo switches grid, shapes and spacing', async ({ page }) => {
  const { block, chart } = await openRadar(page)
  for (const label of ['线框', '线面', '面性', '线性']) {
    await block.getByText(label, { exact: true }).click()
    await expect(chart.locator('svg')).toBeVisible()
  }
  for (const [label, height] of [
    ['宽松', '530'],
    ['紧凑', '330'],
    ['适中', '430'],
  ]) {
    await block.getByText(label!, { exact: true }).click()
    await expect(chart.locator('svg')).toHaveAttribute('height', height!)
  }
  await page.setViewportSize({ width: 480, height: 800 })
  expect(
    await block.locator('.radar-demo-scroll').evaluate(el => el.scrollWidth > el.clientWidth),
  ).toBe(true)
})

test('radar demo handles zero, empty and reload', async ({ page }) => {
  const { block, chart } = await openRadar(page)
  await block.getByText('全部数值为 0', { exact: true }).click()
  await expect(block.getByLabel('图表状态').getByRole('radio').nth(1)).toBeChecked()
  await expect(chart.locator('svg')).toBeVisible()
  await expect(chart).toContainText('攻击A')
  await block.getByText('空状态', { exact: true }).click()
  await expect(chart).toHaveCount(0)
  await block.getByRole('button', { name: '重新加载' }).click()
  await expect(block.getByRole('status')).toContainText('正在加载')
  await expect(chart.locator('svg')).toBeVisible()
})

test('radar demo cancels pending reload and toggles loading', async ({ page }) => {
  const { block, chart } = await openRadar(page)
  await block.getByText('空状态', { exact: true }).click()
  await block.getByRole('button', { name: '重新加载' }).click()
  await block.getByText('全部数值为 0', { exact: true }).click()
  await page.waitForTimeout(900)
  await expect(block.getByLabel('图表状态').getByRole('radio').nth(1)).toBeChecked()
  await expect(chart.locator('svg')).toBeVisible()
  await block.getByText('加载中', { exact: true }).click()
  await expect(block.getByRole('status')).toHaveAttribute('aria-busy', 'true')
  await block.getByText('正常', { exact: true }).click()
  await expect(chart.locator('svg')).toBeVisible()
})

test('radar examples demonstrate independent ranges, loading and custom options', async ({
  page,
}) => {
  const errors: string[] = []
  page.on('pageerror', error => errors.push(error.message))
  await page.goto('components/radar')
  await page.getByRole('radio', { name: '示例', exact: true }).click()
  const scale = page.locator('.radar-scale-demo')
  const chart = scale.locator('[_echarts_instance_]')
  await expect(chart.locator('svg')).toBeVisible()
  const id = await chart.getAttribute('_echarts_instance_')
  const axis = chart.locator('svg text').filter({ hasText: '处理能力' })
  // ECharts can replace the label during its initial render. Read and
  // validate its geometry together rather than assuming visibility persists.
  let clockwiseX = 0
  await expect(async () => {
    const box = await axis.boundingBox()
    expect(box).not.toBeNull()
    clockwiseX = box!.x
  }).toPass({ timeout: 10_000 })
  await scale.getByText('逆时针', { exact: true }).click()
  await expect
    .poll(async () => (await axis.boundingBox())?.x ?? Number.POSITIVE_INFINITY)
    .toBeLessThan(clockwiseX)
  await scale.getByText('原生加载遮罩', { exact: true }).click()
  await expect(chart).toContainText('正在更新评估数据')
  await scale.getByText('展示数据', { exact: true }).click()
  await expect(chart).not.toContainText('正在更新评估数据')
  await expect(chart).toHaveAttribute('_echarts_instance_', id!)
  const custom = page.locator('.radar-custom-demo')
  await expect(custom.locator('svg')).toBeVisible()
  await expect(custom).toContainText('当前方案')
  await expect(custom).toContainText('目标方案')
  expect(errors).toEqual([])
})

test('radar default tooltip uses the shared chart title and value rows', async ({ page }) => {
  const { chart } = await openRadar(page)
  // Hover the first object's actual marker after its animation settles. A fixed
  // coordinate can hit the second object while the radar is still expanding.
  await chart.locator('svg path[fill="#458fff" i][transform^="matrix"]').first().hover()
  const tooltip = page.locator('.charts-tooltips:visible')
  await expect(tooltip.locator('.charts-tooltips-title')).toHaveText('攻击A')
  await expect(tooltip.locator('.charts-tooltips-item-name')).toHaveText([
    '攻击路径',
    '攻击难度',
    '权限要求',
    '影响范围',
    '可用性影响',
  ])
  await expect(tooltip.locator('.charts-tooltips-item-value')).toHaveText([
    '12',
    '10',
    '23',
    '17',
    '21',
  ])
  await expect(tooltip.locator('.charts-tooltips-item').first()).toHaveCSS('display', 'flex')
})
