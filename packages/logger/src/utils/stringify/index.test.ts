import { stringify, stringifyObject } from "./index"

type ObjectAssert<T> = {
  value: T
  assert: string | number
}

const unnamedFunction = function () {}
const objectsMapping: Record<string, ObjectAssert<any>> = {
  undefined: {
    value: undefined,
    assert: "[null]",
  },
  null: {
    value: null,
    assert: "[null]",
  },
  unnamedFunction: {
    value: unnamedFunction,
    assert: `[function: unnamedFunction]`,
  },
  namedFunction: {
    value: function myFunc() {},
    assert: `[function: myFunc]`,
  },
  emptyObject: {
    value: {},
    assert: `{}`,
  },
  userObject: {
    value: { name: "John Doe" },
    assert: `{"name":"John Doe"}`,
  },
  emptySymbol: {
    value: Symbol(),
    assert: `[symbol: Symbol()]`,
  },
  namedSymbol: {
    value: Symbol("Test"),
    assert: `[symbol: Symbol(Test)]`,
  },
  error: {
    value: new Error("Test"),
    assert: `[Error: Test]`,
  },
  emptyArray: {
    value: [],
    assert: "[empty]",
  },
  array: {
    value: ["test", 23],
    assert: "test, 23",
  },
}

describe("stringify", () => {
  const defaultByteSize = 1024

  it("should stringify single values", () => {
    const keys = Object.keys(objectsMapping)
    keys.forEach(x => {
      const val = objectsMapping[x]
      expect(stringify(defaultByteSize, val.value)).toEqual(val.assert)
    })
  })

  it("should stringify array", () => {
    const keys = Object.keys(objectsMapping)
    const values = keys.map(x => objectsMapping[x].value)
    const stringified = keys.map(x => objectsMapping[x].assert).join(", ")
    expect(stringify(defaultByteSize, values)).toEqual(stringified)
  })
})

describe("stringifyObject", () => {
  const defaultByteSize = 1024

  it("should stringify object", () => {
    const value = {
      name: "John Doe",
      age: 42,
    }
    expect(stringifyObject(defaultByteSize, value)).toEqual({
      name: "John Doe",
      age: 42,
    })
  })
})
