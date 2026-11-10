import fontData from './assets/D-DIN-PRO-Regular.ttf?inline'

export async function loadDemoFont() {
  const bytes = Uint8Array.from(atob(fontData.split(',')[1]!), char => char.charCodeAt(0))
  const font = new FontFace('D-DIN-PRO', bytes)
  document.fonts.add(font)
  await font.loaded
}
