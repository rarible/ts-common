import { isRealBlockchainSpecified } from "./blockchains/index.js"

/**
 * @deprecated will be replaced in 0.11.0.
 * Please use `import { UnionContractAddress } from "@rarible/types"`
 */

export type ContractAddress = string & {
  __IS_CONTRACT_ADDRESS__: true
}

/**
 * @deprecated will be replaced in 0.11.0.
 * Please use `import { toUnionContractAddress } from "@rarible/types"`
 */

export function toContractAddress(value: string): ContractAddress {
  if (!isRealBlockchainSpecified(value)) {
    throw new Error(`Not a ContractAddress: ${value}`)
  }
  return value as unknown as ContractAddress
}
