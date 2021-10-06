export type UnionAddress = string & {
	"__IS_UNION_ADDRESS__": true
}

export function toUnionAddress(value: string): UnionAddress {
	return value as UnionAddress
}
