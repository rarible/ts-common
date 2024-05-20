import type { AbstractAddress } from "../../common/index.js"
import { randomEVMAddress } from "../../evm/index.js"
import { randomFlowContractAddress } from "../../flow/contract-address/index.js"
import { randomSolanaAddress } from "../../solana/address/index.js"
import { randomTezosContractAddress } from "../../tezos/contract-address/index.js"
import { randomAptosAddress } from "../../aptos/address/index.js"
import { BlockchainLayer1Enum } from "../enum/domain.js"

type Dictionary = {
  [K in BlockchainLayer1Enum]: () => AbstractAddress<K>
}

const dictionary: Dictionary = {
  [BlockchainLayer1Enum.ETHEREUM]: randomEVMAddress,
  [BlockchainLayer1Enum.FLOW]: randomFlowContractAddress,
  [BlockchainLayer1Enum.SOLANA]: randomSolanaAddress,
  [BlockchainLayer1Enum.TEZOS]: randomTezosContractAddress,
  [BlockchainLayer1Enum.APTOS]: randomAptosAddress,
}

export function getRandomContractAddress<T extends BlockchainLayer1Enum>(blockchain: T): AbstractAddress<T> {
  const fn = dictionary[blockchain]
  if (!fn) throw new Error(`Unhandled blockchain - ${blockchain}`)
  return fn()
}
