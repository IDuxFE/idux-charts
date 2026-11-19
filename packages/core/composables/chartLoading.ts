import pieIcon from '../assets/loading.svg?raw'
import otherIcon from '../assets/loading-other.svg?raw'
import type { ChartLoadingOptions, ChartProps } from '../types'

const darkColors: Record<string, string> = {
  '#FFFFFF': '#14171C',
  '#F7F9FC': '#1D222B',
  '#EDF1F7': '#2B323E',
  '#E7EBF2': '#353E4C',
  '#E1E5EB': '#465163',
}

/** Encode SVGs as images so gradient IDs stay local and markup never enters the page DOM. */
export function chartLoadingIcon(icon: string, dark: boolean, color?: string) {
  if (!icon.trimStart().startsWith('<svg')) return icon
  const svg = icon.replace(/#[\da-f]{6}/gi, value =>
    color && value.toUpperCase() !== '#FFFFFF'
      ? color
      : dark
        ? (darkColors[value.toUpperCase()] ?? value)
        : value,
  )
  return `data:image/svg+xml;charset=utf-8,${encodeURIComponent(svg)}`
}

/** One overlay per instance, also used by consumers of useChart without IxChart. */
export function createChartLoading() {
  let overlay: HTMLDivElement | undefined
  let host: HTMLElement | undefined
  let previousPosition = ''
  let previousPositionPriority = ''
  let positionedByLoading = false
  let previousBusy: string | null = null

  const remove = () => {
    overlay?.remove()
    overlay = undefined
    if (host) {
      // Preserve positioning supplied by the application while loading was visible.
      if (
        positionedByLoading &&
        host.style.position === 'relative' &&
        host.style.getPropertyPriority('position') === ''
      ) {
        host.style.setProperty('position', previousPosition, previousPositionPriority)
      }
      if (previousBusy === null) host.removeAttribute('aria-busy')
      else host.setAttribute('aria-busy', previousBusy)
      host = undefined
    }
    positionedByLoading = false
  }

  const update = (
    container: HTMLElement,
    loading: boolean | ChartLoadingOptions | undefined,
    option: ChartProps,
  ) => {
    if (!loading) {
      remove()
      return
    }
    const settings = typeof loading === 'object' ? loading : {}
    const dark = option.darkMode === true
    if (host !== container) remove()
    if (!overlay) {
      host = container
      previousPosition = container.style.position
      previousPositionPriority = container.style.getPropertyPriority('position')
      previousBusy = container.getAttribute('aria-busy')
      if (
        !getComputedStyle(container).position ||
        getComputedStyle(container).position === 'static'
      ) {
        container.style.setProperty('position', 'relative')
        positionedByLoading = true
      }
      overlay = document.createElement('div')
      overlay.className = 'ix-chart-loading'
      overlay.setAttribute('role', 'status')
      overlay.setAttribute('aria-live', 'polite')
      overlay.setAttribute('aria-busy', 'true')
      Object.assign(overlay.style, {
        position: 'absolute',
        inset: '0',
        zIndex: '10',
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
        justifyContent: 'center',
        gap: '0',
        overflow: 'hidden',
        boxSizing: 'border-box',
        pointerEvents: 'auto',
      })
      const image = document.createElement('img')
      image.alt = ''
      image.setAttribute('aria-hidden', 'true')
      Object.assign(image.style, {
        width: '90px',
        height: '90px',
        maxWidth: '100%',
        flexShrink: '1',
        minHeight: '0',
      })
      overlay.append(image, document.createElement('span'))
      container.append(overlay)
    }
    container.setAttribute('aria-busy', 'true')
    const background =
      typeof option.backgroundColor === 'string' && option.backgroundColor !== 'transparent'
        ? option.backgroundColor
        : dark
          ? '#0A0C0F'
          : '#FFFFFF'
    Object.assign(overlay.style, {
      background: settings.maskColor ?? background,
      color: settings.textColor ?? (dark ? '#F4F8FF' : '#6A707D'),
      fontSize: `${settings.fontSize ?? 12}px`,
      fontFamily: settings.fontFamily ?? 'sans-serif',
    })
    const series = Array.isArray(option.series) ? option.series[0] : option.series
    const icon = settings.icon ?? (!series?.type || series.type === 'pie' ? pieIcon : otherIcon)
    ;(overlay.firstElementChild as HTMLImageElement).src = chartLoadingIcon(
      icon,
      dark,
      settings.color,
    )
    overlay.lastElementChild!.textContent = settings.text ?? 'Loading...'
  }

  return { update, remove }
}
