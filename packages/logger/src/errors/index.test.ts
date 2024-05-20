import { NetworkError, Warning } from "./index.js"

describe("Warning", () => {
  it("should have valid properties", () => {
    const cause = new Error("Test")
    const data = { name: "John Doe" }
    const warn = new Warning("Test message", { cause, data })
    expect(warn.name).toEqual("Warning")
    expect(warn.cause).toEqual(cause)
    expect(warn.data).toEqual(data)
  })
})

describe("NetworkError", () => {
  it("should have valid properties", () => {
    const cause = new Error("Test")
    const error = new NetworkError({
      status: -1,
      url: "unknown",
      data: "none",
      formData: "none",
      method: "unknown",
      code: "1337",
      cause,
    })
    expect(error.name).toEqual("NetworkError")
    expect(error.status).toEqual(-1)
    expect(error.data).toEqual("none")
    expect(error.formData).toEqual("none")
    expect(error.method).toEqual("unknown")
    expect(error.code).toEqual("1337")
    expect(error.cause).toEqual(cause)
  })
})
