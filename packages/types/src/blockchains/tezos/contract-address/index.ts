import type { AbstractContractAddress } from "../../common"
import { InvalidAddressError } from "../../common"
import { createLayer1fulValidator } from "../../common/common"
import { BlockchainLayer1Enum } from "../../union/enum"

export type TezosContractAddress = AbstractContractAddress<BlockchainLayer1Enum.TEZOS>

// Tezos contract addresses usually start with KT1 and are Base58 encoded.
const tezosContractAddressRegExp = new RegExp(/^KT1[1-9A-HJ-NP-Za-km-z]{33}/)

export function isTezosContractAddress(address: string): address is TezosContractAddress {
  return tezosContractAddressRegExp.test(address)
}

export const tezosContractAddressValidator = createLayer1fulValidator(
  BlockchainLayer1Enum.TEZOS,
  isTezosContractAddress,
)

export function toTezosContractAddress(address: string): TezosContractAddress {
  const safe = toTezosContractAddressSafe(address)
  if (!safe) throw new InvalidAddressError(BlockchainLayer1Enum.TEZOS, address)
  return safe
}

export function toTezosContractAddressSafe(address: string): TezosContractAddress | undefined {
  if (isTezosContractAddress(address)) return address
  return undefined
}

export function randomTezosContractAddress(): TezosContractAddress {
  const base58Chars = "123456789ABCDEFGHJKLMNPQRSTUVWXYZabcdefghijkmnopqrstuvwxyz"
  let address = "KT1"

  for (let i = 0; i < 33; i++) {
    // The length of the rest of the address should be 33 characters
    const randomIndex = Math.floor(Math.random() * base58Chars.length)
    address += base58Chars[randomIndex]
  }

  return toTezosContractAddress(address)
}
