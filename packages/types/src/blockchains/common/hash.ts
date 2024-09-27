import { CustomError } from "@rarible/utils"
import type { BlockchainEnum, BlockchainLayer1Enum, L1BlockchainByBlockchain } from "../union/enum/index.js"
import type { Layer1ful } from "./common.js"

export type AbstractTransactionHash<T extends BlockchainLayer1Enum> = Layer1ful<T> & {
  __IS_TRANSACTION_HASH__: true
}

export type HashByBlockchain = {
  [K in BlockchainEnum]: AbstractTransactionHash<L1BlockchainByBlockchain[K]>
}

export type TransactionHash = HashByBlockchain[BlockchainEnum]

export class InvalidTransactionHashError<T extends BlockchainLayer1Enum> extends CustomError {
  constructor(blockchain: T, value: string) {
    super(`Not valid transaction hash ${value} for blockchain ${blockchain}`)
  }
}
