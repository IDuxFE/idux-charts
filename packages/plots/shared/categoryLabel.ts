import { convertArray } from '@idux/charts-core'
import type { ChartProps } from '@idux/charts-core'
import type { EChartsType } from 'echarts/core'
import { escape } from 'lodash-es'
import { onBeforeUnmount } from 'vue-demi'

export const categoryLabelDefaults = { width: 186, overflow: 'truncate' as const }

interface CategoryLabelEvent {
  componentType?: string
  componentIndex?: number
  targetType?: string
  value?: unknown
  event?: { offsetX?: number; offsetY?: number }
}

/** Use axis events so label tooltips also work with ECharts 5 and empty measurements. */
export function bindCategoryLabelTooltip(chart: EChartsType) {
  let visible = false
  const hide = () => {
    if (visible && !chart.isDisposed()) chart.dispatchAction({ type: 'hideTip' })
    visible = false
  }
  const show = (event: CategoryLabelEvent) => {
    if (event.componentType !== 'yAxis' || event.targetType !== 'axisLabel') return
    const option = chart.getOption() as ChartProps
    const axis = convertArray(option.yAxis)[event.componentIndex ?? 0]
    // A caller can opt out of these events or supply its own native axis tooltip.
    if (axis?.type !== 'category' || !axis.triggerEvent || axis.tooltip?.show) return
    const { offsetX, offsetY } = event.event ?? {}
    if (event.value == null || offsetX === undefined || offsetY === undefined) return
    const text = String(event.value)
    const html = `<div class="charts-tooltips-category">${escape(text)}</div>`
    const richText = convertArray(option.tooltip)[0]?.renderMode === 'richText'
    visible = true
    chart.dispatchAction({
      type: 'showTip',
      x: offsetX,
      y: offsetY,
      tooltip: {
        // Component tooltips have different formatter parameters from data tooltips.
        formatter: () => (richText ? text : html),
        confine: true,
      },
    })
  }
  chart.on('mouseover', show)
  chart.on('mouseout', hide)
  chart.getZr().on('globalout', hide)
  return () => {
    if (!chart.isDisposed()) {
      hide()
      chart.off('mouseover', show)
      chart.off('mouseout', hide)
      chart.getZr().off('globalout', hide)
    }
  }
}

export function useCategoryLabelTooltip() {
  let cleanup: (() => void) | undefined
  onBeforeUnmount(() => cleanup?.())
  return (chart: EChartsType) => {
    cleanup?.()
    cleanup = bindCategoryLabelTooltip(chart)
  }
}
