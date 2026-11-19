import { expect, it, vi } from 'vitest'
import { createTooltipTheme } from '../tooltipTheme'
import { getTooltipsColor, useTooltipsFormatter } from '../useTooltips'
import { useStripeArea } from '../useStripe'
import { replaceChartComponent, splitChartOptions } from '../../utils/chartOptions'
import { createInstall } from '../../utils'
import { seerRiskColors } from '../../../plots/pie/src/colors'

it('supports tooltip portals without a container, incomplete gradients and null display values', () => {
  expect(() => createTooltipTheme(() => undefined).rendered()).not.toThrow()
  expect(getTooltipsColor({})).toBe('')
  expect(getTooltipsColor({ colorStops: [undefined as never, {}, { color: 'transparent' }] })).toBe(
    '',
  )
  const html = useTooltipsFormatter('Title', [{ name: 'N', value: null as never }], 1)
  expect(html).toContain('charts-tooltips-item-value"></span>')
  expect(
    useTooltipsFormatter(
      'T',
      [
        { name: '1', value: 1 },
        { name: '2', value: 2 },
      ],
      1,
    ),
  ).toContain('charts-tooltips-column')
})

it('keeps chart control options out of ECharts and merges scalar replaceMerge without duplicates', () => {
  expect(splitChartOptions({ chartBackgroundColor: 'red', backgroundColor: 'blue' })).toEqual({
    option: { backgroundColor: 'red' },
    controls: { chartBackgroundColor: 'red' },
  })
  expect(replaceChartComponent({ replaceMerge: 'legend' }, 'series').replaceMerge).toEqual([
    'legend',
    'series',
  ])
  expect(replaceChartComponent({ replaceMerge: 'legend' }, 'legend').replaceMerge).toEqual([
    'legend',
  ])
})

it('registers installable components by their public name and exposes stripe and risk palettes', () => {
  const Chart = { name: 'ExampleChart' }
  const component = vi.fn()
  createInstall(Chart, []).install({ component })
  expect(component).toHaveBeenCalledExactlyOnceWith('ExampleChart', Chart)
  expect(useStripeArea()).toMatchObject({
    aria: { enabled: true, decal: { show: true, decals: [{ rotation: Math.PI / 2 }] } },
  })
  expect(seerRiskColors).toEqual([
    '#8C1604',
    '#DB4C35',
    '#FF9245',
    '#FFC145',
    '#689FFF',
    '#45D9A3',
    '#99ACD1',
  ])
})

it('retains explicit notMerge settings intact', () => {
  const opts = { notMerge: true }
  expect(replaceChartComponent(opts, 'series')).toBe(opts)
})
