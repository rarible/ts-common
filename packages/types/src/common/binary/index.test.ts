import { InvalidBinaryError, ZERO_WORD, randomWord, toBinary, toWord } from "."

describe("toBinary", () => {
  it("should convert to binary", () => {
    ;["0xTest", "Test"].forEach(x => {
      expect(toBinary(x)).toEqual("0xtest")
    })
  })
})

describe("toWord", () => {
  it("should convert to word", () => {
    const word = randomWord()
    expect(toWord(word)).toEqual(word)
    expect(toWord(ZERO_WORD)).toEqual(ZERO_WORD)
  })

  it("should throw error if invalid word", () => {
    expect(() => toWord("123")).toThrow(InvalidBinaryError)
  })
})
