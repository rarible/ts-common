import { ActionBuilder } from "./action-builder"
import { Action } from "./action"

describe("ActionBuilder", () => {
	test("start works", async () => {
		const action = Action.create({ id: "test" as const, run: (value: number) => Promise.resolve(value * 2)})
		const ab = ActionBuilder.create(() => action)
		const exec = ab.start("no", 10)
		expect(exec.ids).toStrictEqual(["test"])
		expect(await exec.result).toBe(20)
	})

	test("func works", async () => {
		const action = Action.create({ id: "test" as const, run: (value: number) => Promise.resolve(value * 2)})
		const ab = ActionBuilder.create(() => action)
		expect(await ab("no", 20)).toBe(40)
	})
})
