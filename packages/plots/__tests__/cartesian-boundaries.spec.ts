import type { ChartProps } from '@idux/charts-core'
import type { DefaultLabelFormatterCallbackParams } from 'echarts'
import { afterEach, describe, expect, it, vi } from 'vitest'

afterEach(() => {
  vi.doUnmock('echarts/core')
  vi.resetModules()
})

describe('Cartesian compatibility and overrides', () => {
  it('uses containLabel only as a default on ECharts 5 and preserves caller grids', async () => {
    vi.doMock('echarts/core', async importOriginal => ({
      ...(await importOriginal<typeof import('echarts/core')>()),
      version: '5.4.3',
    }))
    const { mergeCartesianGrid, applyCartesianGridBounds } = await import('../shared/cartesian')
    expect(mergeCartesianGrid({ left: 10 }, {})).toEqual({ left: 10, containLabel: true })
    expect(mergeCartesianGrid({}, { containLabel: false })).toEqual({ containLabel: false })
    const input = [{ left: 0 }, { containLabel: false }]
    expect(mergeCartesianGrid({ top: 20 }, input)).toEqual(input)
    expect(input).toEqual([{ left: 0 }, { containLabel: false }])
    expect(() => applyCartesianGridBounds(undefined)).not.toThrow()
  })

  it('honors all ECharts 6 outer bounds controls without inventing array-grid defaults', async () => {
    const { mergeCartesianGrid, reserveCartesianSpace } = await import('../shared/cartesian')
    for (const input of [
      { containLabel: false, outerBoundsContain: 'all' as const },
      { containLabel: false, outerBoundsClampWidth: 100 },
      { containLabel: false, outerBoundsClampHeight: 100 },
      { outerBoundsMode: 'none' as const },
    ])
      expect(mergeCartesianGrid({}, input)).toMatchObject(input)
    const unchanged: ChartProps = {
      grid: { top: 8, bottom: 9 },
      title: { text: 'T' },
      dataZoom: {},
    }
    reserveCartesianSpace(unchanged, { grid: [{ top: 10 }] }, { grid: [{ top: 0 }] })
    expect(unchanged.grid).toMatchObject({ top: 56, bottom: 64 })
    const custom: ChartProps = { grid: {}, title: {}, dataZoom: {} }
    reserveCartesianSpace(custom, { grid: { top: '10%', bottom: '5%' } }, {})
    expect(custom.grid).toEqual({})
    reserveCartesianSpace(
      custom,
      { grid: { top: 10, bottom: 20 } },
      { grid: { top: 0, bottom: 0 } },
    )
    expect(custom.grid).toEqual({})
  })

  it('formats horizontal and multi-axis tuples using binding IDs and custom encodings', async () => {
    const { applyCartesianTooltip } = await import('../shared/cartesian')
    const option: ChartProps = {
      xAxis: [{ id: 7, name: 'ms' }, { name: 'other' }],
      yAxis: [{ id: 'domain', data: ['A'] }],
      series: [{ type: 'bar', xAxisId: '7', yAxisId: 'domain' }],
      tooltip: [{}, { valueFormatter: (value, index) => `${value}@${index}` }],
    }
    applyCartesianTooltip(option)
    const tips = option.tooltip as Array<{ formatter: (params: unknown) => string }>
    expect(tips[0]!.formatter({ value: [2, 99], encode: { x: [0] }, seriesIndex: 0 })).toContain(
      '2 ms',
    )
    expect(tips[1]!.formatter({ value: [2, 99], dataIndex: 3 })).toContain('2@3')
    const scalar: ChartProps = { xAxis: { type: 'category' }, tooltip: {} }
    applyCartesianTooltip(scalar)
    const format = (scalar.tooltip as { formatter: (p: unknown) => string }).formatter
    expect(format({ value: [5] } as DefaultLabelFormatterCallbackParams)).toContain('>5<')
    expect(format([])).toBe('')
    const custom = () => 'custom'
    const caller: ChartProps = { tooltip: { formatter: custom } }
    applyCartesianTooltip(caller)
    expect(caller.tooltip).toMatchObject({ formatter: custom })
  })
})
