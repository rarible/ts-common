import { InvalidAptosModuleAddressError, randomAptosModuleAddress, toAptosModuleAddress } from "./index.js"

const wrongModuleNames = [
  "0x1::aptos_coin::AptosCoin", // cant be function name
  "0x1234::coi@n", // invalid char
  "0x1234::::coin", // too many colons
  "::coin", // no resource address
  "0x1234::", // no module specified
  "0x::coin", // empty address
]

const validCases = [
  "0x1234::coin",
  "0xeeff357ea5c1a4e7bc11b2b17ff2dc2dcca69750bfef1e1ebcaccf8c8018175b::coin",
  "0xeeff357ea5c1a4e7bc11b2b17ff2dc2dcca69750bfef1e1ebcaccf8c8018175b::coin_case",
  "0xeeff357ea5c1a4e7bc11b2b17ff2dc2dcca69750bfef1e1ebcaccf8c8018175b::Coin_case",
]

describe("toAptosModuleAddress", () => {
  it.each(wrongModuleNames)("should throw if not a Aptos module address - %s", address => {
    expect(() => toAptosModuleAddress(address)).toThrow(InvalidAptosModuleAddressError)
  })

  it.each(validCases)("should return if the Aptos module address is valid - %s", address => {
    expect(toAptosModuleAddress(address)).toEqual(address)
  })
})

describe("randomAptosModuleAddress", () => {
  it("should generate valid values", () => {
    const arr = new Array(50).fill(0).map(() => randomAptosModuleAddress())
    arr.forEach(element => {
      expect(toAptosModuleAddress(element)).toEqual(element)
    })
  })
})
