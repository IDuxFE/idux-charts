export interface TooltipsFormatItem {
	name: string
	value: string | number
	color?: string
}

export function useTooltipsFormatter (title: string, list: TooltipsFormatItem[]): string {
	return `
    <div class="charts-tooltips">
			<div class="charts-tooltips-title">${title}</div>
			${list.map(item => {
				return `
					<div class="charts-tooltips-item">
						<span class="charts-tooltips-item-border" style="background: ${item.color}"></span>
						<span class="charts-tooltips-item-name">${item.name}</span>
						<span class="charts-tooltips-item-value">${item.value}</span>
					</div>`
				}).join('')}
		</div>`
}