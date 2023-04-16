import { randomBinary } from "../../../common/binary"

// example: 0x01658d9b94068f3c
const regexp = new RegExp(/^0*x*[0-9a-f]{16}$/)

export type FlowAddress = string & {
  __IS_FLOW_ADDRESS__: true
}

export function toFlowAddress(value: string): FlowAddress {
  if (regexp.test(value)) {
    return value as FlowAddress
  } else {
    throw new Error(`not an flow address: ${value}`)
  }
}

export function toFlowAddressSafe(raw: string): FlowAddress | undefined {
  try {
    return toFlowAddress(raw)
  } catch (err) {
    return undefined
  }
}

export const FLOW_ZERO_ADDRESS = toFlowAddress("0x0000000000000000")

export function randomFlowAddress() {
  return toFlowAddress(randomBinary(8))
}
