import { toBn } from "./index"

const testNumber = "11111111111111111111111111111111111"

describe("BN", () => {
	it("should correctly convert extra big number (exponential at)", () => {
		expect(toBn(testNumber).toString()).toBe(testNumber)
	})
})
