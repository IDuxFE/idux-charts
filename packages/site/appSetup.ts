import { createApp } from 'vue'
import { defineComponent, h, onMounted, onBeforeUnmount, ref } from '@idux/archive-app/vue'
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
export default {
  renderers: {
    layoutSiderFooter: () => h(ThemeControl),
    layoutHeaderExtra: () => h(ThemeControl),
  },
}
