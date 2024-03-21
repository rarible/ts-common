const blockchains = [
	"ETHEREUM",
	"FLOW",
	"TEZOS",
	"SOLANA",
]

const realBlockchains = [
	"ETHEREUM",
	"FLOW",
	"TEZOS",
	"POLYGON",
	"SOLANA",
	"ECLIPSE",
	"IMMUTABLEX",
	"MANTLE",
	"ARBITRUM",
	"ZKSYNC",
	"CHILIZ",
	"LIGHTLINK",
	"RARI",
	"ASTARZKEVM",
	"BASE",
	"FIEF",
	"XAI",
	"KROMA",
	"CELO",
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
