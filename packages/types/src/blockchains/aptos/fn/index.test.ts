import { InvalidAptosFunctionAddressError, randomAptosFunctionAddress, toAptosFunctionAddress } from "./index.js"

const wrongFunctionNames = [
  "0x1::aptos_coin::", // cant be function name
  "0x1::aptos_coin", // cant be module name
  "0x1234::coin::::test", // too many colons
  "0x1234::coin::::test!", // invalid char
]

const validCases = [
  "0x1234::coin::fnname",
  "0xeeff357ea5c1a4e7bc11b2b17ff2dc2dcca69750bfef1e1ebcaccf8c8018175b::coin::fnname",
  "0xeeff357ea5c1a4e7bc11b2b17ff2dc2dcca69750bfef1e1ebcaccf8c8018175b::coin_case::fn_name",
  "0xeeff357ea5c1a4e7bc11b2b17ff2dc2dcca69750bfef1e1ebcaccf8c8018175b::coin_case::Fn_name",
]

describe("toAptosFunctionAddress", () => {
  it.each(wrongFunctionNames)("should throw if not a Aptos function address - %s", address => {
    expect(() => toAptosFunctionAddress(address)).toThrow(InvalidAptosFunctionAddressError)
  })

  it.each(validCases)("should return if the Aptos function address is valid - %s", address => {
    expect(toAptosFunctionAddress(address)).toEqual(address)
  })
})

describe("randomAptosFunctionAddress", () => {
  it("should generate valid values", () => {
    const arr = new Array(50).fill(0).map(() => randomAptosFunctionAddress())
    arr.forEach(element => {
      expect(toAptosFunctionAddress(element)).toEqual(element)
    })
  })
})
