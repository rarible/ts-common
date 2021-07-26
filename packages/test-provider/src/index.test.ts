import Web3ProviderEngine from "web3-provider-engine"
import Wallet from "ethereumjs-wallet"
import Web3 from "web3"
import RpcSubprovider from "web3-provider-engine/subproviders/rpc"
import { randomWord } from "@rarible/types/src"
import { signTypedData } from "./utils"
import { testOrderData } from "./mocks"
import { TestSubprovider } from "./index"

describe("TestProvider", function() {
	const { web3, wallet } = createE2eProvider()

	test("e2e chain works", async () => {
		expect.assertions(1)
		const from = wallet.getAddressString()
		const result = await web3.eth.sendTransaction({
			from,
			to: from,
			value: 0
		})
		expect(result).toBeTruthy()
	})

	test("sign typed data works", async () => {
		expect.assertions(1)
		const signature = await signTypedData(web3, testOrderData, wallet.getAddressString())
		expect(signature).toBeTruthy()
	})
})

function createE2eProvider() {
	const key = randomWord().substring(2)

	const provider = new Web3ProviderEngine()
	const wallet = new Wallet(Buffer.from(key, "hex"))

	provider.addProvider(new TestSubprovider(wallet, {
		networkId: 17,
		chainId: 17
	}))
	provider.addProvider(new RpcSubprovider({
		rpcUrl: "https://node-e2e.rarible.com"
	}))
	const web3 = new Web3(provider)

	beforeAll(() => {
		provider.start()
	})

	afterAll(() => {
		provider.stop()
	})

	return { web3, wallet }
}
