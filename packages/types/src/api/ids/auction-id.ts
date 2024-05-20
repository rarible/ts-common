import { isRealBlockchainSpecified } from "../../blockchains/index.js"
import type { WithBlockchain } from "../../blockchains/index.js"

export type AuctionId = WithBlockchain & {
  __IS_AUCTION_ID__: true
}

export function toAuctionId(value: string): AuctionId {
  if (!isRealBlockchainSpecified(value)) {
    throw new Error(`Not an AuctionId: ${value}`)
  }
  return value as AuctionId
}
