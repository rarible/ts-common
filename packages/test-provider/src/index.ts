import HookedWalletSubprovider from "web3-provider-engine/subproviders/hooked-wallet"
import * as ethUtil from "ethereumjs-util"
import { TransactionFactory } from "@ethereumjs/tx"
import Common from "@ethereumjs/common"
import Wallet from "ethereumjs-wallet"
import * as sigUtil from "eth-sig-util"

export type TestProviderChain = {
	networkId: number
	chainId: number
}

// noinspection JSUnusedGlobalSymbols
export class TestSubprovider extends HookedWalletSubprovider {
	constructor(wallet: Wallet, chain?: TestProviderChain) {
		const privateKey = wallet.getPrivateKey()

		const common = chain && Common.forCustomChain("mainnet", {
			name: "dev",
      ...chain
		})
		super({
			getAccounts: function (cb: any) {
				cb(null, [wallet.getAddressString()])
			},

			signTransaction: function(txData: any, cb: any) {
				if (txData.gas !== undefined) txData.gasLimit = txData.gas
				txData.value = txData.value || "0x00"
				txData.data = ethUtil.addHexPrefix(txData.data)
				const tx = TransactionFactory.fromTxData(txData, { common })
				const signedTx = tx.sign(privateKey)
				cb(null, "0x" + signedTx.serialize().toString("hex"))
			},

			signMessage: function(msgParams: any, cb: any) {
				const dataBuff = ethUtil.toBuffer(msgParams.data)
				const msgHash = ethUtil.hashPersonalMessage(dataBuff)
				const sig = ethUtil.ecsign(msgHash, privateKey)
				const serialized = ethUtil.bufferToHex(concatSig(sig.v, sig.r, sig.s))
				cb(null, serialized)
			},

			signPersonalMessage: function(msgParams: any, cb: any) {
				const serialized = sigUtil.signTypedMessage(privateKey, {
					data: JSON.parse(msgParams.data)
				}, "V4")
				cb(null, serialized)
			},

			signTypedMessage: function(msgParams: any, cb: any) {
				const serialized = sigUtil.signTypedData(privateKey, {
					data: JSON.parse(msgParams.data)
				})
				cb(null, serialized)
			}
		})


	}
}

function concatSig(v: any, r: any, s: any) {
	r = ethUtil.fromSigned(r)
	s = ethUtil.fromSigned(s)
	v = ethUtil.bufferToInt(v)
	r = ethUtil.toUnsigned(r).toString("hex").padStart(64, "0")
	s = ethUtil.toUnsigned(s).toString("hex").padStart(64, "0")
	v = ethUtil.stripHexPrefix(ethUtil.intToHex(v))
	return ethUtil.addHexPrefix(r.concat(s, v).toString("hex")) as any
  }
