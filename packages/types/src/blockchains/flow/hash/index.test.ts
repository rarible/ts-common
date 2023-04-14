import { InvalidFlowTransactionHashError, toFlowTransactionHash } from "."

describe("toFlowTransactionHash", () => {
  it("should convert valid flow hash", () => {
    const hash = "8799209ed47f86db11253b1c8ec06b655505ad62fc59305eb660cf879033c44a"
    expect(toFlowTransactionHash(hash)).toEqual(hash)
  })

  it("should throw error if invalid flow hash", () => {
    ;["8799209ed47f86db11253b1c8ec06b655505ad62fc59305eb660cf879033c44a1", "unknown-hash", "0x0"].forEach(x => {
      expect(() => toFlowTransactionHash(x)).toThrow(InvalidFlowTransactionHashError)
    })
  })
})
