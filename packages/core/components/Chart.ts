import { defineComponent, h, isVue2 } from 'vue-demi'
import type { ShallowRef, SlotsType, VNode } from 'vue-demi'

import { useChart, useReactiveAttrs } from '../composables'
import type { ChartInstanceMethods, ChartProps } from '../types'
import { withChartProps } from '../utils/withChartProps'
import { isChartDomAttr } from '../utils/chartOptions'

interface ChartBindings extends ChartInstanceMethods {
  containerRef: ShallowRef<HTMLDivElement | undefined>
  renderContent: () => VNode[] | undefined
}

// Ignore conditional-slot comments and empty fragments so they cannot block the chart.
function hasContent(nodes: VNode[]): boolean {
  return nodes.some(node => {
    if (isVue2) {
      const legacyNode = node as unknown as { isComment?: boolean; tag?: string; text?: string }
      return !legacyNode.isComment && !!(legacyNode.tag || legacyNode.text?.trim())
    }
    if (node.type === Symbol.for('v-cmt')) return false
    if (node.type === Symbol.for('v-fgt')) return hasContent((node.children ?? []) as VNode[])
    if (node.type === Symbol.for('v-txt')) return !!String(node.children ?? '').trim()
    return true
  })
}

export default withChartProps<ChartProps>()(
  defineComponent({
    name: 'IxChart',
    inheritAttrs: false,
    slots: Object as SlotsType<{ default?: () => VNode[] }>,
    // @ts-ignore
    setup(_, context): ChartBindings {
      const { containerRef, chartRef } = useChart(
        useReactiveAttrs(context.attrs),
        () =>
          (context as typeof context & { listeners?: Record<string, Function> }).listeners ?? {},
      )

      return {
        containerRef,
        renderContent: () => context.slots.default?.(),
        getEChartsInstance: () => chartRef.value,
      }
    },
    render() {
      const { class: className, style } = this.$attrs
      const attrs = Object.fromEntries(
        Object.entries(this.$attrs).flatMap(([key, value]) =>
          isChartDomAttr(key) ? [[key === 'tabIndex' ? 'tabindex' : key, value]] : [],
        ),
      )

      const content = this.renderContent()

      return h(
        'div',
        {
          class: className,
          style: {
            position: 'relative',
            display: 'grid',
            gridTemplateColumns: 'minmax(0, 1fr)',
            gridTemplateRows: 'minmax(0, 1fr)',
            width: '100%',
            height: '100%',
            ...(style as any),
          },
        },
        [
          // The surface follows the wrapper's content box, including min-height sizing.
          // Its own positioning keeps overlays local even when the wrapper is static.
          h(
            'div',
            {
              class: 'ix-chart-surface',
              style: {
                position: 'relative',
                width: '100%',
                height: '100%',
                minWidth: 0,
                minHeight: 0,
                flex: '1 1 0%',
                alignSelf: 'stretch',
              },
            },
            [
              // ECharts owns this container; Vue owns the sibling overlay.
              h('div', {
                ...(isVue2 ? { attrs } : attrs),
                ref: 'containerRef',
                class: 'ix-chart-canvas',
                style: { position: 'absolute', inset: 0 },
              }),
              content &&
                hasContent(content) &&
                h(
                  'div',
                  {
                    class: 'ix-chart-overlay',
                    style: {
                      position: 'absolute',
                      inset: 0,
                      display: 'flex',
                      flexDirection: 'column',
                    },
                  },
                  [
                    h(
                      'div',
                      {
                        class: 'ix-chart-content',
                        style: {
                          flex: '1 1 0%',
                          minWidth: 0,
                          minHeight: 0,
                          display: 'grid',
                          gridTemplateColumns: 'minmax(0, 1fr)',
                          gridAutoRows: 'minmax(0, 1fr)',
                        },
                      },
                      content,
                    ),
                  ],
                ),
            ],
          ),
        ],
      )
    },
  }),
)
