import type { WithBlockchain } from "./blockchains"
import { isRealBlockchainSpecified } from "./blockchains"

export type ContractAddress = WithBlockchain & {
  __IS_CONTRACT_ADDRESS__: true
}

export function toContractAddress(value: string): ContractAddress {
  if (!isRealBlockchainSpecified(value)) {
    throw new Error(`Not a ContractAddress: ${value}`)
  }
  return value as ContractAddress
}
