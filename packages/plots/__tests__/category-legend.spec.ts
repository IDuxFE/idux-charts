import type { ChartProps } from '@idux/charts-core'
import type { EChartsType } from 'echarts/core'
import { describe, expect, it, vi } from 'vitest'

import { appendLegendGraphics, createCategoryLegend } from '../shared/categoryLegend'

const entries = Array.from({ length: 8 }, (_, index) => ({ name: `Metric ${index}`, icon: 'rect' }))

describe('category legend', () => {
  it('pages in both directions without crossing the ends or resetting other chart state', () => {
    const setOption = vi.fn()
    const isDisposed = vi.fn(() => false)
    let chart: EChartsType | undefined = { setOption, isDisposed } as unknown as EChartsType
    const result = createCategoryLegend(entries, undefined, 120, {}, false, () => chart)
    expect(result.legend).toMatchObject({ type: 'plain', data: [entries[0], '\n', entries[1]] })
    expect(result.pager).toMatchObject([{ silent: true }, { silent: false }])
    const scroll = result.wheel!.scrollBy
    scroll(-1)
    expect(setOption).not.toHaveBeenCalled()
    scroll(1)
    expect(setOption).toHaveBeenLastCalledWith({
      legend: { data: [entries[1], '\n', entries[2]] },
      graphic: { elements: expect.arrayContaining([expect.objectContaining({ silent: false })]) },
    })
    for (let index = 0; index < 10; index++) scroll(1)
    expect(setOption).toHaveBeenCalledTimes(6)
    expect(setOption.mock.lastCall![0]).toMatchObject({
      legend: { data: [entries[6], '\n', entries[7]] },
      graphic: { elements: [{ silent: false }, { silent: true }] },
    })
    scroll(-1)
    expect(setOption.mock.lastCall![0].legend.data).toEqual([entries[5], '\n', entries[6]])
    isDisposed.mockReturnValue(true)
    scroll(-1)
    chart = undefined
    scroll(-1)
    expect(setOption).toHaveBeenCalledTimes(7)
  })

  it('preserves selection and the visible anchor when rebuilding a paged legend', () => {
    const result = createCategoryLegend(
      entries,
      { formatter: name => `[${name}]` },
      120,
      { secondaryTextColor: '#ABCDEF', mutedColor: '#123456' },
      true,
      () => undefined,
      { type: 'scroll', selected: { 'Metric 0': false }, data: entries, scrollDataIndex: 4 },
      'custom',
    )
    expect(result.legend).toMatchObject({
      selected: { 'Metric 0': false },
      data: [entries[4], '\n', entries[5]],
    })
    expect(result.pager?.[0]).toMatchObject({
      id: 'custom-up',
      children: [{}, { style: { stroke: '#ABCDEF' } }],
    })
  })

  it.each([
    { type: 'scroll' },
    { data: ['Custom'] },
    { orient: 'vertical' },
    { left: 0 },
    { right: 0 },
    { top: 0 },
    { bottom: 0 },
    { width: 100 },
    { height: 20 },
    { selector: true },
    { selectedMode: 'single' },
  ] satisfies NonNullable<Exclude<ChartProps['legend'], unknown[]>>[])(
    'retains native legend layout for caller option %j',
    legend => {
      const result = createCategoryLegend(entries, legend, 120, {}, true, () => undefined)
      expect(result.legend).toMatchObject(legend)
      expect(result.pager).toBeUndefined()
      expect(result.wheel).toBeUndefined()
    },
  )

  it('uses a plain row when labels fit and retains native layout before width is known', () => {
    expect(
      createCategoryLegend(
        entries.slice(0, 1),
        { formatter: '{name} units' },
        600,
        {},
        false,
        () => undefined,
      ).legend,
    ).toMatchObject({ type: 'plain', data: entries.slice(0, 1) })
    expect(
      createCategoryLegend(entries, undefined, 0, {}, false, () => undefined).legend,
    ).toMatchObject({ type: 'scroll' })
    expect(
      createCategoryLegend([], undefined, 120, {}, false, () => undefined).legend,
    ).toMatchObject({ type: 'plain', data: [] })
    const legends = createCategoryLegend(
      entries,
      [{}, { type: 'scroll' }],
      120,
      {},
      false,
      () => undefined,
      [{ selected: { A: false } }, { type: 'scroll', scrollDataIndex: 3 }],
    )
    expect(legends.legend).toEqual([
      { selected: { A: false } },
      { type: 'scroll', selected: undefined, scrollDataIndex: 3 },
    ])
  })

  it('appends paging controls to graphic components and standalone elements', () => {
    const text = { type: 'text' as const, style: { text: 'No data' } }
    const pager = { type: 'group' as const, id: 'pager' }
    expect(appendLegendGraphics({ id: 'overlay', elements: [text] }, [pager])).toEqual({
      id: 'overlay',
      elements: [text, pager],
    })
    expect(appendLegendGraphics({ elements: undefined }, [pager])).toEqual({ elements: [pager] })
    expect(appendLegendGraphics([text], [pager])).toEqual([text, pager])
    expect(appendLegendGraphics(undefined, [pager])).toEqual([pager])
  })
})

it('handles pointer paging and anchors supplied as names when a layout changes', () => {
  const setOption = vi.fn()
  const chart = { setOption, isDisposed: () => false } as unknown as EChartsType
  const result = createCategoryLegend(
    entries,
    { textStyle: { fontSize: 'invalid' as never } },
    120,
    {},
    false,
    () => chart,
    { type: 'scroll', data: entries.map(item => item.name), scrollDataIndex: 2 },
  )
  const down = result.pager![1] as unknown as { onclick: () => void }
  down.onclick()
  expect(setOption.mock.lastCall![0].legend.data).toEqual([entries[3], '\n', entries[4]])
})
