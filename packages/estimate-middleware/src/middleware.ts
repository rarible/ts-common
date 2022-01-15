import type { JsonRpcEngine, JsonRpcMiddleware } from "json-rpc-engine"
import { createAsyncMiddleware } from "json-rpc-engine"
import type { Block } from "eth-json-rpc-middleware/dist/utils/cache"

/**
 * Estimates gas for transaction if gas not defined
 * @param engine JsonRpcEngine to use for gas estimation
 * @param force set true if estimate tx even if gas is provided
 */
export function estimateGasMiddliware(
	engine: JsonRpcEngine, force: boolean = false,
): JsonRpcMiddleware<string[], Block> {
	return createAsyncMiddleware(async (req, _, next) => {
		if (req.method === "eth_sendTransaction") {
			if (req.params) {
				const [tx] = req.params
				if (isTransactionParams(tx)) {
					if (force || typeof tx.gas === "undefined") {
						const response = await engine.handle({
							...req,
							params: [getEstimateParams(tx)],
							method: "eth_estimateGas",
						})
						if (isJSONRpcResponse(response)) {
							if (response.error) {
								throw response.error
							}
							if (response.result) {
								tx["gas"] = response.result
							}
						}
					}
				}
			}
		}
		await next()
	})
}

type JSONRpcResponse = {
	jsonrpc: string;
	id: number;
	result?: any;
	error?: string;
}

function isJSONRpcResponse(x: unknown): x is JSONRpcResponse {
	return typeof x === "object" && x !== null && "jsonrpc" in x && "id" in x
}

type TransactionParams = {
	from: string
	gasPrice?: string | number
	gas?: string | number
	maxPriorityFeePerGas?: string | number
	maxFeePerGas?: string | number
}

function isTransactionParams(x: unknown): x is TransactionParams {
	return typeof x === "object" && x !== null && "from" in x
}

function getEstimateParams(x: TransactionParams): Omit<TransactionParams, "gasPrice" | "maxPriorityFeePerGas" | "maxFeePerGas"> {
	// eslint-disable-next-line @typescript-eslint/no-unused-vars
	const { gasPrice, maxPriorityFeePerGas, maxFeePerGas, ...rest } = x
	return rest
}