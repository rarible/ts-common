import { randomBinary } from "./binary"

export type Address = string & {
	"__IS_ADDRESS__": true
}

export function toAddress(value: string): Address {
	let hex: string
	if (value.startsWith("0x")) {
		hex = value.substring(2).toLowerCase()
	} else {
		hex = value.toLowerCase()
	}
	const re = /[0-9a-f]{40}/g
	if (re.test(hex)) {
		return `0x${hex}` as Address
	} else {
		throw new Error(`not an address: ${value}`)
	}
}

export const ZERO_ADDRESS = toAddress("0x0000000000000000000000000000000000000000")

export function randomAddress() {
	return toAddress(randomBinary(20))
}
