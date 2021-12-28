export type LoggableValue = null | undefined | boolean | number | string | object

export type AbstractLogger = {
	trace(...params: LoggableValue[]): void
	debug(...params: LoggableValue[]): void
	info(...params: LoggableValue[]): void
	warn(...params: LoggableValue[]): void
	error(...params: LoggableValue[]): void
}

export enum LogLevel {
	DEBUG = "DEBUG",
	INFO = "INFO",
	WARN = "WARN",
	ERROR = "ERROR",
	TRACE = "TRACE"
}