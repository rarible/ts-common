import { randomAddress, toAddress } from "./address"

describe("Address", () => {
	test("toAddress should throw if not address", () => {
		expect(() => toAddress("some value")).toThrow()
	})

	test("toAddress should return if the address is valid", () => {
		toAddress(randomAddress())
	})
})
