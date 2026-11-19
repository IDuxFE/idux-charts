import type { ChartProps } from '@idux/charts-core'
import { getTooltipsColor } from '@idux/charts-core'
import { color, PRIORITY, registerVisual } from 'echarts/core'
import type { Color } from 'echarts/core'

const autoShadow = 'auto'
// Resolved from the final bar geometry in the visual stage, before painting.
const autoBlur = -1
const shadowStyle = {
  shadowColor: autoShadow,
  shadowBlur: autoBlur,
  shadowOffsetX: 0,
  shadowOffsetY: 0,
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
      if (!style) return
      data.each(index => {
        const itemStyle = data.getItemVisual(index, 'style')
        if (itemStyle?.shadowColor !== autoShadow && itemStyle?.shadowBlur !== autoBlur) return
        const resolved = data.ensureUniqueItemVisual(index, 'style')
        if (resolved.shadowBlur === autoBlur) {
          const layout = data.getItemLayout(index) as { width: number; height: number } | undefined
          const size = layout && Math.min(Math.abs(layout.width), Math.abs(layout.height))
          // SVG shadow filters extend one bounding-box size beyond each edge.
          // Keep that edge over three Gaussian standard deviations away, so
          // thin/short bars fade to transparent before the filter clips them.
          resolved.shadowBlur = size && Number.isFinite(size) ? Math.min(12, size * 0.6) : 0
        }
        resolveShadow(resolved)
      })
      if (style.shadowBlur === autoBlur) style.shadowBlur = 0
      resolveShadow(style)
    },
  })
}
