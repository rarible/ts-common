import type { EVMAddress } from "../evm"
import type { FlowAddress } from "../flow"
import type { BlockchainEnum } from "../union"

export interface ContractAddressByBlockchain extends Record<BlockchainEnum, string> {
  [BlockchainEnum.ETHEREUM]: EVMAddress
  [BlockchainEnum.POLYGON]: EVMAddress
  [BlockchainEnum.IMMUTABLEX]: EVMAddress
  [BlockchainEnum.FLOW]: FlowAddress
  [BlockchainEnum.SOLANA]: string
  [BlockchainEnum.TEZOS]: string
}
