import ganache from "ganache"
import type { AbstractProvider } from "web3-core"
import { randomEVMAddress, randomWord } from "@rarible/types"
import { toBn } from "@rarible/utils"
import { Wallet, Web3 } from "./shims.js"
import { RpcError } from "./utils.js"
import { estimate } from "./index.js"

describe("estimate middleware", () => {
  test("estimates tx before send", async () => {
    const wallet = new Wallet(Buffer.from(randomWord().substring(2), "hex"))

    const provider = ganache.provider({
      accounts: [
        {
          secretKey: wallet.getPrivateKeyString(),
          balance: "0x1000000000000000000000000000",
        },
      ],
    })

    const threshold = 1.100005
    const web3 = new Web3(
      estimate(provider, {
        threshold,
        force: true,
      }) as AbstractProvider,
    )

    const receipt = await web3.eth.sendTransaction({
      from: wallet.getAddressString(),
      to: randomEVMAddress(),
      value: 10000,
      gasPrice: 10,
    })
    const tx = await web3.eth.getTransaction(receipt.transactionHash)
    expect(tx.gas).toBe(toBn(21000).multipliedBy(1.1).toNumber())

    const web3Error = new Web3(provider as AbstractProvider)
    const receiptError = await web3Error.eth.sendTransaction({
      from: wallet.getAddressString(),
      to: randomEVMAddress(),
      value: 10000,
    })
    const txError = await web3.eth.getTransaction(receiptError.transactionHash)
    expect(txError.gas).not.toBe(toBn(21000).multipliedBy(1.1).toNumber())
  })

  test("subscribe should throw error", async () => {
    const wallet = new Wallet(Buffer.from(randomWord().substring(2), "hex"))

    const provider = ganache.provider({
      accounts: [
        {
          secretKey: wallet.getPrivateKeyString(),
          balance: "0x1000000000000000000000000000",
        },
      ],
    })

    const web3 = new Web3(estimate(provider) as AbstractProvider)
    const error = new Promise((_, reject) =>
      web3.eth.subscribe(
        "logs",
        {
          address: randomEVMAddress(),
        },
        (e: unknown) => reject(e),
      ),
    )

    await expect(error).rejects.toEqual(new RpcError("Notifications not supported", -32000))
  })
})
