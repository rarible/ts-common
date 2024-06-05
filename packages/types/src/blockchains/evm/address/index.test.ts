import { EVM_ZERO_ADDRESS, randomEVMAddress, toEVMAddress, toEVMAddressSafe } from "./index.js"

const validAddresses = [
  "0xAbFb72E2C2D7a2f17b14A6B5Bf4C0434aD7F2f34",
  "0x5eD8Cee6b63b1c6AFce3AD7c92F4fD7E1B8fAd9F",
  "0x81b7E08F65B9AcbD60b94970A06c6563b6Bc6359",
  "0x27E9727FD9b8CdDdd0854F56712AD9DF647FaB74",
  "0x9fB689912dAF6FFB6af7Ff2C1fa483F1D3D1de47",
  EVM_ZERO_ADDRESS,
]

const invalidAddress = [
  "0x123", // Too short
  "0xABCDEFGHJKLMNOPQRSTUVWXYZabcdefghij", // Non-hex characters
  "1234567890ABCDEF1234567890ABCDEF12345678", // Missing '0x' prefix
  "0x1234567890ABCDEF1234567890ABCDE", // Too short
  "0x1234567890ABCDEF1234567890ABCDEF1234567890AB", // Too long
]

describe("toEVMAddress", () => {
  it.each(invalidAddress)("should throw if not address", address => {
    expect(() => toEVMAddress(address)).toThrow()
  })

  it.each(validAddresses)("should return if the address is valid", address => {
    toEVMAddress(address)
  })
})

describe("toEVMAddressSafe", () => {
  it.each(invalidAddress)("should not throw error and return undefined when invalid address", address => {
    expect(toEVMAddressSafe(address)).toEqual(undefined)
  })

  it.each(validAddresses)("should convert to address", address => {
    expect(toEVMAddressSafe(address)).toEqual(address.toLowerCase())
  })
})

describe("randomEVMAddress", () => {
  it("should generate random addresses", () => {
    const arr = new Array(50).fill(1).map(() => randomEVMAddress())
    arr.forEach(x => expect(toEVMAddress(x)).toEqual(x))
  })
})
