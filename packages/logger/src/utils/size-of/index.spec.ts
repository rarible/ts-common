import { sizeOf } from "."

describe("utils/size-of", () => {
	it("should calculate correct size of complex object", () => {
		const size = sizeOf({
			prop1: "test", // 2 * 4 = 8 bytes
			prop2: 10, // 8 bytes
			prop3: undefined, // 0 bytes
			prop4: null, // 0 bytes
			prop5: {
				name: "Ivan", // 2 * 4 = 8 bytes
				isOwner: true, // 4 bytes
			},
		}) // property names: (5 * 5 * 2) + (4 * 2) + (7 * 2) = 72
		expect(size).toBe(100)
	})
})