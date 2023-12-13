export enum BlockchainLayer1Enum {
  ETHEREUM = "ETHEREUM",
  FLOW = "FLOW",
  TEZOS = "TEZOS",
  SOLANA = "SOLANA",
}

export const blockchainsLayer1 = Object.values(BlockchainLayer1Enum)

export enum BlockchainEnum {
  ETHEREUM = "ETHEREUM",
  FLOW = "FLOW",
  TEZOS = "TEZOS",
  POLYGON = "POLYGON",
  IMMUTABLEX = "IMMUTABLEX",
  SOLANA = "SOLANA",
  MANTLE = "MANTLE",
  ZKSYNC = "ZKSYNC",
}

export const blockchains = Object.values(BlockchainEnum)

export const evmBlockchains = [
  BlockchainEnum.POLYGON,
  BlockchainEnum.IMMUTABLEX,
  BlockchainEnum.POLYGON,
  BlockchainEnum.MANTLE,
  BlockchainEnum.ZKSYNC,
] as const

export type EVMBlockchain = (typeof evmBlockchains)[number]

export function isEVMBlockchain(blockchain: string): blockchain is EVMBlockchain {
  return evmBlockchains.includes(blockchain as EVMBlockchain)
}

export const L1BlockchainByBlockchainDictionary = {
  [BlockchainEnum.ETHEREUM]: BlockchainLayer1Enum.ETHEREUM,
  [BlockchainEnum.POLYGON]: BlockchainLayer1Enum.ETHEREUM,
  [BlockchainEnum.MANTLE]: BlockchainLayer1Enum.ETHEREUM,
  [BlockchainEnum.IMMUTABLEX]: BlockchainLayer1Enum.ETHEREUM,
  [BlockchainEnum.ZKSYNC]: BlockchainLayer1Enum.ETHEREUM,
  [BlockchainEnum.FLOW]: BlockchainLayer1Enum.FLOW,
  [BlockchainEnum.SOLANA]: BlockchainLayer1Enum.SOLANA,
  [BlockchainEnum.TEZOS]: BlockchainLayer1Enum.TEZOS,
} as const satisfies Record<BlockchainEnum, BlockchainLayer1Enum>

export type L1BlockchainByBlockchain = typeof L1BlockchainByBlockchainDictionary

export interface BlockchainByL1Blockchain extends Record<BlockchainLayer1Enum, BlockchainEnum> {
  [BlockchainLayer1Enum.ETHEREUM]: EVMBlockchain
  [BlockchainLayer1Enum.FLOW]: BlockchainEnum.FLOW
  [BlockchainLayer1Enum.SOLANA]: BlockchainEnum.SOLANA
  [BlockchainLayer1Enum.TEZOS]: BlockchainEnum.TEZOS
}

export type WithLayer1Blockchain<
  T extends BlockchainLayer1Enum = BlockchainLayer1Enum,
  Base extends string = string,
> = `${T}:${Base}`

export type WithBlockchain<T extends BlockchainEnum = BlockchainEnum, Base extends string = string> = `${T}:${Base}`
