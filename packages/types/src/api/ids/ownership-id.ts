import { isRealBlockchainSpecified } from "../../blockchains/index.js"
import type { WithBlockchain } from "../../blockchains/index.js"

export type OwnershipId = WithBlockchain & {
  __IS_OWNERSHIP_ID__: true
}

export function toOwnershipId(value: string): OwnershipId {
  if (!isRealBlockchainSpecified(value)) {
    throw new Error(`Not an OwnershipId: ${value}`)
  }
  return value as OwnershipId
}
