import { randomFlowAddress, toFlowAddress } from "./flow-address"

describe("Flow Address", () => {
	test("toAddress should throw if not an flow address", () => {
		expect(() => toFlowAddress("some value")).toThrow()
	})

	test("toAddress should return if the flow address is valid", () => {
		toFlowAddress(randomFlowAddress())
	})
})
