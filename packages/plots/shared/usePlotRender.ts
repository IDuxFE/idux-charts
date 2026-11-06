import { usePlotTheme } from './plotTheme'
import type { PlotTheme } from './plotTheme'
import { computed, h } from 'vue-demi'
import type { SetupContext } from 'vue-demi'
import type { SetOptionOpts } from 'echarts/core'
import { IxChart, mergeAttrs, useReactiveAttrs } from '@idux/charts-core'
import type { ChartOption } from '@idux/charts-core'

/**
 * Adapter for plots whose builders produce a complete option on every update.
 * Native attrs replace generated top-level sections; replacement updates clear
 * removed series and overrides. Callers can explicitly opt into ECharts merging.
 */
export function usePlotRender(
  context: Pick<SetupContext, 'attrs'> & { listeners?: Record<string, Function> },
  createOption: (attrs: Readonly<Record<string, unknown>>) => ChartOption,
) {
  const attrs = useReactiveAttrs(context.attrs)
  const theme = usePlotTheme(
    () => (attrs.value.plotTheme ?? attrs.value['plot-theme']) as PlotTheme | undefined,
  )
  const option = computed(() => {
    const { plotTheme: _theme, 'plot-theme': _kebabTheme, ...nativeAttrs } = attrs.value
    return {
      ...createOption({ ...nativeAttrs, plotTheme: theme.value }),
      ...nativeAttrs,
      setOptionOpts: {
        notMerge: true,
        ...(attrs.value.setOptionOpts as SetOptionOpts | undefined),
      },
    }
  })
  return () => h(IxChart, mergeAttrs(option.value, context.listeners))
}
