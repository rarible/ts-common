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

	test("before works", async () => {
		const action = Action.create({
			id: "test" as const,
			run: (value: number) => Promise.resolve(value * 2),
		}).before((value: number) => value + 10)
		const exec = action.start(5)
		expect(exec.ids).toStrictEqual(["test"])
		expect(await exec.result).toBe(30)
	})

	test("around works for 1 step Action", async () => {
		const action = Action.create({
			id: "test" as const,
			run: (value: number) => Promise.resolve(value * 2),
		})
		const result = action.around(
			(initial: string) => parseInt(initial),
			(result: number, initial: string) => ({ result, initial })
		)
		const exec = result.start("5")
		expect(exec.ids).toStrictEqual(["test"])
		const response = await exec.result
		expect(response.initial).toBe("5")
		expect(response.result).toBe(10)
	})

	test("around works for 3 step Action", async () => {
		const action = Action
			.create({ id: "test1" as const, run: (value: number) => Promise.resolve(value * 2) })
			.thenStep({ id: "test2" as const, run: value => Promise.resolve(value + 2) })
			.thenStep({ id: "test3" as const, run: value => Promise.resolve(value * 10) })

		const result = action.around(
			(initial: string) => parseInt(initial),
			(result: number, initial: string) => ({ result, initial })
		)
		const exec = result.start("7")
		expect(exec.ids).toStrictEqual(["test1", "test2", "test3"])
		const response = await exec.result
		expect(response.initial).toBe("7")
		expect(response.result).toBe(160)
	})

	test("after works", async () => {
		const action = Action.create({
			id: "test" as const,
			run: (value: number) => Promise.resolve(value * 2),
		})
		const result = action.after((value: number) => value + 10)
		const exec = result.start(10)
		expect(exec.ids).toStrictEqual(["test"])
		expect(await exec.result).toBe(30)
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

	test("after and before work together with two stages", async () => {
		const action = Action.create(
			{
				id: "test_1" as const,
				run: async (value: number) => value * 2,
			})
			.thenStep({
				id: "test_2" as const,
				run: async (value: number) => value * 4,
			})
			.after(async result => result + 2)
			.before(async (input: string) => parseInt(input) * 10)

		const exec = action.start("10")
		expect(exec.ids).toStrictEqual(["test_1", "test_2"])
		expect(await exec.runAll()).toBe(802)
	})

	test("two stages brokes after Error in last step", async () => {
		const action = Action.create(
			{
				id: "test_1" as const,
				run: async (value: number) => value * 2,
			})
			.thenStep({
				id: "test_2" as const,
				run: async () => {
				    throw new Error("Oops")
				},
			})
			.before(async (input: string) => parseInt(input) * 10)
			.after(async result => result + 2)

		const exec = await action.start("10")
		expect(exec.ids).toStrictEqual(["test_1", "test_2"])
		await expect(async () => await exec.runAll()).rejects.toThrow(new Error("Oops"))

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
