import jsonStringify from "json-stringify-safe"
import sizeOf from "object-sizeof"
import type { LoggerValue } from "../../domain"

export function stringify(maxByteSize: number, x: unknown): LoggerValue {
  if (sizeOf(x) > maxByteSize) return `[too-big-object]`
  if (typeof x === "number") return x
  if (typeof x === "string") return x
  if (typeof x === "undefined") return `[null]`
  if (typeof x === "function") return `[function: ${x.name || "unnamed"}]`
  if (typeof x === "symbol") return `[symbol: ${x.toString() || "unnamed"}]`
  if (typeof x === "object" && x === null) return `[null]`
  if (typeof x === "object" && "stack" in x && "name" in x && "message" in x) return `[${x.name}: ${x.message}]`
  if (Array.isArray(x)) {
    if (x.length > 0) return x.map(x => stringify(maxByteSize, x)).join(", ")
    return `[empty]`
  }
  return jsonStringify(x)
}

export function stringifyObject<T extends Record<string, unknown>>(maxByteSize: number, x: T) {
  return Object.keys(x).reduce((prev, curr) => {
    const key = curr as keyof T
    prev[key] = stringify(maxByteSize, x[key])
    return prev
  }, {} as Record<keyof T, LoggerValue>)
}
