import stringify from "json-stringify-safe"
import { isError } from "../utils/is-error"
import { Batcher } from "../utils/batcher"
import { fixWithLimit } from "../utils/size-of"
import type { AbstractLogger, LoggableValue } from "../domain"
import { LogLevel } from "../domain"

export type RemoteLoggerConfig = {
	initialContext: Promise<Record<string, string>>
	context: Record<string, string>
	dropBatchInterval: number
	maxByteSize: number
}

export class RemoteLogger implements AbstractLogger {
	private readonly config: RemoteLoggerConfig
	private readonly batchManager: Batcher<Record<string, string>>
	constructor(handler: (values: Record<string, string>[]) => Promise<void>, config: Partial<RemoteLoggerConfig>) {
		this.config = {
			...defaultConfig,
			...config,
		}
		this.batchManager = new Batcher<Record<string, string>>(this.config.dropBatchInterval, handler)
	}

	debug(...params: LoggableValue[]) {
		this.log.apply(this, [LogLevel.DEBUG, ...params]).then()
	}

	error(...params: LoggableValue[]) {
		this.log.apply(this, [LogLevel.ERROR, ...params]).then()
	}

	info(...params: LoggableValue[]) {
		this.log.apply(this, [LogLevel.INFO, ...params]).then()
	}

	trace(...params: LoggableValue[]) {
		this.log.apply(this, [LogLevel.TRACE, ...params]).then()
	}

	warn(...params: LoggableValue[]) {
		this.log.apply(this, [LogLevel.WARN, ...params]).then()
	}

	private async log(level: LogLevel, ...params: LoggableValue[]) {
		try {
			const data = await this.withContext({
				level,
				message: this.getMessage(params),
			})
			this.batchManager.add(data)
		} catch (e) {
			console.error("Cannot connect to ELK", e)
		}
	}

	private async withContext(values: object) {
		const context = await this.config.initialContext
		return {
			...context,
			...this.config.context,
			...values,
		}
	}

	private getMessage(values: LoggableValue[]) {
		const fixed = fixWithLimit(values, this.config.maxByteSize)
		const optional = fixed.map(p => isError(p) ? `${p}` : stringify(p))
		return optional.length > 0 ? ` ${optional.join(", ")}` : ""
	}
}

const defaultConfig: RemoteLoggerConfig = {
	maxByteSize: 10240,
	dropBatchInterval: 3000,
	context: {},
	initialContext: Promise.resolve({}),
}