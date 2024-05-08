import type { AbstractAddress } from "../../common/address"
import type { ILayer1fulValidator } from "../../common/common"
import { evmAddressValidator } from "../../evm"
import { flowAddressValidator } from "../../flow"
import { solanaAddressValidator } from "../../solana"
import { tezosAddressValidator } from "../../tezos"
import { BlockchainLayer1Enum } from "../enum"
import { aptosAddressValidator } from "../../aptos"

export type AddressValidatorsMap = {
  [K in BlockchainLayer1Enum]: ILayer1fulValidator<K, AbstractAddress<K>>
}

export const addressValidators: AddressValidatorsMap = {
  [BlockchainLayer1Enum.ETHEREUM]: evmAddressValidator,
  [BlockchainLayer1Enum.FLOW]: flowAddressValidator,
  [BlockchainLayer1Enum.SOLANA]: solanaAddressValidator,
  [BlockchainLayer1Enum.TEZOS]: tezosAddressValidator,
  [BlockchainLayer1Enum.APTOS]: aptosAddressValidator,
}
