/** A color swatch with a 1px corner radius at the requested legend dimensions. */
export function createLegendIcon(width = 12, height = 12): string {
  const radius = Math.min(1, width / 2, height / 2)
  return `path://M${radius},0H${width - radius}A${radius},${radius} 0 0 1 ${width},${radius}V${height - radius}A${radius},${radius} 0 0 1 ${width - radius},${height}H${radius}A${radius},${radius} 0 0 1 0,${height - radius}V${radius}A${radius},${radius} 0 0 1 ${radius},0Z`
}
