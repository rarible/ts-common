import Web3 from "web3"
import { testOrderData } from "./mocks"
import { createTestProvider } from "./utils/create-test-provider"
import { signTypedData } from "./utils/sign-typed-data"
import { useTestProvider } from "./utils/use-test-provider"

describe("TestProvider", function () {
	const { provider, wallet } = createTestProvider(undefined)
	const web3 = new Web3(provider)

	useTestProvider(provider)

	test.skip("e2e chain works", async () => {
		expect.assertions(1)
		const from = wallet.getAddressString()
		const result = await web3.eth.sendTransaction({
			from,
			to: from,
			value: 0,
		})
		expect(result).toBeTruthy()
	})

	test("sign typed data works", async () => {
		expect.assertions(1)
		const signature = await signTypedData(web3, testOrderData, wallet.getAddressString())
		expect(signature).toBeTruthy()
	})
})
