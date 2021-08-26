import BN from "bignumber.js"

export function toBn(number: BN.Value, base?: number) {
	return new BN(number, base)
}

BN.set({
	EXPONENTIAL_AT: 100,
})

export const BigNumber = BN
export type BigNumber = BN
export type BigNumberValue = BN.Value
