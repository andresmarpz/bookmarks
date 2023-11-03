export function isClient() {
  return typeof global.window !== "undefined"
}
