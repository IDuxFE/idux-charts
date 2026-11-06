import fontData from './assets/D-DIN-PRO-Regular.ttf?inline'

// The CLI showcase uses this same numeric font. Register a separate family to
// preserve the established examples' font fallback. Binary construction loads
// the bundled font before any chart measures text, without delaying other demos.
export async function loadDemoFont(family = 'IDuxChartDemoDIN') {
  const bytes = Uint8Array.from(atob(fontData.split(',')[1]!), char => char.charCodeAt(0))
  const font = new FontFace(family, bytes)
  document.fonts.add(font)
  await font.loaded
}
