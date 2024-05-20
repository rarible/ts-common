import { LoggerTransport } from "../base.js"
import type { LoggerData } from "../domain.js"

export class ConsoleTransport extends LoggerTransport {
  handle = async (data: LoggerData) => console.log(data)

  reset = () => {}
}
