import Web3 from "web3"
import type { AbstractProvider, HttpProvider, IpcProvider, WebsocketProvider } from "web3-core"

export function signTypedData(web3: Web3, data: any, signer: string) {
	return new Promise<any>((resolve, reject) => {
		const send = getSendMethodOrThrow(web3.currentProvider)
		return send({
			method: "eth_signTypedData_v4",
			params: [signer, JSON.stringify(data)],
			jsonrpc: "2.0",
			id: new Date().getTime(),
		}, (error, result) => {
			if (error) {
				return reject(error)
			}
			if (!result) {
				return reject(new Error("No signature result received"))
			}
			if (result.error) {
				return reject(result.error)
			}
			const sig0 = result.result.substring(2)
			return resolve({
				data,
				sig: result.result,
				v: parseInt(sig0.substring(128, 130), 16),
				r: "0x" + sig0.substring(0, 64),
				s: "0x" + sig0.substring(64, 128),
			})
		})
	})
}

export type JsonRpcResponse = {
	jsonrpc: string;
	id: number;
	result?: any;
	error?: string;
}
export type SendMethod = (
	payload: any, callback: (error: Error | null, result?: JsonRpcResponse | undefined) => void
) => void
export type Web3Provider = null | string | HttpProvider | IpcProvider | WebsocketProvider | AbstractProvider

export function getSendMethod(provider: Web3Provider): SendMethod | undefined {
	if (provider !== null && typeof provider === "object") {
		if (typeof (provider as AbstractProvider).sendAsync !== "undefined") {
			return (provider as AbstractProvider).sendAsync.bind(provider)
		}
		if (typeof provider.send !== "undefined") {
			return provider.send.bind(provider)
		}
	}
	return undefined
}


export function getSendMethodOrThrow(provider: Web3Provider): SendMethod {
	const method = getSendMethod(provider)
	if (!method) {
		throw new Error("This provider doesn't support sending transactions")
	}
	return method
}
