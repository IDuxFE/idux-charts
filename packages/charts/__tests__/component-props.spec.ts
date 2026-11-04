import { expectTypeOf, it } from 'vitest'

import type {
  IxChart,
  IxBarChart,
  IxLineChart,
  IxPieChart,
  BarChartProps,
  LineChartProps,
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
  expectTypeOf<InstanceType<typeof IxPieChart>['$props']['roseType']>().toEqualTypeOf<
    PieChartProps['roseType']
  >()
})
