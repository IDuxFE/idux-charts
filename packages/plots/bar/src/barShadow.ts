import type { ChartProps } from '@idux/charts-core'
import { getTooltipsColor } from '@idux/charts-core'
import { color, PRIORITY, registerVisual } from 'echarts/core'
import type { Color } from 'echarts/core'

const autoShadow = 'auto'
const shadowStyle = {
  shadowColor: autoShadow,
  shadowBlur: 10,
  shadowOffsetX: 0,
  shadowOffsetY: -4,
}

type Series = NonNullable<ChartProps['series']>

export function withBarShadows(option: ChartProps): ChartProps {
  const series = option.series
  if (!series) return option

  const addShadow = (item: Exclude<Series, unknown[]>) =>
    item.type === 'bar' ? { ...item, itemStyle: { ...shadowStyle, ...item.itemStyle } } : item
  return { ...option, series: Array.isArray(series) ? series.map(addShadow) : addShadow(series) }
}

function resolveShadow(style: { fill?: Color; shadowColor?: string }) {
  if (style.shadowColor !== autoShadow) return
  const rgba = color.parse(getTooltipsColor(style.fill))
  style.shadowColor = rgba?.[3]
    ? `rgba(${rgba[0]},${rgba[1]},${rgba[2]},${rgba[3] * 0.16})`
    : undefined
}

export function installBarShadow() {
  // Resolve shadows after the palette and individual bar styles have been applied.
  registerVisual(PRIORITY.VISUAL.BRUSH + 1, {
    seriesType: 'bar',
    reset(series) {
      const data = series.getData()
      const style = data.getVisual('style')
      if (style?.shadowColor !== autoShadow) return

      if (data.hasItemVisual()) {
        data.each(index => {
          const itemStyle = data.getItemVisual(index, 'style')
          if (itemStyle !== style) resolveShadow(itemStyle)
        })
      }
      resolveShadow(style)
    },
  })
}
