import { expectTypeOf, it } from 'vitest'

import type {
  IxChart,
  IxBarChart,
  IxLineChart,
  IxAreaChart,
  IxPieChart,
  BarChartProps,
  LineChartProps,
  AreaChartProps,
  PieChartProps,
} from '../index'

it('preserves named configuration props on exported component instances', () => {
  expectTypeOf<InstanceType<typeof IxChart>['$props']['autoResize']>().toEqualTypeOf<
    boolean | undefined
  >()
  expectTypeOf<InstanceType<typeof IxBarChart>['$props']['barWidth']>().toEqualTypeOf<
    BarChartProps['barWidth']
  >()
  expectTypeOf<InstanceType<typeof IxLineChart>['$props']['smooth']>().toEqualTypeOf<
    LineChartProps['smooth']
  >()
  expectTypeOf<InstanceType<typeof IxAreaChart>['$props']['smooth']>().toEqualTypeOf<
    AreaChartProps['smooth']
  >()
  expectTypeOf<InstanceType<typeof IxPieChart>['$props']['roseType']>().toEqualTypeOf<
    PieChartProps['roseType']
  >()
})

it('preserves the Area fill union on the component', () => {
  expectTypeOf<InstanceType<typeof IxAreaChart>['$props']['area']>().toEqualTypeOf<
    AreaChartProps['area']
  >()
})
