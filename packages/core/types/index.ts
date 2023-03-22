import type { BarSeriesOption, LineSeriesOption, PieSeriesOption } from 'echarts/charts'
import type {
  LegendComponentOption,
  TitleComponentOption,
  TooltipComponentOption,
} from 'echarts/components'
import type { ComposeOption, EChartsType, init, SetOptionOpts } from 'echarts/core'

export type ChartInitParameters = Parameters<typeof init>
export type ChartTheme = NonNullable<ChartInitParameters[1]>
export type ChartInitOption = NonNullable<ChartInitParameters[2]>

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

export type BaseChartOption<T extends ComponentOption> = ComposeOption<
  LegendComponentOption | TitleComponentOption | TooltipComponentOption | T
>

export type ChartOption = ComposeOption<
  | BarSeriesOption
  | PieSeriesOption
  | LineSeriesOption
  | LegendComponentOption
  | TitleComponentOption
  | TooltipComponentOption
>
