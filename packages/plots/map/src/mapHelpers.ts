import type { ScatterSeriesOption, LinesSeriesOption } from 'echarts/charts'
import type { GeoComponentOption, VisualMapComponentOption } from 'echarts/components'
import { mergePlotOptions } from '../../shared/plotOptions'
import { createPlotTooltipFormatter, type PlotTooltipParams } from '../../shared/plotTooltip'
import { matchesMapPiece, densityLabelColor, hoverColor, pinSymbol, lineGradient } from './mapStyle'
import { validMapCoordinate, resolveMapRoute } from './mapValidation'
import type {
  MapMetric,
  MapNodeItem,
  MapRouteItem,
  MapRegionItem,
  MapPiece,
  MapNodeOptions,
  MapLineOptions,
  MapRegionOptions,
  MapVisualMapOptions,
  MapTooltipOptions,
} from './types'

const finite = (value: unknown): value is number =>
  typeof value === 'number' && Number.isFinite(value)
interface MapTooltipDatum {
  name: string
  metrics?: MapMetric[]
  mapValue?: number | null
}
function tooltipFormatter(options: MapTooltipOptions, useDatumTitle = false) {
  return createPlotTooltipFormatter((params: PlotTooltipParams) => {
    const param = Array.isArray(params) ? params[0] : params
    const datum = param?.data as MapTooltipDatum | undefined
    if (!datum) return
    const color = options.plotTheme?.color ?? '#4089FF'
    return {
      title: options.metricName ?? (useDatumTitle ? datum.name : ''),
      rows: datum.metrics?.length
        ? datum.metrics.map(metric => ({
            name: metric.name,
            value:
              metric.value === null || (typeof metric.value === 'number' && !finite(metric.value))
                ? '-'
                : `${metric.value}${metric.unit ? ' ' + metric.unit : ''}`,
            color,
          }))
        : [
            {
              name: datum.name,
              value: finite(datum.mapValue)
                ? `${datum.mapValue}${options.unit ? ' ' + options.unit : ''}`
                : '-',
              color,
            },
          ],
    }
  })
}
function indexNodes(data: readonly MapNodeItem[]) {
  const nodes = new Map<string, MapNodeItem>()
  for (const node of data) {
    if (nodes.has(node.id)) throw new Error(`Duplicate map node id: ${node.id}`)
    nodes.set(node.id, node)
  }
  return nodes
}

/** Return an ordinary scatter series. Native options override the visual defaults. */
export function createMapNodes(
  data: readonly MapNodeItem[],
  options: MapNodeOptions = {},
): ScatterSeriesOption {
  indexNodes(data)
  const { metricName, unit, plotTheme: theme = {}, ...native } = options
  const blue = theme.color ?? '#4089FF'
  const series = mergePlotOptions<ScatterSeriesOption>(
    {
      type: 'scatter',
      coordinateSystem: 'geo',
      geoIndex: 0,
      z: 4,
      symbol: 'circle',
      symbolSize: options.symbol === 'pin' ? 28 : 12,
      label: {
        show: true,
        position: 'bottom',
        distance: 8,
        formatter: '{b}',
        color: theme.secondaryTextColor ?? '#6F7785',
        fontSize: 12,
        fontWeight: 'normal',
        lineHeight: 20,
        backgroundColor: theme.mapLabelBackgroundColor ?? '#FFFFFF',
        padding: [4, 8],
        borderRadius: 12,
      },
      itemStyle: {
        color: blue,
        borderColor: theme.mapBorderColor ?? '#FFFFFF',
        borderWidth: 1,
        opacity: 1,
      },
      emphasis: { scale: false },
      tooltip: { formatter: tooltipFormatter(options) },
    },
    native,
  )
  series.data = data
    .filter(item => validMapCoordinate(item.coordinate))
    .map(item => {
      const symbol = item.symbol ?? series.symbol
      const fill =
        item.color ?? (typeof series.itemStyle?.color === 'string' ? series.itemStyle.color : blue)
      return {
        id: item.id,
        name: item.name,
        metrics: item.metrics,
        mapValue: item.value,
        value: [...item.coordinate, finite(item.value) ? item.value : '-'],
        ...(symbol === 'pin'
          ? {
              symbol:
                !item.color && typeof series.itemStyle?.color === 'function'
                  ? 'pin'
                  : pinSymbol(fill, series.itemStyle?.borderWidth !== 0),
              symbolOffset: [0, '-50%'],
              ...(options.symbolSize === undefined ? { symbolSize: 28 } : {}),
            }
          : item.symbol
            ? {
                symbol: item.symbol,
                ...(options.symbolSize === undefined ? { symbolSize: 12 } : {}),
              }
            : {}),
        ...(item.color ? { itemStyle: { color: fill } } : {}),
      }
    })
  return series
}

/** Resolve endpoint references and return an ordinary lines series. */
export function createMapLines(
  data: readonly MapRouteItem[],
  options: MapLineOptions = {},
): LinesSeriesOption {
  const {
    nodes: nodeData = [],
    animated = false,
    gradient = true,
    curveDirection = 'auto',
    metricName,
    unit,
    plotTheme: theme = {},
    ...native
  } = options
  const nodes = indexNodes(nodeData)
  const blue = theme.color ?? '#4089FF'
  const series = mergePlotOptions<LinesSeriesOption>(
    {
      type: 'lines',
      coordinateSystem: 'geo',
      geoIndex: 0,
      z: 3,
      lineStyle: { color: blue, width: 1, opacity: 1, type: [3, 2], curveness: 0.2 },
      stateAnimation: { duration: 80, easing: 'cubicOut' },
      effect: {
        show: animated,
        period: 5,
        trailLength: 0.15,
        symbolSize: 4,
        color: typeof native.lineStyle?.color === 'string' ? native.lineStyle.color : blue,
      },
      emphasis: { lineStyle: { width: 2, type: [6, 4] } },
      tooltip: { formatter: tooltipFormatter(options, true) },
    },
    native,
  )
  series.data = data.flatMap(item => {
    const source = item.source !== undefined ? nodes.get(item.source) : undefined
    const target = item.target !== undefined ? nodes.get(item.target) : undefined
    const coords = resolveMapRoute(item, nodes)
    if (!coords) return []
    const fill = item.color ?? series.lineStyle?.color ?? blue
    const curveness = series.lineStyle?.curveness ?? 0.2
    return [
      {
        id: item.id,
        name: item.name ?? `${source?.name ?? item.from} – ${target?.name ?? item.to}`,
        coords,
        value: finite(item.value) ? item.value : undefined,
        mapValue: item.value,
        metrics: item.metrics,
        lineStyle: {
          ...(typeof fill === 'function'
            ? {}
            : {
                color:
                  gradient && typeof fill === 'string'
                    ? lineGradient([coords[0]!, coords[1]!], fill)
                    : fill,
              }),
          curveness:
            curveDirection === 'fixed'
              ? curveness
              : Math.abs(curveness) * (coords[1]![0] < coords[0]![0] ? -1 : 1),
        },
        ...(item.color
          ? { effect: { color: item.color }, emphasis: { lineStyle: { color: item.color } } }
          : {}),
      },
    ]
  })
  return series
}

/** Resolve a value using the same pieces as regions and the native legend. */
export function getMapPieceColor(
  value: number | null | undefined,
  pieces: readonly MapPiece[],
  fallback = '#F0F3F7',
): string {
  return (
    (finite(value) ? pieces.find(piece => matchesMapPiece(value, piece))?.color : undefined) ??
    fallback
  )
}

/** Return geo.regions entries. Display names do not change geometry matching keys. */
export function createMapRegions(
  data: readonly MapRegionItem[],
  options: MapRegionOptions = {},
): NonNullable<GeoComponentOption['regions']> {
  const { pieces, metricName, unit, plotTheme: theme = {}, ...native } = options
  const names = new Set<string>()
  const areaColor = theme.mapAreaColor ?? theme.mutedColor ?? '#CDD9E7'
  const emptyColor = theme.mapEmptyColor ?? '#F0F3F7'
  const formatTooltip = tooltipFormatter(options)
  return data.map(item => {
    if (names.has(item.region)) throw new Error(`Duplicate map region: ${item.region}`)
    names.add(item.region)
    const fill = pieces
      ? getMapPieceColor(item.value, pieces, emptyColor)
      : (item.color ??
        (typeof options.itemStyle?.areaColor === 'string'
          ? options.itemStyle.areaColor
          : areaColor))
    const datum = { name: item.name ?? item.region, mapValue: item.value, metrics: item.metrics }
    return mergePlotOptions<NonNullable<GeoComponentOption['regions']>[number]>(
      {
        name: item.region,
        label: {
          show: true,
          color: densityLabelColor(fill, theme.color ?? '#4089FF'),
          fontSize: 10,
        },
        itemStyle: { areaColor: fill },
        emphasis: {
          label: { show: options.label?.show ?? true },
          itemStyle: { areaColor: hoverColor(fill) },
        },
        tooltip: {
          formatter: () => formatTooltip({ data: datum } as unknown as PlotTooltipParams),
        },
      },
      native,
      pieces || item.color ? { itemStyle: { areaColor: fill } } : {},
    )
  })
}

/** Return a native, non-interactive piecewise legend for manually colored geo.regions. */
export function createMapVisualMap(
  pieces: readonly MapPiece[],
  options: MapVisualMapOptions = {},
): VisualMapComponentOption {
  const { plotTheme: theme = {}, ...native } = options
  return mergePlotOptions<VisualMapComponentOption>(
    {
      type: 'piecewise',
      seriesIndex: [],
      pieces: [...pieces],
      selectedMode: false,
      left: 16,
      bottom: 16,
      itemSymbol: 'roundRect',
      itemWidth: 12,
      itemHeight: 12,
      itemGap: 10,
      padding: 12,
      backgroundColor: theme.mapLabelBackgroundColor ?? '#FFFFFF',
      borderColor: theme.borderColor ?? '#E1E5EB',
      borderWidth: 1,
      textStyle: { color: theme.secondaryTextColor ?? '#6F7785' },
    },
    native,
  )
}
