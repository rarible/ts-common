import { randomTezosContractAddress, toTezosContractAddress, toTezosContractAddressSafe } from "./index"

const wrongAddresses = [
  "WRONG", // Completely incorrect format
  "KT1acdefghijk", // Too short
  "tz1VUSdKXgSw4P4gPEG5h3bdWq6nrthvhA1V4", // Correct length but wrong prefix (user address)
  "123456789ABCDEFGHJKLMNPQRSTUVWXYZabcdefghijkmnopqrstuvwxyz", // Random string, correct length but wrong format
  "KT2ZZZZZZZZZZZZZZZZZZZZZZZZZZZZNkiRg", // Incorrect prefix
]
const validAddresses = [
  "KT1ZZZZZZZZZZZZZZZZZZZZZZZZZZZZNkiRg", // Placeholder for a valid Tezos contract address
  randomTezosContractAddress(),
]

describe("toTezosContractAddress", () => {
  it.each(wrongAddresses)("should throw if not a Tezos contract address - %s", address => {
    expect(() => toTezosContractAddress(address)).toThrow()
  })

  it.each(validAddresses)("should return if the Tezos contract address is valid - %s", address => {
    expect(toTezosContractAddress(address)).toEqual(address)
  })
})

describe("toTezosContractAddressSafe", () => {
  it.each(wrongAddresses)("should not throw error and return undefined when invalid address - %s", address => {
    expect(toTezosContractAddressSafe(address)).toEqual(undefined)
  })

  it.each(validAddresses)("should convert to address - %s", address => {
    expect(toTezosContractAddressSafe(address)).toEqual(address)
  })
})

describe("randomTezosContractAddress", () => {
  it("should generate valid values", () => {
    const arr = new Array(50).fill(0).map(() => randomTezosContractAddress())
    arr.forEach(element => {
      expect(toTezosContractAddress(element)).toEqual(element)
    })
  })
})
