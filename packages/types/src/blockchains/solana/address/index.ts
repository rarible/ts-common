import type { AbstractAddress } from "../../common"
import { InvalidAddressError } from "../../common"
import { createLayer1fulValidator } from "../../common/common"
import { BlockchainLayer1Enum } from "../../union/enum"

export type SolanaAddress = AbstractAddress<BlockchainLayer1Enum.SOLANA>

// Solana addresses are usually Base58 encoded strings.
// Regular expression to validate a Solana address.
const solanaAddressRegExp = new RegExp(/^[1-9A-HJ-NP-Za-km-z]{32,44}$/)

export function isSolanaAddress(address: string): address is SolanaAddress {
  return solanaAddressRegExp.test(address)
}

export const solanaAddressValidator = createLayer1fulValidator(BlockchainLayer1Enum.SOLANA, isSolanaAddress)

export function toSolanaAddress(address: string): SolanaAddress {
  const safe = toSolanaAddressSafe(address)
  if (!safe) throw new InvalidAddressError(BlockchainLayer1Enum.SOLANA, address)
  return safe
}

export function toSolanaAddressSafe(address: string): SolanaAddress | undefined {
  if (isSolanaAddress(address)) return address
  return undefined
}

export const SOLANA_ZERO_ADDRESS = toSolanaAddress("11111111111111111111111111111111")

export function randomSolanaAddress(): SolanaAddress {
  const base58Chars = "123456789ABCDEFGHJKLMNPQRSTUVWXYZabcdefghijkmnopqrstuvwxyz"
  const addressLength = Math.floor(Math.random() * (44 - 32 + 1)) + 32 // Random length between 32 and 44

  let address = ""
  for (let i = 0; i < addressLength; i++) {
    const randomIndex = Math.floor(Math.random() * base58Chars.length)
    address += base58Chars[randomIndex]
  }

  return toSolanaAddress(address)
}
