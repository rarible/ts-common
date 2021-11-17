const blockchains = [
	"ETHEREUM",
	"FLOW",
	"TEZOS",
]

const realBlockchains = [
	"ETHEREUM",
	"FLOW",
	"TEZOS",
	"POLYGON",
]

export function isBlockchainSpecified(value: string) {
	for (const blockchain of blockchains) {
		if (value.startsWith(`${blockchain}:`)) {
			return true
		}
	}
	return false
}

export function isRealBlockchainSpecified(value: string) {
	for (const blockchain of realBlockchains) {
		if (value.startsWith(`${blockchain}:`)) {
			return true
		}
	}
	return false
}
