import CallableInstance from "callable-instance"

type Stage<Id, T, R> = {
	id: Id
	run: (value: T) => Promise<R>
}

type PromiseState<T> = { status: "pending" } | { status: "rejected"; error: any } | { status: "resolved"; value: T }

export class Execution<In, Id, T> {
	private readonly state: PromiseState<unknown>[]
	private readonly promises: Promise<unknown>[]

	constructor(private readonly input: In, private readonly stages: Stage<unknown, unknown, unknown>[]) {
		this.state = new Array(stages.length)
		this.promises = new Array(stages.length)
	}

	get ids(): Id[] {
		return this.stages.map(s => s.id) as any
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

	private runInternal(idx: number, input: any): Promise<void> {
		const state: PromiseState<any> = this.state[idx]
		if (state != null && (state.status === "pending" || state.status === "resolved")) {
			return this.promises[idx] as Promise<void>
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
			return promise as Promise<void>
		}
	}

	get result(): Promise<T> {
		return this.runAll()
	}
}

type F<In, T> = (arg: In) => T

interface IAction<In, Id, T> extends F<In, Promise<T>> {
	build(arg: In): Execution<In, Id, T>
}

export class Action<In, Id, T>
	extends CallableInstance<[In], Promise<T>> implements IAction<In, Id, T> {

	private constructor(private readonly stages: Stage<unknown, unknown, unknown>[]) {
		super("instanceMethod")
	}

	instanceMethod(input: In) {
		return this.build(input).runAll()
	}

	thenStage<NewId, NewT>(stage: Stage<NewId, T, NewT>) {
		return new Action<In, Id | NewId, NewT>([
			...this.stages,
			stage as Stage<NewId, unknown, NewT>,
		])
	}

	thenAction<NewId, NewT>(
		action: Action<T, NewId, NewT>
	) {
		return new Action<In, Id | NewId, NewT>([
			...this.stages,
			...action.stages as Stage<unknown, unknown, NewT>[],
		])
	}

	build(input: In): Execution<In, Id, T> {
		return new Execution(input, this.stages)
	}

	static create<Id, T, In = void>(stage: Stage<Id, In, T>): Action<In, Id, T> {
		return new Action([stage as Stage<Id, unknown, T>])
	}
}
