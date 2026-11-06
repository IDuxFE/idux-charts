import { graphicTextStyle } from '../../shared/plotTheme'
import type { PlotTheme, PlotTextStyle } from '../../shared/plotTheme'
import type { CustomSeriesOption, GaugeSeriesOption } from 'echarts/charts'
import { graphic } from 'echarts/core'
import { getAlphaColor } from '@idux/charts-core'
import type { AdditionalChartOption, BaseChartOption, KnownProps } from '@idux/charts-core'
import { valueRatio } from '../../shared/value'

export interface GaugeSegment {
  /** Inclusive normalized upper bound. Strictly increasing; the final bound must be 1. */
  upper: number
  color: string
  label?: string
}
export interface GaugeChartProps
  extends BaseChartOption<GaugeSeriesOption | CustomSeriesOption>, AdditionalChartOption {
  plotTheme?: PlotTheme
  valueTextStyle?: PlotTextStyle
  labelTextStyle?: PlotTextStyle
  value?: number | null
  min?: number
  max?: number
  segments?: GaugeSegment[]
  label?: string
  valueFormatter?: (value: number) => string
  color?: string
  size?: 'lg' | 'md'
  /** Main text sizing is independent of the dial size. */
  valueFontSize?: number
  valueFontFamily?: string
  labelColor?: string
  textColor?: string
  backgroundColor?: string
}
export type GaugeChartPublicProps = KnownProps<GaugeChartProps>

export function createGaugeOption(
  props: GaugeChartProps,
): BaseChartOption<GaugeSeriesOption | CustomSeriesOption> {
  const theme = props.plotTheme ?? {}
  const ratio = valueRatio(props.value, props.min, props.max)
  const segments = props.segments ?? []
  const validSegments =
    segments.every(
      (segment, index) =>
        Number.isFinite(segment.upper) &&
        segment.upper > (segments[index - 1]?.upper ?? 0) &&
        segment.upper <= 1,
    ) &&
    (!segments.length || segments[segments.length - 1]!.upper === 1)
  if (ratio === undefined || !validSegments) return { series: [] }
  const active = segments.find(segment => ratio <= segment.upper)
  const color = active?.color ?? props.color ?? theme.color ?? '#4089FF'
  const textColor = props.textColor ?? theme.textColor ?? '#1F2329'
  const text = props.valueFormatter?.(props.value!) ?? String(props.value)
  const label = props.label ?? active?.label ?? ''
  const gradient = new graphic.LinearGradient(0, 0, 1, 0, [
    { offset: 0, color: getAlphaColor(color, 0.65) },
    { offset: 1, color },
  ])
  // A custom series computes every layer in the same viewport, including after resize.
  const series: CustomSeriesOption = {
    id: 'gauge',
    type: 'custom',
    coordinateSystem: 'none',
    silent: true,
    data: [ratio],
    renderItem: (_params, api) => {
      const width = api.getWidth(),
        height = api.getHeight()
      const radius = Math.max(1, Math.min(width / 2 - 6, height - 18))
      const cx = width / 2,
        cy = height - 12
      const stroke = props.size === 'md' ? 8 : 12
      const inner = Math.max(1, radius - (props.size === 'md' ? 22 : 28))
      const angle = (value: number) => ((170 + value * 200) * Math.PI) / 180
      const point = (value: number, r = inner): number[] => [
        cx + Math.cos(angle(value)) * r,
        cy + Math.sin(angle(value)) * r,
      ]
      const arc = (from: number, to: number) =>
        Array.from({ length: 101 }, (_, i) => point(from + ((to - from) * i) / 100))
      const points = [
        ...arc(0, Math.max(0, ratio - 0.015)),
        point(ratio, inner + 6),
        ...arc(Math.min(1, ratio + 0.015), 1),
        [cx + inner, height - 4],
        [cx - inner, height - 4],
      ]
      const sector = (
        from: number,
        to: number,
        fill: string | typeof gradient,
        outer = radius,
        thickness = stroke,
      ) => ({
        type: 'sector' as const,
        shape: {
          cx,
          cy,
          r: outer,
          r0: Math.max(0, outer - thickness),
          startAngle: angle(from),
          endAngle: angle(to),
          clockwise: true,
        },
        style: { fill },
      })
      return {
        type: 'group',
        children: [
          sector(
            0,
            1,
            getAlphaColor(props.backgroundColor ?? theme.borderColor ?? '#D8DDE5', 0.3),
            radius + 6,
            stroke + 12,
          ),
          sector(0, 1, props.backgroundColor ?? theme.borderColor ?? '#D8DDE5'),
          ...(segments.length
            ? segments.map((segment, i) =>
                sector(
                  segments[i - 1]?.upper ?? 0,
                  segment.upper,
                  new graphic.LinearGradient(0, 0, 1, 0, [
                    { offset: 0, color: getAlphaColor(segment.color, 0.65) },
                    { offset: 1, color: segment.color },
                  ]),
                ),
              )
            : [sector(0, ratio, gradient)]),
          ...Array.from({ length: 11 }, (_, i) => ({
            type: 'line' as const,
            shape: {
              x1: point(i / 10, radius - 3)[0],
              y1: point(i / 10, radius - 3)[1],
              x2: point(i / 10, radius - 7)[0],
              y2: point(i / 10, radius - 7)[1],
            },
            style: { stroke: '#fff', lineWidth: 1 },
          })),
          {
            type: 'polygon',
            shape: { points },
            style: {
              lineWidth: 0.5,
              stroke: new graphic.LinearGradient(0, 0, 0, 1, [
                { offset: 0, color: getAlphaColor(color, 0.55) },
                { offset: 1, color: getAlphaColor(color, 0) },
              ]),
              fill: new graphic.LinearGradient(0, 0, 0, 1, [
                { offset: 0, color: getAlphaColor(color, 0.12) },
                { offset: 1, color: getAlphaColor(color, 0) },
              ]),
            },
          },
          {
            type: 'text',
            style: {
              x: cx,
              y: cy - (label ? 19 : 10),
              text,
              fill: textColor,
              fontSize: props.valueFontSize ?? (props.valueFormatter ? 16 : 32),
              fontFamily:
                props.valueFontFamily ?? theme.numberFontFamily ?? theme.fontFamily ?? 'sans-serif',
              align: 'center',
              verticalAlign: 'middle',
              width: Math.max(100, inner * 2 - 12),
              overflow: 'break',
              lineHeight: 24,
              ...graphicTextStyle(props.textStyle ?? {}),
              ...graphicTextStyle(props.valueTextStyle ?? {}),
              ...(props.textColor === undefined ? {} : { fill: props.textColor }),
              ...(props.valueFontSize === undefined ? {} : { fontSize: props.valueFontSize }),
              ...(props.valueFontFamily === undefined ? {} : { fontFamily: props.valueFontFamily }),
            },
          },
          {
            type: 'text',
            style: {
              x: cx,
              y: cy + 4,
              text: label,
              fill: props.labelColor ?? theme.secondaryTextColor ?? '#6F7785',
              fontSize: 12,
              ...(theme.fontFamily ? { fontFamily: theme.fontFamily } : {}),
              ...graphicTextStyle(props.textStyle ?? {}),
              ...graphicTextStyle(props.labelTextStyle ?? {}),
              ...(props.labelColor === undefined ? {} : { fill: props.labelColor }),
              align: 'center',
              verticalAlign: 'middle',
            },
          },
        ],
      }
    },
  }
  return { animation: false, series: [series] }
}
