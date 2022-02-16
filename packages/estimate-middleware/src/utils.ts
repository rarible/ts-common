import type { SafeEventEmitterProvider } from "eth-json-rpc-middleware/dist/utils/cache"
import type { JsonRpcError } from "json-rpc-engine"

export function isSafeEventEmitterProvider(x: unknown): x is SafeEventEmitterProvider {
	return typeof x === "object" && x !== null && "send" in x && "sendAsync" in x
}


export class RpcError extends Error implements JsonRpcError {
	readonly code: number
	constructor(message: string, code: number) {
		super(message)
		this.code = code
		// eslint-disable-next-line unicorn/custom-error-definition
		this.name = "JsonRpcError"
	}
}

export function extractError(error: unknown): Error {
	if (isObject(error)) {
		if ("data" in error) {
			const { data } = error as JsonRpcError
			if (isObject(data) && isJsonRpcError(data)) {
				return new RpcError(data.message, data.code)
			}
		}
		if (isJsonRpcError(error)) {
			return new RpcError(error.message, error.code)
		}
	}
	if (error instanceof Error) {
		return error
	}
	return new Error("Unknown error")
}

function isJsonRpcError(x: object): x is JsonRpcError {
	return "code" in x && "message" in x
}

function isObject(x: unknown): x is object {
	return typeof x === "object" && x !== null
}