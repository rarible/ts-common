import { LoggerTransport } from "../base"
import type { LoggerData } from "../domain"

export class CustomTransport extends LoggerTransport {
  constructor(private readonly handler: (value: LoggerData) => Promise<void>) {
    super()
  }

  handle = (data: LoggerData) => this.handler(data)

  reset = () => {}
}
