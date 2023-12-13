import type { AbstractAddress } from "../../common"
import { InvalidAddressError } from "../../common"
import { createLayer1fulValidator } from "../../common/common"
import { BlockchainLayer1Enum } from "../../union/enum"

export type TezosAddress = AbstractAddress<BlockchainLayer1Enum.TEZOS>

// Tezos addresses start with tz1, tz2, tz3 (for user accounts) and are Base58 encoded, exactly 36 characters long.
const tezosAddressRegExp = new RegExp(/^tz[1-3][1-9A-HJ-NP-Za-km-z]{33}/)

export function isTezosAddress(address: string): address is TezosAddress {
  return tezosAddressRegExp.test(address)
}

export const tezosAddressValidator = createLayer1fulValidator(BlockchainLayer1Enum.TEZOS, isTezosAddress)

export function toTezosAddress(address: string): TezosAddress {
  const safe = toTezosAddressSafe(address)
  if (!safe) throw new InvalidAddressError(BlockchainLayer1Enum.TEZOS, address)
  return safe
}

export function toTezosAddressSafe(address: string): TezosAddress | undefined {
  if (isTezosAddress(address)) return address
  return undefined
}

// Example of a Tezos zero address - this is just a placeholder
// @note TEZOS doesn't really have a concept of ZERO address
export const TEZOS_ZERO_ADDRESS = toTezosAddress("tz1ZZZZZZZZZZZZZZZZZZZZZZZZZZZZNkiRg")

export function randomTezosAddress(): TezosAddress {
  const prefixOptions = ["tz1", "tz2", "tz3"]
  const base58Chars = "123456789ABCDEFGHJKLMNPQRSTUVWXYZabcdefghijkmnopqrstuvwxyz"
  let address = prefixOptions[Math.floor(Math.random() * prefixOptions.length)]

  // Ensuring the total length is exactly 36 characters
  for (let i = 0; i < 33; i++) {
    const randomIndex = Math.floor(Math.random() * base58Chars.length)
    address += base58Chars[randomIndex]
  }

  return toTezosAddress(address)
}
