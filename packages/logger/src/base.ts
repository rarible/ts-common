import { LogLevel } from "./domain"
import type { AbstractLogger, LoggableShape } from "./domain"
import { getLoggableMessage } from "./utils/get-loggable-message"

export abstract class LoggerTransport {
  abstract handle: (entry: LoggableShape) => Promise<void>
}

export class Logger<C extends LoggableShape> implements AbstractLogger<C> {
  private contextOverrides: Partial<C> = {}

  constructor(
    private readonly transports: LoggerTransport[],
    public readonly getContext: () => Promise<C>,
    private readonly maxByteSize: number = 10240,
  ) {}

  /**
   * Allows to send messages to all binded transports
   * please don't use it if you don't know how to use it
   * mostly for internal usage
   */
  write = (entry: LoggableShape) =>
    Promise.all(
      this.transports.map(transport =>
        this.getContext()
          .then(contextValue =>
            transport.handle({
              ...entry,
              ...contextValue,
              ...this.contextOverrides,
            }),
          )
          .catch(error => console.error("Can't handle log", entry, error)),
      ),
    )

  /**
   * Allows to send any data with level
   */
  writeData = (level: LogLevel, data: LoggableShape) => this.write({ level, ...data })

  /**
   * Sends raw data. For internal usage only
   * @deprecated use `write` method instead
   */
  raw = (entry: LoggableShape) => {
    this.write(entry)
  }

  /**
   * Transforms your params into single string
   * and sends it as message with `level` and `message` fields
   */
  writeMessage = (level: LogLevel, ...params: any[]) =>
    this.writeData(level, {
      message: getLoggableMessage(this.maxByteSize, ...params),
    })

  /**
   * Shortcut for `writeMessage(LogLevel.TRACE)`
   */
  trace = (...params: any[]) => {
    this.writeMessage(LogLevel.TRACE, ...params)
  }

  /**
   * Shortcut for `writeMessage(LogLevel.WARN)`
   */
  warn = (...params: any[]) => {
    this.writeMessage(LogLevel.WARN, ...params)
  }

  /**
   * Shortcut for `writeMessage(LogLevel.ERROR)`
   */
  error = (...params: any[]) => {
    this.writeMessage(LogLevel.ERROR, ...params)
  }

  /**
   * Shortcut for `writeMessage(LogLevel.INFO)`
   */
  info = (...params: any[]) => {
    this.writeMessage(LogLevel.INFO, ...params)
  }

  /**
   * Shortcut for `writeMessage(LogLevel.DEBUG)`
   */
  debug = (...params: any[]) => {
    this.writeMessage(LogLevel.DEBUG, ...params)
  }

  /**
   * Will create new binded instance of logger with extended context
   * useful for cases when you need to `bind` some properties for several logs
   */
  extend = <NewC extends LoggableShape>(nextContext: NewC): Logger<NewC & C> =>
    new Logger(
      this.transports,
      async () => {
        const currentContextValue = await this.getContext()
        return {
          ...currentContextValue,
          ...nextContext,
        }
      },
      this.maxByteSize,
    )

  updateContext = (nextContext: Partial<C>) => {
    this.contextOverrides = {
      ...this.contextOverrides,
      ...nextContext,
    }
  }
}
