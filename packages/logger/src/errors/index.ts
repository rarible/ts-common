import type { RequestInit, Response } from "node-fetch"
import * as tg from "generic-type-guard"
import type { ErrorOptions } from "@rarible/utils/build"
import { CustomError } from "@rarible/utils/build"
import type { AxiosError } from "axios"

export class Warning<T = void> extends CustomError<T> {}

export interface NetworkErrorConfig extends ErrorOptions<unknown> {
  status: number | undefined
  url: string
  code: string | undefined
  formData: unknown | undefined
  method: string | undefined
}

export class NetworkError extends CustomError<unknown> {
  readonly status: number | undefined
  readonly url: string
  readonly code: string
  readonly formData: unknown | undefined
  readonly method: string | undefined

  constructor(options: NetworkErrorConfig) {
    super(JSON.stringify(options, null, " "), {
      data: options.data,
      cause: options.cause,
      name: options.name,
    })
    this.code = options.code || "NETWORK_ERR"
    this.status = options.status
    this.url = options.url
    this.formData = options.formData
    this.method = options.method
  }
}

export async function handleFetchErrorResponse(
  response: unknown,
  options?: {
    code?: string
    requestInit?: RequestInit
  },
) {
  if (isFetchResponse(response) && !response.ok) {
    const data = await response
      .clone()
      .json()
      .catch(() => response.clone().text())
      .catch(() => "unknown error")

    throw new NetworkError({
      status: response.status,
      url: decodeURIComponent(response.url),
      data,
      formData: options?.requestInit?.body?.toString(),
      method: options?.requestInit?.method,
      code: options?.code,
      cause: undefined,
    })
  }
}

const isFetchResponse = tg.isLikeObject({
  ok: tg.isBoolean,
  clone: tg.isSet,
}) as tg.TypeGuard<Response>

export function handleAxiosErrorResponse(error: unknown, options?: { code: string }) {
  if (isAxiosError(error)) {
    throw createAxiosNetworkError(error, options?.code)
  }
}

function decodeUri(url: string | undefined): string {
  return url ? decodeURIComponent(url) : "unknown-url"
}
const isAxiosError = tg.isLikeObject({
  isAxiosError: tg.isBoolean,
}) as tg.TypeGuard<AxiosError>

function createAxiosNetworkError(error: AxiosError, code: string | undefined): NetworkError {
  if (error.response) {
    return new NetworkError({
      status: error.response.status,
      url: decodeUri(error.config.url),
      data: error.response.data,
      formData: error.config.data,
      method: error.config.method,
      code,
      cause: error,
    })
  }
  if (error.request) {
    return new NetworkError({
      status: error.request?.status,
      url: decodeUri(error.config.url),
      data: error.request?.readyState,
      formData: error.config.data,
      method: error.config.method,
      code,
      cause: error,
    })
  }
  return new NetworkError({
    status: -1,
    url: "unknown",
    data: "none",
    formData: "none",
    method: "unknown",
    code: "1337",
    cause: error,
  })
}
