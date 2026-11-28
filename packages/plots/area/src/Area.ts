import { defineComponent, h, isVue2 } from 'vue-demi'
import type { PropType, SlotsType, VNode } from 'vue-demi'
import { filterEmptyProps, mergeAttrs, withChartProps } from '@idux/charts-core'
import { IxLineChart } from '../../line'
import type { LineChartProps } from '../../line'
import type { PlotContext } from '../../shared/usePlotRender'
import { plotInstanceMethods } from '../../shared/usePlotRender'

export default withChartProps<LineChartProps>()(
  defineComponent({
    name: 'IxAreaChart',
    inheritAttrs: false,
    slots: Object as SlotsType<{ default?: () => VNode[] }>,
    props: {
      area: null as unknown as PropType<LineChartProps['area']>,
    },
    methods: plotInstanceMethods,
    setup(props, context) {
      return () => {
        const area = props.area ?? true
        return h(
          IxLineChart,
          {
            ...mergeAttrs(
              {
                // Native line options use areaStyle; category layouts use area.
                ...(area !== false ? { areaStyle: {} } : {}),
                ...filterEmptyProps(context.attrs),
                area,
              },
              (context as PlotContext).listeners,
            ),
            ref: 'chart',
            ...(isVue2 ? { scopedSlots: context.slots } : {}),
          },
          isVue2 ? undefined : context.slots,
        )
      }
    },
  }),
)
