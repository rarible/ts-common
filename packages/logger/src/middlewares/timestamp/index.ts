import type { LoggerMiddleware } from "../domain.js"

export type TimestampMiddlewareConfig = {
  sourceName: string
  getTime: () => Promise<Date>
  getClientTime?: () => Date
}

export function timestampMiddleware(config: TimestampMiddlewareConfig): LoggerMiddleware {
  const offsetPromise = getTimeOffset(config)
  return async input => {
    const offset = await offsetPromise
    const now = getClientTime(config)
    return {
      ...input,
      timestampUnix: now + offset,
      timestampClientUnix: now,
    }
  }
}

async function getTimeOffset(config: TimestampMiddlewareConfig) {
  const now = Date.now()
  const serverDate = await config.getTime()
  const end = Date.now()
  const requestDelay = end - now
  return requestDelay + (serverDate.getTime() - getClientTime(config))
}

function getClientTime(config: TimestampMiddlewareConfig) {
  if (config.getClientTime) return config.getClientTime().getTime()
  return Date.now()
}
