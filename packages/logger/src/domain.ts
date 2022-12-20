export type LoggableValue = null | undefined | boolean | number | string | object

export type AbstractLogger = {
	raw(data: Record<string, any>): void
	trace(...params: any[]): void
	debug(...params: any[]): void
	info(...params: any[]): void
	warn(...params: any[]): void
	error(...params: any[]): void
}

export enum LogLevel {
	DEBUG = "DEBUG",
	INFO = "INFO",
	WARN = "WARN",
	ERROR = "ERROR",
	TRACE = "TRACE"
}