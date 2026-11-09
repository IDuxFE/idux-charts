import type { TooltipComponentOption } from 'echarts/components'
import type { EChartsType } from 'echarts/core'
import type { ChartProps } from '../types'

let nextTooltipId = 0

/** Keep theme state on the tooltip itself, including portals created by appendTo. */
export function createTooltipTheme(getContainer: () => HTMLElement | undefined) {
  const className = `ix-chart-tooltip-${++nextTooltipId}`
  let theme = 'light'
  let tooltip: HTMLElement | null = null

  const apply = () => {
    const container = getContainer()
    if (!container) return
    container.dataset.ixChartTheme = theme
    if (!tooltip?.isConnected) {
      tooltip = container.ownerDocument.querySelector<HTMLElement>(`.${className}`)
    }
    if (tooltip) tooltip.dataset.ixChartTheme = theme
  }

  return {
    // Retain caller classes and never create a tooltip where none was configured.
    prepare(options: ChartProps): ChartProps {
      if (!options.tooltip) return options
      const prepareTooltip = (tooltip: TooltipComponentOption) => ({
        ...tooltip,
        className: [tooltip.className, className].filter(Boolean).join(' '),
      })
      return {
        ...options,
        tooltip: Array.isArray(options.tooltip)
          ? options.tooltip.map(prepareTooltip)
          : prepareTooltip(options.tooltip),
      }
    },
    sync(instance: EChartsType) {
      theme = instance.getOption().darkMode === true ? 'dark' : 'light'
      apply()
    },
    // Lazy rendering may create the tooltip after setOption returns.
    rendered: apply,
  }
}
