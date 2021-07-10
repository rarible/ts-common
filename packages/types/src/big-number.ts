declare const validBigNumber: unique symbol

export type BigNumber = string & {
	[validBigNumber]: true
}

export function toBigNumber(value: string): BigNumber {
	return value as BigNumber
}

export const ZERO_NUMBER = toBigNumber("0")
