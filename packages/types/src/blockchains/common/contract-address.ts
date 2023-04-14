import type { EVMAddress } from "../evm"
import type { FlowAddress } from "../flow"
import type { BlockchainLayer1Enum } from "../union"

export interface ContractAddressByBlockchain extends Record<BlockchainLayer1Enum, string> {
  [BlockchainLayer1Enum.ETHEREUM]: EVMAddress
  [BlockchainLayer1Enum.FLOW]: FlowAddress
  [BlockchainLayer1Enum.SOLANA]: string
  [BlockchainLayer1Enum.TEZOS]: string
}
