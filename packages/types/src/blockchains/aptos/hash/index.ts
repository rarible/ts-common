import type { AbstractTransactionHash } from "../../common/hash"
import { InvalidTransactionHashError } from "../../common/hash"
import { BlockchainLayer1Enum } from "../../union/enum"
import { createLayer1fulValidator } from "../../common/common"

export type AptosTransactionHash = AbstractTransactionHash<BlockchainLayer1Enum.APTOS>

// Aptos transaction hashes are hex encoded strings, typically 66 characters long.
export const aptosTransactionHashRegexp = new RegExp(/^0[xX][0-9a-fA-F]{64}$/)

export function isAptosTransactionHash(raw: string): raw is AptosTransactionHash {
  return aptosTransactionHashRegexp.test(raw)
}

export const aptosTransactionHashValidator = createLayer1fulValidator(
  BlockchainLayer1Enum.APTOS,
  isAptosTransactionHash,
)

export function toAptosTransactionHash(raw: string): AptosTransactionHash {
  const safe = toAptosTransactionHashSafe(raw)
  if (!safe) throw new InvalidTransactionHashError(BlockchainLayer1Enum.APTOS, raw)
  return safe
}

export function toAptosTransactionHashSafe(raw: string): AptosTransactionHash | undefined {
  if (isAptosTransactionHash(raw)) return raw
  return undefined
}
