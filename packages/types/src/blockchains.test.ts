import { isBlockchainSpecified } from "./blockchains"

test("isBlockchainSpecified works", () => {
	expect(isBlockchainSpecified("ETH:awd")).toBeFalsy()
	expect(isBlockchainSpecified("ETHEREUM:awd")).toBeTruthy()
	expect(isBlockchainSpecified("FLOW:awd")).toBeTruthy()
	expect(isBlockchainSpecified("TEZOS:awd")).toBeTruthy()
	expect(isBlockchainSpecified("SOLANA:awd")).toBeTruthy()
})
