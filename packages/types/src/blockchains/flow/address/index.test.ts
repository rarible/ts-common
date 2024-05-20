import { randomFlowAddress, toFlowAddress, toFlowAddressSafe } from "./index.js"

const wrongAddresses = ["WRONG", "8c42e7e93e7c87d41", "8c42e7e93e7cWRd4"]
const validAddresses = ["8c42e7e93e7c87d4", "b9c5714089478a07", "2c1162386b325f1b", randomFlowAddress()]

describe("toFlowAddress", () => {
  it.each(wrongAddresses)("should throw if not an flow address - %s", address => {
    expect(() => toFlowAddress(address)).toThrow()
  })

  it.each(validAddresses)("should return if the flow address is valid - %s", address => {
    expect(toFlowAddress(address)).toEqual(address)
  })
})

describe("toFlowAddressSafe", () => {
  it.each(wrongAddresses)("should not throw error and return undefined when invalid address - %s", address => {
    expect(toFlowAddressSafe(address)).toEqual(undefined)
  })

  it.each(validAddresses)("should convert to address - %s", address => {
    expect(toFlowAddressSafe(address)).toEqual(address)
  })
})

describe("randomFlowAddress", () => {
  it("should generate valid values", () => {
    const arr = new Array(50).fill(0).map(() => randomFlowAddress())
    arr.forEach(element => {
      expect(toFlowAddress(element)).toEqual(element)
    })
  })
})
