import {
  computed,
  defineComponent,
  getCurrentInstance,
  h,
  inject,
  onBeforeUnmount,
  onMounted,
  onUpdated,
  shallowRef,
  unref,
} from 'vue-demi'

import { cloneDeep, isEqual, pick } from 'lodash-es'
import type { EChartsType } from 'echarts/core'

import {
  CHART_THEME_TOKEN,
  IxChart,
  mergeAttrs,
  useReactiveAttrs,
  withChartProps,
} from '@idux/charts-core'
import type { ChartProps } from '@idux/charts-core'

import { createCategoryBarOption } from './createCategoryBarOption'
import { withBarShadows } from './barShadow'
import { syncCategoryBarWidths } from './categoryBarWidth'
import { barChartProps, categoryBarProps, useBarOption } from './useBarOption'
import type { BarChartProps } from './useBarOption'
import { usePlotTheme } from '../../shared/plotTheme'
import { useLegendWheel } from '../../shared/useLegendWheel'

export default withChartProps<BarChartProps>()(
  defineComponent({
    name: 'IxBarChart',
    inheritAttrs: false,
    props: [...barChartProps, ...categoryBarProps] as any,
    // @ts-ignore
    setup(props, { attrs, listeners }) {
      const reactiveAttrs = useReactiveAttrs(attrs)
      const input = props as BarChartProps
      const series = computed(() => pick(input, barChartProps))
      const legacy = useBarOption(series, reactiveAttrs)
      const preset = computed(() => input.categories !== undefined)
      const providedChartTheme = inject(CHART_THEME_TOKEN, undefined)
      const plotTheme = usePlotTheme(() => input.plotTheme)
      const dark = computed(() => {
        const { darkMode, theme = unref(providedChartTheme) } = reactiveAttrs.value
        if (typeof darkMode === 'boolean') return darkMode
        return (
          theme === 'dark' ||
          (!!theme && typeof theme === 'object' && 'darkMode' in theme && theme.darkMode === true)
        )
      })

      // The chart owns its root; observe it without adding a sizing wrapper.
      const instance = getCurrentInstance()
      const width = shallowRef(0)
      let observed: HTMLElement | undefined
      let observer: ResizeObserver | undefined
      const observe = () => {
        const element = (instance?.proxy?.$refs.chart as { $el?: HTMLElement } | undefined)?.$el
        bindLegendWheel(preset.value ? element : undefined)
        const root = preset.value && reactiveAttrs.value.autoResize !== false ? element : undefined
        if (root === observed) return
        observer?.disconnect()
        observed = root
        width.value = root?.clientWidth ?? 0
        if (root && typeof ResizeObserver !== 'undefined') {
          observer = new ResizeObserver(() => {
            width.value = root.clientWidth
          })
          observer.observe(root)
        }
      }
      onMounted(observe)
      onUpdated(observe)
      onBeforeUnmount(() => observer?.disconnect())

      let categoryChart: EChartsType | undefined
      const zoomConfig = computed(() =>
        cloneDeep({
          categories: input.categories,
          layout: input.layout,
          dataZoom: reactiveAttrs.value.dataZoom,
        }),
      )
      const legendConfig = computed(() => cloneDeep(reactiveAttrs.value.legend))
      let previous: { width: number; zoom: typeof zoomConfig.value; legend: unknown } | undefined
      const layout = computed(() => {
        if (!preset.value) {
          previous = undefined
          return { option: legacy.value, wheel: undefined, aboveMissingRows: undefined }
        }
        const viewport = { width: width.value, zoom: zoomConfig.value, legend: legendConfig.value }
        const resized = previous !== undefined && viewport.width !== previous.width
        const keepZoom = resized && isEqual(viewport.zoom, previous?.zoom)
        const keepLegend = resized && isEqual(viewport.legend, previous?.legend)
        // The replacement update clears stale components. Carry forward live state
        // when a reflow has not changed the caller's zoom or legend configuration.
        const current =
          (keepZoom || keepLegend) && categoryChart && !categoryChart.isDisposed()
            ? (categoryChart.getOption() as ChartProps)
            : undefined
        previous = viewport
        return createCategoryBarOption(
          input,
          series.value,
          reactiveAttrs.value,
          viewport.width,
          plotTheme.value,
          dark.value,
          () => categoryChart,
          {
            dataZoom: keepZoom ? current?.dataZoom : undefined,
            legend: keepLegend ? current?.legend : undefined,
          },
        )
      })
      const bindLegendWheel = useLegendWheel(() => layout.value.wheel)
      const option = computed(() => withBarShadows(layout.value.option))
      const onCategoryReady = (chart: EChartsType) => {
        categoryChart = chart
        const syncWidth = () =>
          syncCategoryBarWidths(chart, input, reactiveAttrs.value, layout.value.aboveMissingRows)
        chart.on('datazoom', syncWidth)
        chart.on('legendselectchanged', syncWidth)
        chart.on('legendselected', syncWidth)
        chart.on('legendunselected', syncWidth)
        let measuredLayout = layout.value
        let measuredWidth = chart.getWidth()
        let measuredHeight = chart.getHeight()
        chart.on('rendered', () => {
          const width = chart.getWidth()
          const height = chart.getHeight()
          if (
            measuredLayout === layout.value &&
            measuredWidth === width &&
            measuredHeight === height
          )
            return
          measuredLayout = layout.value
          measuredWidth = width
          measuredHeight = height
          // The band size is resolved during layout. Apply geometry updates after rendering.
          queueMicrotask(() => {
            if (!chart.isDisposed()) syncWidth()
          })
        })
        syncWidth()
        const onReady = reactiveAttrs.value.onReady ?? listeners?.ready
        onReady?.(chart)
      }
      return () =>
        h(IxChart, {
          ...mergeAttrs(
            preset.value ? { ...option.value, onReady: onCategoryReady } : option.value,
            listeners,
          ),
          ref: 'chart',
          key: preset.value ? 'category' : 'native',
        })
    },
  }),
)
