import { CustomError } from "../custom"
import { extractErrorName, isErrorLike } from "./index"

describe("extractErrorName", () => {
  it("should extract name from error-like object", () => {
    expect(extractErrorName({ name: "MyName" })).toEqual("MyName")
  })

  it("should extract name from SomeObject instance", () => {
    const someObject = new SomeObject()
    expect(extractErrorName(someObject)).toEqual("SomeObject")
  })

  it("should extract code from SomeError instance", () => {
    const someError = new SomeError()
    expect(extractErrorName(someError)).toEqual("Error")
  })

  it("should extract code from SomeCustomError instance", () => {
    const someCustomError = new SomeCustomError()
    expect(extractErrorName(someCustomError)).toEqual("SomeCustomError")
  })

  it("should return true in case of error like object", () => {
    const error = {
      message: "Hello world",
      name: "MyError",
    }
    expect(isErrorLike(error)).toEqual(true)
  })
})

class SomeObject {}
class SomeError extends Error {}
class SomeCustomError extends CustomError {}
