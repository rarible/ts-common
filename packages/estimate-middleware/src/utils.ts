import type { SafeEventEmitterProvider } from "eth-json-rpc-middleware/dist/utils/cache"

export function isSafeEventEmitterProvider(x: unknown): x is SafeEventEmitterProvider {
	return typeof x === "object" && x !== null && "send" in x && "sendAsync" in x
}
