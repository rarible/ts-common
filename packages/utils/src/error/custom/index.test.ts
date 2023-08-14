import { CustomError } from "./index"

describe("CustomError", () => {
  it("should have proper name", () => {
    const subsequentError = new Error("Test error")
    const error = new CustomError("My error occured", {
      name: "MyError",
      cause: subsequentError,
    })
    expect(error.name).toEqual("MyError")
  })
})
