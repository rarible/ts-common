import { Logger } from "./base"
import type { LoggerConfig } from "./base"
import { LogLevel } from "./domain"
import type { LoggerMiddleware } from "./middlewares"
import { CustomTransport } from "./transports/custom"

type SimpleContext = {
  name: string
}

function createSimpleLogger(extendedConfig: Partial<LoggerConfig<SimpleContext>> = {}) {
  const handler = jest.fn()
  const customTransport = new CustomTransport(handler)
  const logger = new Logger({
    transports: [customTransport],
    getContext: () => Promise.resolve<SimpleContext>({ name: "John Doe" }),
    ...extendedConfig,
  })
  return [logger, handler] as const
}

describe("BaseLogger", () => {
  it("should correctly log message", async () => {
    const [logger, handler] = createSimpleLogger()

    await logger.message(LogLevel.INFO, "test", {
      name: "Ivan",
      isCreator: true,
    })

    await logger.message(LogLevel.ERROR, new Error("My new error"), {
      name: "Ivan",
      isCreator: true,
    })

    expect(handler.mock.calls.length).toEqual(2)
    expect(handler.mock.calls[0][0]).toStrictEqual({
      level: LogLevel.INFO,
      message: 'test, {"name":"Ivan","isCreator":true}',
      name: "John Doe",
    })
    expect(handler.mock.calls[1][0]).toStrictEqual({
      level: LogLevel.ERROR,
      message: '[Error: My new error], {"name":"Ivan","isCreator":true}',
      name: "John Doe",
    })
  })

  it("should correctly log raw data", async () => {
    const [logger, handler] = createSimpleLogger()

    await logger.raw({
      level: LogLevel.INFO,
      message: ["test raw"],
    })

    expect(handler.mock.calls.length).toEqual(1)
    expect(handler.mock.calls[0][0]).toStrictEqual({
      level: LogLevel.INFO,
      message: "test raw",
      name: "John Doe",
    })
  })

  it("should correctly extend context and update", async () => {
    const [logger, handler] = createSimpleLogger()
    const extended = logger.extend({
      favoriteNumber: "42",
    })

    await extended.raw({
      level: LogLevel.INFO,
      message: ["test raw"],
      car: undefined,
    })

    expect(handler.mock.calls.length).toEqual(1)
    expect(handler.mock.calls[0][0]).toStrictEqual({
      level: LogLevel.INFO,
      message: "test raw",
      name: "John Doe",
      favoriteNumber: "42",
      car: "[null]",
    })

    extended.updateContext({
      favoriteNumber: "1337",
    })

    await extended.raw({
      level: LogLevel.INFO,
      message: ["test raw"],
    })

    expect(handler.mock.calls.length).toEqual(2)
    expect(handler.mock.calls[1][0]).toStrictEqual({
      level: LogLevel.INFO,
      message: "test raw",
      name: "John Doe",
      favoriteNumber: "1337",
    })
  })

  it("should update context and then extend", async () => {
    const [logger, handler] = createSimpleLogger()
    logger.updateContext({
      name: "Jane Air",
    })

    const extended = logger
      .extend({
        favoriteNumber: "42",
      })
      .extend({
        anotherValue: "42",
      })

    const anotherExtended = logger.extend({
      age: "42",
    })
    await extended.raw({
      level: LogLevel.INFO,
      message: ["test raw"],
    })
    await extended.data(LogLevel.INFO, {
      message: ["test raw1"],
    })
    await anotherExtended.data(LogLevel.INFO, {
      message: ["test raw"],
    })

    expect(handler.mock.calls.length).toEqual(3)
    expect(handler.mock.calls[0][0]).toStrictEqual({
      level: LogLevel.INFO,
      message: "test raw",
      name: "Jane Air",
      favoriteNumber: "42",
      anotherValue: "42",
    })
    expect(handler.mock.calls[1][0]).toStrictEqual({
      level: LogLevel.INFO,
      message: "test raw1",
      name: "Jane Air",
      favoriteNumber: "42",
      anotherValue: "42",
    })
    expect(handler.mock.calls[2][0]).toStrictEqual({
      level: LogLevel.INFO,
      message: "test raw",
      name: "Jane Air",
      age: "42",
    })
  })

  it("should apply middleware", async () => {
    const middleware: LoggerMiddleware = async input => ({
      ...input,
      customMessage: "hello",
    })
    const [logger, handler] = createSimpleLogger({
      middlewares: [middleware],
    })
    await logger.raw({
      level: LogLevel.INFO,
      message: ["test raw"],
    })

    expect(handler.mock.calls.length).toEqual(1)
    expect(handler.mock.calls[0][0]).toStrictEqual({
      level: LogLevel.INFO,
      message: "test raw",
      name: "John Doe",
      customMessage: "hello",
    })
  })
})
