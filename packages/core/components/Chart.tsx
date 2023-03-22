import { defineComponent, computed, type HTMLAttributes, type InjectionKey, inject } from 'vue-demi'

import { useChart } from '../composables'
import { type ChartOption, type AdditionalChartOption } from '../types'

export interface ChartProps extends ChartOption, AdditionalChartOption {}

export const CHART_TOKEN: InjectionKey<ChartProps> = Symbol('CHART_TOKEN')
export const defaultChartProps: ChartProps = {
  theme: 'seer',
}

type IChartProps = Omit<HTMLAttributes, keyof ChartProps> & ChartProps

export default defineComponent<IChartProps>({
  name: 'IxChart',
  inheritAttrs: false,
  setup(_, { attrs }) {
    const defaultProps = inject<ChartProps>(CHART_TOKEN, defaultChartProps)
    const mergedProps = computed<IChartProps>(() => {
      return { ...defaultProps, ...attrs }
    })

    const { containerRef } = useChart(mergedProps)

    return () => {
      const { class: className, style } = mergedProps.value as unknown as HTMLAttributes
      return <div ref={containerRef} class={className} style={style}></div>
    }
  },
})
