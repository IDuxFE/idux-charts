import type { GraphSeriesOption } from 'echarts/charts'
import type { EChartsOption } from 'echarts'
import type {
  AdditionalChartOption,
  BaseChartOption,
  ChartPublicProps,
  KnownProps,
} from '@idux/charts-core'
import type { PlotTheme } from '../../shared/plotTheme'

export const wordCloudSeriesProps = [
  'id',
  'name',
  'label',
  'itemStyle',
  'symbolSize',
  'categories',
  'emphasis',
  'blur',
  'select',
  'selectedMode',
  'labelLayout',
  'silent',
  'cursor',
  'legendHoverLink',
  'left',
  'right',
  'top',
  'bottom',
  'width',
  'height',
  'z',
  'zlevel',
] as const

export const wordCloudProps = [
  ...wordCloudSeriesProps,
  'data',
  'shape',
  'sizeRange',
  'gap',
  'overlap',
  'plotTheme',
  'motion',
] as const

type NativeNode = Extract<NonNullable<GraphSeriesOption['data']>[number], { name?: unknown }>
export type WordCloudShape = 'text' | 'rect' | 'circle'
export interface WordCloudMotion {
  /** Maximum displacement from the layout position, in pixels, in [0, 20]. Defaults to 12. */
  amplitude?: number
  /** Relative horizontal/vertical amplitudes, normalized within amplitude. Defaults to [1, 1]. */
  amplitudeRatio?: [number, number]
  /** Base cycle duration in milliseconds. Each word has a stable variation. Defaults to 6000. */
  duration?: number
  /** Pause all words while the pointer hits a word or its background. Defaults to true. */
  pauseOnHover?: boolean
}
export interface WordCloudChartDataItem extends Pick<
  NativeNode,
  | 'id'
  | 'category'
  | 'symbolSize'
  | 'itemStyle'
  | 'label'
  | 'emphasis'
  | 'blur'
  | 'select'
  | 'cursor'
> {
  name: string
  value: number
  /** Native ECharts initial item selection (missing from graph's upstream declaration). */
  selected?: boolean
}
export interface WordCloudChartProps
  extends
    Omit<KnownProps<BaseChartOption<GraphSeriesOption>>, 'dataset' | 'grid' | 'dataZoom' | 'title'>,
    AdditionalChartOption,
    Pick<ChartPublicProps, 'title'>,
    Pick<GraphSeriesOption, (typeof wordCloudSeriesProps)[number]>,
    Pick<
      EChartsOption,
      | 'color'
      | 'animation'
      | 'animationThreshold'
      | 'animationDuration'
      | 'animationEasing'
      | 'animationDelay'
      | 'animationDurationUpdate'
      | 'animationEasingUpdate'
      | 'animationDelayUpdate'
    > {
  data?: WordCloudChartDataItem[]
  shape?: WordCloudShape
  sizeRange?: [number, number]
  /** Minimum separation in pixels. Rect defaults to 8 and clamps smaller values to 8. */
  gap?: number
  /** Rect background area fraction, 0–0.3. Intersections must be >=6px on both axes; each tag may overlap at most two others. Backgrounds may cover labels. */
  overlap?: number
  plotTheme?: PlotTheme
  /** Continuous floating, independent of native entry/update transitions. Defaults to false. */
  motion?: boolean | WordCloudMotion
}
export type WordCloudChartPublicProps = KnownProps<WordCloudChartProps>
export type WordCloudLabel = NonNullable<GraphSeriesOption['label']>

/** Only generated series carry these settings; ordinary graph series are untouched. */
export interface WordCloudSettings {
  shape: WordCloudShape
  sizeRange: [number, number]
  gap: number
  overlap: number
  min: number
  max: number
  motion?: Required<WordCloudMotion>
  rows: {
    valid: boolean
    label: WordCloudLabel
    emphasisLabel?: WordCloudLabel
    explicitSize: boolean
  }[]
}
export type WordCloudSeries = GraphSeriesOption & { __ixWordCloud?: WordCloudSettings }
