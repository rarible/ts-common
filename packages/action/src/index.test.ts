import { Action } from "./index"

describe("Action", () => {

	test("action saves promise for stage if not rejected", async () => {
		const simple = generateSimpleAction<number>()
		const exec = simple.action.start()

		const promise1 = exec.run(0)
		expect(promise1).toBe(exec.run(0))

		simple.promise.resolve(10)
		expect(await promise1).toEqual(10)

		expect(promise1).toBe(exec.run(0))
	})

	test("action builders can be appended to other action builders", async () => {
		const simple = Action
			.create({ id: "first" as const, run: (value: string) => Promise.resolve(parseInt(value)) })
			.thenStep({ id: "second" as const, run: value => Promise.resolve(value - 3) })

		const append = Action
			.create({ id: "next" as const, run: (value: number) => Promise.resolve(value * 2) })
			.thenStep({ id: "one-more" as const, run: value => Promise.resolve(value + 2) })

		const ab = simple.thenAction(append)
		const exec = ab.start("10")
		expect(await exec.result).toBe(16)
		expect(await ab("100")).toBe(196)
	})

	test("action doesn't save promise for stage if rejected", async () => {
		const simple = generateSimpleAction<number>()
		const exec = simple.action.start()

		const promise1 = exec.run(0)
		expect(promise1).toBe(exec.run(0))

		simple.promise.reject(new Error("rejected"))
		await expect(async () => await promise1).rejects.toThrow(new Error("rejected"))

		expect(exec.run(0)).not.toBe(promise1)
	})

	test("action returns result", async () => {
		const simple = generateSimpleAction<number>()
		const exec = simple.action.start()

		exec.run(0).then()
		simple.promise.resolve(10)

		expect(await exec.result).toEqual(10)
		expect(exec.ids).toStrictEqual(["one"])
	})

	test("action works for some stages", async () => {
		const promise1 = generatePromise<number>()

		const exec = Action
			.create({ id: "s1", run: () => promise1.promise() })
			.thenStep({ id: "s2", run: async value => `str-${value}` })
			.start()

		expect(() => exec.run(1)).toThrowError(new Error("Stage 0 hasn't been run yet"))
		const s1 = exec.run(0)
		expect(() => exec.run(1)).toThrowError(new Error("Stage 0 status is: pending"))
		promise1.resolve(10)
		await s1

		const s2 = exec.run(1)
		await s2
		expect(await exec.result).toBe("str-10")

		expect(exec.ids).toStrictEqual(["s1", "s2"])
	})
})

function generateSimpleAction<T>() {
	const promise = generatePromise<T>()
	return {
		promise,
		action: Action.create({ id: "one" as const, run: () => promise.promise() }),
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
