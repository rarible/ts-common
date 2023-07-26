import { LoggerTransport } from "../base"
import type { LoggableShape } from "../domain"

export class CustomTransport extends LoggerTransport {
  constructor(private readonly handler: (value: LoggableShape) => Promise<void>) {
    super()
  }
  handle = (data: LoggableShape) => this.handler(data)
}
