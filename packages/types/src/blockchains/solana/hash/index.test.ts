import { InvalidTransactionHashError } from "../../common/hash.js"
import { toSolanaTransactionHash } from "./index.js"

describe("toSolanaTransactionHash", () => {
  const validHashes = [
    "3tabFzrJr1c6Mggfwmhanrw636SfN4qf3HtQX1ZbWAfGHLcaUPCb9WVYLACko2BNeY3gy7WmZZFJqRUSF9HWdbNL", // Typical Solana hash
    "5ZnwRMPYPfQnVxqrBK73KqX1LpGLBGKc2v8DfkAfHSfs6hYSXuzzNDPbcnZtbs2wA5ZcQN1azfJZQnrXkSaq3PQG", // Another valid Solana hash
  ]

  const invalidHashes = [
    "1234567890123456789012345678901234567890123456789012345678901234567890123456789012345678901", // Too long
    "unknown-hash", // Non-Base58 characters
    "0x1234567890abcdef1234567890abcdef1234567890abcdef1234567890abcdef", // Ethereum-like hash
    "5JajFjD1A9t9VSGb5B4CWENh4Ko4G6QmGe4erdQ7u4FBZ57a3KhFHWSM5v6ZPqu8kCqkL39uEY3Jj32", // Shorter than typical Solana hash
  ]

  it.each(validHashes)("should convert valid Solana hash - %s", hash => {
    expect(toSolanaTransactionHash(hash)).toEqual(hash)
  })

  it.each(invalidHashes)("should throw error if invalid Solana hash - %s", hash => {
    expect(() => toSolanaTransactionHash(hash)).toThrow(InvalidTransactionHashError)
  })
})
