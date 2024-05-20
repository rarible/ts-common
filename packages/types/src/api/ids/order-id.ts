import { isRealBlockchainSpecified } from "../../blockchains/index.js"
import type { WithBlockchain } from "../../blockchains/index.js"

export type OrderId = WithBlockchain & {
  __IS_ORDER_ID__: true
}

export function toOrderId(value: string): OrderId {
  if (!isRealBlockchainSpecified(value)) {
    throw new Error(`Not an OrderId: ${value}`)
  }
  return value as OrderId
}
