export function isError(value: unknown): value is Error {
  if (typeof value === "object" && value !== null && "stack" in value && "name" in value && "message" in value) {
    return true
  }
  return false
}
