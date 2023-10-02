import { LogLevel } from "./domain"
import type { AbstractLogger, LoggerData, LoggerRawData, LoggerRequiredRawData, LoggerContextData } from "./domain"
import { combineMiddlewares } from "./middlewares/combine"
import type { LoggerMiddleware } from "./middlewares/domain"
import { stringifyObject } from "./utils/stringify"

export abstract class LoggerTransport {
  abstract handle: (entry: LoggerData) => Promise<void>
  abstract reset: () => void
}

export type LoggerConfig<C extends LoggerContextData> = {
  /**
   * Provide transports that will be used as sources
   * See default transports in `@rarible/logger/build/transports`
   */
  transports: LoggerTransport[]
  middlewares?: LoggerMiddleware[]
  getContext: () => Promise<C>
  /**
   * Allows provide custom byte size limit for messages
   */
  maxByteSize?: number
  /**
   * Put custom indent for JSON stringify function
   * If you don't want to see structured and pretty values then use 0
   * @default 2
   */
  indent?: number
}

export class Logger<C extends LoggerContextData = {}> implements AbstractLogger<C> {
  private contextOverrides: Partial<C> = {}
  private readonly maxByteSize = this.config.maxByteSize ?? 1024 * 10
  private readonly middlewares = this.config.middlewares ?? []
  private readonly indent = this.config.indent ?? 2
  private readonly reducedMiddleware = combineMiddlewares(...this.middlewares)

  constructor(private readonly config: LoggerConfig<C>) {}

  getContext = async () => {
    return {
      ...(await this.config.getContext()),
      ...this.contextOverrides,
    }
  }

  raw = async (data: LoggerRequiredRawData) => {
    try {
      const context = await this.getContext()
      const string = stringifyObject(this.maxByteSize, { ...data, ...context }, this.indent)
      const result = await this.reducedMiddleware(string)
      await Promise.all(this.config.transports.map(x => x.handle(result)))
    } catch (error) {
      console.error("Logger error", data, error)
    }
  }

  data = (level: LogLevel, data: LoggerRawData, args: any[] = []) =>
    this.raw({
      level,
      message: args,
      ...data,
    })

  message = (level: LogLevel, ...params: any[]) =>
    this.raw({
      level,
      message: params,
    })

  trace = (...params: any[]) => {
    this.message(LogLevel.TRACE, ...params)
  }

  warn = (...params: any[]) => {
    this.message(LogLevel.WARN, ...params)
  }

  error = (...params: any[]) => {
    this.message(LogLevel.ERROR, ...params)
  }

  info = (...params: any[]) => {
    this.message(LogLevel.INFO, ...params)
  }

  debug = (...params: any[]) => {
    this.message(LogLevel.DEBUG, ...params)
  }

  extend = <NewC extends LoggerContextData>(nextContext: NewC): Logger<NewC & C> =>
    new Logger({
      ...this.config,
      getContext: async () => ({
        ...(await this.getContext()),
        ...nextContext,
      }),
    })

  updateContext = (nextContext: Partial<C>) => {
    this.contextOverrides = {
      ...this.contextOverrides,
      ...nextContext,
    }
    this.config.transports.forEach(x => {
      x.reset()
    })
  }
}
