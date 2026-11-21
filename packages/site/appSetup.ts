import { createApp } from 'vue'
import {
  defineComponent,
  h,
  onMounted,
  onBeforeUnmount,
  ref,
  resolveComponent,
} from '@idux/archive-app/vue'
import { IxMenu } from '@idux/archive-app/components'
import type { MenuData, MenuProps } from '@idux/components/menu'
import ThemeToggle from './ThemeToggle.vue'
import './theme.css'

// Archive bundles its own Vue runtime. Mount the site control as a Vue app,
// just like Archive's demo loader, instead of mixing the two renderers.
const ThemeControl = defineComponent({
  setup() {
    const host = ref<HTMLElement>()
    const app = createApp(ThemeToggle)
    onMounted(() => app.mount(host.value!))
    onBeforeUnmount(() => app.unmount())
    return () => h('div', { ref: host })
  },
})

type SiteMenuItem = MenuData & {
  id?: string
  name?: string
  path?: string
  children?: SiteMenuItem[]
}

const componentNames: Record<string, string> = {
  core: 'IxChart',
  bar: 'IxBarChart',
  line: 'IxLineChart',
  area: 'IxLineChart',
  pie: 'IxPieChart',
  radar: 'IxRadarChart',
  gauge: 'IxGaugeChart',
  'liquid-fill': 'IxLiquidFillChart',
  map: 'IxMapChart',
}

function renderSiderMenu(menuProps: MenuProps) {
  const dataSource = (menuProps.dataSource as SiteMenuItem[]).map(item => {
    if (item.id !== 'components' || !item.children) return item

    // Group the menu only, so documentation URLs and navigation keys stay stable.
    return {
      ...item,
      children: [
        {
          key: 'components-basic-group',
          type: 'itemGroup' as const,
          label: '基础',
          children: item.children.filter(child => child.id === 'core'),
        },
        {
          key: 'components-charts-group',
          type: 'itemGroup' as const,
          label: '图表',
          children: item.children.filter(child => child.id !== 'core'),
        },
      ],
    }
  })

  return h(
    IxMenu,
    { ...menuProps, dataSource },
    {
      itemLabel: (item: SiteMenuItem) =>
        item.path
          ? h(resolveComponent('RouterLink'), { to: item.path }, () => [
              item.id && componentNames[item.id]
                ? h('span', { class: 'site-menu-component-name' }, componentNames[item.id])
                : undefined,
              item.name,
            ])
          : 'label' in item
            ? item.label
            : undefined,
    },
  )
}

export default {
  renderers: {
    layoutSiderContent: renderSiderMenu,
    layoutSiderFooter: () => h(ThemeControl),
    layoutHeaderExtra: () => h(ThemeControl),
  },
}
