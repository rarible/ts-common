import { isRealBlockchainSpecified } from "./blockchains"

export type CollectionId = string & {
	"__IS_COLLECTION_ID__": true
}

export function toCollectionId(value: string): CollectionId {
	if (!isRealBlockchainSpecified(value)) {
		throw new Error(`Not an CurrencyId: ${value}`)
	}
	return value as CollectionId
}
