import type { WithBlockchain } from "../enum"
import { isRealBlockchainSpecified } from "../enum"

/**
 * Contract address format of union service
 *
 * @example
 * ETHEREUM:0xd07dc4262bcdbf85190c01c996b4c06a461d2430
 * POLYGON:0xd07dc4262bcdbf85190c01c996b4c06a461d2430
 * FLOW:A.0x01658d9b94068f3c.CommonNFT
 */

export type UnionContractAddress = WithBlockchain & {
  __IS_CONTRACT_ADDRESS__: true
}

export function toUnionContractAddress(value: string): UnionContractAddress {
  if (!isRealBlockchainSpecified(value)) {
    throw new Error(`Not a ContractAddress: ${value}`)
  }
  return value as UnionContractAddress
}
