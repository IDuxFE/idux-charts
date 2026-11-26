export function wordCloudTests(test, expect) {
  test('word clouds retain item identity, motion and lifecycle across updates', async ({
    page,
  }) => {
    const errors = []
    page.on('pageerror', error => errors.push(error.message))
    await page.goto('/?word-cloud')
    const state = () => page.evaluate(() => window.wordCloudState())
    await expect.poll(async () => (await state()).length).toBe(3)
    expect((await state()).every(chart => chart.nodes.every(node => node.offset))).toBe(true)
    await page.evaluate(() =>
      window.wordCloudCharts.forEach(chart =>
        chart.dispatchAction({
          type: 'select',
          seriesIndex: 0,
          dataIndex: 0,
        }),
      ),
    )
    await page.getByTestId('update').click()
    await expect
      .poll(async () => (await state()).map(chart => chart.values))
      .toEqual([
        [0, 40, 101],
        [0, 40, 101],
        [0, 40, 101],
      ])
    expect((await state()).map(chart => chart.selected)).toEqual([[2], [2], [2]])
    const before = await state()
    await page.getByTestId('theme').click()
    await expect
      .poll(async () => (await state()).every((chart, index) => chart.id !== before[index].id))
      .toBe(true)
    expect((await state()).map(chart => chart.selected)).toEqual([[2], [2], [2]])
    await page.getByTestId('motion').click()
    await expect
      .poll(async () => (await state()).every(chart => chart.nodes.every(node => node.floating)))
      .toBe(true)
    const offsets = (await state()).map(chart => chart.nodes.map(node => node.offset))
    await expect
      .poll(async () => (await state()).map(chart => chart.nodes.map(node => node.offset)))
      .not.toEqual(offsets)
    await page.getByTestId('loading').click()
    await expect(page.locator('.ix-chart-loading')).toHaveCount(3)
    await page.getByTestId('loading').click()
    await expect(page.locator('.ix-chart-loading')).toHaveCount(0)
    await page.getByTestId('mount').click()
    await expect
      .poll(() => page.evaluate(() => window.wordCloudCharts.every(chart => chart.isDisposed())))
      .toBe(true)
    await page.getByTestId('mount').click()
    await expect.poll(async () => (await state()).length).toBe(3)
    await expect
      .poll(async () => (await state()).every(chart => chart.nodes.every(node => node.floating)))
      .toBe(true)
    expect(errors).toEqual([])
  })

  test('word clouds handle actual clicks, tooltips, category filtering and invalid-size recovery', async ({
    page,
  }) => {
    const errors = []
    page.on('pageerror', error => errors.push(error.message))
    await page.goto('/?word-cloud')
    const state = () => page.evaluate(() => window.wordCloudState())
    await expect.poll(async () => (await state()).length).toBe(3)
    for (const shape of ['text', 'rect', 'circle']) {
      const section = page.locator(`[data-shape="${shape}"]`)
      const label = section.locator('svg text').filter({ hasText: /^Analysis$/ })
      await label.click()
      await expect(section.locator('.charts-tooltips-title')).toHaveText('Analysis')
      await expect(section.locator('.charts-tooltips-item-value')).toHaveText('100')
      await section
        .locator('svg text')
        .filter({ hasText: /^High$/ })
        .click()
      await expect(label).toHaveCount(0)
      await expect(section.locator('svg text').filter({ hasText: /^Zero$/ })).toBeVisible()
      await section
        .locator('svg text')
        .filter({ hasText: /^High$/ })
        .click()
      await expect(label).toBeVisible()
    }
    await page.mouse.move(0, 0)
    expect((await state()).map(chart => chart.selected)).toEqual([[0], [0], [0]])
    const before = await state()
    await page.getByTestId('theme').click()
    await expect
      .poll(async () => (await state()).every((chart, index) => chart.id !== before[index].id))
      .toBe(true)
    expect((await state()).map(chart => chart.selected)).toEqual([[0], [0], [0]])
    await page.getByTestId('invalid-size').click()
    await expect
      .poll(async () => (await state()).map(chart => chart.nodes[0].offset))
      .toEqual([null, null, null])
    expect(
      (await state()).every(chart => chart.nodes.map(node => node.rawIndex).join(',') === '0,1,2'),
    ).toBe(true)
    await page.getByTestId('invalid-size').click()
    await expect
      .poll(async () => (await state()).every(chart => chart.nodes.every(node => node.offset)))
      .toBe(true)
    expect(errors).toEqual([])
  })

  test('word clouds enable a bare motion attribute and stop after it is removed', async ({
    page,
  }) => {
    await page.goto('/?word-cloud')
    const state = () => page.evaluate(() => window.wordCloudState())
    await expect.poll(async () => (await state()).length).toBe(3)
    await page.getByTestId('bare-motion').click()
    await expect
      .poll(async () => (await state()).every(chart => chart.nodes.every(node => node.floating)))
      .toBe(true)
    await page.getByTestId('bare-motion').click()
    await expect
      .poll(async () => (await state()).every(chart => chart.nodes.every(node => !node.floating)))
      .toBe(true)
  })
}
