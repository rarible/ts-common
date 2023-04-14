import {
  isRealBlockchainSpecified,
  parseBlockchain,
  toLayerOneBlockchain,
  withLayer1Blockchain,
} from "../../blockchains"
import type { WithLayer1Blockchain } from "../../blockchains"

export type UnionAddress = WithLayer1Blockchain & {
  __IS_UNION_ADDRESS__: true
}

/**
 * Will convert raw address to UnionAddress
 * @note that all blockchains will be converted to layer-1 blockchain
 *
 * 0x0000..000         => ETHEREUM:0x0000..000
 * POLYGON-0x0000..000 => ETHEREUM:0x0000..000
 * FLOW-0x0000..000    => FLOW:0x0000..000
 */

export function toUnionAddress(value: string): UnionAddress {
  if (!isRealBlockchainSpecified(value)) {
    throw new InvalidUnionAddressError(value)
  }
  try {
    const [blockchain, rest] = parseBlockchain(value)
    const layer1 = toLayerOneBlockchain(blockchain)
    return withLayer1Blockchain(layer1, rest) as UnionAddress
  } catch (error) {
    throw new InvalidUnionAddressError(value)
  }
}

export class InvalidUnionAddressError extends Error {
  readonly name = "InvalidUnionAddressError"
  constructor(address: string) {
    super(`Not a UnionAddress: ${address}`)
  }
}
