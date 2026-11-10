import { computed, inject, unref } from 'vue-demi'
import type { InjectionKey, Ref } from 'vue-demi'

/** Visual defaults for the built-in Bar and Pie layouts, Radar, Gauge and LiquidFill. */
export interface PlotTheme {
  color?: string
  palette?: string[]
  textColor?: string
  secondaryTextColor?: string
  mutedColor?: string
  borderColor?: string
  splitLineColor?: string
  splitAreaColor?: string
  errorColor?: string
  fontFamily?: string
  numberFontFamily?: string
}

/** Small shared text contract; positioning remains owned by each plot. */
export interface PlotTextStyle {
  color?: string
  fontFamily?: string
  fontSize?: number
  fontWeight?: number | 'normal' | 'bold' | 'bolder' | 'lighter'
  lineHeight?: number
}

export const PLOT_THEME_TOKEN: InjectionKey<PlotTheme | Ref<PlotTheme>> = Symbol('PLOT_THEME_TOKEN')

/** Undefined fields inherit; arrays replace instead of merging by index. */
export function mergePlotTheme(...sources: (PlotTheme | undefined)[]): PlotTheme {
  return Object.assign(
    {},
    ...sources.map(source =>
      Object.fromEntries(Object.entries(source ?? {}).filter(([, value]) => value !== undefined)),
    ),
  )
}

export function usePlotTheme(local: () => PlotTheme | undefined) {
  const provided = inject(PLOT_THEME_TOKEN, undefined)
  return computed(() => mergePlotTheme(unref(provided), local()))
}

/** Convert the public text color to the custom-series graphic fill property. */
export function graphicTextStyle(style: PlotTextStyle) {
  const { color, ...rest } = style
  return { ...rest, ...(color === undefined ? {} : { fill: color }) }
}
