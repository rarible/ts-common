import { InvalidTransactionHashError } from "../../common/hash.js"
import { toTezosTransactionHash } from "./index.js"

describe("toTezosTransactionHash", () => {
  const validHashes = [
    "op1c8J6k5Kj9Y8R6XjWuHZu3jWtGK8cKmKfYpfdpU1E3YPF3x7B", // Typical Tezos hash
    "onUqWyBh1SsX9p7sV4GCRdUau5JQZRsFmkVqY8kTwuq7GqTdqYV", // Another valid Tezos hash
  ]

  const invalidHashes = [
    "1234567890123456789012345678901234567890123456789012345678901234567890123456789012345678901", // Incorrect format and length
    "unknown-hash", // Non-Base58 characters
    "0x1234567890abcdef1234567890abcdef1234567890abcdef1234567890abcdef", // Ethereum-like hash
    "tz1ZZZZZZZZZZZZZZZZZZZZZZZZZZZZNkiRg", // Tezos address format, not a transaction hash
  ]

  it.each(validHashes)("should convert valid Tezos hash - %s", hash => {
    expect(toTezosTransactionHash(hash)).toEqual(hash)
  })

  it.each(invalidHashes)("should throw error if invalid Tezos hash - %s", hash => {
    expect(() => toTezosTransactionHash(hash)).toThrow(InvalidTransactionHashError)
  })
})
