import { randomBinary } from "../../../common/binary/index.js"
import type { AbstractAddress } from "../../common/address.js"
import { InvalidAddressError } from "../../common/address.js"
import { createLayer1fulValidator } from "../../common/common.js"
import { BlockchainLayer1Enum } from "../../union/enum/domain.js"

/**
 * Represents normalized (64chars with 0-pad) address of resource
 * in Aptos blockchain
 *
 * @example 0xeeff357ea5c1a4e7bc11b2b17ff2dc2dcca69750bfef1e1ebcaccf8c8018175b
 * @see https://aptos.dev/concepts/accounts
 */

export type AptosAddress = AbstractAddress<BlockchainLayer1Enum.APTOS>

export const aptosAddressRegExp = new RegExp(/^0x[a-fA-F0-9]{1,64}$/)

/**
 * Checks Short AND Long formats of address with or without 0-pad
 *
 * @example 0x1
 * @example 0xeeff357ea5c1a4e7bc11b2b17ff2dc2dcca69750bfef1e1ebcaccf8c8018175b
 */
export function isAptosAddress(address: string): address is AptosAddress {
  return aptosAddressRegExp.test(address)
}

export const aptosAddressLongRegExp = new RegExp(/^0x[a-fA-F0-9]{64}$/)

/**
 * Checks Long formats of address with or without 0-pad
 *
 * @example 0xeeff357ea5c1a4e7bc11b2b17ff2dc2dcca69750bfef1e1ebcaccf8c8018175b
 */
export function isAptosLongAddress(address: string): address is AptosAddress {
  return aptosAddressLongRegExp.test(address)
}

/**
 * Checks Long format of address with 0-pad
 */
export const aptosAddressValidator = createLayer1fulValidator(BlockchainLayer1Enum.APTOS, isAptosAddress)

/**
 * Check and convert Aptos-compatible addresses
 *
 * @note it does normalization (0-pad and lowercase)
 * @example 0x1
 * @example 0xeeff357ea5c1a4e7bc11b2b17ff2dc2dcca69750bfef1e1ebcaccf8c8018175b
 * @see https://aptos.dev/concepts/accounts
 */

export function toAptosAddress(address: string): AptosAddress {
  const safe = toAptosAddressSafe(address)
  if (!safe) throw new InvalidAddressError(BlockchainLayer1Enum.APTOS, address)
  return safe
}

export function toAptosAddressSafe(address: string): AptosAddress | undefined {
  if (isAptosAddress(address)) {
    const lowercaseAddress = address.toLowerCase()
    const addressWithoutPrefix = lowercaseAddress.startsWith("0x") ? lowercaseAddress.slice(2) : lowercaseAddress
    const addressWithPadding = addressWithoutPrefix.padStart(64, "0")
    return `0x${addressWithPadding}` as AptosAddress
  }
  return undefined
}

/**
 * Removes 0-pad from address
 */

export function shortenAptosAddress(address: AptosAddress): AptosAddress {
  if (address.startsWith("0x")) {
    // Remove the '0x' prefix and then strip leading zeros
    let trimmedAddress = address.slice(2).replace(/^0+/, "")
    return ("0x" + (trimmedAddress || "0")) as AptosAddress
  }
  return address
}

/**
 * Generates random Aptos address
 *
 * @example 0xeeff357ea5c1a4e7bc11b2b17ff2dc2dcca69750bfef1e1ebcaccf8c8018175b
 */

export function randomAptosAddress(): AptosAddress {
  return toAptosAddress(randomBinary(32))
}
