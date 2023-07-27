import type { LoggerData } from "../domain"

export type Middleware<In, Out> = (input: In) => Promise<Out>

export type LoggerMiddleware = Middleware<LoggerData, LoggerData>
