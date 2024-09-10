import { LogLevel } from "./domain.js"
import type { AbstractLogger, LoggerData, LoggerRawData, LoggerRequiredRawData, LoggerContextData } from "./domain.js"
import { combineMiddlewares } from "./middlewares/combine.js"
import type { LoggerMiddleware } from "./middlewares/domain.js"
import { stringifyObject } from "./utils/stringify/index.js"

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
  private readonly maxByteSize: number
  private readonly indent: number
  private readonly reducedMiddleware: ReturnType<typeof combineMiddlewares>

  constructor(private readonly config: LoggerConfig<C>) {
    this.maxByteSize = this.config.maxByteSize ?? 1024 * 10
    this.indent = this.config.indent ?? 2
    const middlewares = this.config.middlewares ?? []
    this.reducedMiddleware = combineMiddlewares(...middlewares)
    this.getContext = this.getContext.bind(this)
    this.raw = this.raw.bind(this)
    this.data = this.data.bind(this)
    this.message = this.message.bind(this)
    this.trace = this.trace.bind(this)
    this.warn = this.warn.bind(this)
    this.error = this.error.bind(this)
    this.info = this.info.bind(this)
    this.debug = this.debug.bind(this)
    this.extend = this.extend.bind(this)
    this.updateContext = this.updateContext.bind(this)
  }

  async getContext() {
    return {
      ...(await this.config.getContext()),
      ...this.contextOverrides,
    }
  }

  async raw(data: LoggerRequiredRawData) {
    try {
      const context = await this.getContext()
      const string = stringifyObject(this.maxByteSize, { ...data, ...context }, this.indent)
      const result = await this.reducedMiddleware(string)
      await Promise.all(this.config.transports.map(x => x.handle(result)))
    } catch (error) {
      console.error("Logger error", data, error)
    }
  }

  data(level: LogLevel, data: LoggerRawData, args: any[] = []) {
    return this.raw({
      level,
      message: args,
      ...data,
    })
  }

  message(level: LogLevel, ...params: any[]) {
    return this.raw({
      level,
      message: params,
    })
  }

  trace(...params: any[]) {
    this.message(LogLevel.TRACE, ...params)
  }

  warn(...params: any[]) {
    this.message(LogLevel.WARN, ...params)
  }

  error(...params: any[]) {
    this.message(LogLevel.ERROR, ...params)
  }

  info(...params: any[]) {
    this.message(LogLevel.INFO, ...params)
  }

  debug(...params: any[]) {
    this.message(LogLevel.DEBUG, ...params)
  }

  extend<NewC extends LoggerContextData>(nextContext: NewC): Logger<NewC & C> {
    return new Logger({
      ...this.config,
      getContext: async () => ({
        ...(await this.getContext()),
        ...nextContext,
      }),
    })
  }

  updateContext(nextContext: Partial<C>) {
    this.contextOverrides = {
      ...this.contextOverrides,
      ...nextContext,
    }
    this.config.transports.forEach(x => {
      x.reset()
    })
  }
}
