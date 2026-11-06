import { test, expect } from './helpers'

test('radar demo switches dimensions, objects, styles, spacing and states', async ({ page }) => {
  const errors: string[] = []
  page.on('pageerror', error => errors.push(error.message))
  await page.goto('components/radar')
  await page.getByRole('radio', { name: '示例', exact: true }).click()
  const block = page.locator('.radar-demo')
  const chart = block.locator('[_echarts_instance_]')
  await expect(chart.locator('svg')).toBeVisible()
  const select = async (label: string, value: number) => {
    await block.getByRole('group', { name: label, exact: true }).locator('.ix-selector').click()
    await page
      .locator('.ix-select-option:visible')
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
  for (const count of [12, 11, 10, 9, 8, 7, 6, 5, 4, 3]) {
    await select('变量个数', count)
    await expect(chart).toContainText('攻击路径')
  }
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
  await block.getByText('全部数值为 0', { exact: true }).click()
  await expect(block.getByLabel('图表状态').getByRole('radio').nth(1)).toBeChecked()
  await expect(chart.locator('svg')).toBeVisible()
  await expect(chart).toContainText('攻击A')
  await block.getByText('空状态', { exact: true }).click()
  await expect(chart).toHaveCount(0)
  await block.getByRole('button', { name: '重新加载' }).click()
  await expect(block.getByRole('status')).toContainText('正在加载')
  await expect(chart.locator('svg')).toBeVisible()
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
  await page.setViewportSize({ width: 480, height: 800 })
  expect(
    await block.locator('.radar-demo-scroll').evaluate(el => el.scrollWidth > el.clientWidth),
  ).toBe(true)
  expect(errors).toEqual([])
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
  const clockwiseX = (await axis.boundingBox())!.x
  await scale.getByText('逆时针', { exact: true }).click()
  await expect.poll(async () => (await axis.boundingBox())!.x).toBeLessThan(clockwiseX)
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
