import { createTestProvider } from "@rarible/test-provider/build/utils/create-test-provider"
import Ganache from "ganache-core"
import Wallet from "ethereumjs-wallet"
import { useTestProvider } from "@rarible/test-provider/build/utils/use-test-provider"
import Web3 from "web3"
import { randomAddress, randomWord } from "@rarible/types"
import { estimate } from "."

describe("estimate middleware", () => {
	const { provider, wallet } = createTestProvider(undefined)
	const web3 = new Web3(provider)

	useTestProvider(provider)

	test("should throw error when no funds", async () => {
		expect.assertions(1)

		const promise = web3.eth.sendTransaction({
			from: wallet.getAddressString(),
			to: randomAddress(),
			value: 1,
		}).catch(error => error.message.indexOf("Insufficient funds"))

		await expect(promise).resolves.toBe(0)
	})


	test("estimates tx before send", async () => {
		const wallet = new Wallet(Buffer.from(randomWord().substring(2), "hex"))

		const provider = Ganache.provider({
			accounts: [{
				secretKey: wallet.getPrivateKey(),
				balance: "0x1000000000000000000000000000",
			}],
		})
		const web3 = new Web3(estimate(provider) as any)

		const receipt = await web3.eth.sendTransaction({
			from: wallet.getAddressString(),
			to: randomAddress(),
			value: 10000,
		})
		const tx = await web3.eth.getTransaction(receipt.transactionHash)
		expect(tx.gas).toBe(21000)

		const web3Error = new Web3(provider as any)
		const receiptError = await web3Error.eth.sendTransaction({
			from: wallet.getAddressString(),
			to: randomAddress(),
			value: 10000,
		})
		const txError = await web3.eth.getTransaction(receiptError.transactionHash)
		expect(txError.gas).not.toBe(21000)
	})
})
