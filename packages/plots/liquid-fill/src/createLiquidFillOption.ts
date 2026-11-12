import { graphicTextStyle } from '../../shared/plotTheme'
import type { PlotTheme, PlotTextStyle } from '../../shared/plotTheme'
import type { CustomSeriesOption } from 'echarts/charts'
import { graphic } from 'echarts/core'
import { getAlphaColor } from '@idux/charts-core'
import type { AdditionalChartOption, BaseChartOption, KnownProps } from '@idux/charts-core'
import { valueRatio } from '../../shared/value'
import { mergeNativePlotOptions } from '../../shared/plotOptions'

export const liquidFillProps = [
  'value',
  'min',
  'max',
  'label',
  'unit',
  'valueFormatter',
  'color',
  'zeroColor',
  'radius',
  'waveAnimation',
  'textColor',
  'backgroundColor',
  'containerColor',
  'valueTextStyle',
  'labelTextStyle',
  'unitTextStyle',
  'plotTheme',
] as const

export interface LiquidFillChartProps
  extends BaseChartOption<CustomSeriesOption>, AdditionalChartOption {
  plotTheme?: PlotTheme
  valueTextStyle?: PlotTextStyle
  labelTextStyle?: PlotTextStyle
  unitTextStyle?: PlotTextStyle
  value?: number | null
  min?: number
  max?: number
  label?: string
  unit?: string
  valueFormatter?: (value: number) => string
  color?: string
  zeroColor?: string
  radius?: number
  waveAnimation?: boolean
  textColor?: string
  containerColor?: string
  /** @deprecated Use containerColor for the vessel or chartBackgroundColor for the chart. */
  backgroundColor?: string
}
export type LiquidFillChartPublicProps = KnownProps<LiquidFillChartProps>

export function createLiquidFillOption(
  props: LiquidFillChartProps,
): BaseChartOption<CustomSeriesOption> {
  const theme = props.plotTheme ?? {}
  const ratio = valueRatio(props.value, props.min, props.max)
  if (ratio === undefined) return mergeNativePlotOptions({ series: [] }, props, liquidFillProps)
  const color =
    ratio === 0
      ? (props.zeroColor ?? theme.mutedColor ?? '#E8EAED')
      : (props.color ?? theme.color ?? '#20C997')
  const series: CustomSeriesOption = {
    id: 'liquid-fill',
    type: 'custom',
    coordinateSystem: 'none',
    silent: true,
    data: [ratio],
    renderItem: (_params, api) => {
      const radius = Math.max(
        1,
        Math.min(
          Number.isFinite(props.radius) && props.radius! > 0 ? props.radius! : 64,
          api.getWidth() * 0.34,
          (api.getHeight() - (props.label ? 100 : 4)) / 2,
        ),
      )
      const innerRadius = Math.max(1, radius - 5)
      const waveLength = innerRadius * 2
      const waterY = innerRadius * (1 - ratio * 2)
      const amplitude = Math.min(innerRadius * 0.09, innerRadius * Math.min(ratio, 1 - ratio))
      const fill = new graphic.LinearGradient(0, 0, 1, 0, [
        { offset: 0, color: getAlphaColor(color, 0.3) },
        { offset: 1, color },
      ])
      const wave = (back: boolean) => {
        // Animate the phase instead of translating the polygon: the horizontal
        // gradient must stay anchored to the circle throughout the loop.
        const pointsAt = (progress: number): [number, number][] => {
          const phase = (back ? Math.PI : 0) + progress * Math.PI * 2 * (back ? -1 : 1)
          const points: [number, number][] = Array.from({ length: 41 }, (_, step) => {
            const x = -innerRadius + (step / 40) * waveLength
            return [x, waterY + Math.sin((x / waveLength) * Math.PI * 2 + phase) * amplitude]
          })
          points.push([innerRadius, innerRadius], [-innerRadius, innerRadius])
          return points
        }
        return {
          type: 'polygon' as const,
          name: back ? 'back-wave' : 'front-wave',
          shape: { points: pointsAt(0) },
          style: { fill, opacity: back ? 0.35 : 1 },
          keyframeAnimation:
            props.waveAnimation === false
              ? undefined
              : {
                  duration: back ? 4200 : 3000,
                  loop: true,
                  keyframes: Array.from({ length: 17 }, (_, index) => ({
                    percent: index / 16,
                    shape: { points: pointsAt(index / 16) },
                  })),
                  easing: 'linear' as const,
                },
        }
      }
      return {
        type: 'group',
        x: api.getWidth() / 2,
        y: api.getHeight() / 2,
        children: [
          {
            type: 'circle',
            shape: { cx: 0, cy: 0, r: radius },
            style: {
              fill: props.containerColor ?? props.backgroundColor ?? 'transparent',
              stroke: getAlphaColor(color, 0.3),
              lineWidth: 2,
            },
          },
          {
            type: 'circle',
            shape: { cx: 0, cy: 0, r: innerRadius },
            style: {
              fill: new graphic.LinearGradient(0, 0, 1, 0, [
                { offset: 0, color: getAlphaColor(color, ratio === 0 ? 0.3 : 0.09) },
                { offset: 1, color: getAlphaColor(color, ratio === 0 ? 1 : 0.02) },
              ]),
            },
          },
          {
            type: 'group',
            // Custom series merge children by index by default, retaining old
            // waves when the next frame has no children (zero water level).
            $mergeChildren: false,
            clipPath: { type: 'circle', shape: { cx: 0, cy: 0, r: innerRadius } },
            children:
              ratio === 0
                ? []
                : ratio === 1
                  ? [{ type: 'circle', shape: { cx: 0, cy: 0, r: innerRadius }, style: { fill } }]
                  : [wave(true), wave(false)],
          },
          {
            type: 'text',
            style: {
              x: 0,
              y: 0,
              text:
                props.valueFormatter?.(props.value!) ??
                `{value|${props.value}}${props.unit === '' ? '' : `{unit| ${props.unit ?? '%'}}`}`,
              rich: {
                value: {
                  fontSize: Math.min(32, radius * 0.6),
                  fontFamily:
                    (props.textStyle as { fontFamily?: string } | undefined)?.fontFamily ??
                    theme.numberFontFamily ??
                    theme.fontFamily ??
                    'D-DIN-PRO, sans-serif',
                  lineHeight: Math.min(32, radius * 0.6),
                  ...graphicTextStyle(props.textStyle ?? {}),
                  ...graphicTextStyle(props.valueTextStyle ?? {}),
                  ...(props.textColor === undefined ? {} : { fill: props.textColor }),
                },
                unit: {
                  fontSize: Math.max(12, Math.min(32, radius * 0.6) * 0.5),
                  verticalAlign: 'bottom',
                  padding: [-4, 0, 4, 0],
                  ...graphicTextStyle(props.unitTextStyle ?? {}),
                },
              },
              fill: props.textColor ?? theme.textColor ?? '#1F2329',
              fontSize: Math.min(32, radius * 0.6),
              ...(theme.fontFamily ? { fontFamily: theme.fontFamily } : {}),
              ...graphicTextStyle(props.textStyle ?? {}),
              ...graphicTextStyle(props.valueTextStyle ?? {}),
              ...(props.textColor === undefined ? {} : { fill: props.textColor }),
              align: 'center',
              verticalAlign: 'middle',
            },
          },
          {
            type: 'text',
            style: {
              x: 0,
              y: radius + 28,
              text: props.label ?? '',
              fill: props.textColor ?? theme.textColor ?? '#1F2329',
              fontSize: 14,
              ...(theme.fontFamily ? { fontFamily: theme.fontFamily } : {}),
              ...graphicTextStyle(props.textStyle ?? {}),
              ...graphicTextStyle(props.labelTextStyle ?? {}),
              ...(props.textColor === undefined ? {} : { fill: props.textColor }),
              align: 'center',
              verticalAlign: 'middle',
            },
          },
        ],
      }
    },
  }
  return mergeNativePlotOptions(
    { animationDuration: 0, animationDurationUpdate: 0, series: [series] },
    props,
    liquidFillProps,
  )
}
