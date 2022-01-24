import Wallet from "ethereumjs-wallet"
import { randomWord } from "@rarible/types"
import RpcSubprovider from "web3-provider-engine/subproviders/rpc"
import Web3ProviderEngine from "web3-provider-engine"
import type { TestProviderChain } from "../domain"
import { TestSubprovider } from ".."

export function createTestWallet(pk = randomWord().substring(2)) {
	return new Wallet(Buffer.from(pk, "hex"))
}

const defaultChain: TestProviderChain = {
	networkId: 17,
	chainId: 17,
}

export function createTestProvider(pk: string | undefined, chain: TestProviderChain = defaultChain) {
	const wallet = createTestWallet(pk)
	const provider = new Web3ProviderEngine({
		pollingInterval: 100,
	})

	provider.addProvider(new TestSubprovider(wallet, chain))
	provider.addProvider(
		new RpcSubprovider({
			rpcUrl: "https://node-e2e.rarible.com",
		})
	)
	return {
		provider,
		wallet,
	}
}