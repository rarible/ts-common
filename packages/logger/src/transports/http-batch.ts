import { LoggerTransport } from "../base"
import type { LoggableRawData, LoggableShape } from "../domain"
import { Batcher } from "../utils/batcher"

export class HttpBatchTransport extends LoggerTransport {
  private readonly batchManager: Batcher<Record<string, LoggableRawData>>

  constructor(handler: (values: LoggableShape[]) => Promise<void>, dropBatchInterval = 3000) {
    super()
    this.batchManager = new Batcher<Record<string, LoggableRawData>>(dropBatchInterval, handler)
  }

  handle = (data: LoggableShape) => Promise.resolve(this.batchManager.add(data))
}
