import { createFetchMiddleware, providerAsMiddleware, providerFromEngine } from "eth-json-rpc-middleware"
import { JsonRpcEngine } from "json-rpc-engine"
import { SafeEventEmitterProvider } from "eth-json-rpc-middleware/dist/utils/cache"
import { estimateGasMiddliware } from "./middleware"

export function autoEstimate(provider: any, estimate: JsonRpcEngine | string): SafeEventEmitterProvider {
	const engine = new JsonRpcEngine()
	engine.push(estimateGasMiddliware(getEstimateEngine(estimate)))
	engine.push(providerAsMiddleware(provider))
	return providerFromEngine(engine)
}

function getEstimateEngine(estimate: JsonRpcEngine | string): JsonRpcEngine {
	if (typeof estimate === "string") {
		const engine = new JsonRpcEngine()
		engine.push(createFetchMiddleware({ rpcUrl: estimate }))
		return engine
	} else {
		return estimate
	}
}
