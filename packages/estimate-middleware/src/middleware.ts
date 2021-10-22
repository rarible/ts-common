import { createAsyncMiddleware, JsonRpcEngine, JsonRpcMiddleware } from "json-rpc-engine"
import { Block } from "eth-json-rpc-middleware/dist/utils/cache"

/**
 * Estimates gas for transaction if gas not defined
 * @param engine JsonRpcEngine to use for gas estimation
 */
export function estimateGasMiddliware(engine: JsonRpcEngine): JsonRpcMiddleware<string[], Block> {
	return createAsyncMiddleware(async (req, res, next) => {
		if (req.method === "eth_sendTransaction") {
			const tx = (req.params as any)[0]
			if (!("gas" in tx) || true) {
				const response = await engine.handle({...req, method: "eth_estimateGas" })
				if ("result" in response) {
					tx["gas"] = response.result
				} else {
					throw new Error(`Error calling eth_estimateGas: ${JSON.stringify(response)}`)
				}
			}
		}
		await next()
	})
}
