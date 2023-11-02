import { defineComponent, type HTMLAttributes, h } from 'vue-demi'

import { useChart } from '../composables'
import { type ChartProps } from '../types'

export default defineComponent<Omit<HTMLAttributes, keyof ChartProps> & ChartProps>({
  name: 'IxChart',
  inheritAttrs: false,
  // @ts-ignore
  setup(_, { attrs, listeners }) {
    const { containerRef } = useChart(attrs, listeners)

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
})