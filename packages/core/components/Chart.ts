import { defineComponent, h, isVue2 } from 'vue-demi'
import type { ShallowRef } from 'vue-demi'

import { useChart, useReactiveAttrs } from '../composables'
import type { ChartInstanceMethods, ChartProps } from '../types'
import { withChartProps } from '../utils/withChartProps'
import { isChartDomAttr } from '../utils/chartOptions'

interface ChartBindings extends ChartInstanceMethods {
  containerRef: ShallowRef<HTMLDivElement | undefined>
}

export default withChartProps<ChartProps>()(
  defineComponent({
    name: 'IxChart',
    inheritAttrs: false,
    // @ts-ignore
    setup(_, context): ChartBindings {
      const { containerRef, chartRef } = useChart(
        useReactiveAttrs(context.attrs),
        () =>
          (context as typeof context & { listeners?: Record<string, Function> }).listeners ?? {},
      )

      return { containerRef, getEChartsInstance: () => chartRef.value }
    },
    render() {
      const { class: className, style } = this.$attrs
      const attrs = Object.fromEntries(
        Object.entries(this.$attrs).flatMap(([key, value]) =>
          isChartDomAttr(key) ? [[key === 'tabIndex' ? 'tabindex' : key, value]] : [],
        ),
      )

      return h('div', {
        ...(isVue2 ? { attrs } : attrs),
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
