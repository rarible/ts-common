import { LoggerTransport } from "../base.js"
import type { LoggerData, LoggerValue } from "../domain.js"
import { Batcher } from "../utils/batcher/index.js"

export class HttpBatchTransport extends LoggerTransport {
  private readonly batchManager: Batcher<Record<string, LoggerValue>>

  constructor(handler: (values: LoggerData[]) => Promise<void>, dropBatchInterval = 3000) {
    super()
    this.batchManager = new Batcher<Record<string, LoggerValue>>(dropBatchInterval, handler)
  }

  handle = (data: LoggerData) => Promise.resolve(this.batchManager.add(data))

  reset = () => this.batchManager.drop()
}
