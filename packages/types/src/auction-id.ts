import { isRealBlockchainSpecified } from "./blockchains"

export type AuctionId = string & {
	"__IS_AUCTION_ID__": true
}

export function toAuctionId(value: string): AuctionId {
	if (!isRealBlockchainSpecified(value)) {
		throw new Error(`Not an AuctionId: ${value}`)
	}
	return value as AuctionId
}
