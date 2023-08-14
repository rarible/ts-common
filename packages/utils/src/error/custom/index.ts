import { CustomError as CustomErrorBase } from "ts-custom-error"

export type ErrorOptions<T> = {
  /**
   * Subsequent error can be used as original error that
   * was thrown
   */
  cause?: unknown
  /**
   * Provide specific name to error for better debugging experience
   * make at as unique as possible
   */
  name?: string
  /**
   * Additional data that can be passed with the error
   * useful for debugging and logging
   */
  data?: T
}

export class CustomError<T = void> extends CustomErrorBase {
  /**
   * Additional data that can be passed with the error
   * useful for debugging and logging
   */
  readonly data: T
  /**
   * Subsequent error can be used as original error that
   * was thrown
   */
  readonly cause: unknown

  constructor(message?: string, _options?: ErrorOptions<void>)
  constructor(message?: string, _options?: ErrorOptions<T>)
  constructor(message?: string, _options?: ErrorOptions<T>) {
    super(message, { cause: _options?.cause })
    this.data = _options?.data as T
    this.cause = _options?.cause
    const name = _options?.name
    if (name) {
      Object.defineProperty(this, "name", {
        value: name,
        enumerable: false,
        configurable: true,
      })
    }
  }
}
