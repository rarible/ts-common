import {
  BlockchainParseError,
  blockchains,
  blockchainsLayer1,
  evmBlockchains,
  parseBlockchain,
  withBlockchain,
  isWithL1Blockchain,
  withL1Blockchain,
  isWithBlockchain,
  type WithBlockchain,
  toL1Blockchain,
} from "./index"

describe("isWithL1Blockchain", () => {
  it("should return true for all valid blockchains", () => {
    blockchainsLayer1.forEach(x => {
      expect(isWithL1Blockchain(withL1Blockchain(x, "test"))).toBeTruthy()
    })
    // Not layer1 blockchains should be excluded also
    ;["ETH", "POLYGON", "IMMUTABLEX", "MANTLE"].forEach(x => {
      expect(isWithL1Blockchain(`${x}:awd`)).toBeFalsy()
    })
  })
})

describe("isWithBlockchain", () => {
  it("should return true for all valid blockchains", () => {
    blockchains.forEach(x => {
      expect(isWithBlockchain(withBlockchain(x, "test"))).toBeTruthy()
    })
    expect(isWithBlockchain("ETH:awd")).toBeFalsy()
  })
})

describe("toL1Blockchain", () => {
  it("should convert to layer 1", () => {
    evmBlockchains.forEach(x => {
      expect(toL1Blockchain(x)).toEqual("ETHEREUM")
    })
  })
})

describe("parseBlockchain", () => {
  it("should parse valid blockchains", () => {
    blockchains.forEach(x => {
      expect(parseBlockchain(withBlockchain(x, "rest"))).toEqual([x, "rest"])
    })
  })

  it("should throw error when invalid value", () => {
    expect(() => parseBlockchain("test" as WithBlockchain)).toThrow(BlockchainParseError)
  })
})
