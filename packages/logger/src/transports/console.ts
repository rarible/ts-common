import { LoggerTransport } from "../base"
import type { LoggableShape } from "../domain"

export class ConsoleTransport extends LoggerTransport {
  handle = async (data: LoggableShape) => {
    const { level, ...restData } = data
    return console.log(level, restData)
  }
}
