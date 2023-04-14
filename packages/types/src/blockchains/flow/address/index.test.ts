import { randomFlowAddress, toFlowAddress, toFlowAddressSafe } from "./index"

describe("toFlowAddress", () => {
  it("should throw if not an flow address", () => {
    expect(() => toFlowAddress("some value")).toThrow()
  })

  it("should return if the flow address is valid", () => {
    const address = randomFlowAddress()
    expect(toFlowAddress(address)).toEqual(address)
  })
})

describe("toFlowAddressSafe", () => {
  it("should not throw error and return undefined when invalid address", () => {
    expect(toFlowAddressSafe("test")).toEqual(undefined)
  })

  it("should convert to address", () => {
    const address = randomFlowAddress()
    expect(toFlowAddressSafe(address)).toEqual(address)
  })
})
