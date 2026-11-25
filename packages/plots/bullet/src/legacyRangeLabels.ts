import type { BulletSeriesOption } from './types'
import type { XAXisComponentOption } from 'echarts'
import { graphic } from 'echarts/core'
import { convertArray } from '@idux/charts-core'
import type { BaseChartOption } from '@idux/charts-core'

/** ECharts 5 does not support axisLabel.customValues; draw the same labels with the guides. */
export function applyLegacyRangeLabels(option: BaseChartOption<BulletSeriesOption>) {
  const axis = convertArray(option.xAxis)[0] as
    | Extract<XAXisComponentOption, { type?: 'value' }>
    | undefined
  const series = convertArray(option.series).find(
    item => item.type === 'custom' && item.id === 'bullet-ranges',
  )
  if (series?.type !== 'custom') return
  const values = axis?.axisLabel?.customValues
  if (!axis || !series?.renderItem || !values?.length) return
  const label = { ...axis.axisLabel }
  const renderGuides = series.renderItem
  axis.axisLabel = { ...label, show: false }
  if (axis.show === false || label.show === false) return
  series.renderItem = (params, api) => {
    const guides = renderGuides(params, api)
    if (!guides || guides.type !== 'group') return guides
    const coord = params.coordSys as unknown as {
      x: number
      y: number
      width: number
      height: number
    }
    const labels = values.flatMap((value, index) => {
      if (
        (index === 0 && label.showMinLabel === false) ||
        (index === values.length - 1 && label.showMaxLabel === false)
      )
        return []
      const x = api.coord([value, 0])[0]!
      if (x < coord.x || x > coord.x + coord.width) return []
      const text =
        typeof label.formatter === 'function'
          ? label.formatter(Number(value), index, undefined)
          : typeof label.formatter === 'string'
            ? label.formatter.replace('{value}', String(value))
            : String(value)
      return [
        {
          type: 'text' as const,
          name: `range-label-${index}`,
          silent: true,
          style: {
            x,
            y: coord.y + coord.height + (label.margin ?? 8),
            text,
            fill:
              typeof label.color === 'function' ? label.color(Number(value), index) : label.color,
            fontSize: label.fontSize ?? 12,
            fontFamily: label.fontFamily,
            fontWeight: label.fontWeight,
            fontStyle: label.fontStyle,
            align: label.align ?? 'center',
            verticalAlign: label.verticalAlign ?? 'top',
          },
        },
      ]
    })
    if (label.hideOverlap !== false) {
      // Reserve the scale endpoints before accepting interior threshold labels.
      const priority = [labels[0], labels[labels.length - 1], ...labels.slice(1, -1)]
      const occupied: InstanceType<typeof graphic.BoundingRect>[] = []
      const visible = new Set<(typeof labels)[number]>()
      for (const item of priority) {
        if (!item || visible.has(item)) continue
        const rect = new graphic.Text({ style: item.style }).getBoundingRect().clone()
        rect.x -= 2
        rect.width += 4
        if (occupied.some(previous => previous.intersect(rect))) continue
        occupied.push(rect)
        visible.add(item)
      }
      return {
        ...guides,
        children: [...guides.children, ...labels.filter(item => visible.has(item))],
      }
    }
    return { ...guides, children: [...guides.children, ...labels] }
  }
}
