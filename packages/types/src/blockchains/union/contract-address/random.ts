import type { AbstractAddress } from "../../common"
import { randomEVMAddress } from "../../evm"
import { randomFlowContractAddress } from "../../flow"
import { randomSolanaAddress } from "../../solana"
import { randomTezosContractAddress } from "../../tezos"
import { BlockchainLayer1Enum } from "../enum"

type Dictionary = {
  [K in BlockchainLayer1Enum]: () => AbstractAddress<K>
}

const dictionary: Dictionary = {
  [BlockchainLayer1Enum.ETHEREUM]: randomEVMAddress,
  [BlockchainLayer1Enum.FLOW]: randomFlowContractAddress,
  [BlockchainLayer1Enum.SOLANA]: randomSolanaAddress,
  [BlockchainLayer1Enum.TEZOS]: randomTezosContractAddress,
}

export function getRandomContractAddress<T extends BlockchainLayer1Enum>(blockchain: T): AbstractAddress<T> {
  const fn = dictionary[blockchain]
  if (!fn) throw new Error(`Unhandled blockchain - ${blockchain}`)
  return fn()
}
