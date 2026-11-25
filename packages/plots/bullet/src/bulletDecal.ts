import type { BarSeriesOption } from 'echarts/charts'
import { graphic, PRIORITY, registerVisual, registerUpdateLifecycle } from 'echarts/core'
import { getAlphaColor, getTooltipsColor } from '@idux/charts-core'

type Pattern = NonNullable<InstanceType<typeof graphic.Rect>['style']['decal']>
const adapted = new WeakSet<InstanceType<typeof graphic.Rect>>()
const patterns = new WeakMap<object, Map<number, Pattern | undefined>>()

/** Generate the hover texture with ECharts, then attach it to the native bar state. */
export function installBulletDecal() {
  registerVisual(PRIORITY.VISUAL.DECAL - 1, {
    seriesType: 'bar',
    reset(series) {
      const option = series.option as BarSeriesOption & { __ixBulletLayout?: unknown }
      if (!option.__ixBulletLayout) return
      const data = series.getData()
      const pending = new Map<number, Pattern | undefined>()
      patterns.set(data, pending)
      data.each(index => {
        const item = data.getRawDataItem(index) as Pick<BarSeriesOption, 'itemStyle' | 'emphasis'>
        // Explicit caller decals remain normal native itemStyle configuration.
        if (
          (item.itemStyle?.decal ?? option.itemStyle?.decal) != null ||
          (item.emphasis?.disabled ?? option.emphasis?.disabled)
        )
          return
        const fill = data.getItemVisual(index, 'style')?.fill
        data.setItemVisual(index, 'decal', {
          symbol: 'rect',
          symbolSize: 1,
          color: getAlphaColor(getTooltipsColor(fill), 0.5),
          backgroundColor: 'transparent',
          dashArrayX: [1, 0],
          // Integer decal units avoid rounding the original 6px spacing.
          dashArrayY: [200, 225],
          rotation: -Math.PI / 4,
        })
        pending.set(index, undefined)
      })
    },
  })
  registerVisual(PRIORITY.VISUAL.DECAL + 1, {
    seriesType: 'bar',
    reset(series) {
      const data = series.getData()
      const pending = patterns.get(data)
      pending?.forEach((_, index) => {
        const style = data.ensureUniqueItemVisual(index, 'style')
        if (style.decal) {
          style.decal.scaleY = 6 / Math.SQRT2 / 425
          pending.set(index, style.decal)
        }
        delete style.decal
      })
    },
  })
  registerUpdateLifecycle('series:afterupdate', model => {
    model.eachSeriesByType('bar', series => {
      const data = series.getData()
      patterns.get(data)?.forEach((pattern, index) => {
        const bar = data.getItemGraphicEl(index) as InstanceType<typeof graphic.Rect> | undefined
        if (bar && pattern) {
          const state = bar.ensureState('emphasis')
          state.style = { ...state.style, decal: pattern }
          if (!adapted.has(bar)) {
            adapted.add(bar)
            const afterUpdate = bar.afterUpdate
            bar.afterUpdate = function () {
              afterUpdate.call(this)
              const decal = this.getDecalElement()
              if (decal) {
                // SVG treats a null decal shadow color as black; keep only the bar's shadow.
                decal.style.shadowBlur = 0
                decal.style.shadowOffsetX = 0
                decal.style.shadowOffsetY = 0
              }
            }
          }
        }
      })
    })
  })
}
