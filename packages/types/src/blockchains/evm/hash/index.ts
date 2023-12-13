import type { AbstractTransactionHash } from "../../common/hash"
import { InvalidTransactionHashError } from "../../common/hash"
import { BlockchainLayer1Enum } from "../../union/enum"
import { createLayer1fulValidator } from "../../common/common"

export type EVMTransactionHash = AbstractTransactionHash<BlockchainLayer1Enum.ETHEREUM>

export const evmTransactionHashRegexp = /^0x([A-Fa-f0-9]{64})$/

export function isEVMTransactionHash(raw: string): raw is EVMTransactionHash {
  return evmTransactionHashRegexp.test(raw)
}

export const evmTransactionHashValidator = createLayer1fulValidator(BlockchainLayer1Enum.ETHEREUM, isEVMTransactionHash)

export function toEVMTransactionHash(raw: string): EVMTransactionHash {
  const safe = toEVMTransactionHashSafe(raw)
  if (!safe) throw new InvalidTransactionHashError(BlockchainLayer1Enum.ETHEREUM, raw)
  return safe
}

export function toEVMTransactionHashSafe(raw: string): EVMTransactionHash | undefined {
  if (isEVMTransactionHash(raw)) return raw
  return undefined
}
