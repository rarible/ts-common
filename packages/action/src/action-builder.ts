import CallableInstance from "callable-instance"
import type { Action } from "./action"
import type { Execution } from "./execution"

type AB<Ctx, Id, In, Out> = ActionBuilder<Ctx, Id, In, Out>

export abstract class ActionBuilder<Ctx, Id, In, Out>
	extends CallableInstance<[Ctx, In], Promise<Out>> {

	protected constructor() {
		super("instanceMethod")
	}

	instanceMethod(ctx: Ctx, input: In): Promise<Out> {
		return this.start(ctx, input).result
	}

	start(ctx: Ctx, input: In): Execution<Id, Out> {
		return this.build(ctx).start(input)
	}

	abstract build(ctx: Ctx): Action<Id, In, Out>

	before<NewIn>(map: (input: NewIn) => In | Promise<In>): AB<Ctx, Id, NewIn, Out> {
		return new BeforeActionBuilder(this, map)
	}

	after<NewOut>(map: (input: Out) => NewOut | Promise<NewOut>): AB<Ctx, Id, In, NewOut> {
		return new AfterActionBuilder(this, map)
	}

	thenActionBuilder<NewId, NewOut>(ab: AB<Ctx, NewId, Out, NewOut>): AB<Ctx, NewId | Id, In, NewOut> {
		return new ThenActionBuilder(this, ab)
	}

	public static create<Ctx, Id, In, Out>(build: (ctx: Ctx) => Action<Id, In, Out>) {
		return new SimpleActionBuilder(build)
	}
}

class BeforeActionBuilder<Ctx, Id, In, Out, NewIn> extends ActionBuilder<Ctx, Id, NewIn, Out> {
	constructor(
		private readonly source: AB<Ctx, Id, In, Out>,
		private readonly map: (input: NewIn) => In | Promise<In>,
	) {
		super()
	}

	build(ctx: Ctx): Action<Id, NewIn, Out> {
		const action = this.source.build(ctx)
		return action.before(this.map)
	}
}

class AfterActionBuilder<Ctx, Id, In, Out, NewOut> extends ActionBuilder<Ctx, Id, In, NewOut> {
	constructor(
		private readonly source: AB<Ctx, Id, In, Out>,
		private readonly map: (input: Out) => NewOut | Promise<NewOut>,
	) {
		super()
	}

	build(ctx: Ctx): Action<Id, In, NewOut> {
		const action = this.source.build(ctx)
		return action.after(this.map)
	}
}

class ThenActionBuilder<Ctx, Id, In, Out, NewId, NewOut> extends ActionBuilder<Ctx, Id | NewId, In, NewOut> {
	constructor(
		private readonly ab1: AB<Ctx, Id, In, Out>,
		private readonly ab2: AB<Ctx, NewId, Out, NewOut>,
	) {
		super()
	}

	build(ctx: Ctx): Action<Id | NewId, In, NewOut> {
		const a1 = this.ab1.build(ctx)
		const a2 = this.ab2.build(ctx)
		return a1.thenAction(a2)
	}
}

class SimpleActionBuilder<Ctx, Id, In, Out> extends ActionBuilder<Ctx, Id, In, Out> {
	constructor(private readonly f: (ctx: Ctx) => Action<Id, In, Out>) {
		super()
	}

	build(ctx: Ctx): Action<Id, In, Out> {
		return this.f(ctx)
	}
}
