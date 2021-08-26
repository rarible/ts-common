import { randomBinary } from "./binary"

export type Word = string & {
	"__IS_WORD__": true
}

export function toWord(value: string): Word {
	let hex: string
	if (value.startsWith("0x")) {
		hex = value.substring(2).toLowerCase()
	} else {
		hex = value.toLowerCase()
	}
	const re = /[0-9a-f]{64}/g
	if (re.test(hex)) {
		return `0x${hex}` as Word
	} else {
		throw new Error(`not a word: ${value}`)
	}
}

export const ZERO_WORD = "0x0000000000000000000000000000000000000000000000000000000000000000" as Word

export function randomWord() {
	return toWord(randomBinary(32))
}
