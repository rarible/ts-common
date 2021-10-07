import { Action } from "./action"

type AB<Ctx, Id, In, Out> = ActionBuilder<Ctx, Id, In, Out>

export abstract class ActionBuilder<Ctx, Id, In, Out> {
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
