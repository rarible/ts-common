import type { LoggableValue } from "../../domain"

export function sizeOf(value: LoggableValue): number {
	if (typeof value === "boolean") return 4
	if (typeof value === "number") return 8
	if (typeof value === "string") return value.length * 2
	if (typeof value === "object") {
		if (!value) return 0
		return Object
			.keys(value)
			.reduce((total, key) => sizeOf(key) + sizeOf(value[key as keyof typeof value]) + total, 0)
	}
	return 0
}

export function fixWithLimit<T extends LoggableValue[]>(
	value: T, bytesLimit: number,
) {
	return value.map(x => {
		try {
			const size = sizeOf(x)
			if (size > bytesLimit) {
				return "[Byte limit]"
			}
			return x
		} catch (error) {
			return "[Too big object]"
		}
	})
}