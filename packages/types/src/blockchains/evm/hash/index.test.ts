import { InvalidEVMTransactionHashError, toEVMTransactionHash } from "."

describe("toEVMTransactionHash", () => {
  it("should convert to transaction hash", () => {
    const tx = "0x6a3b8323f3c1676da3437345892bc47e5801f9922d4c7cabadf48de1d7d2f683"
    expect(toEVMTransactionHash(tx)).toEqual(tx)
  })

  it("should throw error with invalid transaction hashes", () => {
    ;[
      "6a3b8323f3c1676da3437345892bc47e5801f9922d4c7cabadf48de1d7d2f683",
      "0x6a3b8323f3c1676da3437345892bc47e5801f9922d4c7cabadf48de1d7d2f6831",
      "unknown-hash",
      "0x0",
    ].forEach(x => {
      expect(() => toEVMTransactionHash(x)).toThrow(InvalidEVMTransactionHashError)
    })
  })
})
