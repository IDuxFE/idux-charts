import {
  computed,
  defineComponent,
  getCurrentInstance,
  h,
  watch,
  type PropType,
  type VNode,
} from '@idux/archive-app/vue'
import { IxRadioGroup } from '@idux/archive-app/components'
import type { RouteLocationNormalizedLoaded, Router } from 'vue-router'

interface PageHeaderData {
  title?: string
  description?: string
  route?: RouteLocationNormalizedLoaded
  tabs: { id: string; name: string }[]
  activeTabId?: string
  setActiveTabId: (id: string) => void
}

const tabQueryValue = (id: string) => id.replace(/\.md$/i, '').toLowerCase()

const PageHeader = defineComponent({
  props: {
    data: { type: Object as PropType<PageHeaderData>, required: true },
  },
  setup(props) {
    // Use Archive's router instance: it bundles its own Vue and router runtimes.
    const router = getCurrentInstance()!.appContext.config.globalProperties.$router as Router
    const activeTab = computed(() => {
      const { route, tabs } = props.data
      return tabs.find(tab => tabQueryValue(tab.id) === route?.query.tab) ?? tabs[0]
    })

    watch(
      [() => activeTab.value?.id, () => props.data.activeTabId],
      ([id]) => {
        if (id && id !== props.data.activeTabId) props.data.setActiveTabId(id)
      },
      { immediate: true },
    )

    const selectTab = (id: string) => {
      if (id === activeTab.value?.id) return
      const { route, tabs } = props.data
      const query = { ...route!.query }
      if (id === tabs[0]?.id) delete query.tab
      else query.tab = tabQueryValue(id)
      void router.push({ path: route!.path, query, hash: route!.hash })
    }

    return () => [
      h('h1', { class: 'archive-app__page__title' }, props.data.title),
      h('p', { class: 'archive-app__page__description' }, props.data.description),
      h(IxRadioGroup, {
        value: activeTab.value?.id,
        dataSource: props.data.tabs.map(tab => ({ label: tab.name, value: tab.id })),
        size: 'lg',
        mode: 'primary',
        gap: 4,
        buttoned: true,
        'onUpdate:value': selectTab,
      }),
    ]
  },
})

export function renderPageHeader(data: PageHeaderData, defaultNodes: VNode[]) {
  return data.route && data.tabs.length ? h(PageHeader, { data }) : defaultNodes
}
