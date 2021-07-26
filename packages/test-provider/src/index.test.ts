import Web3ProviderEngine from "web3-provider-engine"
import Wallet from "ethereumjs-wallet"
import { TestSubprovider } from "@rarible/test-provider"
import Web3 from "web3"
// @ts-ignore
import RpcSubprovider from "web3-provider-engine/subproviders/rpc"
import { randomWord } from "@rarible/types/src"

describe("TestProvider", function () {
	const { web3, wallet } = createE2eProvider()

	test("e2e chain works", async () => {
		const from = wallet.getAddressString()
		await web3.eth.sendTransaction({ from, to: from, value: 0 })
	})
})

export function createE2eProvider() {
	const key = randomWord().substring(2)

	const provider = new Web3ProviderEngine()
	const wallet = new Wallet(Buffer.from(key, "hex"))
	provider.addProvider(new TestSubprovider(wallet))
	provider.addProvider(new RpcSubprovider({ rpcUrl: "https://node-e2e.rarible.com" }))
	const web3 = new Web3(provider)

	beforeAll(() => {
		provider.start()
	})

	afterAll(() => {
		provider.stop()
	})

	return {
		web3,
		wallet,
	}
}