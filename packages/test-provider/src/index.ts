// @ts-ignore
import HookedWalletSubprovider from "web3-provider-engine/subproviders/hooked-wallet"
import { addHexPrefix } from "ethereumjs-util"
import { Transaction } from "ethereumjs-tx"
import Wallet from "ethereumjs-wallet"
// eslint-disable-next-line
import { personalSign, signTypedData_v4 } from "eth-sig-util"

// noinspection JSUnusedGlobalSymbols
export class TestSubprovider extends HookedWalletSubprovider {
	constructor(private readonly wallet: Wallet) {
		super({
			getAccounts: function (cb: any) {
				cb(null, [wallet.getAddressString()])
			},
			signTransaction: function (txData: any, cb: any) {
				// defaults
				if (txData.gas !== undefined) txData.gasLimit = txData.gas
				txData.value = txData.value || "0x00"
				txData.data = addHexPrefix(txData.data)

				const tx = new Transaction(txData)
				tx.sign(wallet.getPrivateKey())
				cb(null, "0x" + tx.serialize().toString("hex"))
			},
			signPersonalMessage: function (msgParams: any, cb: any) {
				const privateKey = wallet.getPrivateKey()
				const serialized = personalSign(privateKey, msgParams)
				cb(null, serialized)
			},
			signTypedMessage: function (msgParams: any, cb: any) {
				const privateKey = wallet.getPrivateKey()
				const sig = signTypedData_v4(privateKey, { data: msgParams.data })
				cb(null, sig)
			},
		})
	}
}
