import loadingIcon from '../assets/loading.svg?raw'
import singleLoadingIcon from '../assets/loading-single.svg?raw'
import type { SlotsType, VNode } from 'vue-demi'
import { defineComponent } from 'vue-demi'
import { convertArray, useReactiveAttrs, withChartProps } from '@idux/charts-core'
import { plotInstanceMethods, usePlotRender } from '../../shared/usePlotRender'
import { usePlotDark } from '../../shared/plotTheme'
import { bindBulletHover } from './bulletHover'
import { createBulletOption } from './createBulletOption'
import { bulletProps } from './types'
import type { BulletChartProps } from './types'

export default withChartProps<BulletChartProps>()(
  defineComponent({
    name: 'IxBulletChart',
    inheritAttrs: false,
    slots: Object as SlotsType<{ default?: () => VNode[] }>,
    props: [...bulletProps] as any,
    methods: plotInstanceMethods,
    setup(props, context) {
      const attrs = useReactiveAttrs(context.attrs)
      const dark = usePlotDark(() => attrs.value)
      return usePlotRender(
        context,
        () => props,
        input => createBulletOption({ ...(input as BulletChartProps), darkMode: dark.value }),
        {
          loadingIcon: () =>
            (props as BulletChartProps).data === undefined ? singleLoadingIcon : loadingIcon,
          mergeDataUpdates: true,
          onReady: bindBulletHover,
          categoryLabelTooltip: true,
          zoomConfig: input => {
            const { data } = input as BulletChartProps
            return data === undefined
              ? undefined
              : {
                  categories: data.map(row => row.name),
                  layout: 'horizontal',
                  axisId: convertArray(input.yAxis)[0]?.id,
                  dataZoom: input.dataZoom,
                }
          },
        },
      )
    },
  }),
)
