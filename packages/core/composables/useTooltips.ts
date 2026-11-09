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
   * 图例色块颜色，支持普通颜色字符串（如 `#458FFF`）
   * 或渐变对象（如 `itemStyle.color` 配置的 linear 渐变），
   * 传入渐变时优先取最不透明的色标，同透明度下取更深的颜色。
   */
  color?: string | GradientLikeColor
}

/**
 * 提取用于 tooltip 色块展示的颜色。
 *
 * 柱体、折线等图形常配置为线性渐变，此时 hover 提示中的竖杠
 * 需要与图形中更深的颜色保持一致，因此优先选择最不透明的色标，同透明度时取亮度最低的颜色。
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

export function useTooltipsFormatter(title: string, list: TooltipsFormatItem[]): string {
  return `
    <div class="charts-tooltips">
			<div class="charts-tooltips-title">${title}</div>
			${list
        .map(item => {
          return `
					<div class="charts-tooltips-item">
						<span class="charts-tooltips-item-border" style="background: ${getTooltipsColor(item.color)}"></span>
						<span class="charts-tooltips-item-name">${item.name}</span>
						<span class="charts-tooltips-item-value">${item.value}</span>
					</div>`
        })
        .join('')}
		</div>`
}
