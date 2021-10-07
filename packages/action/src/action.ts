import CallableInstance from "callable-instance"
import { Execution, Step } from "./execution"

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
		const start = this.steps.slice(0, this.steps.length - 2)
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

	static create<Id, T, In = void>(stage: Step<Id, In, T>): Action<Id, In, T> {
		return new Action([stage as Step<Id, unknown, T>])
	}
}
