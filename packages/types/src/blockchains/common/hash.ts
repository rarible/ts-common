import type { EVMTransactionHash } from "../evm"
import type { FlowTransactionHash } from "../flow"
import type { Blockchain } from "../union"

export interface HashByBlockchain extends Record<Blockchain, string> {
  ETHEREUM: EVMTransactionHash
  POLYGON: EVMTransactionHash
  MANTLE: EVMTransactionHash
  IMMUTABLEX: EVMTransactionHash
  FLOW: FlowTransactionHash
  TEZOS: string
  SOLANA: string
}

/**
 * Vanilla blockchain hash format
 */

export type BlockchainTransactionHash = HashByBlockchain[Blockchain]
