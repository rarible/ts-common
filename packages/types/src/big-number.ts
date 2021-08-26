export type BigNumber = string & {
	"__IS_BIG_NUMBER__": true
}

export function toBigNumber(value: string): BigNumber {
	return value as BigNumber
}

export const ZERO_NUMBER = toBigNumber("0")
