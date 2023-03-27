export {}

declare global {
  const __DEV__: boolean
  const __VERSION__: string
  const __BASE_URL__: string

  function setInterval(handler: TimerHandler, timeout?: number, ...arguments: any[]): number
  function setTimeout(handler: TimerHandler, timeout?: number, ...arguments: any[]): number
  function clearInterval(handle?: number): void
  function clearTimeout(handle?: number): void
}
