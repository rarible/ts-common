export type Binary = string & {
  __IS_BINARY__: true
}

/**
 * Convert string to binary string
 * @note that it also convert to lowercase
 *
 * 0xTest -> 0xtest
 * Test -> 0xtest
 */

export function toBinary(value: string, re = /[0-9a-f]*/g): Binary {
  let hex: string
  if (value.startsWith("0x")) {
    hex = value.substring(2).toLowerCase()
  } else {
    hex = value.toLowerCase()
  }
  if (re.test(hex)) {
    return `0x${hex}` as Binary
  }
  throw new InvalidBinaryError(value)
}

export type Word = Binary & {
  __IS_WORD__: true
}

export function toWord(value: string): Word {
  return toBinary(value, /[0-9a-f]{64}/g) as Word
}

export const ZERO_WORD = toWord("0x0000000000000000000000000000000000000000000000000000000000000000")

export function randomWord() {
  return toWord(randomBinary(32))
}

export function randomBinary(size: number): Binary {
  return `0x${Array.from(new Array(size * 2))
    .map(() => Math.floor(Math.random() * 16).toString(16))
    .join("")}` as Binary
}

export class InvalidBinaryError extends Error {
  readonly name = "InvalidBinaryError"
  constructor(value: string) {
    super(`Not a binary ${value}`)
  }
}
