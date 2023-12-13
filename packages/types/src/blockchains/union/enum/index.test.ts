import type { WithBlockchain } from "./index"
import {
  BlockchainEnum,
  BlockchainLayer1Enum,
  BlockchainParseError,
  blockchains,
  blockchainsLayer1,
  evmBlockchains,
  isBlockchain,
  isBlockchainSpecified,
  isRealBlockchainSpecified,
  parseBlockchain,
  toLayerOneBlockchain,
  withBlockchain,
  withLayer1Blockchain,
} from "./index"

describe("isBlockchainSpecified", () => {
  it("should return true for all valid blockchains", () => {
    blockchainsLayer1.forEach(x => {
      expect(isBlockchainSpecified(withLayer1Blockchain(x, "test"))).toBeTruthy()
    })
    // Not layer1 blockchains should be excluded also
    ;["ETH", BlockchainEnum.POLYGON, BlockchainEnum.IMMUTABLEX, BlockchainEnum.MANTLE, BlockchainEnum.ARBITRUM].forEach(
      x => {
        expect(isBlockchainSpecified(`${x}:awd`)).toBeFalsy()
      },
    )
  })
})

describe("isBlockchain", () => {
  it("should return true for all valid blockchains", () => {
    for (const enumValue of blockchains) {
      expect(isBlockchain(`${enumValue}`)).toBeTruthy()
    }
    expect(isBlockchain("ETHEREUM")).toBeTruthy()
    expect(isBlockchain("BLA")).toBeFalsy()
  })
})

describe("isRealBlockchainSpecified", () => {
  it("should return true for all valid blockchains", () => {
    blockchains.forEach(x => {
      expect(isRealBlockchainSpecified(withBlockchain(x, "test"))).toBeTruthy()
    })
    expect(isBlockchainSpecified("ETH:awd")).toBeFalsy()
  })
})

describe("toLayerOneBlockchain", () => {
  it("should convert to layer 1", () => {
    evmBlockchains.forEach(x => {
      expect(toLayerOneBlockchain(x)).toEqual(BlockchainLayer1Enum.ETHEREUM)
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
