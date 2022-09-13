// eslint-disable-next-line unicorn/custom-error-definition
export class Warning extends Error {
	constructor(message: string) {
		super(message)
		this.name = "Warning"
	}
}

export class NetworkError extends Error {
	status: number
	url: string
	value: any
	code?: string

	constructor(options: {
		status: number,
		url: string,
		value: any,
		code?: string
	}) {
		super(JSON.stringify(options, null, " "))
		this.name = "NetworkError"
		this.code = options.code || "NETWORK_ERR"
		this.status = options.status
		this.url = options.url
		this.value = options.value
	}
}
