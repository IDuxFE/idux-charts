import type { BarSeriesOption } from 'echarts/charts'
import { color as echartsColor, graphic } from 'echarts/core'
import { pick } from 'lodash-es'
import { getLinearColors, LinearDirection } from '../../shared/linearColors'
import { mergePlotOptions } from '../../shared/plotOptions'
import { resolveBulletLabel } from './bulletLabel'
import { bulletSeriesProps } from './types'
import { hasNativeBulletWidth } from './bulletLayout'
import type { BulletLayout } from './bulletLayout'
import type { BulletModel } from './resolveBulletModel'

const gradients = getLinearColors(LinearDirection.horizontal)

export function createBulletBar(model: BulletModel): BarSeriesOption {
  const { props, rows, grouped, ranges } = model
  const defaultColor: NonNullable<BarSeriesOption['itemStyle']>['color'] = params => {
    const fill = rows[params.dataIndex]!.actualColor
    if (!grouped && ranges.length) return fill
    const light =
      gradients.find(gradient => gradient.colorStops[0]?.color === fill)?.colorStops[1]?.color ??
      echartsColor.lift(fill, 0.4)
    return new graphic.LinearGradient(0, 0, 1, 0, [
      { offset: 0, color: light },
      { offset: 1, color: fill },
    ])
  }
  return mergePlotOptions<BarSeriesOption & { __ixBulletLayout?: BulletLayout }>(
    {
      id: 'bullet',
      name: props.name ?? '实际值',
      type: 'bar',
      z: 2,
      clip: true,
      barMinHeight: 1,
      // Layout adaptation only controls thickness and the above-label offset.
      // Label rendering, visual encoding, states and animation remain native.
      __ixBulletLayout: {
        grouped,
        above: grouped && props.layout === 'horizontal-above',
        nativeWidth: hasNativeBulletWidth(props),
      },
      label: resolveBulletLabel(model),
      itemStyle: {
        ...(props.color == null ? { color: defaultColor } : {}),
        shadowColor: 'auto',
        shadowBlur: 10,
        shadowOffsetY: -4,
      },
      data: rows.map((row, index) => {
        const source = props.data?.[index] ?? { value: props.value, target: props.target }
        return {
          ...source,
          name: row.name,
          value: row.value ?? null,
          ...(grouped && props.layout === 'horizontal-above' && row.value === 0
            ? { label: mergePlotOptions(props.data?.[index]?.label, { show: false }) }
            : {}),
        }
      }),
    },
    pick(props, bulletSeriesProps),
  )
}
