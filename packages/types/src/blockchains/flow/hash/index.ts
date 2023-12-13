import type { AbstractTransactionHash } from "../../common/hash"
import { InvalidTransactionHashError } from "../../common/hash"
import { BlockchainLayer1Enum } from "../../union/enum"
import { createLayer1fulValidator } from "../../common/common"

export type FlowTransactionHash = AbstractTransactionHash<BlockchainLayer1Enum.FLOW> & {
  __IS_FLOW_TRANSACTION_HASH__: true
}

export const flowTransactionHashRegExp = /^[a-f0-9]{64}$/

export function isFlowTransactionHash(raw: string): raw is FlowTransactionHash {
  return flowTransactionHashRegExp.test(raw)
}

export const flowTransactionHashValidator = createLayer1fulValidator(BlockchainLayer1Enum.FLOW, isFlowTransactionHash)

export function toFlowTransactionHash(raw: string) {
  const safe = toFlowTransactionHashSafe(raw)
  if (!safe) throw new InvalidTransactionHashError(BlockchainLayer1Enum.FLOW, raw)
  return safe
}
export function toFlowTransactionHashSafe(raw: string) {
  if (isFlowTransactionHash(raw)) return raw
  return undefined
}
