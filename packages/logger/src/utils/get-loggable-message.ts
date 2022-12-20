import { fixWithLimit } from "./size-of"
import { toLoggableValue } from "./to-loggable-value"

export function getLoggableMessage(maxByteSize: number, ...values: any[]) {
	const fixed = fixWithLimit(values, maxByteSize)
	const optional = fixed.map(p => toLoggableValue(p))
	return optional.length > 0 ? ` ${optional.join(", ")}` : ""
}