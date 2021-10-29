import { isBlockchainSpecified } from "./blockchains"

export type UnionAddress = string & {
	"__IS_UNION_ADDRESS__": true
}

export function toUnionAddress(value: string): UnionAddress {
	if (!isBlockchainSpecified(value)) {
		throw new Error(`Not a UnionAddress: ${value}`)
	}
	return value as UnionAddress
}
