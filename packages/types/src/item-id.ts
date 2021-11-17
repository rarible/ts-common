import { isRealBlockchainSpecified } from "./blockchains"

export type ItemId = string & {
	"__IS_ITEM_ID__": true
}

export function toItemId(value: string): ItemId {
	if (!isRealBlockchainSpecified(value)) {
		throw new Error(`Not an ItemId: ${value}`)
	}
	return value as ItemId
}
