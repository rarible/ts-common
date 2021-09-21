import { ethers } from "ethers"
import { toBn } from "./index"

const testNumber = "11111111111111111111111111111111111"

describe("BN", () => {
	it("should correctly convert extra big number (exponential at)", () => {
		expect(toBn(testNumber).toString()).toBe(testNumber)
	})

	it("should correctly convert ethers.js BigNumber", () => {
		expect(toBn(ethers.BigNumber.from("100")).toString()).toBe("100")
	})

	it("should correctly convert BN", () => {
		expect(toBn(toBn(100)).toString()).toBe("100")
	})

})
