import type { WithBlockchain } from "../../blockchains"
import { isRealBlockchainSpecified } from "../../blockchains"

export type CurrencyId = WithBlockchain & {
  __IS_CURRENCY_ID__: true
}

export function toCurrencyId(value: string): CurrencyId {
  if (!isRealBlockchainSpecified(value)) {
    throw new Error(`Not an CurrencyId: ${value}`)
  }
  return value as CurrencyId
}
