import type { AbstractAddress } from "../../common"
import { randomEVMAddress } from "../../evm"
import { randomFlowAddress } from "../../flow"
import { randomSolanaAddress } from "../../solana"
import { randomTezosAddress } from "../../tezos"
import { BlockchainLayer1Enum } from "../enum"

type Dictionary = {
  [K in BlockchainLayer1Enum]: () => AbstractAddress<K>
}

const dictionary: Dictionary = {
  [BlockchainLayer1Enum.ETHEREUM]: randomEVMAddress,
  [BlockchainLayer1Enum.FLOW]: randomFlowAddress,
  [BlockchainLayer1Enum.SOLANA]: randomSolanaAddress,
  [BlockchainLayer1Enum.TEZOS]: randomTezosAddress,
}

export function getRandomAddress<T extends BlockchainLayer1Enum>(blockchain: T): AbstractAddress<T> {
  const fn = dictionary[blockchain]
  if (!fn) throw new Error(`Unhandled blockchain - ${blockchain}`)
  return fn()
}
