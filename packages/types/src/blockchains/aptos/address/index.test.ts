import { InvalidAddressError } from "../../common/address.js"
import { randomAptosAddress, shortenAptosAddress, toAptosAddress, toAptosAddressSafe } from "./index.js"

const wrongAddresses = [
  "", // completely empty string
  "0x", // empty address
  "0x123g", // invalid char
  "0x1::aptos_coin::AptosCoin", // cant be function name
  "0x1::aptos_coin", // cant be module address
  "0x1234567890abcdef1234567890abcdef1234567890abcdef1234567890abcdef1", // too long
  "eeff357ea5c1a4e7bc11b2b17ff2dc2dcca69750bfef1e1ebcaccf8c8018175b", // missing 0x
]

describe("toAptosAddress", () => {
  it.each(wrongAddresses)("should throw if not a Aptos address - %s", address => {
    expect(() => toAptosAddress(address)).toThrow(InvalidAddressError)
  })

  const cases = getValidCases()
  it.each(cases)("should return if the Aptos address is valid - $input", ({ input, output }) => {
    expect(toAptosAddress(input)).toEqual(output)
  })
})

describe("toAptosAddressSafe", () => {
  it.each(wrongAddresses)("should not throw error and return undefined when invalid address - %s", address => {
    expect(toAptosAddressSafe(address)).toEqual(undefined)
  })

  const cases = getValidCases()
  it.each(cases)("should convert to address - $input", ({ input, output }) => {
    expect(toAptosAddressSafe(input)).toEqual(output)
  })
})

describe("randomAptosAddress", () => {
  it("should generate valid values", () => {
    const arr = new Array(50).fill(0).map(() => randomAptosAddress())
    arr.forEach(element => {
      expect(toAptosAddress(element)).toEqual(element)
    })
  })
})

describe("shortenAptosAddress", () => {
  it("should short aptos address", () => {
    expect(shortenAptosAddress(toAptosAddress("0x1"))).toEqual("0x1")
  })
})

function getValidCases(): { input: string; output: string }[] {
  const randomAddress = randomAptosAddress()
  return [
    {
      input: "0x1",
      output: "0x0000000000000000000000000000000000000000000000000000000000000001",
    },
    {
      input: "0xeeff357ea5c1a4e7bc11b2b17ff2dc2dcca69750bfef1e1ebcaccf8c8018175B",
      output: "0xeeff357ea5c1a4e7bc11b2b17ff2dc2dcca69750bfef1e1ebcaccf8c8018175b",
    },
    {
      input: "0x0000000000000000000000000000000000000000000000000000000000000001",
      output: "0x0000000000000000000000000000000000000000000000000000000000000001",
    },
    {
      input: randomAddress,
      output: randomAddress,
    },
  ]
}
