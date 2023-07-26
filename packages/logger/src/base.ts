import { LogLevel } from "./domain"
import type { AbstractLogger, LoggerData, LoggerRawData, LoggerRequiredRawData, LoggerContextData } from "./domain"
import { stringifyObject } from "./utils/stringify"

export abstract class LoggerTransport {
  abstract handle: (entry: LoggerData) => Promise<void>
  abstract reset: () => void
}

export class Logger<C extends LoggerContextData = {}> implements AbstractLogger<C> {
  private contextOverrides: Partial<C> = {}

  constructor(
    private readonly transports: LoggerTransport[],
    private readonly _getContext: () => Promise<C>,
    private readonly maxByteSize: number = 1024 * 10,
  ) {}

  getContext = async () => {
    return {
      ...(await this._getContext()),
      ...this.contextOverrides,
    }
  }

  raw = async (data: LoggerRequiredRawData) => {
    try {
      await Promise.all(
        this.transports.map(async transport =>
          transport.handle(
            stringifyObject(this.maxByteSize, {
              ...data,
              ...(await this.getContext()),
            }),
          ),
        ),
      )
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
    new Logger(
      this.transports,
      async () => ({
        ...(await this.getContext()),
        ...nextContext,
      }),
      this.maxByteSize,
    )

  updateContext = (nextContext: Partial<C>) => {
    this.contextOverrides = {
      ...this.contextOverrides,
      ...nextContext,
    }
    this.transports.forEach(x => {
      x.reset()
    })
  }
}
