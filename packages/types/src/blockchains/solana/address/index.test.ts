import { randomSolanaAddress, toSolanaAddress, toSolanaAddressSafe } from "./index.js"

const wrongAddresses = ["WRONG", "3GsbSZXDF8JajFjD1", "3GsbSZXDF8WRONGJ1"]
const validAddresses = [
  "11111111111111111111111111111111",
  "3GsbSZXDF8JajFjD1A9t9VSGb5B4CWENh4",
  "5h3bdWq6nrthvhA1V4VUSdKXgSw4P4gPEG",
  randomSolanaAddress(),
]

describe("toSolanaAddress", () => {
  it.each(wrongAddresses)("should throw if not a Solana address - %s", address => {
    expect(() => toSolanaAddress(address)).toThrow()
  })

  it.each(validAddresses)("should return if the Solana address is valid - %s", address => {
    expect(toSolanaAddress(address)).toEqual(address)
  })
})

describe("toSolanaAddressSafe", () => {
  it.each(wrongAddresses)("should not throw error and return undefined when invalid address - %s", address => {
    expect(toSolanaAddressSafe(address)).toEqual(undefined)
  })

  it.each(validAddresses)("should convert to address - %s", address => {
    expect(toSolanaAddressSafe(address)).toEqual(address)
  })
})

describe("randomSolanaAddress", () => {
  it("should generate valid values", () => {
    const arr = new Array(50).fill(0).map(() => randomSolanaAddress())
    arr.forEach(element => {
      expect(toSolanaAddress(element)).toEqual(element)
    })
  })
})
