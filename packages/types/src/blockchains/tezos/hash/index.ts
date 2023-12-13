import type { AbstractTransactionHash } from "../../common/hash"
import { InvalidTransactionHashError } from "../../common/hash"
import { BlockchainLayer1Enum } from "../../union/enum"
import { createLayer1fulValidator } from "../../common/common"

export type TezosTransactionHash = AbstractTransactionHash<BlockchainLayer1Enum.TEZOS>

// Tezos transaction hashes are Base58 encoded strings, typically 51 characters long, starting with 'o'.
export const tezosTransactionHashRegexp = /^o[1-9A-HJ-NP-Za-km-z]{50}$/

export function isTezosTransactionHash(raw: string): raw is TezosTransactionHash {
  return tezosTransactionHashRegexp.test(raw)
}

export const tezosTransactionHashValidator = createLayer1fulValidator(
  BlockchainLayer1Enum.TEZOS,
  isTezosTransactionHash,
)

export function toTezosTransactionHash(raw: string): TezosTransactionHash {
  const safe = toTezosTransactionHashSafe(raw)
  if (!safe) throw new InvalidTransactionHashError(BlockchainLayer1Enum.TEZOS, raw)
  return safe
}

export function toTezosTransactionHashSafe(raw: string): TezosTransactionHash | undefined {
  if (isTezosTransactionHash(raw)) return raw
  return undefined
}
