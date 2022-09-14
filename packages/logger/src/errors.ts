// eslint-disable-next-line unicorn/custom-error-definition
export class Warning extends Error {
	constructor(message: string) {
		super(message)
		Object.setPrototypeOf(this, Warning.prototype)
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
		Object.setPrototypeOf(this, NetworkError.prototype)
		this.name = "NetworkError"
		this.code = options.code || "NETWORK_ERR"
		this.status = options.status
		this.url = options.url
		this.value = options.value
	}
}
