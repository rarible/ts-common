import { Batcher } from "."

describe("utils/batcher", () => {
	it("should drop values as batch", async () => {
		const myHandler = jest.fn()
		const batcher = new Batcher<number>(100, myHandler)
		batcher.add(2)
		batcher.add(1)
		const [amount, result] = await new Promise<[number, number]>((resolve) => {
			setTimeout(() => {
				resolve([myHandler.mock.calls.length, myHandler.mock.calls[0][0]])
			}, 200)
		})
		expect(amount).toBe(1)
		expect(result).toStrictEqual([2, 1])
	})
})
