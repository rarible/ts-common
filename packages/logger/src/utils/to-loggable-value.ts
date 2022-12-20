import stringify from "json-stringify-safe"
import type { LoggableValue } from "../domain"
import { isError } from "./is-error"

export function toLoggableValue(x: unknown): LoggableValue {
	if (isError(x)) return `${x}`
	return stringify(x)
}
