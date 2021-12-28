export function isError(value: unknown): value is Error {
	return Boolean(value && typeof value === "object" && "stack" in value)
}