import { defineComponent, type HTMLAttributes, h } from 'vue-demi'

import { useChart } from '../composables'
import { type ChartProps } from '../types'
import { mergeAttrs } from '../utils'

export default defineComponent<Omit<HTMLAttributes, keyof ChartProps> & ChartProps>({
  name: 'IxChart',
  inheritAttrs: false,
  setup(_, { attrs }) {
    const { containerRef } = useChart(attrs)
    return { containerRef }
  },
  render() {
    const { class: className, style } = this.$attrs
    const attrs = mergeAttrs({ class: className, style })
    return h('div', { ref: 'containerRef', ...attrs })
  },
})
