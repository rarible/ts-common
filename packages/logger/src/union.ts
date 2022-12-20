import type { AbstractLogger } from "./domain"

export class UnionLogger implements AbstractLogger {
	constructor(private readonly loggers: AbstractLogger[]) {}

	debug(...args: any[]): void {
		this.loggers.forEach(l => l.debug.apply(l, args))
	}

	error(...args: any[]): void {
		this.loggers.forEach(l => l.error.apply(l, args))
	}

	info(...args: any[]): void {
		this.loggers.forEach(l => l.info.apply(l, args))
	}

	trace(...args: any[]): void {
		this.loggers.forEach(l => l.trace.apply(l, args))
	}

	warn(...args: any[]): void {
		this.loggers.forEach(l => l.warn.apply(l, args))
	}

	raw(data: Record<string, any>): void {
		this.loggers.forEach(l => l.raw(data))
	}
}
