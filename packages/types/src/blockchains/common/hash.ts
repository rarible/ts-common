import type { EVMTransactionHash } from "../evm"
import type { BlockchainEnum } from "../union"

export interface HashByBlockchain extends Record<BlockchainEnum, string> {
  [BlockchainEnum.ETHEREUM]: EVMTransactionHash
  [BlockchainEnum.POLYGON]: EVMTransactionHash
  [BlockchainEnum.IMMUTABLEX]: EVMTransactionHash
  [BlockchainEnum.FLOW]: string
  [BlockchainEnum.TEZOS]: string
  [BlockchainEnum.SOLANA]: string
}
