import { getRandomId } from "./index"

describe("Id generator", () => {
	it("should crete random id", () => {
		const id = getRandomId()
		expect(id.length).toBeGreaterThanOrEqual(20)
		expect(id).toMatch(/^\w{8,10}-\w{11}$/)
	})

	it("should crete random id with prefix", () => {
		const id = getRandomId("test")
		expect(id.startsWith("test-")).toBeTruthy()
		expect(id.length).toBeGreaterThanOrEqual(25)
		expect(id).toMatch(/^test-\w{8,10}-\w{11}$/)
	})
})
