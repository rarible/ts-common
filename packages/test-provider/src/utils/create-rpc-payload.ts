import type { JsonRpcPayload } from "web3-core-helpers"

export function createRPCPayload(method: string, params: any[]): JsonRpcPayload {
	return {
		jsonrpc: "2.0",
		id: Date.now(),
		method,
		params,
	}
}