import {
  isFlowContractAddress,
  randomFlowContractAddress,
  toFlowContractAddress,
  toFlowContractAddressSafe,
} from "./index"

const validAddresses = [
  "A.0x1a2b3c4d5e6f7a8b.BasicToken",
  "A.0x123456789abcdef0.RareArtCollectible",
  "A.0x9f8e7d6c5b4a3a21.UniqueGameItem",
]

const invalidAddresses = [
  "A.0x9f8e7d6c5b4a3a211.UniqueGameItem",
  "A.0x1a2b3c4d5e6f7a8g.BasicToken",
  "Invalid",
  "A.0x9f8e7d6c5b4a3a211",
  "8c42e7e93e7c87d4",
]

describe("toFlowContractAddress", () => {
  it.each(invalidAddresses)("should throw if not an flow contract address", address => {
    expect(() => toFlowContractAddress(address)).toThrow()
  })

  it.each(validAddresses)("should return if the flow address is valid", address => {
    expect(toFlowContractAddress(address)).toEqual(address)
  })
})

describe("toFlowContractAddressSafe", () => {
  it.each(invalidAddresses)("should not throw if not an flow contract address", address => {
    expect(toFlowContractAddressSafe(address)).toEqual(undefined)
  })

  it.each(validAddresses)("should return if the flow address is valid", address => {
    expect(toFlowContractAddressSafe(address)).toEqual(address)
  })
})

describe("isFlowContractAddress", () => {
  it("should validate random flow address", () => {
    const arr = new Array(50).fill(1).map(() => randomFlowContractAddress())
    arr.forEach(x => expect(isFlowContractAddress(x)).toEqual(true))
  })
})
