import { computed, ref, watch } from 'vue'
import { getAlphaColor, getThemeTokens } from '@idux/components/theme'
import { merge } from 'lodash-es'
import { seerTheme } from '@idux/charts'

const storageKey = 'idux-charts-theme'
const systemTheme = window.matchMedia('(prefers-color-scheme: dark)')
function savedTheme() {
  try {
    const value = localStorage.getItem(storageKey)
    return value === 'dark' || value === 'light' ? value : undefined
  } catch {
    return undefined
  }
}
// Keep a session preference even when browser storage is unavailable.
let preference = savedTheme()
export const siteTheme = ref(preference ?? (systemTheme.matches ? 'dark' : 'light'))
export const isDark = computed(() => siteTheme.value === 'dark')
export const themeTokens = computed(() =>
  getThemeTokens(isDark.value ? 'dark' : 'default', undefined, undefined),
)
export function toggleTheme() {
  siteTheme.value = isDark.value ? 'light' : 'dark'
  preference = siteTheme.value
  try {
    localStorage.setItem(storageKey, siteTheme.value)
  } catch {
    // Storage can be disabled; switching still works for the current page.
  }
}
const onSystemChange = () => {
  if (!preference) siteTheme.value = systemTheme.matches ? 'dark' : 'light'
}
const onStorage = (event: StorageEvent) => {
  if (event.key === storageKey || event.key === null) {
    preference = savedTheme()
    siteTheme.value = preference ?? (systemTheme.matches ? 'dark' : 'light')
  }
}
systemTheme.addEventListener('change', onSystemChange)
window.addEventListener('storage', onStorage)
const stop = watch(
  isDark,
  dark => {
    for (const [key, value] of Object.entries(themeTokens.value)) {
      if (key.startsWith('color') && typeof value === 'string') {
        const name = key.replace(/[A-Z]/g, letter => `-${letter.toLowerCase()}`)
        document.documentElement.style.setProperty(`--site-${name}`, value)
      }
    }
    document.documentElement.dataset.theme = dark ? 'dark' : 'light'
    document.documentElement.style.colorScheme = dark ? 'dark' : 'light'
  },
  { immediate: true },
)
if (import.meta.hot)
  import.meta.hot.dispose(() => {
    stop()
    systemTheme.removeEventListener('change', onSystemChange)
    window.removeEventListener('storage', onStorage)
  })

export const plotTheme = computed(() => {
  if (!isDark.value) return {}
  const t = themeTokens.value
  return {
    textColor: t.colorText,
    secondaryTextColor: t.colorTextInfo,
    mutedColor: t.colorFillContainerBg,
    borderColor: t.colorBorder,
    splitLineColor: t.colorSeparator,
    splitAreaColor: t.colorInfoContainerBg,
    missingBackgroundColor: getAlphaColor(
      t.colorErrorBg,
      t.alertCompColorAlpha,
      t.colorContainerBg,
    ),
  }
})
export const chartTheme = computed(() => {
  if (!isDark.value) return 'seer'
  const t = themeTokens.value
  const axis = {
    axisLine: { lineStyle: { color: t.colorSeparator } },
    axisTick: { lineStyle: { color: t.colorSeparator } },
    axisLabel: { color: t.colorTextInfo },
    splitLine: { lineStyle: { color: t.colorSeparator } },
    nameTextStyle: { color: t.colorTextInfo },
  }
  return merge({}, seerTheme, {
    darkMode: true,
    backgroundColor: 'transparent',
    textStyle: { color: t.colorText },
    title: { textStyle: { color: t.colorTextTitle }, subtextStyle: { color: t.colorTextInfo } },
    legend: { textStyle: { color: t.colorText }, inactiveColor: t.colorTextDisabled },
    tooltip: {
      backgroundColor: t.colorContainerBg,
      borderColor: t.colorBorder,
      textStyle: { color: t.colorText },
      axisPointer: { lineStyle: { color: t.colorSeparator } },
    },
    pie: { itemStyle: { borderColor: t.colorContainerBg }, label: { color: t.colorText } },
    bar: { label: { color: t.colorTextInfo } },
    line: { label: { color: t.colorTextInfo } },
    categoryAxis: axis,
    valueAxis: axis,
  })
})
