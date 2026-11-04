import { defineComponent, h } from 'vue-demi'

import { useChart, useReactiveAttrs } from '../composables'
import type { ChartProps } from '../types'
import { withChartProps } from '../utils/withChartProps'

export default withChartProps<ChartProps>()(
  defineComponent({
    name: 'IxChart',
    inheritAttrs: false,
    // @ts-ignore
    setup(_, context) {
      const { containerRef } = useChart(
        useReactiveAttrs(context.attrs),
        () =>
          (context as typeof context & { listeners?: Record<string, Function> }).listeners ?? {},
      )

      return { containerRef }
    },
    render() {
      const { class: className, style } = this.$attrs

      return h('div', {
        ref: 'containerRef',
        class: className,
        style: {
          width: '100%',
          height: '100%',
          ...(style as any),
        },
      })
    },
  }),
)
