import { CustomError } from "@rarible/utils"
import type { Layer1ful } from "../../common/common.js"
import type { BlockchainLayer1Enum } from "../../union/enum/domain.js"
import type { AptosAddress } from "../address/index.js"
import { randomAptosAddress, toAptosAddress } from "../address/index.js"

/**
 * Represents module address in Aptos
 *
 * @example 0x1234::coin
 * @see https://aptos.dev/concepts/resources
 */

export type AptosModuleAddress = Layer1ful<BlockchainLayer1Enum.APTOS> & {
  __IS_APTOS_MODULE_ADDRESS__: true
}

export const aptosModuleAddressRegexp = new RegExp(/^0x[a-fA-F0-9]{1,64}::[a-zA-Z_][a-zA-Z0-9_]*$/)

export function isAptosModuleAddress(raw: string): raw is AptosModuleAddress {
  return aptosModuleAddressRegexp.test(raw)
}

export function toAptosModuleAddress(raw: string): AptosModuleAddress {
  const parsed = toAptosModuleAddressSafe(raw)
  if (!parsed) throw new InvalidAptosModuleAddressError(raw)
  return parsed
}

export function toAptosModuleAddressSafe(raw: string): AptosModuleAddress | undefined {
  if (isAptosModuleAddress(raw)) return raw
  return undefined
}

export type AptosModuleAddressData = {
  resource: AptosAddress
  moduleName: string
}

export function parseAptosModuleAddress(str: string): AptosModuleAddressData {
  const parsed = parseAptosModuleAddressSafe(str)
  if (!parsed) throw new InvalidAptosModuleAddressError(str)
  return parsed
}

export function parseAptosModuleAddressSafe(str: string): AptosModuleAddressData | undefined {
  const parsed = toAptosModuleAddressSafe(str)
  if (parsed) {
    const [resource, name] = parsed.split("::")
    return {
      resource: toAptosAddress(resource),
      moduleName: name,
    }
  }
  return undefined
}

export class InvalidAptosModuleAddressError extends CustomError {
  constructor(str: string) {
    super(`Invalid Aptos module address - ${str}`)
  }
}

/**
 * Generates random Aptos address
 *
 * @example 0xeeff357ea5c1a4e7bc11b2b17ff2dc2dcca69750bfef1e1ebcaccf8c8018175b::coin
 */

export function randomAptosModuleAddress() {
  return `${randomAptosAddress()}::${randomAptosModuleName()}`
}

export function randomAptosModuleName() {
  const letters = "abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZ"
  const alphanumeric = letters + "0123456789_"

  // The first character should be a letter or underscore
  let moduleName = letters.charAt(Math.floor(Math.random() * letters.length))

  // Generate the rest of the module name with a random length between 1 and 20
  const length = Math.floor(Math.random() * 19) + 1 // 1 to 20 characters long

  for (let i = 0; i < length; i++) {
    moduleName += alphanumeric.charAt(Math.floor(Math.random() * alphanumeric.length))
  }

  return moduleName
}
