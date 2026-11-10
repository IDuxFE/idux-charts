import { onBeforeUnmount } from 'vue-demi'

export interface LegendWheelRegion {
  left: number
  top?: number
  bottom?: number
  width: number
  height: number
  scrollBy: (direction: -1 | 1) => void
}

export function useLegendWheel(getRegion: () => LegendWheelRegion | undefined) {
  let host: HTMLElement | undefined

  const onWheel = (event: WheelEvent) => {
    if (
      !host ||
      event.defaultPrevented ||
      event.ctrlKey ||
      !event.deltaY ||
      Math.abs(event.deltaX) > Math.abs(event.deltaY)
    )
      return
    // A scrollable tooltip can sit over part of the legend.
    if (event.target instanceof Element && event.target.closest('.charts-tooltips-columns')) return
    const region = getRegion()
    if (!region) return

    const bounds = host.getBoundingClientRect()
    if (!bounds.width || !bounds.height) return
    const x = ((event.clientX - bounds.left) * host.clientWidth) / bounds.width
    const y = ((event.clientY - bounds.top) * host.clientHeight) / bounds.height
    const top = region.top ?? host.clientHeight - region.height - (region.bottom ?? 0)
    if (x < region.left || x >= region.left + region.width || y < top || y >= top + region.height)
      return

    event.preventDefault()
    event.stopPropagation()
    region.scrollBy(event.deltaY > 0 ? 1 : -1)
  }

  const bind = (element?: HTMLElement) => {
    if (host === element) return
    host?.removeEventListener('wheel', onWheel, true)
    host = element
    host?.addEventListener('wheel', onWheel, { passive: false, capture: true })
  }
  onBeforeUnmount(() => bind())
  return bind
}
