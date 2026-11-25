import { PRIORITY, registerVisual } from 'echarts/core'

/** Keep tooltip markers consistent without reevaluating caller color callbacks. */
export function installBulletVisual() {
  registerVisual(PRIORITY.VISUAL.DECAL - 2, {
    seriesType: 'custom',
    reset(series, model) {
      if (series.id !== 'bullet-decorations' && series.id !== 'bullet-targets') return
      const actual = model
        .getSeries()
        .find(
          item =>
            item.id === 'bullet' &&
            (item.option as { __ixBulletLayout?: unknown }).__ixBulletLayout,
        )
      if (!actual) return
      const source = actual.getData()
      const data = series.getData()
      data.each(index => {
        // dataZoom filters each series independently; match by the original row index.
        const sourceIndex = source.indexOfRawIndex(data.getRawIndex(index))
        if (sourceIndex < 0) return
        const fill = source.getItemVisual(sourceIndex, 'style')?.fill
        if (fill != null) data.ensureUniqueItemVisual(index, 'style').fill = fill
      })
    },
  })
}
