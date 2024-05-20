import type { AbstractTransactionHash } from "../../common/hash.js"
import { InvalidTransactionHashError } from "../../common/hash.js"
import { BlockchainLayer1Enum } from "../../union/enum/domain.js"
import { createLayer1fulValidator } from "../../common/common.js"

export type SolanaTransactionHash = AbstractTransactionHash<BlockchainLayer1Enum.SOLANA>

// Solana transaction hashes are Base58 encoded strings, typically 88 characters long.
export const solanaTransactionHashRegexp = new RegExp(/^[1-9A-HJ-NP-Za-km-z]{88}$/)

export function isSolanaTransactionHash(raw: string): raw is SolanaTransactionHash {
  return solanaTransactionHashRegexp.test(raw)
}

export const solanaTransactionHashValidator = createLayer1fulValidator(
  BlockchainLayer1Enum.SOLANA,
  isSolanaTransactionHash,
)

export function toSolanaTransactionHash(raw: string): SolanaTransactionHash {
  const safe = toSolanaTransactionHashSafe(raw)
  if (!safe) throw new InvalidTransactionHashError(BlockchainLayer1Enum.SOLANA, raw)
  return safe
}

export function toSolanaTransactionHashSafe(raw: string): SolanaTransactionHash | undefined {
  if (isSolanaTransactionHash(raw)) return raw
  return undefined
}
