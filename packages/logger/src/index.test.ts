import { Logger } from "./base"
import { LogLevel } from "./domain"
import { CustomTransport } from "./transports/custom"

type SimpleContext = {
  name: string
}

function createSimpleLogger() {
  const handler = jest.fn()
  const customTransport = new CustomTransport(handler)
  const logger = new Logger([customTransport], () => Promise.resolve<SimpleContext>({ name: "John Doe" }))
  return [logger, handler] as const
}

describe("BaseLogger", () => {
  it("should correctly log data", async () => {
    const [logger, handler] = createSimpleLogger()

    await logger.writeMessage(LogLevel.INFO, "test", {
      name: "Ivan",
      isCreator: true,
    })

    await logger.writeMessage(LogLevel.ERROR, new Error("My new error"), {
      name: "Ivan",
      isCreator: true,
    })

    expect(handler.mock.calls.length).toEqual(2)
    expect(handler.mock.calls[0][0]).toStrictEqual({
      level: "INFO",
      message: ' "test", {"name":"Ivan","isCreator":true}',
      name: "John Doe",
    })
    expect(handler.mock.calls[1][0]).toStrictEqual({
      level: "ERROR",
      message: ' Error: My new error, {"name":"Ivan","isCreator":true}',
      name: "John Doe",
    })
  })

  it("should correctly log raw data", async () => {
    const [logger, handler] = createSimpleLogger()

    await logger.write({
      level: "INFO",
      message: "test raw",
    })

    expect(handler.mock.calls.length).toEqual(1)
    expect(handler.mock.calls[0][0]).toStrictEqual({
      level: "INFO",
      message: "test raw",
      name: "John Doe",
    })
  })

  it("should correctly extend context and update", async () => {
    const [logger, handler] = createSimpleLogger()
    const extended = logger.extend({
      favoriteNumber: "42",
    })

    await extended.write({
      level: "INFO",
      message: "test raw",
    })

    expect(handler.mock.calls.length).toEqual(1)
    expect(handler.mock.calls[0][0]).toStrictEqual({
      level: "INFO",
      message: "test raw",
      name: "John Doe",
      favoriteNumber: "42",
    })

    extended.updateContext({
      favoriteNumber: "1337",
    })

    await extended.write({
      level: "INFO",
      message: "test raw",
    })

    expect(handler.mock.calls.length).toEqual(2)
    expect(handler.mock.calls[1][0]).toStrictEqual({
      level: "INFO",
      message: "test raw",
      name: "John Doe",
      favoriteNumber: "1337",
    })
  })
})
