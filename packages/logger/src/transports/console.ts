import { LoggerTransport } from "../base"
import type { LoggerData } from "../domain"

export class ConsoleTransport extends LoggerTransport {
  handle = async (data: LoggerData) => console.log(data)

  reset = () => {}
}
