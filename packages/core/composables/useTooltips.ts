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
	 * 传入渐变时会自动取其中更深的颜色作为色块颜色。
	 */
  color?: string | GradientLikeColor
}

/**
 * 提取用于 tooltip 色块展示的颜色。
 *
 * 柱体、折线等图形常配置为线性渐变，此时 hover 提示中的竖杠
 * 需要与图形中更深的颜色保持一致，因此从渐变的所有色标中取亮度最低的颜色。
 */
export function getTooltipsColor (color?: string | GradientLikeColor | null): string {
	if (!color) {
		return ''
	}

	if (typeof color === 'string') {
		return color
	}

	const colors = (color.colorStops || [])
		.map(stop => stop?.color)
		.filter((item): item is string => !!item)

	if (!colors.length) {
		return ''
	}

	return colors.reduce((darkest, current) => (getColorLuminance(current) < getColorLuminance(darkest) ? current : darkest))
}

/**
 * 解析颜色字符串中的 RGB 分量，支持十六进制与 rgb()/rgba() 写法，无法解析时返回 null。
 */
function parseColorRgb (color: string): [number, number, number] | null {
	const value = color.trim()

	const hexMatch = /^#([0-9a-f]{3,4}|[0-9a-f]{6}|[0-9a-f]{8})$/i.exec(value)
	if (hexMatch) {
		const hex = hexMatch[1]
		if (hex.length <= 4) {
			return [
				parseInt(hex[0] + hex[0], 16),
				parseInt(hex[1] + hex[1], 16),
				parseInt(hex[2] + hex[2], 16),
			]
		}
		return [
			parseInt(hex.slice(0, 2), 16),
			parseInt(hex.slice(2, 4), 16),
			parseInt(hex.slice(4, 6), 16),
		]
	}

	const rgbMatch = /^rgba?\(([^)]+)\)$/i.exec(value)
	if (rgbMatch) {
		const parts = rgbMatch[1].split(',').map(item => parseFloat(item))
		if (parts.length >= 3 && parts.slice(0, 3).every(item => !Number.isNaN(item))) {
			return [parts[0], parts[1], parts[2]]
		}
	}

	return null
}

/**
 * 计算颜色相对亮度（0 ~ 1），数值越小代表颜色越深。
 * 无法解析的颜色统一返回 Infinity，保证其不会覆盖有效颜色的比较结果。
 */
function getColorLuminance (color: string): number {
	const rgb = parseColorRgb(color)
	if (!rgb) {
		return Number.POSITIVE_INFINITY
	}

	const [r, g, b] = rgb.map(channel => {
		const ratio = channel / 255
		return ratio <= 0.03928 ? ratio / 12.92 : Math.pow((ratio + 0.055) / 1.055, 2.4)
	})

	return 0.2126 * r + 0.7152 * g + 0.0722 * b
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
