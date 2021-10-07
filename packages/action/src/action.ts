import CallableInstance from "callable-instance"
import { Execution, Step } from "./execution"

export class Action<In, Id, T>
	extends CallableInstance<[In], Promise<T>> {

	private constructor(private readonly stages: Step<unknown, unknown, unknown>[]) {
		super("instanceMethod")
	}

	instanceMethod(input: In) {
		return this.start(input).runAll()
	}

	thenStep<NewId, NewT>(stage: Step<NewId, T, NewT>) {
		return new Action<In, Id | NewId, NewT>([
			...this.stages,
			stage as Step<NewId, unknown, NewT>,
		])
	}

	thenAction<NewId, NewT>(
		action: Action<T, NewId, NewT>
	) {
		return new Action<In, Id | NewId, NewT>([
			...this.stages,
			...action.stages as Step<unknown, unknown, NewT>[],
		])
	}

	start(input: In): Execution<Id, T> {
		return new Execution(input, this.stages)
	}

	static create<Id, T, In = void>(stage: Step<Id, In, T>): Action<In, Id, T> {
		return new Action([stage as Step<Id, unknown, T>])
	}
}
