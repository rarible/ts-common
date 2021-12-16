import Wallet from "ethereumjs-wallet"
import Ganache from "ganache-core"
import Web3 from "web3"
import { randomAddress, randomWord } from "@rarible/types"
import { estimate } from "./estimate"

test("estimate middleware estimates tx before send", async () => {
	const pk = [randomWord()]
	const wallets: Wallet[] = pk.map(single => new Wallet(Buffer.from(single.substring(2), "hex")))
	const accounts = wallets.map(wallet => ({
		secretKey: wallet.getPrivateKey(),
		balance: "0x1000000000000000000000000000",
	}))

	const provider = Ganache.provider({ accounts })
	const web3 = new Web3(estimate(provider as any, undefined) as any)

	const to = randomAddress()
	const receipt = await web3.eth.sendTransaction({ from: wallets[0].getAddressString(), to, value: 10000 })
	const tx = await web3.eth.getTransaction(receipt.transactionHash)
	expect(tx.gas).toBe(21000)

	const web3Error = new Web3(provider as any)
	const receiptError = await web3Error.eth.sendTransaction({ from: wallets[0].getAddressString(), to, value: 10000 })
	const txError = await web3.eth.getTransaction(receiptError.transactionHash)
	expect(txError.gas).not.toBe(21000)
})
