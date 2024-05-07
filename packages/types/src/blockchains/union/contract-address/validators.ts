import type { AbstractAddress } from "../../common"
import type { ILayer1fulValidator } from "../../common/common"
import { evmAddressValidator } from "../../evm"
import { flowContractAddressValidator } from "../../flow"
import { solanaAddressValidator } from "../../solana"
import { tezosContractAddressValidator } from "../../tezos"
import { BlockchainLayer1Enum } from "../enum"
import { aptosAddressValidator } from "../../aptos"

export type ContractAddressValidatorsMap = {
  [K in BlockchainLayer1Enum]: ILayer1fulValidator<K, AbstractAddress<K>>
}

export const contractAddressValidators: ContractAddressValidatorsMap = {
  [BlockchainLayer1Enum.ETHEREUM]: evmAddressValidator,
  [BlockchainLayer1Enum.FLOW]: flowContractAddressValidator,
  [BlockchainLayer1Enum.SOLANA]: solanaAddressValidator,
  [BlockchainLayer1Enum.TEZOS]: tezosContractAddressValidator,
  [BlockchainLayer1Enum.APTOS]: aptosAddressValidator,
}
