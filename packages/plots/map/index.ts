import { MapChart, ScatterChart, LinesChart } from 'echarts/charts'
import { GeoComponent, VisualMapComponent } from 'echarts/components'
import { use, registerMap as registerEChartsMap } from 'echarts/core'
import { createInstall, type InstallableChart } from '@idux/charts-core'
import Map from './src/Map'
// Registration must also work before the Vue plugin is installed.
export const IxMapChart: InstallableChart<typeof Map> = createInstall(Map, [
  MapChart,
  ScatterChart,
  LinesChart,
  GeoComponent,
  VisualMapComponent,
])
/** Register geometry even when a bundler only retains this helper. */
export function registerMap(...args: Parameters<typeof registerEChartsMap>) {
  use([GeoComponent])
  return registerEChartsMap(...args)
}
export {
  createMapOption,
  defaultMapPieces,
  createMapPieces,
  getMapPieceColor,
  createMapNodes,
  createMapLines,
  createMapRegions,
  createMapVisualMap,
} from './src/createMapOption'
export { validateMapData } from './src/mapValidation'
export { createMapTransition } from './src/mapTransition'
export type {
  MapTransition,
  MapTransitionDirection,
  MapTransitionOptions,
} from './src/mapTransition'
export type {
  MapChartProps,
  MapChartPublicProps,
  MapCoordinate,
  MapPiece,
  MapThreshold,
  MapMetric,
  MapRegionItem,
  MapNodeItem,
  MapRouteItem,
  MapNodeOptions,
  MapLineOptions,
  MapRegionOptions,
  MapVisualMapOptions,
  MapTooltipOptions,
  MapDataInput,
  MapDataIssue,
} from './src/createMapOption'
export { PLOT_THEME_TOKEN, type PlotTheme, type PlotTextStyle } from '../shared/plotTheme'
