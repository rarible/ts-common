import { CustomError } from "@rarible/utils"
import type { Layer1ful } from "../../common/common.js"
import type { BlockchainLayer1Enum } from "../../union/enum/domain.js"
import type { AptosAddress } from "../address/index.js"
import { randomAptosAddress, toAptosAddress } from "../address/index.js"
import { randomAptosModuleName } from "../module/index.js"

/**
 * Represents function address in Aptos
 *
 * @example 0x1234::coin::swap
 * @see https://aptos.dev/concepts/resources
 */

export type AptosFunctionAddress = Layer1ful<BlockchainLayer1Enum.APTOS> & {
  __IS_APTOS_FUNCTION_ADDRESS__: true
}

export const aptosFunctionAddressRegexp = new RegExp(
  /^0x[a-fA-F0-9]{1,64}::[a-zA-Z_][a-zA-Z0-9_]*::[a-zA-Z_][a-zA-Z0-9_]*$/,
)

export function isAptosFunctionAddress(raw: string): raw is AptosFunctionAddress {
  return aptosFunctionAddressRegexp.test(raw)
}

export function toAptosFunctionAddress(raw: string): AptosFunctionAddress {
  const parsed = toAptosFunctionAddressSafe(raw)
  if (!parsed) throw new InvalidAptosFunctionAddressError(raw)
  return parsed
}

export function toAptosFunctionAddressSafe(raw: string): AptosFunctionAddress | undefined {
  if (isAptosFunctionAddress(raw)) return raw
  return undefined
}

export type AptosFunctionAddressData = {
  resource: AptosAddress
  moduleName: string
  functionName: string
}

export function parseAptosFunctionAddress(str: string): AptosFunctionAddressData {
  const parsed = parseAptosFunctionAddressSafe(str)
  if (!parsed) throw new InvalidAptosFunctionAddressError(str)
  return parsed
}

export function parseAptosFunctionAddressSafe(str: string): AptosFunctionAddressData | undefined {
  const parsed = toAptosFunctionAddressSafe(str)
  if (parsed) {
    const [resource, moduleName, functionName] = parsed.split("::")
    return {
      resource: toAptosAddress(resource),
      moduleName,
      functionName,
    }
  }
  return undefined
}

export class InvalidAptosFunctionAddressError extends CustomError {
  constructor(str: string) {
    super(`Invalid Aptos function address - ${str}`)
  }
}

/**
 * Generates random Aptos function address
 *
 * @example 0xeeff357ea5c1a4e7bc11b2b17ff2dc2dcca69750bfef1e1ebcaccf8c8018175b::coin::swap
 */

export function randomAptosFunctionAddress() {
  return `${randomAptosAddress()}::${randomAptosModuleName()}::${randomAptosFunctionName()}`
}

export function randomAptosFunctionName() {
  return randomAptosModuleName()
}
