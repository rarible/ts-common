import type { AbstractAddress } from "../../common/address.js"
import type { ILayer1fulValidator } from "../../common/common.js"
import { evmAddressValidator } from "../../evm/address/index.js"
import { flowContractAddressValidator } from "../../flow/contract-address/index.js"
import { solanaAddressValidator } from "../../solana/address/index.js"
import { aptosAddressValidator } from "../../aptos/address/index.js"
import { BlockchainLayer1Enum } from "../enum/domain.js"

export type ContractAddressValidatorsMap = {
  [K in BlockchainLayer1Enum]: ILayer1fulValidator<K, AbstractAddress<K>>
}

export const contractAddressValidators: ContractAddressValidatorsMap = {
  [BlockchainLayer1Enum.ETHEREUM]: evmAddressValidator,
  [BlockchainLayer1Enum.FLOW]: flowContractAddressValidator,
  [BlockchainLayer1Enum.SOLANA]: solanaAddressValidator,
  [BlockchainLayer1Enum.APTOS]: aptosAddressValidator,
}
