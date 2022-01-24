import type { JsonRpcResponse } from "web3-core-helpers"
import type { Nullish } from "../domain"

export function handleRPCResponse(error: Nullish | unknown, response: Nullish | JsonRpcResponse): unknown {
	if (error) {
		throw error
	}
	if (!response) {
		throw new Error("No signature result received")
	}
	if (response.error) {
		throw response.error
	}
	return response.result
}