import sizeOf from "object-sizeof"
import stringifyJson from "json-stringify-safe"
import { isErrorLike } from "@rarible/utils/error/utils/index"
import type { LoggerValue } from "../../domain"

const UNKNOWN = `[unknown]` as const

export function stringifyObject<T extends Record<string, unknown>>(maxByteSize: number, object: T, indent: number = 2) {
  return Object.keys(object).reduce(
    (prev, curr) => {
      const key = curr as keyof T
      const value = object[key]
      const result = stringify(value, indent)
      prev[key] = sizeOf(result) > maxByteSize ? `[too-big-object]` : result
      return prev
    },
    {} as Record<keyof T, LoggerValue>,
  )
}

export function stringify(value: unknown, indent: number): LoggerValue {
  const loggableValue = toLoggerValue(value)
  if (loggableValue !== UNKNOWN) return loggableValue
  if (typeof value === "object") return stringifyJson(value, serializer, indent)
  return UNKNOWN
}

function toLoggerValue(value: unknown): LoggerValue | typeof UNKNOWN {
  if (typeof value === "number") return value
  if (typeof value === "boolean") return `${value}`
  if (typeof value === "string") return value
  if (typeof value === "undefined") return `[undefined]`
  if (typeof value === "bigint") return value.toString()
  if (typeof value === "object" && value === null) return `[null]`
  if (typeof value === "symbol") return `[symbol: ${value.toString() || "unnamed"}]`
  if (typeof value === "function") return `[function: ${value.name || "unnamed"}]`
  if (value instanceof Date) return `[date: ${value.toISOString()}]`
  if (isErrorLike(value)) return `[${value.name}: ${value.message}]`
  return UNKNOWN
}

function serializer(_: string, value: unknown) {
  const loggableValue = toLoggerValue(value)
  if (loggableValue === UNKNOWN) return value
  return loggableValue
}
