import { InvalidTransactionHashError } from "../../common"
import { toEVMTransactionHash } from "."

const invalidValues = [
  "6a3b8323f3c1676da3437345892bc47e5801f9922d4c7cabadf48de1d7d2f683",
  "0x6a3b8323f3c1676da3437345892bc47e5801f9922d4c7cabadf48de1d7d2f6831",
  "unknown-hash",
  "0x0",
]
const validValues = ["0x6a3b8323f3c1676da3437345892bc47e5801f9922d4c7cabadf48de1d7d2f683"]

describe("toEVMTransactionHash", () => {
  it.each(validValues)("should convert to transaction hash", hash => {
    expect(toEVMTransactionHash(hash)).toEqual(hash)
  })

  it.each(invalidValues)("should throw error with invalid transaction hashes", hash => {
    expect(() => toEVMTransactionHash(hash)).toThrow(InvalidTransactionHashError)
  })
})
