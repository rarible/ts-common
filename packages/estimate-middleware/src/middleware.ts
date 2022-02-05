import type { JsonRpcEngine, JsonRpcMiddleware, JsonRpcRequest } from "json-rpc-engine"
import { createAsyncMiddleware } from "json-rpc-engine"
import type { Block } from "eth-json-rpc-middleware/dist/utils/cache"

/**
 * Creates async middleware for gas estimation if gas not defined
 * @param engine JsonRpcEngine to use for gas estimation
 * @param force set true if estimate tx even if gas is provided
 */

export function createEstimateGasMiddleware(engine: JsonRpcEngine, force = false): JsonRpcMiddleware<string[], Block> {
	return createAsyncMiddleware(async (req, resp, next) => {
		if (req.method === "eth_subscribe") {
			resp.id = req.id
			resp.error = {"code": -32000, "message": "notifications not supported"}
			return
		}
		if (req.method === "eth_sendTransaction") {
			try {
				const params = getTransactionParams(req)
				if (force || !params.gas) {
					const response = await engine.handle({
						...req,
						params: [getEstimateParams(params)],
						method: "eth_estimateGas",
					})
					params["gas"] = handleResult(response)
				}
			} catch (error) {}
		}
		await next()
	})
}

function handleResult(response: unknown): string | number {
	if (isJSONRpcResponse(response)) {
		if (response.error) {
			throw response.error
		}
		if (typeof response.result === "string" || typeof response.result === "number") {
			return response.result
		}
	}
	throw new Error("Can't handle JSON rpc response")
}

function getTransactionParams(request: JsonRpcRequest<unknown[]>): SendParams {
	if (request.params) {
		const [tx] = request.params
		if (isSendParams(tx)) {
			return tx
		}
	}
	throw new Error("Can't parse eth_sendTransaction params")
}

type JSONRpcResponse = {
	jsonrpc: string
	id: number
	result?: any
	error?: string
}

function isJSONRpcResponse(x: unknown): x is JSONRpcResponse {
	return typeof x === "object" && x !== null && "jsonrpc" in x && "id" in x
}

type SendParams = {
	from?: string
	to: string
	value?: number | string
	gas?: number | string
	gasPrice?: number | string
	data?: string
}

function isSendParams(x: unknown): x is SendParams {
	return typeof x === "object" && x !== null && "to" in x
}

function getEstimateParams(params: SendParams): Omit<SendParams, "gas" | "gasPrice"> {
	return {
		to: params.to,
		data: params.data,
		value: params.value,
		from: params.from,
	}
}