import { isCircular } from "."

describe("isCircular", () => {
  it("must return true if circular", () => {
    const a = {}
    const b = {}
    Object.defineProperty(a, "b", {
      value: b,
      writable: true,
      enumerable: true,
    })
    Object.defineProperty(b, "a", {
      value: a,
      writable: true,
      enumerable: true,
    })
    expect(isCircular(a)).toEqual(true)
  })

  it("must return false if not circular", () => {
    const s = {
      hello: "world",
    }
    expect(isCircular(s)).toEqual(false)
  })
})
