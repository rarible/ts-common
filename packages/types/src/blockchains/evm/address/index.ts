import { randomBinary } from "../../../common/binary"
import type { AbstractAddress } from "../../common/address"
import { InvalidAddressError } from "../../common/address"
import { createLayer1fulValidator } from "../../common/common"
import { BlockchainLayer1Enum } from "../../union/enum"

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
  return toEVMAddressStrict(value).toLowerCase() as EVMAddress
}

/**
 * Check and convert EVM-compatible addresses
 * @note instead of toEVMAddress it return original value
 */

export function toEVMAddressStrict(value: string): EVMAddress {
  const safe = toEVMAddressSafe(value)
  if (!safe) throw new InvalidAddressError(BlockchainLayer1Enum.ETHEREUM, value)
  return safe
}

export function toEVMAddressSafe(raw: string): EVMAddress | undefined {
  if (isEVMAddress(raw)) return raw
  return undefined
}

export const EVM_ZERO_ADDRESS = toEVMAddress("0x0000000000000000000000000000000000000000")

export function randomEVMAddress(): EVMAddress {
  return toEVMAddress(randomBinary(20))
}
