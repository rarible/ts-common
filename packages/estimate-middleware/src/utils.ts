import type { SafeEventEmitterProvider } from "eth-json-rpc-middleware/dist/utils/cache"
import type { JsonRpcError } from "json-rpc-engine"

export function isSafeEventEmitterProvider(x: unknown): x is SafeEventEmitterProvider {
	return typeof x === "object" && x !== null && "send" in x && "sendAsync" in x
}


export function createNotSupportedError(): JsonRpcError {
	return {
		code: -32000,
		message: "Notifications not supported",
	}
}