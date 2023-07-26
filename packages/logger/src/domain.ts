export type LoggerRawValue = any

export type LoggerRawData = {
  [K in string]: LoggerRawValue
}

export type LoggerValue = string | number

export type LoggerData = {
  [K in string]: LoggerValue
}

export type LoggerContextValue = string | number | null | undefined | symbol | boolean

export type LoggerContextData = {
  [K in string]: LoggerContextValue
}

export interface LoggerRequiredRawData extends LoggerRawData {
  level: LogLevel
  message: any[]
}

export interface AbstractLogger<C extends LoggerContextData = {}> {
  getContext: () => Promise<C>

  /**
   * Will create new binded instance of logger with extended context
   * useful for cases when you need to `bind` some properties for several logs
   */
  extend: <NewC extends LoggerContextData>(next: NewC) => AbstractLogger<C & NewC>

  /**
   * Allows to send messages to all binded transports
   * please don't use it if you don't know how to use it
   * mostly for internal usage
   */
  raw: (data: LoggerRequiredRawData) => Promise<void>

  /**
   * Allows to send any data with level
   */
  data: (level: LogLevel, data: LoggerRawData, args?: any[]) => Promise<void>

  /**
   * Transforms your params into single string
   * and sends it as message with `level` and `message` fields
   */
  message: (level: LogLevel, ...params: any[]) => Promise<void>

  /**
   * Shortcut for `message(LogLevel.TRACE)`
   */
  trace: (...params: any[]) => void

  /**
   * Shortcut for `message(LogLevel.DEBUG)`
   */
  debug: (...params: any[]) => void

  /**
   * Shortcut for `message(LogLevel.INFO)`
   */
  info: (...params: any[]) => void

  /**
   * Shortcut for `message(LogLevel.WARN)`
   */
  warn: (...params: any[]) => void

  /**
   * Shortcut for `message(LogLevel.ERROR)`
   */
  error: (...params: any[]) => void
}

export enum LogLevel {
  DEBUG = "DEBUG",
  INFO = "INFO",
  WARN = "WARN",
  ERROR = "ERROR",
  TRACE = "TRACE",
}
