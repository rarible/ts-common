import type { EVMAddress } from "../evm"
import type { FlowAddress } from "../flow"
import type { Blockchain } from "../union"

export interface AddressByBlockchain extends Record<Blockchain, string> {
  ETHEREUM: EVMAddress
  POLYGON: EVMAddress
  MANTLE: EVMAddress
  IMMUTABLEX: EVMAddress
  FLOW: FlowAddress
  SOLANA: string
  TEZOS: string
}

/**
 * Vanilla blockchain address format
 */

export type BlockchainAddress = AddressByBlockchain[Blockchain]
