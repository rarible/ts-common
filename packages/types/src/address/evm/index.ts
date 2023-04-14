import { randomBinary } from "../../binary"

export type EVMAddress = string & {
  __IS_ADDRESS__: true
}

/**
 * Check and convert EVM-compatible addresses
 * @note it also convert it to lowercase
 */

export function toEVMAddress(value: string): EVMAddress {
  let hex: string
  if (value.startsWith("0x")) {
    hex = value.substring(2).toLowerCase()
  } else {
    hex = value.toLowerCase()
  }
  const re = /[0-9a-f]{40}/g
  if (re.test(hex)) {
    return `0x${hex}` as EVMAddress
  } else {
    throw new Error(`not an address: ${value}`)
  }
}

export function toEVMAddressSafe(raw: string): EVMAddress | undefined {
  try {
    return toEVMAddress(raw)
  } catch (error) {
    return undefined
  }
}

export const ZERO_ADDRESS = toEVMAddress("0x0000000000000000000000000000000000000000")

export function randomAddress() {
  return toEVMAddress(randomBinary(20))
}
