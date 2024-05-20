import { randomAptosAddress, toAptosAddress, toAptosAddressSafe } from "./index.js"

const wrongAddresses = ["WRONG", "3GsbSZXDF8JajFjD1", "0x1::aptos_coin::"]
const validAddresses = [
  "0x1::aptos_coin::AptosCoin",
  "0xf22bede237a07e121b56d91a491eb7bcdfd1f5907926a9e58338f964a01b17fa::asset::USDC",
  "0x59e412585516ab745f68cd1949400fe8aa0172b3ae7c41c0fe155547fcdd3e27",
  randomAptosAddress(),
]

describe("toAptosAddress", () => {
  it.each(wrongAddresses)("should throw if not a Aptos address - %s", address => {
    expect(() => toAptosAddress(address)).toThrow()
  })

  it.each(validAddresses)("should return if the Aptos address is valid - %s", address => {
    expect(toAptosAddress(address)).toEqual(address)
  })
})

describe("toAptosAddressSafe", () => {
  it.each(wrongAddresses)("should not throw error and return undefined when invalid address - %s", address => {
    expect(toAptosAddressSafe(address)).toEqual(undefined)
  })

  it.each(validAddresses)("should convert to address - %s", address => {
    expect(toAptosAddressSafe(address)).toEqual(address)
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
