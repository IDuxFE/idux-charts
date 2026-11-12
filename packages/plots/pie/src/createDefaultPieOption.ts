import type { PlotTheme, PlotTextStyle } from '../../shared/plotTheme'
import type { LegendWheelRegion } from '../../shared/useLegendWheel'
import type { PieSeriesOption } from 'echarts/charts'
type PieDataItemOption = Extract<NonNullable<PieSeriesOption['data']>[number], { name?: unknown }>
import { format } from 'echarts/core'
import { merge } from 'lodash-es'
import type { LegendComponentOption, TitleComponentOption } from 'echarts/components'
import { getAlphaColor, seerColors, seerTheme } from '@idux/charts-core'
import type { PieChartProps, PieChartAlign, PieSeriesStyle } from './usePieOption'
import { getLinearColors } from '../../shared/linearColors'
import { mergePlotOptions } from '../../shared/plotOptions'
import { createPlotTooltipFormatter } from '../../shared/plotTooltip'

export interface PieDisplayTokens {
  fontFamily: string
  colorErrorText: string
  colorTextInfo: string
  colorInfoContainerBgDisabled: string
}

const pageIcons = [
  'path://M503.234 313.575 249.575 567.234c-4.998 4.998-5.001 12.869-.003 17.867l27.39 27.39c5 5 12.927 4.939 17.926-.06L512.169 395.15 729.45 612.43c4.999 5 12.927 5.06 17.925.062l27.39-27.39c5-5 4.996-12.87-.002-17.868L521.104 313.575c-4.998-4.998-12.872-4.998-17.87 0Z',
  'path://M503.234 694.123 249.575 440.464c-4.998-4.998-5.001-12.869-.003-17.867l27.39-27.39c5-5 12.927-4.939 17.926.06l217.281 217.281 217.281-217.28c4.999-5 12.927-5.06 17.925-.062l27.39 27.39c5 5 4.996 12.87-.002 17.868L521.104 694.123c-4.998 4.998-12.872 4.998-17.87 0Z',
]

// Internal preset: callers supply data, not geometry or helper series.
export function createDefaultPieOption(
  input: NonNullable<PieChartProps['data']>,
  size: { width: number; height: number },
  tokens: PieDisplayTokens,
  seriesName = '',
  titleText = '',
  align?: PieChartAlign,
  presentation: {
    plotTheme?: PlotTheme
    textStyle?: PlotTextStyle
    seriesStyle?: PieSeriesStyle
    title?: TitleComponentOption | null
    legend?: LegendComponentOption
    radius?: PieSeriesOption['radius']
    roseType?: PieSeriesOption['roseType']
    clockwise?: boolean
    label?: PieSeriesOption['label']
    markArea?: PieSeriesOption['markArea']
    color?: string[]
    page?: {
      row: number
      onChange: (row: number) => void
      onWheelRegion?: (region: LegendWheelRegion) => void
    }
  } = {},
): PieChartProps {
  const theme = presentation.plotTheme ?? {}
  const textStyle = presentation.textStyle ?? {}
  const palette = presentation.color ?? theme.palette ?? (theme.color ? [theme.color] : undefined)
  const decorationColor = theme.color ?? seerColors[0]!
  const colors = getLinearColors({ type: 'linear', x: 1, y: 1, x2: 0, y2: 0 })
  const data = input.map((entry, index) => {
    const item = (
      typeof entry === 'object' && entry !== null && !Array.isArray(entry)
        ? entry
        : { value: entry }
    ) as {
      name?: string | number
      value?: unknown
      missingReason?: string
      itemStyle?: NonNullable<PieDataItemOption['itemStyle']>
      emphasis?: PieDataItemOption['emphasis']
    }
    const numeric = item.value == null || item.value === '-' ? NaN : Number(item.value)
    const value = Number.isFinite(numeric) && numeric >= 0 ? numeric : null
    const color = colors[index % colors.length]!
    const paletteColor = palette?.length ? palette[index % palette.length] : undefined
    return {
      ...item,
      name: String(item.name ?? index + 1),
      value,
      color: item.itemStyle?.color ?? paletteColor ?? color,
      markerColor:
        typeof item.itemStyle?.color === 'string'
          ? item.itemStyle.color
          : (paletteColor ?? color.colorStops[0]!.color),
      missingReason: 'missingReason' in item ? String(item.missingReason ?? '') : '',
    }
  })
  const showTitle =
    presentation.title !== null &&
    presentation.title?.show !== false &&
    Boolean((presentation.title?.text ?? titleText) || presentation.title?.subtext)
  const showLegend = presentation.legend?.show !== false && data.length > 0
  const text = presentation.title?.text ?? titleText
  const isAllZero = data.length > 0 && data.every(item => item.value === 0)
  const referenceSize = { width: 480, height: 180 }
  const pieConfig = {
    radius: presentation.roseType ? 82 : 60,
    zeroInnerRadius: 16,
    legendGap: 28,
  }
  const haloWidth = presentation.roseType ? 0 : 12
  // Match ECharts' inherited per-item emphasis settings and default 5px growth.
  const hoverGrowth = Math.max(
    0,
    ...data.map(item => {
      const emphasis = { ...presentation.seriesStyle?.emphasis, ...item.emphasis }
      if (emphasis.disabled || emphasis.scale === false) return 0
      const growth = Number(emphasis.scaleSize ?? 5)
      return Number.isFinite(growth) ? Math.max(0, growth) : 0
    }),
  )
  const outerSpace = Math.max(haloWidth, hoverGrowth)
  const componentPadding = 5
  const legendIconTextGap = 5
  const missingValueLabel = '–'
  const legend = presentation.legend ?? {}
  const legendFontSize = Number(legend.textStyle?.fontSize ?? textStyle.fontSize ?? 12)
  const fontFamily =
    legend.textStyle?.fontFamily ?? textStyle.fontFamily ?? theme.fontFamily ?? tokens.fontFamily
  const font = `${legendFontSize}px ${fontFamily}`
  const iconWidth = legend.itemWidth ?? 12
  const iconHeight = legend.itemHeight ?? 12
  const scaleX = size.width / referenceSize.width
  const scaleY = size.height / referenceSize.height
  const radiusScale = Math.min(scaleX * 1.2, scaleY)
  // Roses have no outer halo; other pies keep a 12px decorative halo.
  const initialBackgroundRadius = pieConfig.radius * radiusScale + outerSpace
  const summaryLeft = 2 * initialBackgroundRadius + pieConfig.legendGap - componentPadding
  const resolveRadius = (value: number | string) =>
    typeof value === 'string' && value.endsWith('%')
      ? ((parseFloat(value) / 100) * Math.min(size.width, size.height)) / 2
      : Number(value)
  const radiusValue = Array.isArray(presentation.radius)
    ? presentation.radius[1]
    : presentation.radius
  const requestedRadius = radiusValue === undefined ? undefined : resolveRadius(radiusValue)
  const columnGap =
    24 *
    Math.min(
      scaleX,
      requestedRadius !== undefined && Number.isFinite(requestedRadius) && requestedRadius >= 0
        ? requestedRadius / pieConfig.radius
        : Infinity,
    )
  const itemGap = legend.itemGap ?? 16 * scaleY
  const customFormatter = legend.formatter
  const formatLegend = (name: string) =>
    typeof customFormatter === 'function'
      ? customFormatter(name)
      : typeof customFormatter === 'string'
        ? customFormatter.replace(/\{name\}/g, name)
        : undefined
  const legendStyle = merge(
    {
      fontSize: legendFontSize,
      fontFamily,
      ...((theme.secondaryTextColor ?? theme.textColor)
        ? { color: theme.secondaryTextColor ?? theme.textColor }
        : {}),
      rich: {
        label: { fontSize: legendFontSize, fontFamily },
        value: {
          fontSize: legendFontSize,
          fontFamily,
          color: textStyle.color ?? theme.textColor ?? seerTheme.pie.label.color,
          align: 'right' as const,
        },
        missing: {
          fontSize: legendFontSize,
          fontFamily,
          color: theme.errorColor ?? tokens.colorErrorText,
        },
      },
    },
    textStyle,
    legend.textStyle,
  )
  const labelFont = `${legendStyle.rich.label.fontSize}px ${legendStyle.rich.label.fontFamily}`
  const valueFont = `${legendStyle.rich.value.fontSize}px ${legendStyle.rich.value.fontFamily}`
  const maxLabelWidth = Math.max(
    0,
    ...data.map(item => format.getTextRect(item.name, labelFont).width),
  )
  // Rich blocks supplied by a formatter use the same style for measurement and
  // rendering. The standard value/missing blocks share a column width.
  const valueTexts = data.flatMap(item => {
    const formatted = formatLegend(item.name)
    const blocks = formatted
      ? [...formatted.matchAll(/\{(?:value|missing)\|([^}]*)\}/g)].map(match => match[1]!)
      : []
    return [item.value === null ? missingValueLabel : String(item.value), ...blocks]
  })
  const valueWidth = Math.max(
    32,
    ...valueTexts.map(value => Math.ceil(format.getTextRect(value, valueFont).width)),
  )
  const titleStyle = merge(
    {
      fontSize: 16,
      lineHeight: 16,
      ...(theme.textColor ? { color: theme.textColor } : {}),
      fontFamily: textStyle.fontFamily ?? theme.fontFamily ?? 'sans-serif',
      rich: {
        label: {
          color: textStyle.color ?? theme.secondaryTextColor ?? seerTheme.title.subtextStyle.color,
          fontSize: 12,
          fontFamily: textStyle.fontFamily ?? theme.fontFamily ?? 'sans-serif',
        },
        value: {
          color: textStyle.color ?? theme.textColor ?? seerTheme.title.textStyle.color,
          fontSize: 16,
          fontFamily:
            textStyle.fontFamily ?? theme.numberFontFamily ?? theme.fontFamily ?? 'D-DIN-PRO',
        },
      },
    },
    textStyle,
    presentation.title?.textStyle,
  )
  if (
    presentation.title?.textStyle?.lineHeight === undefined &&
    presentation.title?.textStyle?.fontSize !== undefined
  ) {
    titleStyle.lineHeight = Number(presentation.title.textStyle.fontSize)
  }
  const subtext = presentation.title?.subtext ?? ''
  const subtextStyle = merge(
    {
      fontSize: 12,
      fontFamily: textStyle.fontFamily ?? theme.fontFamily ?? 'sans-serif',
      color: textStyle.color ?? theme.secondaryTextColor ?? seerTheme.title.subtextStyle.color,
    },
    textStyle,
    presentation.title?.subtextStyle,
  )
  const titleRect = format.getTextRect(
    text,
    `${titleStyle.fontWeight ?? 500} ${titleStyle.fontSize}px ${titleStyle.fontFamily}`,
    undefined,
    undefined,
    0,
    titleStyle.rich,
    false,
    titleStyle.lineHeight,
  )
  const subtextRect = format.getTextRect(
    subtext,
    `${subtextStyle.fontSize}px ${subtextStyle.fontFamily}`,
    undefined,
    undefined,
    0,
    subtextStyle.rich,
  )
  const titleItemGap = presentation.title?.itemGap ?? 8
  const titleHeight = !showTitle
    ? 0
    : (text
        ? presentation.title?.textStyle?.lineHeight !== undefined
          ? text.split('\n').length * titleStyle.lineHeight
          : titleRect.height || titleStyle.lineHeight
        : 0) +
      (subtext
        ? (subtextRect.height || Number(subtextStyle.fontSize)) + (text ? titleItemGap : 0)
        : 0) +
      componentPadding * 2
  const titleWidth = !showTitle
    ? 0
    : Math.max(titleRect.width, subtextRect.width) + componentPadding * 2
  const initialColumns = Math.max(1, Math.min(3, Math.ceil(data.length / 4)))
  let columns = legend.type === 'scroll' ? 1 : initialColumns
  let labelTextWidth = 0
  let columnWidth = 0
  let legendLineHeight = legendFontSize
  let resolvedLegendStyle = legendStyle
  const renderLegend = (name: string) => {
    const custom = formatLegend(name)
    if (custom !== undefined) return custom
    const item = data.find(item => item.name === name)
    const label = format.truncateText(name, labelTextWidth, labelFont, '...', {})
    return item?.value === null
      ? `{label|${label}}{missing|${missingValueLabel}}`
      : `{label|${label}}{value|${item?.value ?? ''}}`
  }
  const needsReadableLabel =
    !customFormatter || data.some(item => formatLegend(item.name)?.includes('{label|'))
  // Decide column count against the intended label width before fitting labels
  // to the budget. Only the final single-column fallback may compress it further.
  const preferredLabelWidth = Math.min(Math.ceil(maxLabelWidth) + 1, 120 * scaleX)
  const measureLegend = () => {
    const budget = Math.max(0, (size.width - summaryLeft - columnGap * (columns - 1)) / columns)
    labelTextWidth = Math.max(
      0,
      Math.min(
        Math.ceil(maxLabelWidth) + 1,
        120 * scaleX,
        budget - iconWidth - legendIconTextGap - valueWidth - 10 - 12,
      ),
    )
    resolvedLegendStyle = merge({}, legendStyle, {
      rich: {
        label: { width: labelTextWidth + 12, overflow: 'truncate' },
        value: { width: valueWidth },
        missing: { width: valueWidth },
      },
    })
    // User-specified rich widths are meaningful (e.g. a percentage column).
    resolvedLegendStyle = merge(resolvedLegendStyle, legend.textStyle)
    const rects = data.map(item =>
      format.getTextRect(
        renderLegend(item.name),
        font,
        undefined,
        undefined,
        0,
        resolvedLegendStyle.rich,
      ),
    )
    columnWidth = Math.max(0, ...rects.map(rect => rect.width)) + iconWidth + legendIconTextGap + 10
    legendLineHeight =
      legend.textStyle?.lineHeight ??
      Math.max(
        iconHeight,
        legendFontSize,
        ...Object.values(resolvedLegendStyle.rich).map(style =>
          Number(style.lineHeight ?? style.fontSize ?? legendFontSize),
        ),
      )
    return columnWidth <= budget && (!needsReadableLabel || labelTextWidth >= preferredLabelWidth)
  }
  while (!measureLegend() && columns > 1) columns--
  resolvedLegendStyle.lineHeight = legendLineHeight
  const titleLegendGap = showTitle && showLegend ? 8 * scaleY : 0
  let rowCount = columns === 1 ? data.length : Math.min(4, Math.ceil(data.length / columns))
  const needsSingleColumn =
    showLegend &&
    (legend.type === 'scroll' ||
      rowCount * legendLineHeight +
        Math.max(0, rowCount - 1) * itemGap +
        10 +
        titleHeight +
        titleLegendGap +
        (data.length > columns * rowCount ? 24 : 0) >
        size.height)
  if (needsSingleColumn) {
    columns = 1
    measureLegend()
    resolvedLegendStyle.lineHeight = legendLineHeight
    // Reserve the same 24px controls used by the multi-column legend.
    rowCount = Math.max(
      1,
      Math.min(
        data.length,
        Math.floor(
          (size.height - titleHeight - titleLegendGap - 10 - 24 + itemGap) /
            (legendLineHeight + itemGap),
        ),
      ),
    )
  }
  const paged = showLegend && data.length > columns * rowCount
  const pagerHeight = paged ? 24 : 0
  const lastRow = Math.max(0, data.length - columns * rowCount)
  const row = Math.max(0, Math.min(presentation.page?.row ?? 0, lastRow))
  const scrollBy = (rows: number) => {
    const next = Math.max(0, Math.min(row + rows, lastRow))
    if (next !== row) presentation.page?.onChange(next)
  }
  const legendHeight = !showLegend
    ? 0
    : rowCount * legendLineHeight + Math.max(0, rowCount - 1) * itemGap + 10
  const summaryHeight = titleHeight + titleLegendGap + legendHeight + pagerHeight
  const titleTop = (size.height - summaryHeight) / 2
  const layout = {
    center: [initialBackgroundRadius, size.height / 2] as [number, number],
    radius: pieConfig.radius * radiusScale,
    backgroundRadius: initialBackgroundRadius,
    zeroInnerRadius: pieConfig.zeroInnerRadius * radiusScale,
    summaryLeft,
    summaryHeight,
    titleTop,
    titleLineHeight: titleStyle.lineHeight,
    legendTop: titleTop + titleHeight + titleLegendGap,
    legendHeight,
    legendLineHeight,
    itemGap,
    rowCount,
    columnWidth,
    columnStep: columnWidth + columnGap,
    labelTextWidth,
    labelWidth: labelTextWidth + 12,
    valueWidth,
    scroll: paged,
  }
  const summaryWidth = Math.max(
    titleWidth,
    showLegend ? (Math.min(columns, data.length) - 1) * layout.columnStep + columnWidth : 0,
  )
  if (paged) {
    presentation.page?.onWheelRegion?.({
      left: layout.summaryLeft,
      top: layout.legendTop,
      width: (columns - 1) * layout.columnStep + columnWidth,
      height: legendHeight + pagerHeight,
      scrollBy,
    })
  }

  // Reserve only visible text, then fit the circle into the remaining rectangle.
  // With a legend, preserve the original Basic proportions. Without one,
  // use the freed space. Explicit radii remain a size request.
  const availableDiameter = Math.max(
    0,
    Math.min(
      size.height,
      size.width - (summaryWidth ? summaryWidth + pieConfig.legendGap - componentPadding : 0),
    ),
  )
  // The legend already reserves its gap. Apply the standalone inset only when
  // there is no legend, otherwise a fitting halo can shrink on wider fonts.
  const maxBackgroundRadius = Math.max(
    0,
    availableDiameter / 2 -
      (presentation.radius === undefined && !showLegend
        ? Math.max(0, 8 - Math.max(0, hoverGrowth - haloWidth))
        : 0),
  )
  const requested =
    presentation.radius === undefined
      ? undefined
      : (Array.isArray(presentation.radius) ? presentation.radius : [0, presentation.radius]).map(
          resolveRadius,
        )
  const requestedOuter =
    requested && Number.isFinite(requested[1]) ? Math.max(0, requested[1]!) : undefined
  const mainRadius =
    requestedOuter === undefined
      ? showLegend
        ? Math.min(layout.radius, Math.max(0, maxBackgroundRadius - outerSpace))
        : Math.max(
            0,
            maxBackgroundRadius -
              Math.max(hoverGrowth, Math.min(haloWidth, maxBackgroundRadius * 0.15)),
          )
      : Math.min(
          requestedOuter,
          showLegend ? layout.radius : maxBackgroundRadius,
          Math.max(0, maxBackgroundRadius - hoverGrowth),
        )
  const backgroundRadius =
    requestedOuter === undefined && !showLegend
      ? maxBackgroundRadius
      : Math.min(mainRadius + haloWidth, maxBackgroundRadius)
  const footprintRadius = Math.max(backgroundRadius, mainRadius + hoverGrowth)
  layout.summaryLeft += 2 * (footprintRadius - layout.backgroundRadius)
  layout.center[0] = footprintRadius
  layout.radius = mainRadius
  layout.backgroundRadius = backgroundRadius
  layout.zeroInnerRadius = (mainRadius * pieConfig.zeroInnerRadius) / pieConfig.radius
  // The default rose hole is 32px; explicit radii retain caller-owned geometry.
  const radius: [number, number] = [
    requestedOuter && requested
      ? (Math.max(0, Math.min(requested[0] ?? 0, requestedOuter)) / requestedOuter) * mainRadius
      : presentation.roseType && presentation.radius === undefined
        ? Math.min(16, mainRadius)
        : 0,
    mainRadius,
  ]

  if (align) {
    // Align the block; end places the summary first and the pie last. Keep
    // legend columns/text in reading order. Overflow stays at the start edge.
    const [vertical, horizontal] = align === 'center' ? ['center', 'center'] : align.split('-')
    const verticalFactors: Record<string, number> = { top: 0, center: 0.5, bottom: 1 }
    const horizontalFactors: Record<string, number> = { start: 0, center: 0.5, end: 1 }
    const xFactor = horizontalFactors[horizontal!]
    const yFactor = verticalFactors[vertical!]
    if (xFactor !== undefined && yFactor !== undefined) {
      const blockRight = Math.max(
        layout.center[0] + footprintRadius,
        summaryWidth ? layout.summaryLeft + summaryWidth : 0,
      )
      if (horizontal === 'end') {
        layout.center[0] = blockRight - layout.center[0]
        layout.summaryLeft = blockRight - layout.summaryLeft - summaryWidth
      }
      const blockTop = Math.min(
        layout.center[1] - footprintRadius,
        layout.summaryHeight ? layout.titleTop : Infinity,
      )
      const blockBottom = Math.max(
        layout.center[1] + footprintRadius,
        layout.summaryHeight ? layout.titleTop + layout.summaryHeight : 0,
      )
      const dx = Math.max(0, size.width - blockRight) * xFactor
      const dy = Math.max(0, size.height - (blockBottom - blockTop)) * yFactor - blockTop
      layout.center[0] += dx
      layout.center[1] += dy
      layout.summaryLeft += dx
      layout.titleTop += dy
      layout.legendTop += dy
    }
  }

  const formatItemTooltip = createPlotTooltipFormatter(
    (name: string) => {
      const item = data.find(item => item.name === name)
      if (!item) return

      const missing = item.value === null
      return {
        title: item.name,
        rows: [
          {
            name: seriesName,
            value: missing ? missingValueLabel : String(item.value),
            color: item.markerColor,
          },
        ],
        notes: missing ? [item.missingReason] : undefined,
      }
    },
    { notesColor: tokens.colorTextInfo },
  )

  const isRing = radius[0] > 0 && !presentation.roseType
  const centerLabel = presentation.label?.position === 'center' && presentation.label.show !== false
  const firstItem = data[0]
  const centerFormatter = presentation.label?.formatter
  const centerText = !centerLabel
    ? ''
    : typeof centerFormatter === 'function'
      ? centerFormatter({
          componentType: 'series',
          componentSubType: 'pie',
          componentIndex: 2,
          seriesType: 'pie',
          seriesIndex: 2,
          seriesName,
          name: firstItem?.name ?? '',
          dataIndex: 0,
          data: firstItem,
          value: firstItem?.value ?? 0,
          color: firstItem?.markerColor,
          $vars: ['seriesName', 'name', 'value'],
        })
      : (centerFormatter ?? seriesName)
          .replace(/\{a\}/g, seriesName)
          .replace(/\{b\}/g, firstItem?.name ?? '')
          .replace(/\{c\}/g, String(firstItem?.value ?? 0))
  const labelStyle = presentation.label ?? {}
  const option: PieChartProps = {
    tooltip: {
      trigger: 'item',
      formatter: params => {
        const item = Array.isArray(params) ? params[0] : params
        if (!item) return ''
        return formatItemTooltip(item.name)
      },
    },
    title: mergePlotOptions<TitleComponentOption>(presentation.title, {
      show: showTitle,
      left: layout.summaryLeft,
      top: layout.titleTop,
      padding: componentPadding,
      text,
      subtext,
      itemGap: titleItemGap,
      textStyle: titleStyle,
      subtextStyle,
    }),
    legend: Array.from({ length: 3 }, (_, column) => {
      const last = column === columns - 1
      const scroll = paged && last
      const start = column * rowCount
      return mergePlotOptions<LegendComponentOption>(legend, {
        id: `ix-pie-legend-${column}`,
        show: showLegend && column < columns,
        type: scroll ? 'scroll' : 'plain',
        orient: 'vertical',
        selectedMode: legend.selectedMode ?? true,
        inactiveBorderWidth: 0,
        tooltip: merge(
          {
            show: true,
            confine: true,
            formatter: (params: { name: string }) => formatItemTooltip(params.name),
          },
          legend.tooltip,
        ),
        left: layout.summaryLeft + column * layout.columnStep,
        top: layout.legendTop,
        padding: componentPadding,
        right: 'auto',
        bottom: 'auto',
        height: scroll ? layout.legendHeight - 10 + 24 : 'auto',
        pageFormatter: () => '',
        ...(paged && last ? { scrollDataIndex: row } : {}),
        pageButtonGap: 0,
        pageTextStyle: { fontSize: 24, color: 'transparent' },
        pageIconSize: 0,
        pageButtonItemGap: 8,
        icon: legend.icon ?? 'roundRect',
        itemWidth: iconWidth,
        itemHeight: iconHeight,
        itemGap,
        data: (column >= columns ? [] : data.slice(start, last ? undefined : start + rowCount)).map(
          item => ({
            name: item.name,
            itemStyle: { color: item.markerColor, borderWidth: 0 },
          }),
        ),
        formatter: renderLegend,
        textStyle: resolvedLegendStyle,
      })
    }),
    graphic: [
      {
        id: 'ix-pie-dashes',
        type: 'circle',
        silent: true,
        invisible: !isRing,
        z: 1,
        shape: { cx: layout.center[0], cy: layout.center[1], r: layout.radius * 0.78 },
        style: {
          fill: 'transparent',
          stroke: getAlphaColor(decorationColor, 0.35),
          lineWidth: 1,
          lineDash: [2, 2],
        },
      },
      {
        id: 'ix-pie-inner',
        type: 'circle',
        silent: true,
        invisible: !isRing,
        z: 1,
        shape: { cx: layout.center[0], cy: layout.center[1], r: layout.radius * 0.65 },
        style: {
          fill: {
            type: 'linear',
            x: 0,
            y: 0,
            x2: 0,
            y2: 1,
            colorStops: [
              { offset: 0, color: getAlphaColor(decorationColor, 0.1) },
              { offset: 1, color: getAlphaColor(decorationColor, 0) },
            ],
          },
          stroke: getAlphaColor(decorationColor, 0.16),
          lineWidth: 1,
        },
      },
      {
        id: 'ix-pie-center-label',
        type: 'text',
        silent: true,
        invisible: !centerLabel,
        z: 3,
        x: layout.center[0],
        y: layout.center[1],
        style: {
          text: centerText,
          align: 'center',
          verticalAlign: 'middle',
          fill:
            labelStyle.color ??
            textStyle.color ??
            theme.textColor ??
            seerTheme.title.textStyle.color,
          fontFamily:
            labelStyle.fontFamily ?? textStyle.fontFamily ?? theme.fontFamily ?? 'sans-serif',
          fontSize: labelStyle.fontSize ?? textStyle.fontSize ?? 12,
          fontWeight: labelStyle.fontWeight ?? textStyle.fontWeight,
          lineHeight: labelStyle.lineHeight ?? textStyle.lineHeight,
          rich: Object.fromEntries(
            Object.entries(labelStyle.rich ?? {}).map(([key, style]) => [
              key,
              { ...style, fill: style.color },
            ]),
          ),
        },
      },
      ...[false, true].map((next, index) => {
        const enabled = next ? row < lastRow : row > 0
        return {
          id: `ix-pie-pager-${index}`,
          type: 'group' as const,
          ignore: !paged,
          silent: !enabled,
          x:
            layout.summaryLeft +
            (columns - 1) * layout.columnStep +
            columnWidth -
            5 -
            52 +
            index * 28,
          y: layout.legendTop + layout.legendHeight,
          z: 10,
          onclick: () => scrollBy(next ? rowCount : -rowCount),
          children: [
            {
              type: 'rect' as const,
              z: 10,
              shape: { x: 0, y: 0, width: 24, height: 24 },
              style: { fill: 'transparent' },
            },
            {
              type: 'image' as const,
              z: 11,
              style: {
                image: `data:image/svg+xml,${encodeURIComponent(`<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 1024 1024"><path fill="${enabled ? (theme.secondaryTextColor ?? tokens.colorTextInfo) : (theme.mutedColor ?? tokens.colorInfoContainerBgDisabled)}" d="${pageIcons[index]!.slice(7)}"/></svg>`)}`,
                x: 4,
                y: 4,
                width: 16,
                height: 16,
              },
            },
          ],
        }
      }),
      {
        id: 'ix-rose-center',
        type: 'circle',
        silent: true,
        z: 1,
        invisible: !presentation.roseType || radius[0] <= 2,
        // Keep a 2px transparent gap and include half the 1px stroke in the 28px diameter.
        shape: { cx: layout.center[0], cy: layout.center[1], r: Math.max(0, radius[0] - 2.5) },
        style: {
          fill: {
            type: 'linear',
            x: 0,
            y: 0,
            x2: 0,
            y2: 1,
            colorStops: [
              { offset: 0, color: getAlphaColor(decorationColor, 0.1) },
              { offset: 1, color: getAlphaColor(decorationColor, 0) },
            ],
          },
          stroke: {
            type: 'linear',
            x: 0,
            y: 0,
            x2: 0,
            y2: 1,
            colorStops: [
              { offset: 0, color: getAlphaColor(decorationColor, 0.16) },
              { offset: 1, color: getAlphaColor(decorationColor, 0) },
            ],
          },
          lineWidth: 1,
        },
      },
    ],
    series: [
      {
        type: 'pie',
        center: layout.center,
        label: { show: false },
        radius: presentation.roseType ? radius[0] : layout.backgroundRadius,
        id: 'ix-pie-background',
        z: 0,
        silent: true,
        animation: false,
        tooltip: { show: false },
        emphasis: { disabled: true },
        labelLine: { show: false },
        data: [{ value: 1, name: '' }],
        itemStyle: {
          borderWidth: 0,
          color: presentation.roseType
            ? 'transparent'
            : {
                type: 'linear',
                x: 0,
                y: 0,
                x2: 0,
                y2: 1,
                colorStops: [
                  { offset: 0, color: getAlphaColor(decorationColor, 0.08) },
                  { offset: 1, color: getAlphaColor(decorationColor, 0) },
                ],
              },
        },
      },
      {
        type: 'pie',
        center: layout.center,
        label: { show: false },
        name: '',
        radius: radius[0] > 0 ? radius : [layout.zeroInnerRadius, layout.radius],
        id: 'ix-pie-zero',
        z: 1,
        silent: true,
        animation: false,
        stillShowZeroSum: false,
        tooltip: { show: false },
        emphasis: { disabled: true },
        data: [{ value: isAllZero ? 1 : 0, name: '' }],
        itemStyle: {
          color: theme.mutedColor ?? tokens.colorInfoContainerBgDisabled,
          borderWidth: 0,
        },
      },
      {
        type: 'pie',
        center: layout.center,
        label: { show: false },
        name: seriesName,
        ...(presentation.label?.position !== 'center' && presentation.label !== undefined
          ? { label: presentation.label }
          : {}),
        markArea: presentation.markArea,
        radius:
          presentation.radius === undefined && !presentation.roseType ? layout.radius : radius,
        // ECharts merges options; null clears a previously selected rose shape.
        roseType: presentation.roseType ?? (null as unknown as PieSeriesOption['roseType']),
        clockwise: presentation.clockwise ?? true,
        // Reset omitted emphasis fields when ECharts merges reactive updates.
        emphasis: { scale: true, scaleSize: 5, disabled: false },
        id: 'ix-pie-data',
        z: 2,
        stillShowZeroSum: false,
        data: data.map(item => ({
          ...item,
          name: item.name,
          value: item.value ?? 0,
          itemStyle: { ...item.itemStyle, color: item.color },
          tooltip: { show: item.value !== null },
        })),
        itemStyle: { borderWidth: isAllZero ? 0 : 1.5 },
      },
    ],
  }
  const main = (option.series as PieSeriesOption[]).find(series => series.id === 'ix-pie-data')!
  // Only documented presentation keys are copied, even from untyped JS callers.
  const style = presentation.seriesStyle
  if (style) {
    for (const key of [
      'itemStyle',
      'labelLine',
      'emphasis',
      'blur',
      'select',
      'selectedMode',
    ] as const) {
      if (style[key] !== undefined) {
        Object.assign(main, {
          [key]:
            typeof style[key] === 'object'
              ? mergePlotOptions<object>(main[key] as object | undefined, style[key])
              : style[key],
        })
      }
    }
  }
  return option
}
