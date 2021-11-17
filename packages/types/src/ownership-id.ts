import { isRealBlockchainSpecified } from "./blockchains"

export type OwnershipId = string & {
	"__IS_OWNERSHIP_ID__": true
}

export function toOwnershipId(value: string): OwnershipId {
	if (!isRealBlockchainSpecified(value)) {
		throw new Error(`Not an OwnershipId: ${value}`)
	}
	return value as OwnershipId
}
