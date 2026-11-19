import type { BarSeriesOption } from 'echarts/charts'
import type { ChartProps } from '@idux/charts-core'
import { convertArray } from '@idux/charts-core'

import { mergePlotOptions } from '../../shared/plotOptions'
import { countBarColumns } from './categoryBarWidth'

function measurement(item: unknown, horizontal: boolean): number | undefined {
  const value = item && typeof item === 'object' && 'value' in item ? item.value : item
  const scalar = Array.isArray(value) ? value[horizontal ? 0 : 1] : value
  if (scalar == null || (typeof scalar !== 'number' && typeof scalar !== 'string')) return
  if (typeof scalar === 'string' && !scalar.trim()) return
  const number = Number(scalar)
  return Number.isFinite(number) ? number : undefined
}

/** Apply layout defaults before caller labels, keeping stack totals on one valid segment. */
export function withBarLabels(
  bars: BarSeriesOption[],
  horizontal: boolean,
  getLegend: () => ChartProps['legend'],
): BarSeriesOption[] {
  const grouped = countBarColumns(bars) > 1
  return bars.map((bar, index) => {
    let label: BarSeriesOption['label'] = {
      show: !grouped,
      position: horizontal ? 'right' : 'top',
    }
    if (!grouped && bar.stack) {
      label = {
        ...label,
        formatter: params => {
          const legends = convertArray(getLegend())
          let total = 0
          let last = -1
          bars.forEach((item, i) => {
            if (item.stack !== bar.stack) return
            if (item.name && legends.some(legend => legend.selected?.[item.name!] === false)) return
            const value = measurement(item.data?.[params.dataIndex], horizontal)
            if (value === undefined) return
            total += value
            last = i
          })
          return last === index ? String(total) : ''
        },
      }
    }
    return { ...bar, label: mergePlotOptions(label, bar.label) }
  })
}
