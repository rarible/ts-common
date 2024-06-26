import { BlockchainEnum, BlockchainLayer1Enum, blockchains, evmBlockchains } from "../enum/domain.js"
import { toLayerOneBlockchain } from "../enum/utils.js"
import { randomEVMAddress } from "../../evm/address/index.js"
import { getRandomAddress } from "./random.js"
import { InvalidUnionAddressError, toUnionAddress } from "./utils.js"

describe("toUnionAddress", () => {
  it.each(evmBlockchains)("should convert %s blockchain values to ETHEREUM L1", value => {
    const evmAddress = randomEVMAddress()
    expect(toUnionAddress(`${value}:${evmAddress}`)).toEqual(`${BlockchainLayer1Enum.ETHEREUM}:${evmAddress}`)
  })

  const invalidBlockchains = ["TEST", "ETHEREUMM"] as const
  it.each(invalidBlockchains)("should throw error in case of invalid or unsupported blockchain - %s", value => {
    const evmAddress = randomEVMAddress()
    expect(() => toUnionAddress(`${value}:${evmAddress}`)).toThrowError(InvalidUnionAddressError)
  })

  it.each(blockchains)("should convert %s blockchain address", blockchain => {
    const layer1 = toLayerOneBlockchain(blockchain)
    const addressRaw = getRandomAddress(layer1)
    expect(toUnionAddress(`${blockchain}:${addressRaw}`)).toEqual(`${layer1}:${addressRaw}`)
  })

  it("should throw error in case when EVM address passed in FLOW union address", () => {
    const addressRaw = randomEVMAddress()
    const blockchain = BlockchainEnum.FLOW
    expect(() => toUnionAddress(`${blockchain}:${addressRaw}`)).toThrowError(InvalidUnionAddressError)
  })
})
