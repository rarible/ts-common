import CallableInstance from "callable-instance"
import type { Step } from "./execution"
import { Execution } from "./execution"

export class Action<Id, In, Out>
	extends CallableInstance<[In], Promise<Out>> {

	private constructor(private readonly steps: Step<unknown, unknown, unknown>[]) {
		super("instanceMethod")
	}

	instanceMethod(input: In) {
		return this.start(input).runAll()
	}

	thenStep<NewId, NewOut>(step: Step<NewId, Out, NewOut>) {
		return new Action<Id | NewId, In, NewOut>([
			...this.steps,
			step as Step<NewId, unknown, NewOut>,
		])
	}

	thenAction<NewId, NewOut>(
		action: Action<NewId, Out, NewOut>,
	) {
		return new Action<Id | NewId, In, NewOut>([
			...this.steps,
			...action.steps as Step<unknown, unknown, NewOut>[],
		])
	}

	around<NewIn, NewOut>(
		mapIn: (input: NewIn) => In | Promise<In>,
		mapOut: (input: Out, initialIn: NewIn) => NewOut | Promise<NewOut>
	): Action<Id, NewIn, NewOut> {
		const steps = this.steps.length
		return new Action(this.steps.map((step, idx) => {
			if (idx === 0 && steps === 1) {
				return {
					id: step.id,
					run: async (input: NewIn) => {
						const value = await step.run(await mapIn(input))
						return mapOut(value as any, input)
					},
				} as any
			} else if (idx === 0) {
				return {
					id: step.id,
					run: async (input: NewIn) => {
						const value = await step.run(await mapIn(input))
						return { initial: input, value }
					},
				} as any
			} else if (idx === steps - 1) {
				return {
					id: step.id,
					run: async (prevValue: any) => {
						const value = await step.run(prevValue.value)
						return mapOut(value as any, prevValue.initial)
					},
				} as any
			} else {
				return {
					id: step.id,
					run: async (prevValue: any) => {
						const value = await step.run(prevValue.value)
						return { initial: prevValue.initial, value }
					},
				} as any
			}
		}))
	}

	before<NewIn>(map: (input: NewIn) => In | Promise<In>): Action<Id, NewIn, Out> {
		const [first, ...rest] = this.steps
		return new Action([
			{
				id: first.id,
				run: async (value) => {
					const input = await map(value as any)
					return first.run(input)
				},
			},
			...rest,
		])
	}

	after<NewOut>(map: (input: Out) => NewOut | Promise<NewOut>): Action<Id, In, NewOut> {
		const start = this.steps.slice(0, -1)
		const last = this.steps[this.steps.length - 1]
		return new Action([
			...start,
			{
				id: last.id,
				run: async (value) => {
					const out = await last.run(value)
					return map(out as any)
				},
			},
		])
	}

	start(input: In): Execution<Id, Out> {
		return new Execution(input, this.steps)
	}

	static create<Id, T, In = void>(step: Step<Id, In, T>): Action<Id, In, T> {
		return new Action([step as Step<Id, unknown, T>])
	}
}
