import { randomBinary } from "../../../common/binary/index.js"
import type { AbstractAddress } from "../../common/address.js"
import { InvalidAddressError } from "../../common/address.js"
import { createLayer1fulValidator } from "../../common/common.js"
import { BlockchainLayer1Enum } from "../../union/enum/index.js"

export type EVMAddress = AbstractAddress<BlockchainLayer1Enum.ETHEREUM> & {
  __IS_EVM_ADDRESS__: true
}

export const evmAddressRegExp = new RegExp(/^0x[a-fA-F0-9]{40}$/)

export function isEVMAddress(raw: string): raw is EVMAddress {
  return evmAddressRegExp.test(raw)
}

export const evmAddressValidator = createLayer1fulValidator(BlockchainLayer1Enum.ETHEREUM, isEVMAddress)

/**
 * Check and convert EVM-compatible addresses
 * @note it also convert it to lowercase
 */

export function toEVMAddress(value: string): EVMAddress {
  const parsed = toEVMAddressSafe(value)
  if (!parsed) throw new InvalidAddressError(BlockchainLayer1Enum.ETHEREUM, value)
  return parsed
}

function normalizeEVMAddress<T extends string>(str: T): T {
  return str.toLowerCase() as T
}

/**
 * Check and convert EVM-compatible addresses
 * @deprecated please use toEVMAddress instead
 */

export const toEVMAddressStrict = toEVMAddress

export function toEVMAddressSafe(raw: string): EVMAddress | undefined {
  if (isEVMAddress(raw)) return normalizeEVMAddress(raw)
  return undefined
}

export const EVM_ZERO_ADDRESS = toEVMAddress("0x0000000000000000000000000000000000000000")

export function randomEVMAddress(): EVMAddress {
  return toEVMAddress(randomBinary(20))
}
