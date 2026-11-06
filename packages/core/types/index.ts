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
   * 是否开启自动 resize
   */
  autoResize?: boolean
  /**
   * 图表的分组
   */
  group?: string
  /**
   * 图表用于初始化的配置
   */
  initOption?: ChartInitOption
  /**
   * 是否显示加载中状态
   */
  loading?: boolean | object
  /**
   * 图表实例 setOption 的第二个参数
   */
  setOptionOpts?: SetOptionOpts
  /**
   * 图表的主题
   */
  theme?: ChartTheme
  /**
   * 图表渲染完成执行回调
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
