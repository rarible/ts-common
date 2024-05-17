import { timestampMiddleware } from "."

describe("timestampMiddleware", () => {
  it.each([-1000, 1000])("offset %i", async clientDiff => {
    const requestDelay = 100
    const serverTime = new Date()
    const clientTime = new Date(serverTime.getTime() + clientDiff)

    const middleware = timestampMiddleware({
      getTime: () => new Promise<Date>(resolve => setTimeout(() => resolve(serverTime), requestDelay)),
      getClientTime: () => clientTime,
      sourceName: "test",
    })
    const result = await middleware({})
    expect(result.timestampClientUnix).toEqual(clientTime.getTime())
    const expectedTimestampUnix = clientTime.getTime() + requestDelay - clientDiff
    const precision = 100
    expect(result.timestampUnix).toBeGreaterThan(expectedTimestampUnix - precision)
    expect(result.timestampUnix).toBeLessThan(expectedTimestampUnix + precision)
  })
})
