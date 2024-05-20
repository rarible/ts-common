import { randomBinary } from "./common/binary/index.js"

/**
 * @deprecated will be replaced in 0.11.0.
 * Please use `import { EVMAddress } from "@rarible/types"`
 */

export type Address = string & {
  __IS_ADDRESS__: true
}

/**
 * @deprecated will be replaced in 0.11.0.
 * Please use `import { toEVMAddress } from "@rarible/types"`
 */

export function toAddress(value: string): Address {
  let hex: string
  if (value.startsWith("0x")) {
    hex = value.substring(2).toLowerCase()
  } else {
    hex = value.toLowerCase()
  }
  const re = /[0-9a-f]{40}/g
  if (re.test(hex)) {
    return `0x${hex}` as Address
  } else {
    throw new Error(`not an address: ${value}`)
  }
}

/**
 * @deprecated will be replaced in 0.11.0.
 * Please use `import { EVM_ZERO_ADDRESS } from "@rarible/types"`
 */

export const ZERO_ADDRESS = toAddress("0x0000000000000000000000000000000000000000")

/**
 * @deprecated will be replaced in 0.11.0.
 * Please use `import { randomEVMAddress } from "@rarible/types"`
 */

export function randomAddress() {
  return toAddress(randomBinary(20))
}
