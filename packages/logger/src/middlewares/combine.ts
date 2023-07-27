/* eslint-disable @typescript-eslint/no-unused-vars */
import type { Middleware } from "./domain"

type LastMiddlewareReturnType<T extends Middleware<any, any>[]> = T extends [
  ...infer _,
  Middleware<infer _In, infer Out>,
]
  ? Out
  : never

export function combineMiddlewares<T extends Middleware<any, any>[]>(
  ...middlewares: T
): Middleware<Parameters<T[number]>[0], LastMiddlewareReturnType<T>> {
  return async (input: Parameters<T[number]>[0]): Promise<LastMiddlewareReturnType<T>> => {
    let result = input
    for (const middleware of middlewares) {
      result = await middleware(result)
    }
    return result as LastMiddlewareReturnType<T>
  }
}
