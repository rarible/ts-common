import { Action, ActionBuilder } from "./index"

describe("Action", () => {
	test("action saves promise for stage if not rejected", async () => {
		const simple = generateSimpleAction<number>()

		const promise1 = simple.action.run(0)
		expect(promise1).toBe(simple.action.run(0))

		simple.promise.resolve(10)
		expect(await promise1).toEqual(10)

		expect(promise1).toBe(simple.action.run(0))
	})

	test("action doesn't save promise for stage if rejected", async () => {
		const simple = generateSimpleAction<number>()

		const promise1 = simple.action.run(0)
		expect(promise1).toBe(simple.action.run(0))

		simple.promise.reject(new Error("rejected"))
		await expect(async () => await promise1).rejects.toThrow(new Error("rejected"))

		expect(simple.action.run(0)).not.toBe(promise1)
	})

	test("action returns result", async () => {
		const simple = generateSimpleAction<number>()

		simple.action.run(0).then()
		simple.promise.resolve(10)

		expect(await simple.action.result).toEqual(10)
		expect(simple.action.ids).toStrictEqual(["one"])
	})

	test("action works for some stages", async () => {
		const promise1 = generatePromise<number>()

		const action = ActionBuilder.create<string>()
			.then({ id: "s1", run: () => promise1.promise() })
			.then({ id: "s2", run: async value => `str-${value}` })
			.build()

		expect(() => action.run(1)).toThrowError(new Error("Stage 0 hasn't been run yet"))
		const s1 = action.run(0)
		expect(() => action.run(1)).toThrowError(new Error("Stage 0 status is: pending"))
		promise1.resolve(10)
		expect(await s1).toBe(10)

		const s2 = action.run(1)
		expect(await s2).toBe("str-10")
		expect(await action.result).toBe("str-10")
		expect(s2).toBe(action.result)

		expect(action.ids).toStrictEqual(["s1", "s2"])
	})
})

function generateSimpleAction<T>() {
	const promise = generatePromise<T>()
	return {
		promise,
		action: ActionBuilder.create<string>()
			.then({ id: "one", run: () => promise.promise() })
			.build(),
	}
}

function generatePromise<T>() {
	const result: {
		resolve: (value: T) => void
		reject: (err: any) => void
		promise: () => Promise<T>
	} = {
		resolve: () => null,
		reject: () => null,
		promise: () =>
			new Promise<T>((resolve, reject) => {
				result.resolve = resolve
				result.reject = reject
			}),
	}
	return result
}
