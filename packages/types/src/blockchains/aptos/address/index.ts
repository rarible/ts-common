import { randomBinary } from "../../../common/binary/index.js"
import type { AbstractAddress } from "../../common/address.js"
import { InvalidAddressError } from "../../common/address.js"
import { createLayer1fulValidator } from "../../common/common.js"
import { BlockchainLayer1Enum } from "../../union/enum/domain.js"

export type AptosAddress = AbstractAddress<BlockchainLayer1Enum.APTOS>

// Regular expression to validate an Aptos address.
// eslint-disable-next-line no-useless-escape
const aptosAddressRegExp = new RegExp(/^0[xX][0-9a-fA-F]{1,66}(\:\:[^:\s]+){0,2}$/)

export function isAptosAddress(address: string): address is AptosAddress {
  return aptosAddressRegExp.test(address)
}

export const aptosAddressValidator = createLayer1fulValidator(BlockchainLayer1Enum.APTOS, isAptosAddress)

export function toAptosAddress(address: string): AptosAddress {
  const safe = toAptosAddressSafe(address)
  if (!safe) throw new InvalidAddressError(BlockchainLayer1Enum.APTOS, address)
  return safe
}

export function toAptosAddressSafe(address: string): AptosAddress | undefined {
  if (isAptosAddress(address)) return address
  return undefined
}

export function randomAptosAddress(): AptosAddress {
  return toAptosAddress(randomBinary(32))
}
