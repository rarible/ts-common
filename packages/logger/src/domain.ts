export type LoggableValue = null | undefined | boolean | number | string | object

export type LoggableRawData = string | number

export type LoggableShape = {
  [K in string]: LoggableRawData
}

export interface AbstractLogger<C extends LoggableShape = LoggableShape> {
  getContext: () => Promise<C>
  extend: <NewC extends LoggableShape>(next: NewC) => AbstractLogger<C & NewC>
  raw: (data: LoggableShape) => void
  trace: (...params: any[]) => void
  debug: (...params: any[]) => void
  info: (...params: any[]) => void
  warn: (...params: any[]) => void
  error: (...params: any[]) => void
}

export enum LogLevel {
  DEBUG = "DEBUG",
  INFO = "INFO",
  WARN = "WARN",
  ERROR = "ERROR",
  TRACE = "TRACE",
}
