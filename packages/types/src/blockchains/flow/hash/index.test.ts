import { InvalidTransactionHashError } from "../../common/hash.js"
import { toFlowTransactionHash } from "./index.js"

describe("toFlowTransactionHash", () => {
  const validHashes = [
    "8799209ed47f86db11253b1c8ec06b655505ad62fc59305eb660cf879033c44a", // A valid 64-character Flow hash
    "a1b2c3d4e5f678901234567890abcdef1234567890abcdef1234567890abcdef",
  ]

  const invalidHashes = [
    "8799209ed47f86db11253b1c8ec06b655505ad62fc59305eb660cf879033c44a1", // Too long
    "unknown-hash", // Non-hexadecimal characters
    "0x1234567890abcdef1234567890abcdef1234567890abcdef1234567890abcdef", // Ethereum-like hash
    "d47f86db11253b1c8ec06b655505ad62", // Shorter than typical Flow hash
  ]

  it.each(validHashes)("should convert valid Flow hash - %s", hash => {
    expect(toFlowTransactionHash(hash)).toEqual(hash)
  })

  it.each(invalidHashes)("should throw error if invalid Flow hash - %s", hash => {
    expect(() => toFlowTransactionHash(hash)).toThrow(InvalidTransactionHashError)
  })
})
