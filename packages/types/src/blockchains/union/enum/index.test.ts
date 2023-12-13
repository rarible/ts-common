import {
  BlockchainParseError,
  blockchains,
  blockchainsLayer1,
  evmBlockchains,
  isBlockchainSpecified,
  parseBlockchain,
  withBlockchain,
  withLayer1Blockchain,
  type WithBlockchain,
  isRealBlockchainSpecified,
  toLayerOneBlockchain,
  BlockchainEnum,
  BlockchainLayer1Enum,
} from "./index"

describe("isBlockchainSpecified", () => {
  it("should return true for all valid blockchains", () => {
    blockchainsLayer1.forEach(x => {
      expect(isBlockchainSpecified(withLayer1Blockchain(x, "test"))).toBeTruthy()
    })
    // Not layer1 blockchains should be excluded also
    ;["ETH", "POLYGON", "IMMUTABLEX", "MANTLE"].forEach(x => {
      expect(isBlockchainSpecified(`${x}:awd`)).toBeFalsy()
    })
  })
})

const invalidWithBlockchainValues = [
  "ETH:test", // Invalid blockchain enum
  "test", // No blockchain enum
  "ETHEREUMM:test", // Blockchain enum misspelling
] as unknown as WithBlockchain[]

describe("isRealBlockchainSpecified", () => {
  it.each(blockchains)("should return true for all valid blockchains", blockchain => {
    expect(isRealBlockchainSpecified(withBlockchain(blockchain, "test"))).toBeTruthy()
  })

  it.each(invalidWithBlockchainValues)("should return false in case of invalid blockchain value", blockchain => {
    expect(isRealBlockchainSpecified(blockchain)).toBeFalsy()
  })
})

describe("toLayerOneBlockchain", () => {
  it("should convert to layer 1", () => {
    evmBlockchains.forEach(x => expect(toLayerOneBlockchain(x)).toEqual(BlockchainLayer1Enum.ETHEREUM))
    expect(toLayerOneBlockchain(BlockchainEnum.FLOW)).toEqual(BlockchainLayer1Enum.FLOW)
    expect(toLayerOneBlockchain(BlockchainEnum.SOLANA)).toEqual(BlockchainLayer1Enum.SOLANA)
    expect(toLayerOneBlockchain(BlockchainEnum.TEZOS)).toEqual(BlockchainLayer1Enum.TEZOS)
  })
})

describe("parseBlockchain", () => {
  it.each(blockchains)("should parse valid blockchains", blockchain => {
    const result = parseBlockchain(withBlockchain(blockchain, "rest"))
    expect(result).toEqual([blockchain, "rest"])
  })

  it.each(invalidWithBlockchainValues)("should throw error when invalid value", address => {
    expect(() => parseBlockchain(address as WithBlockchain)).toThrow(BlockchainParseError)
  })
})
