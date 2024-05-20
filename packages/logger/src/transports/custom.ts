import { LoggerTransport } from "../base.js"
import type { LoggerData } from "../domain.js"

export class CustomTransport extends LoggerTransport {
  constructor(private readonly handler: (value: LoggerData) => Promise<void>) {
    super()
  }

  handle = (data: LoggerData) => this.handler(data)

  reset = () => {}
}
