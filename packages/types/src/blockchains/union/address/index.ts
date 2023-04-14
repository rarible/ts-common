import { isRealBlockchainSpecified, parseBlockchain, toLayerOneBlockchain, withLayer1Blockchain } from "../enum"
import type { WithLayer1Blockchain } from "../enum"

export type UnionAddress = WithLayer1Blockchain & {
  __IS_UNION_ADDRESS__: true
}

/**
 * Address format of union service
 * Will convert raw address to UnionAddress
 * @note that all blockchains will be converted to layer-1 blockchain
 *
 * @example
 * ETHEREUM:0xd07dc4262bcdbf85190c01c996b4c06a461d2430 -> ETHEREUM:0xd07dc4262bcdbf85190c01c996b4c06a461d2430
 * POLYGON:0xd07dc4262bcdbf85190c01c996b4c06a461d2430 -> ETHEREUM:0xd07dc4262bcdbf85190c01c996b4c06a461d2430
 * FLOW:0x01658d9b94068f3c -> FLOW:0x01658d9b94068f3c
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
