import type { JsonRpcResponse, JsonRpcPayload } from "web3-core-helpers"

export type SendMethod = (
	payload: JsonRpcPayload,
	callback: (error: Error | null, result?: JsonRpcResponse | undefined) => void
) => void

type SomeProvider = Partial<{
	sendAsync: SendMethod
	send: SendMethod
}>

export function extractSendMethod(provider: unknown): SendMethod | undefined {
	if (isSomeProvider(provider)) {
		if (provider.sendAsync) {
			return provider.sendAsync.bind(provider)
		}
		if (provider.send) {
			return provider.send.bind(provider)
		}
	}
	return undefined
}

function isSomeProvider(x: unknown): x is SomeProvider {
	return typeof x === "object" && x !== null && ("sendAsync" in x || "send" in x)
}

export function getSendMethodOrThrow(provider: unknown): SendMethod {
	const method = extractSendMethod(provider)
	if (!method) {
		throw new Error("This provider doesn't support sending transactions")
	}
	return method
}
