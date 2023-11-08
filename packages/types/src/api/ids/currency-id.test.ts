import { toCurrencyId } from "./currency-id"

describe("toCurrencyId", () => {
  it("should support native word", () => {
    expect(toCurrencyId("ETHEREUM:native")).toBe("ETHEREUM:0x0000000000000000000000000000000000000000")
  })
})
