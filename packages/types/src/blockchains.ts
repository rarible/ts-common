const blockchains = [
	"ETHEREUM",
	"FLOW",
	"TEZOS",
]

export function isBlockchainSpecified(value: string) {
	for (const blockchain of blockchains) {
		if (value.startsWith(`${blockchain}:`)) {
			return true
		}
	}
	return false
}
