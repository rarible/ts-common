import { CustomError } from "@rarible/utils"
import type { BlockchainEnum, BlockchainLayer1Enum, L1BlockchainByBlockchain } from "../union/enum/domain.js"
import type { AbstractAddress } from "./address.js"

export type AbstractContractAddress<T extends BlockchainLayer1Enum> = AbstractAddress<T> & {
  __IS_CONTRACT__: true
}

export type ContractAddressByBlockchain = {
  [K in BlockchainEnum]: AbstractContractAddress<L1BlockchainByBlockchain[K]>
}

export type BlockchainContractAddress = ContractAddressByBlockchain[BlockchainEnum]

export class InvalidContractAddressError<T extends BlockchainLayer1Enum> extends CustomError {
  constructor(blockchain: T, value: string) {
    super(`Invalid contract address ${value} for blockchain ${blockchain}`)
  }
}
