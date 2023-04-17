import type { EVMAddress } from "../evm"
import type { FlowAddress } from "../flow"
import type { BlockchainEnum } from "../union"

export interface AddressByBlockchain extends Record<BlockchainEnum, string> {
  [BlockchainEnum.ETHEREUM]: EVMAddress
  [BlockchainEnum.POLYGON]: EVMAddress
  [BlockchainEnum.IMMUTABLEX]: EVMAddress
  [BlockchainEnum.FLOW]: FlowAddress
  [BlockchainEnum.SOLANA]: string
  [BlockchainEnum.TEZOS]: string
}

/**
 * Vanilla blockchain address format
 */

export type Address = AddressByBlockchain[BlockchainEnum]
