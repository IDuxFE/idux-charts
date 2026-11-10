import { computed, unref, ref, watch } from 'vue-demi'
import type { Component, ComputedRef, Ref, UnwrapRef } from 'vue-demi'

import { getAlphaColor } from '@idux/charts-core'
import { graphic, registerPostUpdate } from 'echarts/core'
import type { LineSeriesOption } from 'echarts/charts'

type MaybeRef<T> = UnwrapRef<T> | Ref<UnwrapRef<T>>

export interface LineChartAreaStripeOption {
  /** Stripe color. */
  color?: string
  /** Stripe width. */
  width?: number
  /** Stripe height. */
  height?: number
}

export function useLineChartAreaStripe(
  el: MaybeRef<HTMLElement | Component | undefined>,
  color?: MaybeRef<LineChartAreaStripeOption['color']>,
): {
  lineChartAreaStripeConfig: ComputedRef<{
    areaStyle: {
      color: {
        image: HTMLImageElement
        imageWidth: number
        imageHeight: number
        repeat: 'repeat-x'
      }
    }
  }>
} {
  const options = ref<LineChartAreaStripeOption>({})

  const elRef = computed(() => {
    const elIns = unref(el)
    if (elIns instanceof HTMLElement) {
      return elIns
    }

    if (elIns && '$el' in elIns && elIns.$el instanceof HTMLElement) {
      return elIns.$el
    }

    return elIns as undefined
  })

  const observer = new ResizeObserver(() => {
    options.value = getOptionsByDOM(unref(elRef), unref(color))
  })

  watch(
    [elRef, () => unref(color)],
    ([el, currentColor], _, cleanup) => {
      options.value = getOptionsByDOM(el, currentColor)
      if (el) {
        observer.observe(el)
        cleanup(() => observer.disconnect())
      }
    },
    { immediate: true },
  )

  const lineChartAreaStripeConfig = computed(() => {
    const image = getLineChartAreaStripeImgEl(options.value)
    return {
      areaStyle: {
        color: {
          image,
          // SVG patterns need dimensions before the image finishes decoding,
          // including when theme changes recreate a chart with a cached image.
          imageWidth: image.width,
          imageHeight: image.height,
          repeat: 'repeat-x' as const,
        },
      },
    }
  })

  return {
    lineChartAreaStripeConfig,
  }
}

function getOptionsByDOM(el?: HTMLElement, color?: LineChartAreaStripeOption['color']) {
  return {
    color,
    height: el?.getBoundingClientRect()?.height,
  }
}

/**
 * Create an SVG stripe pattern for the area fill.
 */
export function getLineChartAreaStripeImgEl(options: LineChartAreaStripeOption = {}) {
  const { color = '#458FFF', width = 2, height = 90 } = options
  const stripeWidth = Number.isFinite(width) && width > 0 ? width : 2
  const imgHeight = Number.isFinite(height) && height > 0 ? height : 90

  const imgEl = document.createElement('img')
  const imgWidth = stripeWidth * 2

  imgEl.width = imgWidth
  imgEl.height = imgHeight
  imgEl.src = encodeSvg(
    `
<svg xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink" fill="none" version="1.1" width="${imgWidth}" height="${imgHeight}" viewBox="0 0 ${imgWidth} ${imgHeight}">
  <defs>
    <linearGradient id="color" gradientTransform="rotate(90)">
      <stop offset="0%" stop-color="${getAlphaColor(color, 0.3)}" />
      <stop offset="50%" stop-color="${getAlphaColor(color, 0.2)}" />
      <stop offset="100%" stop-color="${getAlphaColor(color, 0)}" />
    </linearGradient>
  </defs>
  <g>
    <rect x="0" y="0" width="${stripeWidth}" height="${imgHeight}" rx="0" fill="url(#color)"/>
    <rect x="${stripeWidth}" y="0" width="${stripeWidth}" height="${imgHeight}" rx="0" fill="transparent"/>
  </g>
</svg>
`.trim(),
  )

  return imgEl
}

const areaStripeWidth = 2
const areaStripeTileWidth = areaStripeWidth * 2

export function createStackedAreaStripe(color: string) {
  const image = encodeSvg(
    `<svg xmlns="http://www.w3.org/2000/svg" width="${areaStripeTileWidth}" height="1" viewBox="0 0 ${areaStripeTileWidth} 1">
  <rect width="${areaStripeWidth}" height="1" fill="${getAlphaColor(color, 0.3)}"/>
  <rect x="${areaStripeWidth}" width="${areaStripeWidth}" height="1" fill="${getAlphaColor(color, 0.21)}"/>
</svg>`,
  )
  // A vertically repeating tile keeps the tint constant across each stack band.
  return {
    color: { image, imageWidth: areaStripeTileWidth, imageHeight: 1, repeat: 'repeat' as const },
    opacity: 1,
  }
}

function singleAreaStripeImage(color: string, height: number, top: number, bottom: number) {
  return encodeSvg(
    `<svg xmlns="http://www.w3.org/2000/svg" width="${areaStripeTileWidth}" height="${height}" viewBox="0 0 ${areaStripeTileWidth} ${height}">
  <linearGradient id="fade" gradientUnits="userSpaceOnUse" x1="0" y1="${top}" x2="0" y2="${bottom}">
    <stop stop-color="${getAlphaColor(color, 0.3)}"/>
    <stop offset="100%" stop-color="${getAlphaColor(color, 0)}"/>
  </linearGradient>
  <rect width="${areaStripeWidth}" height="${height}" fill="url(#fade)"/>
  <rect x="${areaStripeWidth}" width="${areaStripeWidth}" height="${height}" fill="url(#fade)" opacity="0.7"/>
</svg>`,
  )
}

export function createSingleAreaStripe(color: string) {
  return {
    color: {
      image: singleAreaStripeImage(color, 128, 0, 128),
      imageWidth: areaStripeTileWidth,
      imageHeight: 128,
      repeat: 'repeat' as const,
      fitArea: color,
    },
    opacity: 1,
  }
}

export function installSingleAreaStripe() {
  const pendingFits = new WeakMap<object, () => void>()
  registerPostUpdate((model, api) => {
    const pending = pendingFits.get(api)
    if (pending) {
      api.off('finished', pending)
      pendingFits.delete(api)
    }
    const fits: (() => void)[] = []
    model.eachSeriesByType('line', series => {
      const fill = (series.option as LineSeriesOption).areaStyle?.color
      if (!isAreaStripePattern(fill)) return
      api.getViewOfSeriesModel(series).group.traverse(element => {
        if (element.type !== 'ec-polygon') return
        const shape = element as InstanceType<typeof graphic.Polygon>
        fits.push(() => {
          const { y, height } = shape.getBoundingRect()
          const imageHeight = api.getHeight()
          if (!height || !imageHeight) return
          // The tile covers the whole chart vertically. Its gradient spans just the area.
          const image = singleAreaStripeImage(fill.fitArea, imageHeight, y, y + height)
          if (image === fill.image) return
          // ECharts keeps the original fill object for hover and selection states.
          fill.image = image
          fill.imageHeight = imageHeight
          shape.dirtyStyle()
        })
      })
    })
    if (!fits.length) return
    const fit = () => fits.forEach(update => update())
    fit()
    // A zoom or update can animate the native polygon from its previous bounds.
    const finish = () => {
      api.off('finished', finish)
      pendingFits.delete(api)
      fit()
    }
    pendingFits.set(api, finish)
    api.on('finished', finish)
  })
}

function isAreaStripePattern(
  fill: unknown,
): fill is ReturnType<typeof createSingleAreaStripe>['color'] {
  return !!fill && typeof fill === 'object' && 'fitArea' in fill && typeof fill.fitArea === 'string'
}

function encodeSvg(svgStr: string) {
  const encodedSvg = svgStr
    .replace(/"/g, "'")
    .replace(/%/g, '%25')
    .replace(/#/g, '%23')
    .replace(/{/g, '%7B')
    .replace(/}/g, '%7D')
    .replace(/</g, '%3C')
    .replace(/>/g, '%3E')

  return `data:image/svg+xml,${encodedSvg}`
}
