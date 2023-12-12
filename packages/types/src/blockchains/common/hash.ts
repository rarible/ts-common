import type { EVMTransactionHash } from "../evm"
import type { FlowTransactionHash } from "../flow"
import type { BlockchainEnum } from "../union"

export interface HashByBlockchain extends Record<BlockchainEnum, string> {
  [BlockchainEnum.ETHEREUM]: EVMTransactionHash
  [BlockchainEnum.POLYGON]: EVMTransactionHash
  [BlockchainEnum.MANTLE]: EVMTransactionHash
  [BlockchainEnum.ARBITRUM]: EVMTransactionHash
  [BlockchainEnum.IMMUTABLEX]: EVMTransactionHash
  [BlockchainEnum.FLOW]: FlowTransactionHash
  [BlockchainEnum.TEZOS]: string
  [BlockchainEnum.SOLANA]: string
}

/**
 * Vanilla blockchain hash format
 */

export type BlockchainTransactionHash = HashByBlockchain[BlockchainEnum]
