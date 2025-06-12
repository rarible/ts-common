import type { AbstractAddress } from "../../common/address.js"
import { randomEVMAddress } from "../../evm/address/index.js"
import { randomFlowAddress } from "../../flow/address/index.js"
import { randomSolanaAddress } from "../../solana/address/index.js"
import { randomAptosAddress } from "../../aptos/address/index.js"
import { BlockchainLayer1Enum } from "../enum/domain.js"

type Dictionary = {
  [K in BlockchainLayer1Enum]: () => AbstractAddress<K>
}

const dictionary: Dictionary = {
  [BlockchainLayer1Enum.ETHEREUM]: randomEVMAddress,
  [BlockchainLayer1Enum.FLOW]: randomFlowAddress,
  [BlockchainLayer1Enum.SOLANA]: randomSolanaAddress,
  [BlockchainLayer1Enum.APTOS]: randomAptosAddress,
}

export function getRandomAddress<T extends BlockchainLayer1Enum>(blockchain: T): AbstractAddress<T> {
  const fn = dictionary[blockchain]
  if (!fn) throw new Error(`Unhandled blockchain - ${blockchain}`)
  return fn()
}
