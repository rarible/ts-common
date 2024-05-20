import { randomTezosAddress, toTezosAddress, toTezosAddressSafe } from "./index.js"

const wrongAddresses = [
  "WRONG", // Completely incorrect format
  "tz1acdefghijk", // Too short
  "KT15h3bdWq6nrthvhA1V4VUSdKXgSw4P4gPEG", // Contract address, not a user address
  "123456789ABCDEFGHJKLMNPQRSTUVWXYZabcdefghijkmnopqrstuvwxyz", // Random string, correct length but wrong format
  "tz4ZZZZZZZZZZZZZZZZZZZZZZZZZZZZNkiRg", // Invalid prefix
]
const validAddresses = [
  "tz1ZZZZZZZZZZZZZZZZZZZZZZZZZZZZNkiRg", // Placeholder for a valid Tezos user address
  randomTezosAddress(),
]

describe("toTezosAddress", () => {
  it.each(wrongAddresses)("should throw if not a Tezos address - %s", address => {
    expect(() => toTezosAddress(address)).toThrow()
  })

  it.each(validAddresses)("should return if the Tezos address is valid - %s", address => {
    expect(toTezosAddress(address)).toEqual(address)
  })
})

describe("toTezosAddressSafe", () => {
  it.each(wrongAddresses)("should not throw error and return undefined when invalid address - %s", address => {
    expect(toTezosAddressSafe(address)).toEqual(undefined)
  })

  it.each(validAddresses)("should convert to address - %s", address => {
    expect(toTezosAddressSafe(address)).toEqual(address)
  })
})

describe("randomTezosAddress", () => {
  it("should generate valid values", () => {
    const arr = new Array(50).fill(0).map(() => randomTezosAddress())
    arr.forEach(element => {
      expect(toTezosAddress(element)).toEqual(element)
    })
  })
})
