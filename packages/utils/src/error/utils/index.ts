import * as tg from "generic-type-guard"

const hasMessage = tg.isLikeObject({
  message: tg.isString,
})

export function extractErrorMessage(error: unknown) {
  if (typeof error === "string") return error
  if (hasMessage(error)) return error.message
  return undefined
}

const hasName = tg.isLikeObject({
  name: tg.isString,
})

export function extractErrorName(error: unknown) {
  if (hasName(error)) return error.name
  if (tg.isObjectLike(error)) {
    if (typeof error?.constructor?.name === "string") {
      return error.constructor.name
    }
  }
  return undefined
}

const hasStack = tg.isLikeObject({
  stack: tg.isString,
})

export function extractErrorStack(error: unknown) {
  if (hasStack(error)) return error.stack
  return undefined
}
