import { isRealBlockchainSpecified } from "../../blockchains/index.js"
import type { WithBlockchain } from "../../blockchains/index.js"

export type CollectionId = WithBlockchain & {
  __IS_COLLECTION_ID__: true
}

export function toCollectionId(value: string): CollectionId {
  if (!isRealBlockchainSpecified(value)) {
    throw new Error(`Not an CollectionId: ${value}`)
  }
  return value as CollectionId
}
