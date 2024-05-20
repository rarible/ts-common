/* eslint-disable new-cap */
import ganache from "ganache"
import Wallet from "ethereumjs-wallet"
import Web3 from "web3"
import { randomEVMAddress, randomWord } from "@rarible/types"
import { toBn } from "@rarible/utils"
import { RpcError } from "./utils.js"
import { estimate } from "./index.js"

describe("estimate middleware", () => {
  test("estimates tx before send", async () => {
    const wallet = new Wallet.default(Buffer.from(randomWord().substring(2), "hex"))

    const provider = ganache.provider({
      accounts: [
        {
          secretKey: wallet.getPrivateKeyString(),
          balance: "0x1000000000000000000000000000",
        },
      ],
    })

    const threshold = 1.100005
    const web3 = new Web3.default(
      estimate(provider, {
        threshold,
        force: true,
      }) as any,
    )

    const receipt = await web3.eth.sendTransaction({
      from: wallet.getAddressString(),
      to: randomEVMAddress(),
      value: 10000,
      gasPrice: 10,
    })
    const tx = await web3.eth.getTransaction(receipt.transactionHash)
    expect(tx.gas).toBe(toBn(21000).multipliedBy(1.1).toNumber())

    const web3Error = new Web3.default(provider as any)
    const receiptError = await web3Error.eth.sendTransaction({
      from: wallet.getAddressString(),
      to: randomEVMAddress(),
      value: 10000,
    })
    const txError = await web3.eth.getTransaction(receiptError.transactionHash)
    expect(txError.gas).not.toBe(toBn(21000).multipliedBy(1.1).toNumber())
  })

  test("subscribe should throw error", async () => {
    const wallet = new Wallet.default(Buffer.from(randomWord().substring(2), "hex"))

    const provider = ganache.provider({
      accounts: [
        {
          secretKey: wallet.getPrivateKeyString(),
          balance: "0x1000000000000000000000000000",
        },
      ],
    })

    const web3 = new Web3.default(estimate(provider) as any)

    const error = new Promise((_, reject) =>
      web3.eth.subscribe(
        "logs",
        {
          address: randomEVMAddress(),
        },
        e => reject(e),
      ),
    )

    await expect(error).rejects.toEqual(new RpcError("Notifications not supported", -32000))
  })
})
