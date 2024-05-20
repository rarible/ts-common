import { CustomError } from "@rarible/utils/error/custom/index"
import type { AbstractContractAddress } from "../../common/contract-address.js"
import type { BlockchainEnum, L1BlockchainByBlockchain, WithBlockchain } from "../enum/domain.js"
import { toLayerOneBlockchain, parseBlockchainSafe } from "../enum/utils.js"
import { contractAddressValidators } from "./validators.js"

/**
 * Contract address format of union service
 *
 * @example
 * ETHEREUM:0xd07dc4262bcdbf85190c01c996b4c06a461d2430
 * POLYGON:0xd07dc4262bcdbf85190c01c996b4c06a461d2430
 * FLOW:A.0x01658d9b94068f3c.CommonNFT
 */

export type UnionContractAddress<Index extends BlockchainEnum = BlockchainEnum> = WithBlockchain<
  Index,
  AbstractContractAddress<L1BlockchainByBlockchain[Index]>
> & {
  __IS_CONTRACT_ADDRESS__: true
}

export function toUnionContractAddress(value: string): UnionContractAddress {
  const safe = toUnionContractAddressSafe(value)
  if (!safe) throw new InvalidUnionContractAddressError(value)
  return safe
}

export function toUnionContractAddressSafe(value: string): UnionContractAddress | undefined {
  if (isUnionContractAddress(value)) return value
  return undefined
}

export function isUnionContractAddress(value: string): value is UnionContractAddress {
  const parsed = parseBlockchainSafe(value as WithBlockchain)
  if (!parsed) return false
  const [blockchain, address] = parsed
  const layer1 = toLayerOneBlockchain(blockchain)
  const validator = contractAddressValidators[layer1]
  return validator.validate(address)
}

export class InvalidUnionContractAddressError extends CustomError {
  constructor(address: string) {
    super(`Not a valid union contract address: ${address}`)
  }
}
