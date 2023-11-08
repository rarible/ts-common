import type { WithBlockchain } from "../../blockchains"
import { EVM_ZERO_ADDRESS, isRealBlockchainSpecified } from "../../blockchains"

export type CurrencyId = WithBlockchain & {
  __IS_CURRENCY_ID__: true
}

/**
 * Convert string to {@link CurrencyId}. Examples:
 *
 * - "ETHEREUM:native" for ETH
 * - "ETHEREUM:0xc02aaa39b223fe8d0a0e5c4f27ead9083c756cc2" for WETH
 * - "POLYGON:native" for Matic
 * @param value string value to convert
 */
export function toCurrencyId(value: string): CurrencyId {
  if (!isRealBlockchainSpecified(value)) {
    throw new Error(`Not an CurrencyId: ${value}`)
  }
  return value.replace("native", EVM_ZERO_ADDRESS) as CurrencyId
}
