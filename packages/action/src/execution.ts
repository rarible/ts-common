export type Step<Id, T, R> = {
	id: Id
	run: (value: T) => Promise<R>
}

type PromiseState<T> = { status: "pending" } | { status: "rejected"; error: any } | { status: "resolved"; value: T }

export class Execution<Id, T> {
	private readonly state: PromiseState<unknown>[]
	private readonly promises: Promise<unknown>[]

	constructor(private readonly input: any, private readonly steps: Step<unknown, unknown, unknown>[]) {
		this.state = new Array(steps.length)
		this.promises = new Array(steps.length)
	}

	get ids(): Id[] {
		return this.steps.map(s => s.id) as any
	}

	async runAll(): Promise<T> {
		for (let i = 0; i < this.ids.length; i++) {
			await this.run(i)
		}
		const last = this.state[this.ids.length - 1]
		if (last.status === "resolved") {
			return last.value as any
		} else {
			throw new Error("Should never happen")
		}
	}

	run(idx: number): Promise<void> {
		if (idx === 0) {
			return this.runInternal(idx, this.input)
		}
		if (idx >= this.steps.length) {
			throw new Error(`Stage with index ${idx} not found`)
		}
		const prevState = this.state[idx - 1]
		if (prevState == null) {
			throw new Error(`Stage ${idx - 1} hasn't been run yet`)
		}
		if (prevState.status !== "resolved") {
			throw new Error(`Stage ${idx - 1} status is: ${prevState.status}`)
		}
		return this.runInternal(idx, prevState.value)
	}

	private runInternal(idx: number, input: any): Promise<void> {
		const state: PromiseState<any> = this.state[idx]
		if (state != null && (state.status === "pending" || state.status === "resolved")) {
			return this.promises[idx] as Promise<void>
		} else {
			this.state[idx] = { status: "pending" }
			const promise = this.steps[idx].run(input)
			this.promises[idx] = promise
				.then(r => {
					this.state[idx] = { status: "resolved", value: r }
					return r
				})
				.catch(err => {
					this.state[idx] = { status: "rejected", error: err }
					return Promise.reject(err)
				})
			return this.promises[idx] as Promise<void>
		}
	}

	get result(): Promise<T> {
		return this.runAll()
	}
}
