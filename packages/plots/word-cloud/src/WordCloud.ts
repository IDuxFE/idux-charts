import { defineComponent, onBeforeUnmount } from 'vue-demi'
import type { SlotsType, VNode } from 'vue-demi'
import type { EChartsType } from 'echarts/core'
import { useReactiveAttrs, withChartProps } from '@idux/charts-core'
import { plotInstanceMethods, usePlotRender } from '../../shared/usePlotRender'
import { usePlotDark } from '../../shared/plotTheme'
import { createWordCloudOption } from './createWordCloudOption'
import { createWordCloudSelection } from './selection'
import { invalidateWordCloudFonts } from './wordCloudLayout'
import { wordCloudProps } from './types'
import type { WordCloudChartProps } from './types'
import loadingIcon from '../assets/loading.svg?raw'

export default withChartProps<WordCloudChartProps>()(
  defineComponent({
    name: 'IxWordCloudChart',
    inheritAttrs: false,
    slots: Object as SlotsType<{ default?: () => VNode[] }>,
    props: [...wordCloudProps] as any,
    methods: plotInstanceMethods,
    setup(props, context) {
      const attrs = useReactiveAttrs(context.attrs)
      const dark = usePlotDark(() => attrs.value)
      let chart: EChartsType | undefined
      const selection = createWordCloudSelection()
      const fonts = typeof document === 'undefined' ? undefined : document.fonts
      const refreshFonts = () => {
        invalidateWordCloudFonts()
        if (chart && !chart.isDisposed()) chart.resize()
      }
      fonts?.addEventListener('loadingdone', refreshFonts)
      onBeforeUnmount(() => fonts?.removeEventListener('loadingdone', refreshFonts))
      return usePlotRender(
        context,
        // Theme is an instance control in the common renderer. Include the
        // resolved mode in plot input so custom defaults are regenerated too.
        () => ({ ...props, darkMode: dark.value }),
        input => {
          const option = createWordCloudOption({
            ...(input as WordCloudChartProps),
            motion: input.motion === '' ? true : input.motion,
            darkMode: dark.value,
          })
          selection.apply(option)
          return option
        },
        {
          loadingIcon,
          mergeDataUpdates: true,
          resetOnDataIdentityChange: true,
          onReady: instance => {
            chart = instance
            selection.bind(instance)
          },
        },
      )
    },
  }),
)
