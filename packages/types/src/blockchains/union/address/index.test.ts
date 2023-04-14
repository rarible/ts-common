import { blockchains, blockchainsLayer1, toLayerOneBlockchain, withBlockchain, withLayer1Blockchain } from "../enum"
import { InvalidUnionAddressError, toUnionAddress } from "."

describe("toUnionAddress", () => {
  it("should convert all valid layer1 blockchains", () => {
    blockchainsLayer1.forEach(x => {
      expect(toUnionAddress(withLayer1Blockchain(x, "[address]"))).toEqual(`${x}:[address]`)
    })
  })

  it("should convert all valid blockchains", () => {
    blockchains.forEach(x => {
      expect(toUnionAddress(withBlockchain(x, "[address]"))).toEqual(`${toLayerOneBlockchain(x)}:[address]`)
    })
  })

  it("should throw error if invalid value passed", () => {
    expect(() => toUnionAddress("some-value")).toThrow(InvalidUnionAddressError)
  })
})
