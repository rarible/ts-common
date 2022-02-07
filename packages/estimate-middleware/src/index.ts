import { createFetchMiddleware, providerAsMiddleware, providerFromEngine } from "eth-json-rpc-middleware"
import { JsonRpcEngine } from "json-rpc-engine"
import type { SafeEventEmitterProvider } from "eth-json-rpc-middleware/dist/utils/cache"
import { createEstimateGasMiddleware } from "./middleware"
import { isSafeEventEmitterProvider } from "./utils"

export type EstimateOptions = Partial<{
	/**
	 * JsonRpcEngine or string to rpc node
	 */
	estimation: JsonRpcEngine | string
	/**
	 * Force calculation of gas even if proider handle it by yourself
	 */
	force: boolean
	/**
	 * Number that will be used as multiplier for final gas value
	 * @example 1.1
	 */
	threshold: number
}>

export function estimate(provider: any, options: EstimateOptions = {}): SafeEventEmitterProvider {
	if (isSafeEventEmitterProvider(provider)) {
		const engine = new JsonRpcEngine()
		const estimateEngine = getEstimateEngine(provider, options.estimation)
		engine.push(createEstimateGasMiddleware(estimateEngine, options.force, options.threshold))
		engine.push(providerAsMiddleware(provider))
		return providerFromEngine(engine)
	}
	return provider
}

function getEstimateEngine(provider: any, estimate: JsonRpcEngine | string | undefined): JsonRpcEngine {
	if (estimate === undefined) {
		const estimateEngine = new JsonRpcEngine()
		estimateEngine.push(providerAsMiddleware(provider))
		return estimateEngine
	} else if (typeof estimate === "string") {
		const engine = new JsonRpcEngine()
		engine.push(createFetchMiddleware({ rpcUrl: estimate }))
		return engine
	} else {
		return estimate
	}
}
