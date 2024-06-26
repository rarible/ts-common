import { BlockchainEnum, blockchains, evmBlockchains } from "../enum/domain.js"
import { toLayerOneBlockchain } from "../enum/utils.js"
import { randomEVMAddress } from "../../evm/address/index.js"
import { randomFlowAddress } from "../../flow/address/index.js"
import { getRandomContractAddress } from "./random.js"
import { InvalidUnionContractAddressError, toUnionContractAddress } from "./index.js"

describe("toUnionContractAddress", () => {
  it.each(evmBlockchains)("should convert %s blockchain", value => {
    const evmAddress = randomEVMAddress()
    expect(toUnionContractAddress(`${value}:${evmAddress}`)).toEqual(`${value}:${evmAddress}`)
  })

  const invalidBlockchains = ["TEST", "ETHEREUMM"] as const
  it.each(invalidBlockchains)("should throw error in case of invalid or unsupported blockchain - %s", value => {
    const evmAddress = randomEVMAddress()
    expect(() => toUnionContractAddress(`${value}:${evmAddress}`)).toThrowError(InvalidUnionContractAddressError)
  })

  it.each(blockchains)("should convert %s blockchain address", blockchain => {
    const layer1 = toLayerOneBlockchain(blockchain)
    const addressRaw = getRandomContractAddress(layer1)
    expect(toUnionContractAddress(`${blockchain}:${addressRaw}`)).toEqual(`${blockchain}:${addressRaw}`)
  })

  it("should throw error in case when EVM address passed in FLOW union address", () => {
    const addressRaw = randomEVMAddress()
    const blockchain = BlockchainEnum.FLOW
    expect(() => toUnionContractAddress(`${blockchain}:${addressRaw}`)).toThrowError(InvalidUnionContractAddressError)
  })

  it("should throw error in case when passed wallet address instead of contract address in FLOW", () => {
    const addressRaw = randomFlowAddress()
    const blockchain = BlockchainEnum.FLOW
    expect(() => toUnionContractAddress(`${blockchain}:${addressRaw}`)).toThrowError(InvalidUnionContractAddressError)
  })
})
