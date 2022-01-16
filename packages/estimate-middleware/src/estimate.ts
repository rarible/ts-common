import { createFetchMiddleware, providerAsMiddleware, providerFromEngine } from "eth-json-rpc-middleware"
import { JsonRpcEngine } from "json-rpc-engine"
import type { SafeEventEmitterProvider } from "eth-json-rpc-middleware/dist/utils/cache"
import { estimateGasMiddleware } from "./middleware"

export function estimate(provider: any, estimate?: JsonRpcEngine | string, force?: boolean): SafeEventEmitterProvider {
	const engine = new JsonRpcEngine()
	engine.push(estimateGasMiddleware(getEstimateEngine(provider, estimate), force))
	engine.push(providerAsMiddleware(provider))
	return providerFromEngine(engine)
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
