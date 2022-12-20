import { Batcher } from "../utils/batcher"
import type { AbstractLogger } from "../domain"
import { LogLevel } from "../domain"
import { getLoggableMessage } from "../utils/get-loggable-message"

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

	debug(...params: any[]) {
		this.log.apply(this, [LogLevel.DEBUG, ...params]).then()
	}

	error(...params: any[]) {
		this.log.apply(this, [LogLevel.ERROR, ...params]).then()
	}

	info(...params: any[]) {
		this.log.apply(this, [LogLevel.INFO, ...params]).then()
	}

	trace(...params: any[]) {
		this.log.apply(this, [LogLevel.TRACE, ...params]).then()
	}

	warn(...params: any[]) {
		this.log.apply(this, [LogLevel.WARN, ...params]).then()
	}

	raw(data: Record<string, any>): void {
		this.rawAsync(data).then()
	}

	private async log(level: LogLevel, ...params: any[]) {
		await this.rawAsync({
			level,
			message: getLoggableMessage(this.config.maxByteSize, ...params),
		})
	}

	private async rawAsync(data: Record<string, any>) {
		try {
			const finalData = await this.withContext(data)
			this.batchManager.add(finalData)
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
}

const defaultConfig: RemoteLoggerConfig = {
	maxByteSize: 10240,
	dropBatchInterval: 3000,
	context: {},
	initialContext: Promise.resolve({}),
}