import {
  defineComponent,
  computed,
  type HTMLAttributes,
  type InjectionKey,
  inject,
  h,
} from 'vue-demi'

import { useChart } from '../composables'
import { type ChartOption, type AdditionalChartOption } from '../types'
import { mergeAttrs } from '../utils'

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
    return { containerRef, mergedProps }
  },
  render() {
    const { class: className, style } = this.mergedProps as unknown as HTMLAttributes
    const attrs = mergeAttrs({ class: className, style })
    return h('div', { ref: 'containerRef', ...attrs })
  },
})
