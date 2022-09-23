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

export async function handleFetchErrorResponse(fetchResponse: any, options?: {
	code?: string,
	requestInit?: RequestInit
}) {
	if (isFetchResponse(fetchResponse) && !fetchResponse.ok) {
		let responseData
		try {
			responseData = await fetchResponse.clone().json()
		} catch (e) {
			responseData = await fetchResponse.clone().text()
		}
		throw new NetworkError({
			status: fetchResponse.status,
			url: decodeURIComponent(fetchResponse.url),
			data: responseData,
			formData: options?.requestInit?.body?.toString(),
			method: options?.requestInit?.method,
			code: options?.code,
		})
	}
}

function isFetchResponse(response: any): response is Response {
	return response && "ok" in response
}

export function handleAxiosErrorResponse(axiosError: any, options?: { code: string }) {
	if (isAxiosError(axiosError) && axiosError.response) {
		const url = axiosError?.config?.url || ""
		throw new NetworkError({
			status: axiosError?.response?.status,
			url: url && decodeURIComponent(url),
			data: axiosError?.response?.data,
			formData: axiosError?.config?.data,
			method: axiosError?.config?.method,
			code: options?.code,
		})
	}
}

function isAxiosError(e: any): e is AxiosError {
	return e?.isAxiosError === true
}
