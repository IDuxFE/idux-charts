import type { BarSeriesOption } from 'echarts/charts'
import { registerLayout, PRIORITY } from 'echarts/core'

export interface BulletLayout {
  grouped: boolean
  above: boolean
  nativeWidth: boolean
}

export function hasNativeBulletWidth(
  props: Pick<BarSeriesOption, 'barWidth' | 'barMinWidth' | 'barMaxWidth'>,
) {
  return props.barWidth != null || props.barMinWidth != null || props.barMaxWidth != null
}

export function getBulletThickness(grouped: boolean, band: number, height: number) {
  const preferred = grouped && height / band <= 3 ? 16 : 8
  return grouped ? Math.min(preferred, band / 4) : preferred
}

/** Only adapt thickness and the above-label offset; ECharts lays out value lengths. */
export function installBulletLayout() {
  registerLayout(PRIORITY.VISUAL.PROGRESSIVE_LAYOUT + 1, {
    seriesType: 'bar',
    reset(seriesModel) {
      const settings = (seriesModel.option as { __ixBulletLayout?: BulletLayout }).__ixBulletLayout
      if (!settings || seriesModel.coordinateSystem?.type !== 'cartesian2d') return
      const cartesian = seriesModel.coordinateSystem as unknown as {
        getBaseAxis(): { getBandWidth(): number }
        getArea(): { height: number }
      }
      const band = cartesian.getBaseAxis().getBandWidth()
      const data = seriesModel.getData()
      const thickness = settings.nativeWidth
        ? data.getLayout('size')
        : getBulletThickness(settings.grouped, band, cartesian.getArea().height)
      const offset = settings.above ? Math.min(10, band / 6) : 0
      data.each(index => {
        const layout = data.getItemLayout(index)
        if (!layout) return
        const center = layout.y + layout.height / 2
        layout.y = center + offset - thickness / 2
        layout.height = thickness
        // Native barMinHeight also gives zero a pixel; bullet zero remains length zero.
        if (data.get(data.mapDimension('x')!, index) === 0) layout.width = 0
      })
      data.setLayout({ size: thickness, offset: offset - thickness / 2 })
    },
  })
}
