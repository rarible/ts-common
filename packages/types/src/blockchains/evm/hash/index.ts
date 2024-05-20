import type { AbstractTransactionHash } from "../../common/hash.js"
import { InvalidTransactionHashError } from "../../common/hash.js"
import { BlockchainLayer1Enum } from "../../union/enum/domain.js"
import { createLayer1fulValidator } from "../../common/common.js"

export type EVMTransactionHash = AbstractTransactionHash<BlockchainLayer1Enum.ETHEREUM> & {
  __IS_EVM_TRANSACTION_HASH__: true
}

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
