import type { RequestInit, Response } from "node-fetch"
import type { AxiosError } from "axios"

// eslint-disable-next-line unicorn/custom-error-definition
export class Warning extends Error {
	constructor(message: string) {
		super(message)
		Object.setPrototypeOf(this, Warning.prototype)
		this.name = "Warning"
	}
}

export class NetworkError extends Error {
	status?: number
	url: string
	data?: any
	code?: string
	formData?: any
	method?: string

	constructor(options: {
		status?: number,
		url: string,
		data?: any,
		code?: string,
		formData?: any,
		method?: string
	}) {
		super(JSON.stringify(options, null, " "))
		Object.setPrototypeOf(this, NetworkError.prototype)
		this.name = "NetworkError"
		this.code = options.code || "NETWORK_ERR"
		this.status = options.status
		this.url = options.url
		this.data = options.data
		this.formData = options.formData
		this.method = options.method
	}
}

export async function handleFetchErrorResponse(response: unknown, options?: {
	code?: string,
	requestInit?: RequestInit
}) {
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
		})
	}
}

function isFetchResponse(response: unknown): response is Response {
	return typeof response === "object" && response !== null && "ok" in response
}

export function handleAxiosErrorResponse(error: unknown, options?: { code: string }) {
	if (isAxiosError(error)) {
		throw createAxiosNetworkError(error, options?.code)
	}
}

function decodeUri(url: string | undefined): string {
	return url ? decodeURIComponent(url) : "unknown-url"
}

function isAxiosError(e: unknown): e is AxiosError {
	return typeof e === "object" && e !== null && "isAxiosError" in e
}

function createAxiosNetworkError(error: AxiosError<any, any>, code?: string): NetworkError {
	if (error.response) {
		return new NetworkError({
			status: error.response.status,
			url: decodeUri(error.config.url),
			data: error.response.data,
			formData: error.config.data,
			method: error.config.method,
			code,
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
		})
	}
	return new NetworkError({
		status: -1,
		url: "unknown",
		data: "none",
		formData: undefined,
		method: "unknown",
		code,
	})
}
