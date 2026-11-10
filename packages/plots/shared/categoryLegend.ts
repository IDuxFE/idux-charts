import type { ChartProps } from '@idux/charts-core'
import { convertArray } from '@idux/charts-core'
import type { GraphicComponentOption, LegendComponentOption } from 'echarts/components'
import type { EChartsType } from 'echarts/core'
import { format } from 'echarts/core'

import type { PlotTheme } from './plotTheme'
import type { LegendWheelRegion } from './useLegendWheel'

type LegendItem = { name: string; icon: string }
function legendState(option?: LegendComponentOption): {
  selected?: LegendComponentOption['selected']
  scrollDataIndex?: number
} {
  if (!option) return {}
  return {
    selected: option.selected,
    ...(option.type === 'scroll' &&
      'scrollDataIndex' in option && { scrollDataIndex: option.scrollDataIndex }),
  }
}

type GraphicElement = NonNullable<
  Extract<GraphicComponentOption, { elements?: unknown }>['elements']
>[number]

export function appendLegendGraphics(
  graphic: ChartProps['graphic'],
  elements: GraphicElement[],
): ChartProps['graphic'] {
  // ECharts accepts either a graphic component or a list of graphic elements.
  const options = convertArray(graphic)
  const first = options[0]
  return first && 'elements' in first
    ? { ...first, elements: [...(first.elements ?? []), ...elements] }
    : [...options, ...elements]
}

export function createCategoryLegend(
  entries: LegendItem[],
  legend: ChartProps['legend'],
  width: number,
  theme: PlotTheme,
  dark: boolean,
  getChart: () => EChartsType | undefined,
  currentLegend?: ChartProps['legend'],
  idPrefix = 'ix-bar-legend',
): {
  legend: ChartProps['legend']
  height: number
  pager?: GraphicElement[]
  wheel?: LegendWheelRegion
} {
  const current = convertArray(currentLegend)
  if (Array.isArray(legend))
    return {
      legend: legend.map((item, index) => ({ ...item, ...legendState(current[index]) })),
      height: 28,
    }

  const activeColor = theme.secondaryTextColor ?? (dark ? '#C2C7D1' : '#6F7785')
  const inactiveColor = dark ? (theme.mutedColor ?? '#525966') : '#C2C7D1'
  const native: LegendComponentOption = {
    type: 'scroll',
    bottom: 0,
    itemGap: 24,
    ...(dark
      ? {
          pageIconColor: activeColor,
          pageIconInactiveColor: inactiveColor,
          pageTextStyle: { color: activeColor },
        }
      : {}),
    data: entries,
    ...legend,
    ...legendState(current[0]),
  }
  if (
    width <= 0 ||
    legend?.type ||
    legend?.data ||
    legend?.orient === 'vertical' ||
    legend?.left !== undefined ||
    legend?.right !== undefined ||
    legend?.top !== undefined ||
    legend?.bottom !== undefined ||
    legend?.width !== undefined ||
    legend?.height !== undefined ||
    legend?.selector ||
    legend?.selectedMode === 'single'
  )
    return { legend: native, height: 28 }

  const items = [...new Map(entries.map(item => [item.name, item])).values()]
  const style = legend?.textStyle
  const fontSize = Number.parseFloat(String(style?.fontSize ?? 12)) || 12
  const font = `${style?.fontStyle ?? 'normal'} ${style?.fontWeight ?? 'normal'} ${fontSize}px ${style?.fontFamily ?? theme.fontFamily ?? 'sans-serif'}`
  const textWidths = items.map(({ name }) => {
    const label =
      typeof legend?.formatter === 'function'
        ? legend.formatter(name)
        : (legend?.formatter?.replace('{name}', name) ?? name)
    return format.getTextRect(label, font).width
  })
  const iconWidth = legend?.itemWidth ?? 12
  const iconSpace = iconWidth + 5
  const naturalGap = legend?.itemGap ?? 24
  const naturalWidth =
    textWidths.reduce((sum, textWidth) => sum + iconSpace + textWidth, 0) +
    Math.max(0, items.length - 1) * naturalGap
  if (naturalWidth <= width - 10) return { legend: { ...native, type: 'plain' }, height: 28 }

  const gap = 6
  const bottom = 6
  const pagerSpace = 24
  const available = width - 12
  const labelWidth = Math.max(
    1,
    Math.min(
      160,
      Math.max(56, Math.ceil(Math.max(...textWidths)) + 2),
      available - pagerSpace - iconSpace,
    ),
  )
  const cellWidth = iconSpace + labelWidth
  const columnsFor = (space: number) => Math.max(1, Math.floor((space + gap) / (cellWidth + gap)))
  const needsPager = items.length > 2 * columnsFor(available)
  const columns = columnsFor(available - (needsPager ? pagerSpace : 0))
  const rowHeight = Math.max(14, fontSize + 2, legend?.itemHeight ?? 12)
  const legendWidth = columns * cellWidth + (columns - 1) * gap
  const left = Math.max(0, Math.floor((width - legendWidth - (needsPager ? pagerSpace : 0)) / 2))
  const lastRow = Math.max(0, Math.ceil(items.length / columns) - 2)
  const previous = current[0]
  const anchor = previous?.data?.[legendState(previous).scrollDataIndex ?? 0]
  const anchorName = typeof anchor === 'string' ? anchor : anchor?.name
  const anchorIndex = items.findIndex(item => item.name === anchorName)
  // Keep the first previously visible item in view when the column count changes.
  let row = Math.max(0, Math.min(lastRow, Math.floor(anchorIndex / columns)))

  const getData = (): NonNullable<LegendComponentOption['data']> => {
    const start = row * columns
    const first = items.slice(start, start + columns)
    const second = items.slice(start + columns, start + 2 * columns)
    return second.length ? [...first, '\n', ...second] : first
  }
  const scrollBy = (direction: -1 | 1) => {
    const chart = getChart()
    const nextRow = row + direction
    if (!chart || chart.isDisposed() || nextRow < 0 || nextRow > lastRow) return
    row = nextRow
    // Update the visible legend entries without rebuilding the chart or resetting dataZoom.
    chart.setOption({ legend: { data: getData() }, graphic: { elements: getPager() } })
  }
  const getPager = (): GraphicElement[] =>
    ([-1, 1] as const).map(direction => {
      const up = direction === -1
      const enabled = up ? row > 0 : row < lastRow
      return {
        id: up ? `${idPrefix}-up` : `${idPrefix}-down`,
        type: 'group',
        left: left + legendWidth + 4,
        bottom: bottom + (up ? rowHeight + gap : 0),
        silent: !enabled,
        onclick: () => scrollBy(direction),
        children: [
          {
            id: up ? `${idPrefix}-up-hit` : `${idPrefix}-down-hit`,
            type: 'rect',
            z: 10,
            cursor: enabled ? 'pointer' : 'default',
            shape: { x: 0, y: 0, width: 20, height: rowHeight },
            style: { fill: 'transparent' },
          },
          {
            id: up ? `${idPrefix}-up-icon` : `${idPrefix}-down-icon`,
            type: 'polyline',
            z: 11,
            silent: true,
            shape: {
              points: [
                [6, rowHeight / 2 + (up ? 2 : -2)],
                [10, rowHeight / 2 + (up ? -2 : 2)],
                [14, rowHeight / 2 + (up ? 2 : -2)],
              ],
            },
            style: {
              stroke: enabled ? activeColor : inactiveColor,
              fill: 'none',
              lineWidth: 1,
              lineCap: 'round',
              lineJoin: 'round',
            },
          },
        ],
      }
    })

  return {
    legend: {
      ...native,
      type: 'plain',
      left,
      bottom,
      width: legendWidth + 0.5,
      padding: 0,
      align: 'left',
      itemWidth: iconWidth,
      itemHeight: legend?.itemHeight ?? 12,
      itemGap: gap,
      textStyle: {
        ...style,
        width: labelWidth,
        height: rowHeight,
        lineHeight: rowHeight,
        padding: 0,
        overflow: 'truncate',
        lineOverflow: 'truncate',
        backgroundColor: style?.backgroundColor ?? 'transparent',
      },
      data: getData(),
    },
    height: 2 * rowHeight + gap + bottom + 6,
    ...(needsPager
      ? {
          pager: getPager(),
          wheel: {
            left,
            bottom,
            width: legendWidth + pagerSpace,
            height: 2 * rowHeight + gap,
            scrollBy,
          },
        }
      : {}),
  }
}
