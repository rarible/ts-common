import type Web3ProviderEngine from "web3-provider-engine"

export function useTestProvider(provider: Web3ProviderEngine) {
	beforeAll(() => {
		provider.start()
	})

	afterAll(() => {
		provider.stop()
	})
}