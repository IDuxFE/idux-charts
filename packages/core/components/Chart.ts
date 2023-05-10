import { defineComponent, type HTMLAttributes, h, normalizeStyle } from 'vue-demi'

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
    const attrs = mergeAttrs({
      class: className,
      style: normalizeStyle({
        width: '100%',
        height: '100%',
        ...(style as any),
      }),
    })
    return h('div', { ref: 'containerRef', ...attrs })
  },
})
