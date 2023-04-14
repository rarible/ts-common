import { ZERO_ADDRESS, randomAddress, toEVMAddress, toEVMAddressSafe } from "./index"

describe("toEVMAddress", () => {
  it("should throw if not address", () => {
    expect(() => toEVMAddress("some value")).toThrow()
  })

  it("should return if the address is valid", () => {
    toEVMAddress(randomAddress())
  })
})

describe("toEVMAddressSafe", () => {
  it("should not throw error and return undefined when invalid address", () => {
    expect(toEVMAddressSafe("test")).toEqual(undefined)
  })

  it("should convert to address", () => {
    expect(toEVMAddressSafe(ZERO_ADDRESS)).toEqual(ZERO_ADDRESS)
  })
})
