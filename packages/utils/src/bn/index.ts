import BN from "bignumber.js"

type EthersBigNumber = {
	_isBigNumber: boolean
	_hex: string
}

export function toBn(number: BN.Value | EthersBigNumber, base?: number) {
	if (typeof number === "object" && "_isBigNumber" in number && "_hex" in number) {
		return new BN(number._hex, 16)
	}
	return new BN(number, base)
}

BN.set({
	EXPONENTIAL_AT: 100,
})

export const BigNumber = BN
export type BigNumber = BN
export type BigNumberValue = BN.Value
