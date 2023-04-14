import {
  randomFlowAddress,
  toFlowAddress,
  toFlowAddressSafe,
  toFlowContractAddress,
  toFlowContractAddressSafe,
} from "./index"

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

describe("toFlowContractAddress", () => {
  it("should throw if not an flow contract address", () => {
    expect(() => toFlowContractAddress("test")).toThrow()
  })

  it("should throw if flow user address", () => {
    expect(() => toFlowContractAddress(randomFlowAddress())).toThrow()
  })

  it("should return if the flow address is valid", () => {
    const address = "A.0x665b9acf64dfdfdb.CommonNFT"
    expect(toFlowContractAddress(address)).toEqual(address)
  })
})

describe("toFlowContractAddressSafe", () => {
  it("should not throw if not an flow contract address", () => {
    expect(toFlowContractAddressSafe("test")).toEqual(undefined)
  })

  it("should not throw if flow user address", () => {
    expect(toFlowContractAddressSafe(randomFlowAddress())).toEqual(undefined)
  })

  it("should return if the flow address is valid", () => {
    const address = "A.0x665b9acf64dfdfdb.CommonNFT"
    expect(toFlowContractAddressSafe(address)).toEqual(address)
  })
})
