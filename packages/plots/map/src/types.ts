import type { EChartsOption } from 'echarts'
import type { ScatterSeriesOption, LinesSeriesOption } from 'echarts/charts'
import type { GeoComponentOption, VisualMapComponentOption } from 'echarts/components'
import type { AdditionalChartOption, KnownProps } from '@idux/charts-core'
import type { PlotTheme } from '../../shared/plotTheme'

export type MapCoordinate = [number, number]
/** Lower threshold: value > threshold, up to and including the next higher threshold. */
export interface MapThreshold {
  value: number
  color: string
}
export interface MapPiece {
  min?: number
  max?: number
  gt?: number
  gte?: number
  lt?: number
  lte?: number
  value?: number
  label: string
  color: string
}
export type MapOption = EChartsOption
export interface MapChartProps extends MapOption, AdditionalChartOption {
  plotTheme?: PlotTheme
}
export type MapChartPublicProps = KnownProps<MapChartProps>

export interface MapMetric {
  name: string
  value: number | string | null
  unit?: string
}
export interface MapRegionItem {
  /** Geometry key, after geo.nameMap has been applied. */
  region: string
  /** Display name; independent of geometry matching. */
  name?: string
  value?: number | null
  color?: string
  metrics?: MapMetric[]
}
export interface MapNodeItem {
  /** Unique within the nodes supplied to a generator. Names are display labels. */
  id: string
  name: string
  coordinate: MapCoordinate
  value?: number | null
  color?: string
  symbol?: 'circle' | 'pin'
  metrics?: MapMetric[]
}
interface MapRouteBase {
  id?: string
  name?: string
  value?: number | null
  color?: string
  metrics?: MapMetric[]
}
/** Reference nodes, or supply standalone endpoints. The two forms cannot be mixed. */
export type MapRouteItem = MapRouteBase &
  (
    | { source: string; target: string; coords?: never; from?: never; to?: never }
    | {
        coords: [MapCoordinate, MapCoordinate]
        from: string
        to: string
        source?: never
        target?: never
      }
  )
export interface MapDataInput {
  nodes?: readonly MapNodeItem[]
  routes?: readonly MapRouteItem[]
  regions?: readonly MapRegionItem[]
}
export interface MapDataIssue {
  kind: 'node' | 'route' | 'region'
  /** Zero-based index in the corresponding input array. */
  index: number
  id?: string
  code: 'duplicate-id' | 'invalid-coordinate' | 'missing-node'
  /** Referenced node ID, present for missing-node issues. */
  nodeId?: string
}
/** Pure generator options; plotTheme is explicit outside the component. */
export interface MapTooltipOptions {
  metricName?: string
  unit?: string
  plotTheme?: PlotTheme
}
export interface MapNodeOptions
  extends Omit<ScatterSeriesOption, 'type' | 'data'>, MapTooltipOptions {}
export interface MapLineOptions
  extends Omit<LinesSeriesOption, 'type' | 'data'>, MapTooltipOptions {
  /** All referenced nodes, including nodes drawn by other series. */
  nodes?: readonly MapNodeItem[]
  /** Shorthand for effect.show; explicit effect.show takes precedence. */
  animated?: boolean
  /** Fade from source toward destination. Defaults to true. */
  gradient?: boolean
  /** Auto bows both directions upward; fixed preserves signed curveness. */
  curveDirection?: 'auto' | 'fixed'
}
export type MapRegionOptions = Omit<NonNullable<GeoComponentOption['regions']>[number], 'name'> &
  MapTooltipOptions & {
    /** Explicit classification; omitted means item colors or the base fill. */
    pieces?: readonly MapPiece[]
  }
export type MapVisualMapOptions = Omit<VisualMapComponentOption, 'pieces'> & {
  plotTheme?: PlotTheme
}
