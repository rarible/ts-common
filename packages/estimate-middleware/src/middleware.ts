import type { JsonRpcEngine, JsonRpcMiddleware, JsonRpcRequest } from "json-rpc-engine"
import { createAsyncMiddleware } from "json-rpc-engine"
import type { Block } from "eth-json-rpc-middleware/dist/utils/cache"
import { toBn } from "@rarible/utils/build/bn"
import { createNotSupportedError } from "./utils"

/**
 * Creates async middleware for gas estimation if gas not defined
 * @param engine JsonRpcEngine to use for gas estimation
 * @param force set true if estimate tx even if gas is provided
 */

export function createEstimateGasMiddleware(
	engine: JsonRpcEngine,
	force = false,
	threshold = 1.03
): JsonRpcMiddleware<string[], Block> {
	return createAsyncMiddleware(async (req, res, next) => {
		if (req.method === "eth_subscribe") {
			res.id = req.id
			res.error = createNotSupportedError()
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
					const gasRaw = handleResult(response)
					if (gasRaw)  {
						const gasHex = extractHex(gasRaw)
						const multiplied = toBn(gasHex, 16).multipliedBy(threshold).toString(16)
						params["gas"] = `0x${multiplied}`
					}
				}
			} catch (error) {}
		}
		await next()
	})
}

function extractHex(value: string) {
	return value.startsWith("0x") ? value.substring(2) : value
}

function handleResult(response: unknown): string {
	if (isJSONRpcResponse(response)) {
		if (response.error) {
			throw response.error
		}
		if (typeof response.result === "string") {
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
