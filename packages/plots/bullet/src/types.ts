import type { BarSeriesOption, CustomSeriesOption } from 'echarts/charts'
import type { EChartsOption } from 'echarts'
import type { AdditionalChartOption, BaseChartOption, KnownProps } from '@idux/charts-core'
import type { PlotTheme } from '../../shared/plotTheme'

export const bulletSeriesProps = [
  'name',
  'barWidth',
  'barMinWidth',
  'barMaxWidth',
  'label',
  'labelLayout',
  'itemStyle',
  'emphasis',
  'blur',
  'select',
  'selectedMode',
  'markLine',
  'markPoint',
  'markArea',
  'silent',
  'cursor',
] as const

type NativeBarItem = Extract<NonNullable<BarSeriesOption['data']>[number], { value?: unknown }>
export type BulletSeriesOption = BarSeriesOption | CustomSeriesOption

export const bulletProps = [
  ...bulletSeriesProps,
  'layout',
  'value',
  'target',
  'data',
  'ranges',
  'targetColor',
  'trackColor',
  'zeroText',
  'plotTheme',
] as const

export interface BulletRange {
  /** Increasing upper bound in value units, rather than a normalized ratio. */
  upper: number
  color?: string
  label?: string
}
export interface BulletChartDataItem extends Pick<
  NativeBarItem,
  'id' | 'itemStyle' | 'label' | 'emphasis' | 'blur' | 'select' | 'cursor'
> {
  name: string
  value?: number | null
  target?: number | null
  missingReason?: string
}
export interface BulletChartProps
  extends
    BaseChartOption<BulletSeriesOption>,
    AdditionalChartOption,
    Pick<BarSeriesOption, (typeof bulletSeriesProps)[number]>,
    Pick<EChartsOption, 'color'> {
  /** Grouped labels beside the track, or above it for long category names. */
  layout?: 'horizontal' | 'horizontal-above'
  value?: number | null
  target?: number | null
  /** Supplying data selects grouped mode, even for an empty array or one row. */
  data?: BulletChartDataItem[]
  ranges?: BulletRange[]
  targetColor?: string
  trackColor?: string
  /** Optional all-zero message supplied by the caller; omitted or empty means no text. */
  zeroText?: string
  plotTheme?: PlotTheme
}
export type BulletChartPublicProps = KnownProps<BulletChartProps>
