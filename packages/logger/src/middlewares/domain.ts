import type { LoggerData } from "../domain.js"

export type Middleware<In, Out> = (input: In) => Promise<Out>

export type LoggerMiddleware = Middleware<LoggerData, LoggerData>
