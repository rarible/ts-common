import * as tg from "generic-type-guard"
import type { ErrorOptions } from "../custom"
import { CustomError } from "../custom"
import { extractErrorMessage } from "../utils"

/**
 * Represents error with the specific code
 * useful in cases when you have keyed-table of errors
 */

export class CodeError<T = void> extends CustomError<T> {
  // fraction of PI
  static UNKNOWN_CODE = 14159265359

  /**
   * Parses original unknown error and return CodeError
   * that will have '.code' property
   */
  static parse(error: unknown): CodeError<void>
  static parse<T>(error: unknown, data: T): CodeError<T>
  static parse<T>(error: unknown, data?: T): CodeError<T> {
    const message = extractErrorMessage(error)
    const code = extractErrorCode(error)
    return new CodeError(code, message, {
      cause: error,
      data: data as T,
    })
  }

  constructor(public code: number, message: string | undefined, options?: ErrorOptions<T>) {
    super(message, options)
    this.code = code
  }
}

const hasCode = tg.isLikeObject({
  code: tg.isSet,
})

export function extractErrorCode(error: unknown) {
  if (hasCode(error)) {
    if (tg.isNumber(error.code)) return error.code
    if (tg.isString(error.code)) {
      const parsedCode = parseInt(error.code)
      if (!isNaN(parsedCode)) {
        return parsedCode
      }
    }
  }
  return CodeError.UNKNOWN_CODE
}
