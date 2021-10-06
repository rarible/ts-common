export type OrderId = string & {
	"__IS_ORDER_ID__": true
}

export function toOrderId(value: string): OrderId {
	return value as OrderId
}
