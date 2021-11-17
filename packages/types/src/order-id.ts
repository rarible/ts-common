import { isRealBlockchainSpecified } from "./blockchains"

export type OrderId = string & {
	"__IS_ORDER_ID__": true
}

export function toOrderId(value: string): OrderId {
	if (!isRealBlockchainSpecified(value)) {
		throw new Error(`Not an OrderId: ${value}`)
	}
	return value as OrderId
}
