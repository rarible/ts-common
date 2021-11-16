import { randomBinary } from "./binary"

export type FlowAddress = string & {
	"__IS_FLOW_ADDRESS__": true
}

export function toFlowAddress(value: string): FlowAddress {
	let hex: string
	if (value.startsWith("0x")) {
		hex = value.substring(2).toLowerCase()
	} else {
		hex = value.toLowerCase()
	}
	const re = /[0-9a-f]{16}/g
	if (re.test(hex)) {
		return `0x${hex}` as FlowAddress
	} else {
		throw new Error(`not an flow address: ${value}`)
	}
}

export const FLOW_ZERO_ADDRESS = toFlowAddress("0x0000000000000000")

export function randomFlowAddress() {
	return toFlowAddress(randomBinary(8))
}
