import type {
  BarSeriesOption,
  LineSeriesOption,
  PieSeriesOption,
  RadarSeriesOption,
  GaugeSeriesOption,
  CustomSeriesOption,
} from 'echarts/charts'
import type {
  RadarComponentOption,
  GraphicComponentOption,
  DatasetComponentOption,
  DataZoomComponentOption,
  GridComponentOption,
  LegendComponentOption,
  TitleComponentOption,
  TooltipComponentOption,
} from 'echarts/components'
import type { ComposeOption, EChartsType, init, SetOptionOpts } from 'echarts/core'
export type ChartInitParameters = Parameters<typeof init>
export type ChartTheme = NonNullable<ChartInitParameters[1]>
export type ChartInitOption = NonNullable<ChartInitParameters[2]>

/** Retain declared properties and their modifiers without broad index signatures. */
export type KnownProps<Props> = {
  [Key in keyof Props as string extends Key ? never : number extends Key ? never : Key]: Props[Key]
}

export interface AdditionalChartOption<T extends EChartsType = EChartsType> {
  /**
   * Whether to resize when the container changes size.
   */
  autoResize?: boolean
  /**
   * Group ID for linked charts.
   */
  group?: string
  /**
   * Options passed to ECharts init.
   */
  initOption?: ChartInitOption
  /**
   * Show a loading overlay. Pass an object to customize the overlay, including its text.
   */
  loading?: boolean | object
  /**
   * Options passed as the second argument to ECharts setOption.
   */
  setOptionOpts?: SetOptionOpts
  /**
   * Theme name or object passed to ECharts init.
   */
  theme?: ChartTheme
  /**
   * Called when the chart instance is initialized.
   */
  onReady?: (chart: T) => void

  [key: string]: any
}

interface ComponentOption {
  mainType?: string
  type?: string
  id?: string | number
  name?: string | number
  z?: number
  zlevel?: number
}

// Only capabilities shared by all plots belong in the base option. Plot-specific
// coordinate systems (for example Radar) are supplied through the type parameter.
type CommonComponentOption =
  | GraphicComponentOption
  | DatasetComponentOption
  | DataZoomComponentOption
  | GridComponentOption
  | LegendComponentOption
  | TitleComponentOption
  | TooltipComponentOption

export type BaseChartOption<T extends ComponentOption> = ComposeOption<CommonComponentOption | T>

export type ChartOption = BaseChartOption<
  | RadarComponentOption
  | RadarSeriesOption
  | GaugeSeriesOption
  | CustomSeriesOption
  | BarSeriesOption
  | PieSeriesOption
  | LineSeriesOption
>

export interface ChartProps extends ChartOption, AdditionalChartOption {}

/** Named caller-facing props for component declarations; defaults are not resolved. */
export type ChartPublicProps = KnownProps<ChartProps>
