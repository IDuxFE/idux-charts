import type { Color } from 'echarts'
import { TinyColor } from '@ctrl/tinycolor'

interface GradientColorStop {
  offset?: number
  color?: string
}

interface GradientLikeColor {
  colorStops?: GradientColorStop[]
}
export interface TooltipsFormatItem {
  name: string
  value: string | number
  /**
   * Tooltip swatch color or a gradient. Gradients use the darkest stop
   * among the stops with the highest opacity.
   */
  color?: string | GradientLikeColor
}

/**
 * Resolve a solid swatch color from a chart color or gradient.
 */
export function getTooltipsColor(color?: Color | GradientLikeColor | null): string {
  if (!color) {
    return ''
  }

  if (typeof color === 'string') {
    return color
  }

  if (!('colorStops' in color)) return ''

  // Prefer visible stops, then the darkest at equal opacity. This keeps fading
  // gradients visible on both light and dark tooltip surfaces.
  const stops = (color.colorStops ?? []).flatMap(stop => {
    const parsed = new TinyColor(stop?.color ?? '')
    return parsed.isValid && parsed.getAlpha() > 0
      ? [{ color: stop.color!, alpha: parsed.getAlpha(), luminance: parsed.getLuminance() }]
      : []
  })
  stops.sort((a, b) => b.alpha - a.alpha || a.luminance - b.luminance)
  return stops[0]?.color ?? ''
}

function renderTooltipItems(items: TooltipsFormatItem[]) {
  return items
    .map(
      item => `
					<div class="charts-tooltips-item">
						<span class="charts-tooltips-item-border" style="background: ${getTooltipsColor(item.color)}"></span>
						<span class="charts-tooltips-item-name">${item.name}</span>
						<span class="charts-tooltips-item-value">${item.value}</span>
					</div>`,
    )
    .join('')
}

export function useTooltipsFormatter(
  title: string,
  list: TooltipsFormatItem[],
  rowsPerColumn?: number,
): string {
  const size = Math.floor(rowsPerColumn ?? 0)
  const content =
    size > 0 && list.length > size
      ? `<div class="charts-tooltips-columns">${Array.from(
          { length: Math.ceil(list.length / size) },
          (_, index) =>
            `<div class="charts-tooltips-column">${renderTooltipItems(list.slice(index * size, (index + 1) * size))}</div>`,
        ).join('')}</div>`
      : renderTooltipItems(list)
  return `
    <div class="charts-tooltips">
      <div class="charts-tooltips-title">${title}</div>
      ${content}
    </div>`
}
