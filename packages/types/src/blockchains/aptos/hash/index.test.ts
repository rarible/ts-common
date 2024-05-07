import { InvalidTransactionHashError } from "../../common"
import { toAptosTransactionHash } from "."

describe("toAptosTransactionHash", () => {
  const validHashes = [
    "0x6b218e7d4e49174407507e5e13d1f60c3612ae10a0f38b2410749d90b6822ae3", // Typical Aptos hash
    "0x4af084a471462fb1871aa2aa59d40ac853025bad3af8c8922b455ae2967e6012", // Another valid Aptos hash
  ]

  const invalidHashes = [
    "1234567890123456789012345678901234567890123456789012345678901234567890123456789012345678901", // Too long
    "unknown-hash", // Non-hex characters
    "0x4af084a471462fb1871aa2aa59d40ac853025bad3af8c8922b455", // Shorter than typical Aptos hash
  ]

  it.each(validHashes)("should convert valid Aptos hash - %s", hash => {
    expect(toAptosTransactionHash(hash)).toEqual(hash)
  })

  it.each(invalidHashes)("should throw error if invalid Aptos hash - %s", hash => {
    expect(() => toAptosTransactionHash(hash)).toThrow(InvalidTransactionHashError)
  })
})
