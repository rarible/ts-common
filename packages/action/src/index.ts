import CallableInstance from "callable-instance"

type Arr = readonly unknown[]

type LastItemType<T> = T extends [...Arr, infer Last] ? Last : void

type Stage<Id, T, R> = {
	id: Id
	run: (value: T) => Promise<R>
}

type PromiseState<T> = { status: "pending" } | { status: "rejected"; error: any } | { status: "resolved"; value: T }

export class Execution<In, Id, Rs extends Arr> extends CallableInstance<[], LastItemType<Rs>>{
	private readonly state: PromiseState<unknown>[]
	private readonly promises: Promise<unknown>[]

	constructor(private readonly input: In, private readonly stages: Stage<unknown, unknown, unknown>[]) {
		super("instanceMethod")
		this.state = new Array(stages.length)
		this.promises = new Array(stages.length)
	}

	instanceMethod() {
		return this.runAll()
	}

	get ids(): Id[] {
		return this.stages.map(s => s.id) as any
	}

	async runAll(): Promise<LastItemType<Rs>> {
		for (let i = 0; i < this.ids.length; i++) {
			await this.run(i)
		}
		return await this.result
	}

	run<T extends keyof Rs & number>(idx: T): Promise<Rs[T]> {
		if (idx === 0) {
			return this.runInternal(idx, this.input)
		}
		if (idx >= this.stages.length) {
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

	private runInternal<T extends keyof Rs & number>(idx: T, input: any): Promise<Rs[T]> {
		const state: PromiseState<Rs[T]> = this.state[idx]
		if (state != null && (state.status === "pending" || state.status === "resolved")) {
			return this.promises[idx]
		} else {
			this.state[idx] = { status: "pending" }
			const promise = this.stages[idx].run(input)
			this.promises[idx] = promise
			promise
				.then(r => {
					this.state[idx] = { status: "resolved", value: r }
					return r
				})
				.catch(err => {
					this.state[idx] = { status: "rejected", error: err }
					return Promise.reject(err)
				})
			return promise
		}
	}

	get result(): Promise<LastItemType<Rs>> {
		return this.run(this.stages.length - 1) as Promise<LastItemType<Rs>>
	}
}

export class Action<In, Id, Rs extends Arr>
	extends CallableInstance<[In], Promise<LastItemType<Rs>>> {

	private constructor(private readonly stages: Stage<unknown, unknown, unknown>[]) {
		super("instanceMethod")
	}

	instanceMethod(input: In) {
		return this.build(input).runAll()
	}

	thenStage<NewId, T>(stage: Stage<NewId, LastItemType<Rs>, T>) {
		return new Action<In, Id | NewId, [...Rs, T]>([
			...this.stages,
			stage as Stage<NewId, unknown, T>,
		])
	}

	thenAction<NewId, NewRs extends Arr>(
		action: Action<LastItemType<Rs>, NewId, NewRs>
	) {
		return new Action<In, Id | NewId, [...Rs, ...NewRs]>([
			...this.stages,
			...action.stages as Stage<unknown, unknown, NewRs>[],
		])
	}

	build(input: In): Execution<In, Id, Rs> {
		return new Execution(input, this.stages)
	}

	static create<Id, R, In = void>(stage: Stage<Id, In, R>): Action<In, Id, [R]> {
		return new Action([stage as Stage<Id, unknown, R>])
	}
}
