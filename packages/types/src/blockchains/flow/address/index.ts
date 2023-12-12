import { randomBinary } from "../../../common/binary"

// example: 0x01658d9b94068f3c
export const flowAddressRegExp = new RegExp(/^0*x*[0-9a-f]{16}$/)

export type FlowAddress = string & {
  __IS_FLOW_ADDRESS__: true
}

export function toFlowAddress(value: string): FlowAddress {
  const safe = toFlowAddressSafe(value)
  if (!safe) throw new Error(`not an flow address: ${value}`)
  return safe
}

export function isFlowAddress(x: string): x is FlowAddress {
  return flowAddressRegExp.test(x)
}

export function toFlowAddressSafe(raw: string): FlowAddress | undefined {
  if (isFlowAddress(raw)) return raw
  return undefined
}

export const FLOW_ZERO_ADDRESS = toFlowAddress("0x0000000000000000")

export function randomFlowAddress() {
  return toFlowAddress(randomBinary(8))
}
