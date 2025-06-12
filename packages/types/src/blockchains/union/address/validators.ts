import type { AbstractAddress } from "../../common/address.js"
import type { ILayer1fulValidator } from "../../common/common.js"
import { evmAddressValidator } from "../../evm/address/index.js"
import { flowAddressValidator } from "../../flow/address/index.js"
import { solanaAddressValidator } from "../../solana/address/index.js"
import { aptosAddressValidator } from "../../aptos/address/index.js"
import { BlockchainLayer1Enum } from "../enum/domain.js"

export type AddressValidatorsMap = {
  [K in BlockchainLayer1Enum]: ILayer1fulValidator<K, AbstractAddress<K>>
}

export const addressValidators: AddressValidatorsMap = {
  [BlockchainLayer1Enum.ETHEREUM]: evmAddressValidator,
  [BlockchainLayer1Enum.FLOW]: flowAddressValidator,
  [BlockchainLayer1Enum.SOLANA]: solanaAddressValidator,
  [BlockchainLayer1Enum.APTOS]: aptosAddressValidator,
}
