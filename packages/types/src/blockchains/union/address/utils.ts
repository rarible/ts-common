import { CustomError } from "@rarible/utils/error/custom/index"
import type { AbstractAddress } from "../../common/address.js"
import { parseBlockchain, parseBlockchainSafe, toLayerOneBlockchain, withLayer1Blockchain } from "../enum/utils.js"
import type { BlockchainEnum, L1BlockchainByBlockchain, WithBlockchain } from "../enum/domain.js"
import { addressValidators } from "./validators.js"

export type UnionAddress<Index extends BlockchainEnum = BlockchainEnum> = WithBlockchain<
  Index,
  AbstractAddress<L1BlockchainByBlockchain[Index]>
> & {
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
  const safe = toUnionAddressSafe(value)
  if (!safe) throw new InvalidUnionAddressError(value)
  return safe
}

export function toUnionAddressSafe(value: string): UnionAddress | undefined {
  if (isUnionAddress(value)) {
    const [blockchain, address] = parseBlockchain(value)
    return withLayer1Blockchain(toLayerOneBlockchain(blockchain), address) as UnionAddress
  }
  return undefined
}

export function isUnionAddress(value: string): value is UnionAddress {
  const parsed = parseBlockchainSafe(value as WithBlockchain)
  if (!parsed) return false
  const [blockchain, address] = parsed
  const layer1 = toLayerOneBlockchain(blockchain)
  const validator = addressValidators[layer1]
  return validator.validate(address)
}

export class InvalidUnionAddressError extends CustomError {
  constructor(address: string) {
    super(`Not a UnionAddress: ${address}`)
  }
}
