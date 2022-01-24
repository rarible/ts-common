import type Web3 from "web3"
import { createRPCPayload } from "./create-rpc-payload"
import { getSendMethodOrThrow } from "./extract-send-method"
import { handleRPCResponse } from "./handle-rpc-response"

export function signTypedData(web3: Web3, data: any, signer: string) {
	return new Promise<any>((resolve, reject) => {
		const send = getSendMethodOrThrow(web3.currentProvider)
		return send(
			createRPCPayload("eth_signTypedData", [signer, JSON.stringify(data)]),
			(error, result) => {
				try {
					const parsed = handleRPCResponse(error, result)
					if (typeof parsed === "string") {
						const sig0 = parsed.substring(2)
						return resolve({
							data,
							sig: parsed,
							v: parseInt(sig0.substring(128, 130), 16),
							r: "0x" + sig0.substring(0, 64),
							s: "0x" + sig0.substring(64, 128),
						})
					}
					reject(new Error("Can't parse JSON RPC with signature"))
				} catch (error) {
					reject(error)
				}
			}
		)
	})
}
