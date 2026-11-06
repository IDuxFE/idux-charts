import { describe, expectTypeOf, it } from 'vitest'

import type { ChartPublicProps as CorePublicProps } from '@idux/charts-core'
import type {
  BarChartPublicProps as PlotBarPublicProps,
  LineChartPublicProps as PlotLinePublicProps,
  PieChartPublicProps as PlotPiePublicProps,
} from '@idux/charts-plots'

import type {
  PlotTheme,
  PlotTextStyle,
  PieSeriesStyle,
  GaugeChartPublicProps,
  LiquidFillChartPublicProps,
  RadarChartPublicProps,
  ChartProps,
  ChartPublicProps,
  BarChartProps,
  BarChartPublicProps,
  LineChartProps,
  LineChartPublicProps,
  PieChartProps,
  PieChartAlign,
  PieChartPublicProps,
} from '../index'

type HasStringIndex<Props> = string extends keyof Props ? true : false
type HasNumberIndex<Props> = number extends keyof Props ? true : false

describe('public chart prop types', () => {
  it('exports each public type through the owning package and the umbrella package', () => {
    expectTypeOf<ChartPublicProps>().toEqualTypeOf<CorePublicProps>()
    expectTypeOf<BarChartPublicProps>().toEqualTypeOf<PlotBarPublicProps>()
    expectTypeOf<LineChartPublicProps>().toEqualTypeOf<PlotLinePublicProps>()
    expectTypeOf<PieChartPublicProps>().toEqualTypeOf<PlotPiePublicProps>()
  })

  it('removes broad indexes while keeping the existing configuration types open', () => {
    expectTypeOf<
      [
        HasStringIndex<ChartPublicProps>,
        HasStringIndex<BarChartPublicProps>,
        HasStringIndex<LineChartPublicProps>,
        HasStringIndex<PieChartPublicProps>,
        HasNumberIndex<ChartPublicProps>,
        HasNumberIndex<BarChartPublicProps>,
        HasNumberIndex<LineChartPublicProps>,
        HasNumberIndex<PieChartPublicProps>,
      ]
    >().toEqualTypeOf<[false, false, false, false, false, false, false, false]>()

    expectTypeOf<
      [
        HasStringIndex<ChartProps>,
        HasStringIndex<BarChartProps>,
        HasStringIndex<LineChartProps>,
        HasStringIndex<PieChartProps>,
      ]
    >().toEqualTypeOf<[true, true, true, true]>()
  })

  it('preserves named prop types through the mapped types used by component declarations', () => {
    expectTypeOf<
      [
        Omit<Partial<ChartPublicProps>, never>['autoResize'],
        Omit<Partial<BarChartPublicProps>, never>['autoResize'],
        Omit<Partial<LineChartPublicProps>, never>['autoResize'],
        Omit<Partial<PieChartPublicProps>, never>['autoResize'],
      ]
    >().toEqualTypeOf<
      [boolean | undefined, boolean | undefined, boolean | undefined, boolean | undefined]
    >()

    expectTypeOf<Pick<ChartPublicProps, 'loading' | 'onReady' | 'series'>>().toEqualTypeOf<
      Pick<ChartProps, 'loading' | 'onReady' | 'series'>
    >()
    expectTypeOf<Pick<BarChartPublicProps, 'data' | 'barWidth'>>().toEqualTypeOf<
      Pick<BarChartProps, 'data' | 'barWidth'>
    >()
    expectTypeOf<Pick<LineChartPublicProps, 'data' | 'smooth'>>().toEqualTypeOf<
      Pick<LineChartProps, 'data' | 'smooth'>
    >()
    expectTypeOf<Pick<PieChartPublicProps, 'data' | 'roseType'>>().toEqualTypeOf<
      Pick<PieChartProps, 'data' | 'roseType'>
    >()
    expectTypeOf<{ autoResize: number }>().not.toExtend<LineChartPublicProps>()
  })

  it('exposes only the nine align positions', () => {
    expectTypeOf<PieChartPublicProps['align']>().toEqualTypeOf<PieChartAlign | undefined>()
    expectTypeOf<'top-end'>().toExtend<PieChartAlign>()
    expectTypeOf<'center'>().toExtend<PieChartAlign>()
    expectTypeOf<'center-center'>().not.toExtend<PieChartAlign>()
    expectTypeOf<'left'>().not.toExtend<PieChartAlign>()
  })

  it('preserves optionality and compatibility with the existing configuration types', () => {
    expectTypeOf<{}>().toExtend<
      ChartPublicProps & BarChartPublicProps & LineChartPublicProps & PieChartPublicProps
    >()
    expectTypeOf<ChartPublicProps>().toExtend<ChartProps>()
    expectTypeOf<BarChartPublicProps>().toExtend<BarChartProps>()
    expectTypeOf<LineChartPublicProps>().toExtend<LineChartProps>()
    expectTypeOf<PieChartPublicProps>().toExtend<PieChartProps>()
  })
})

it('retains typed theme and style contracts on every new public component', () => {
  expectTypeOf<GaugeChartPublicProps['plotTheme']>().toEqualTypeOf<PlotTheme | undefined>()
  expectTypeOf<LiquidFillChartPublicProps['valueTextStyle']>().toEqualTypeOf<
    PlotTextStyle | undefined
  >()
  expectTypeOf<LiquidFillChartPublicProps['unitTextStyle']>().toEqualTypeOf<
    PlotTextStyle | undefined
  >()
  expectTypeOf<RadarChartPublicProps['plotTheme']>().toEqualTypeOf<PlotTheme | undefined>()
  expectTypeOf<PieChartPublicProps['layoutMode']>().toEqualTypeOf<'auto' | 'native' | undefined>()
  expectTypeOf<PieChartPublicProps['seriesStyle']>().toEqualTypeOf<PieSeriesStyle | undefined>()
  expectTypeOf<HasStringIndex<GaugeChartPublicProps>>().toEqualTypeOf<false>()
  expectTypeOf<HasStringIndex<LiquidFillChartPublicProps>>().toEqualTypeOf<false>()
  expectTypeOf<HasStringIndex<RadarChartPublicProps>>().toEqualTypeOf<false>()
  expectTypeOf<'data'>().not.toExtend<keyof PieSeriesStyle>()
  expectTypeOf<'radius'>().not.toExtend<keyof PieSeriesStyle>()
})
