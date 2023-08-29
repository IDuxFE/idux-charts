export interface TooltipsFormatItem {
	name: string
	value: string | number
	color?: string
}

export function useTooltipsFormatter (title: string, list: TooltipsFormatItem[]): string {
	return `
    <div class="ix-charts-tooltips">
			<div class="ix-charts-tooltips-title">${title}</div>
			${list.map(item => {
				return `
					<div class="ix-charts-tooltips-item">
						<span class="ix-charts-tooltips-item-border" style="background: ${item.color}"></span>
						<span class="ix-charts-tooltips-item-name">${item.name}</span>
						<span class="ix-charts-tooltips-item-value">${item.value}</span>
					</div>`
				}).join('')}
		</div>`
}