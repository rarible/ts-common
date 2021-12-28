import type { AbstractLogger, LoggableValue } from "./domain"

export class UnionLogger implements AbstractLogger {
	constructor(private readonly loggers: AbstractLogger[]) {}

	debug(...args: LoggableValue[]): void {
		this.loggers.forEach(l => l.debug.apply(l, args))
	}

	error(...args: LoggableValue[]): void {
		this.loggers.forEach(l => l.error.apply(l, args))
	}

	info(...args: LoggableValue[]): void {
		this.loggers.forEach(l => l.info.apply(l, args))
	}

	trace(...args: LoggableValue[]): void {
		this.loggers.forEach(l => l.trace.apply(l, args))
	}

	warn(...args: LoggableValue[]): void {
		this.loggers.forEach(l => l.warn.apply(l, args))
	}
}
