import stringify from "json-stringify-safe"
import type { LoggableValue } from "../domain"
import { fixWithLimit } from "./size-of"
import { isError } from "./is-error"

export function getLoggableMessage(maxByteSize: number, ...values: LoggableValue[]) {
	const fixed = fixWithLimit(values, maxByteSize)
	const optional = fixed.map(p => isError(p) ? `${p}` : stringify(p))
	return optional.length > 0 ? ` ${optional.join(", ")}` : ""
}