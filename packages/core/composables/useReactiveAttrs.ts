import { computed, getCurrentInstance, isVue2, onBeforeUpdate, shallowRef } from 'vue-demi'
import type { ComputedRef, ShallowRef } from 'vue-demi'

function normalizeAttr(key: string) {
  if (key.startsWith('aria-') || key.startsWith('data-')) return key
  return key.replace(/-([a-z])/g, (_, char: string) => char.toUpperCase())
}

// Vue leaves undeclared template bindings in kebab-case. Normalize native
// ECharts options and wrapper controls before any plot reads the snapshot.
export function useReactiveAttrs(
  attrs: Record<string, unknown>,
): ComputedRef<Record<string, unknown>> | ShallowRef<Record<string, unknown>> {
  const instance = getCurrentInstance()?.proxy
  const read = () =>
    Object.fromEntries(
      Object.entries(isVue2 && instance ? instance.$attrs : attrs).map(([key, value]) => [
        normalizeAttr(key),
        value,
      ]),
    )
  // Vue 2 replaces reactive $attrs, but an attrs-only change need not render this
  // component. Read $attrs directly so computations track additions/removals too.
  if (isVue2 && instance) {
    return computed(read)
  }
  const snapshot = shallowRef(read())
  onBeforeUpdate(() => {
    const next = read()
    const previous = snapshot.value
    if (
      Object.keys(previous).length !== Object.keys(next).length ||
      Object.keys(next).some(key => !Object.is(previous[key], next[key]))
    ) {
      // Replace the complete snapshot to invalidate consumers when keys change.
      snapshot.value = next
    }
  })
  return snapshot
}
