import { CodeError } from "./index.js"

describe("CodeError", () => {
  const validCodeExamples = [
    {
      value: 1337,
      intValue: 1337,
    },
    {
      value: "1337",
      intValue: 1337,
    },
  ]
  const invalidCodeExamples = ["hello", null, undefined, {}]

  it("should parse error-like object with the code", () => {
    validCodeExamples.forEach(x => {
      const parsed = CodeError.parse({ code: x.value })
      expect(parsed.code).toEqual(x.intValue)
    })
  })

  it("should apply fallback code when code is invalid", () => {
    invalidCodeExamples.forEach(x => {
      const parsed = CodeError.parse({ code: x })
      expect(parsed.code).toEqual(CodeError.UNKNOWN_CODE)
    })
  })

  it("should parse error-like object with the code, message and name", () => {
    validCodeExamples.forEach(x => {
      const message = "Hello world"
      const cause = new CodeError(x.intValue, message)
      const parsed = CodeError.parse(cause)
      expect(parsed.code).toEqual(x.intValue)
      expect(parsed.message).toEqual(message)
      expect(parsed.cause).toBe(cause)
    })
  })

  it("should parse custom error with code", () => {
    const customError = new CustomCodeError()
    const parsed = CodeError.parse(customError)
    expect(parsed.message).toEqual(customError.message)
    expect(parsed.name).toEqual("CodeError")
    expect(parsed.cause).toEqual(customError)
  })
})

class CustomCodeError extends Error {
  readonly code = 1337
  constructor() {
    super("Custom code error")
  }
}
