import { randomBinary } from "../../../common/binary/index.js"
import type { AbstractAddress } from "../../common/address.js"
import { InvalidAddressError } from "../../common/address.js"
import { createLayer1fulValidator } from "../../common/common.js"
import { BlockchainLayer1Enum } from "../../union/enum/domain.js"

export type FlowAddress = AbstractAddress<BlockchainLayer1Enum.FLOW> & {
  __IS_FLOW_ADDRESS__: true
}

// example: 0x01658d9b94068f3c
export const flowAddressRegExp = new RegExp(/^0*x*[0-9a-f]{16}$/)

export function isFlowAddress(x: string): x is FlowAddress {
  return flowAddressRegExp.test(x)
}

export const flowAddressValidator = createLayer1fulValidator(BlockchainLayer1Enum.FLOW, isFlowAddress)

export function toFlowAddress(value: string): FlowAddress {
  const safe = toFlowAddressSafe(value)
  if (!safe) throw new InvalidAddressError(BlockchainLayer1Enum.FLOW, value)
  return safe
}

export function toFlowAddressSafe(raw: string): FlowAddress | undefined {
  if (isFlowAddress(raw)) return raw
  return undefined
}

export const FLOW_ZERO_ADDRESS = toFlowAddress("0x0000000000000000")

export function randomFlowAddress() {
  return toFlowAddress(randomBinary(8))
}
