import type { InjectionKey, Ref } from 'vue-demi'
import type { ChartTheme } from '../types'

/** Reactive application default; an explicit chart theme takes precedence. */
export const CHART_THEME_TOKEN: InjectionKey<ChartTheme | Ref<ChartTheme>> =
  Symbol('CHART_THEME_TOKEN')
