import { CustomError } from "../custom"
import { extractErrorName } from "./index"

describe("extractErrorName", () => {
  it("it should extract name from error-like object", () => {
    expect(extractErrorName({ name: "MyName" })).toEqual("MyName")
  })

  it("it should extract name from SomeObject instance", () => {
    const someObject = new SomeObject()
    expect(extractErrorName(someObject)).toEqual("SomeObject")
  })

  it("it should extract code from SomeError instance", () => {
    const someError = new SomeError()
    expect(extractErrorName(someError)).toEqual("Error")
  })

  it("it should extract code from SomeCustomError instance", () => {
    const someCustomError = new SomeCustomError()
    expect(extractErrorName(someCustomError)).toEqual("SomeCustomError")
  })
})

class SomeObject {}
class SomeError extends Error {}
class SomeCustomError extends CustomError {}
