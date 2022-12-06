import type { JsonRpcEngine, JsonRpcMiddleware, JsonRpcRequest } from "json-rpc-engine"
import { createAsyncMiddleware, getUniqueId } from "json-rpc-engine"
import type { Block } from "eth-json-rpc-middleware/dist/utils/cache"
import { toBn } from "@rarible/utils/build/bn"
import { extractError, RpcError } from "./utils"

/**
 * Creates async middleware for gas estimation if gas not defined
 * @param engine JsonRpcEngine to use for gas estimation
 * @param force set true if estimate tx even if gas is provided
 */

export function createEstimateGasMiddleware(
	engine: JsonRpcEngine,
	force = false,
	threshold = 1.03,
	multiplier = 2,
): JsonRpcMiddleware<string[], Block> {
	return createAsyncMiddleware(async (req, res, next) => {
		if (req.method === "eth_subscribe") {
			res.error = new RpcError("Notifications not supported", -32000)
			return next()
		}
		if (req.method === "eth_sendTransaction") {
			try {
				const params = getTransactionParams(req)
				if (force || !params.gas) {
					const gasLimitResponse = await engine.handle({
						jsonrpc: "2.0",
						id: getUniqueId(),
						params: [getEstimateParams(params)],
						method: "eth_estimateGas",
					})
					const limitRaw = handleHexResponse(gasLimitResponse)
					if (limitRaw) {
						const limitHex = extractHex(limitRaw)
						const multiplied = toBn(limitHex, 16).multipliedBy(threshold).toFixed(0)
						params["gas"] = withPrefix(toBn(multiplied).toString(16))
					}
					const maxPriorityFeePerGasResponse = await engine.handle({
						jsonrpc: "2.0",
						id: getUniqueId(),
						params: [],
						method: "eth_maxPriorityFeePerGas",
					})
					const maxPriorityFeePerGasResponseRaw = handleHexResponse(maxPriorityFeePerGasResponse)

					const blockResponse = await engine.handle({
						jsonrpc: "2.0",
						id: getUniqueId(),
						params: ["pending", false],
						method: "eth_getBlockByNumber",
					})
					const baseFeeRaw = extractBaseFeePerGas(blockResponse)

					if (maxPriorityFeePerGasResponseRaw && baseFeeRaw) {
						if (params.gasPrice !== undefined) {
							delete params.gasPrice
						}
						const baseFee = toBn(extractHex(baseFeeRaw), 16).multipliedBy(multiplier).toFixed(0)
						const maxPriorityFeePerGas = extractHex(maxPriorityFeePerGasResponseRaw)
						const maxFeePerGasHex = toBn(maxPriorityFeePerGas, 16).plus(baseFee).toString(16)
						params["maxPriorityFeePerGas"] = maxPriorityFeePerGasResponseRaw
						params["maxFeePerGas"] = withPrefix(maxFeePerGasHex)
					}
				}
			} catch (error) {
				res.error = extractError(error)
			}
		}
		return next()
	})
}

function withPrefix(value: string) {
	return `0x${value}`
}

function extractHex(value: string) {
	return value.startsWith("0x") ? value.substring(2) : value
}

function handleHexResponse(response: unknown): string {
	if (isJSONRpcResponse(response)) {
		if (response.error) {
			throw response.error
		}
		if (typeof response.result === "string") {
			return response.result
		}
	}
	throw new RpcError("Can't handle JSON rpc response", -32700)
}

function extractBaseFeePerGas(response: unknown): string {
	if (isJSONRpcResponse(response)) {
		if (response.error) {
			throw response.error
		}
		if (typeof response.result === "object") {
			return (response.result as any).baseFeePerGas
		}
	}
	throw new RpcError("Can't handle JSON rpc response", -32700)
}

function getTransactionParams(request: JsonRpcRequest<unknown[]>): SendParams {
	if (request.params) {
		const [tx] = request.params
		if (isSendParams(tx)) {
			return tx
		}
	}
	throw new RpcError("Can't parse eth_sendTransaction params", -32600)
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
	maxPriorityFeePerGas?: number | string
	maxFeePerGas?: number | string
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
