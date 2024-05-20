import { CustomError } from "@rarible/utils/error/custom/index"
import type { BlockchainEnum, BlockchainLayer1Enum, L1BlockchainByBlockchain } from "../union/enum/domain.js"
import type { Layer1ful } from "./common.js"

export type AbstractAddress<T extends BlockchainLayer1Enum> = Layer1ful<T> & {
  __IS_ADDRESS__: true
}

export type AddressByBlockchain = {
  [K in BlockchainEnum]: AbstractAddress<L1BlockchainByBlockchain[K]>
}

export type BlockchainAddress = AddressByBlockchain[BlockchainLayer1Enum]

export class InvalidAddressError<T extends BlockchainLayer1Enum> extends CustomError {
  constructor(blockchain: T, value: string) {
    super(`Invalid address ${value} for blockchain ${blockchain}`)
  }
}
