import { stringifyObject } from "./index"

const dateNow = new Date()
const objectsMapping: Record<string, any> = {
  undefined: undefined,
  null: null,
  unnamedFunction: function () {},
  namedFunction: function myFunc() {},
  object: { name: "John Doe" },
  emptySymbol: Symbol(),
  namedSymbol: Symbol("Test"),
  error: new Error("Test"),
  array: ["test", 23],
  date: dateNow,
}

describe("stringifyObject", () => {
  const defaultByteSize = 1024

  it("should stringify complex object", () => {
    const value = {
      ...objectsMapping,
      nested: {
        undefined: objectsMapping.undefined,
        error: objectsMapping.error,
      },
      array: [objectsMapping.undefined, objectsMapping.error],
    }

    expect(stringifyObject(defaultByteSize, value, 0)).toEqual({
      emptySymbol: "[symbol: Symbol()]",
      error: "[Error: Test]",
      namedFunction: "[function: myFunc]",
      namedSymbol: "[symbol: Symbol(Test)]",
      null: "[null]",
      undefined: "[undefined]",
      object: `{"name":"John Doe"}`,
      unnamedFunction: "[function: unnamedFunction]",
      nested: `{"undefined":"[undefined]","error":"[Error: Test]"}`,
      array: `["[undefined]","[Error: Test]"]`,
      date: `[date: ${dateNow.toISOString()}]`,
    })
  })

  it("should not serialize object due to bytesize limit", () => {
    expect(stringifyObject(0, { name: "John Doe" })).toEqual({
      name: "[too-big-object]",
    })
  })

  it("should work with circular structures", () => {
    const obj = {
      name: "Alice",
      child: { name: "Bob" },
    }
    ;(obj as any).child.self = obj.child

    expect(stringifyObject(defaultByteSize, obj, 0)).toEqual({
      name: "Alice",
      child: '{"name":"Bob","self":"[Circular ~]"}',
    })
  })
})
