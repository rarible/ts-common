import type { EVMTransactionHash } from "../evm"
import type { BlockchainLayer1Enum } from "../union"

export interface HashByBlockchain extends Record<BlockchainLayer1Enum, string> {
  [BlockchainLayer1Enum.ETHEREUM]: EVMTransactionHash
  [BlockchainLayer1Enum.FLOW]: string
  [BlockchainLayer1Enum.TEZOS]: string
  [BlockchainLayer1Enum.SOLANA]: string
}
