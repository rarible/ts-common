export enum BlockchainLayer1Enum {
  ETHEREUM = "ETHEREUM",
  FLOW = "FLOW",
  SOLANA = "SOLANA",
  APTOS = "APTOS",
}

export const blockchainsLayer1 = Object.values(BlockchainLayer1Enum)

export enum BlockchainEnum {
  ETHEREUM = "ETHEREUM",
  FLOW = "FLOW",
  POLYGON = "POLYGON",
  IMMUTABLEX = "IMMUTABLEX",
  SOLANA = "SOLANA",
  APTOS = "APTOS",
  ECLIPSE = "ECLIPSE",
  MANTLE = "MANTLE",
  ZKSYNC = "ZKSYNC",
  RARI = "RARI",
  ASTARZKEVM = "ASTARZKEVM",
  KROMA = "KROMA",
  BASE = "BASE",
  ARBITRUM = "ARBITRUM",
  LIGHTLINK = "LIGHTLINK",
  CELO = "CELO",
  CHILIZ = "CHILIZ",
  MOONBEAM = "MOONBEAM",
  PALM = "PALM",
  ETHERLINK = "ETHERLINK",
  LISK = "LISK",
  OASYS = "OASYS",
  SAAKURU = "SAAKURU",
  ALEPHZERO = "ALEPHZERO",
  SHAPE = "SHAPE",
  BERACHAIN = "BERACHAIN",
  ZKCANDY = "ZKCANDY",
  TELOS = "TELOS",
  MATCH = "MATCH",
  ABSTRACT = "ABSTRACT",
  HEDERAEVM = "HEDERAEVM",
  VICTION = "VICTION",
  GOAT = "GOAT",
  SETTLUS = "SETTLUS",
}

export const blockchains = Object.values(BlockchainEnum)

export const evmBlockchains = [
  BlockchainEnum.POLYGON,
  BlockchainEnum.IMMUTABLEX,
  BlockchainEnum.POLYGON,
  BlockchainEnum.MANTLE,
  BlockchainEnum.ZKSYNC,
  BlockchainEnum.RARI,
  BlockchainEnum.ASTARZKEVM,
  BlockchainEnum.BASE,
  BlockchainEnum.ARBITRUM,
  BlockchainEnum.LIGHTLINK,
  BlockchainEnum.CELO,
  BlockchainEnum.KROMA,
  BlockchainEnum.CHILIZ,
  BlockchainEnum.MOONBEAM,
  BlockchainEnum.PALM,
  BlockchainEnum.ETHERLINK,
  BlockchainEnum.LISK,
  BlockchainEnum.OASYS,
  BlockchainEnum.SAAKURU,
  BlockchainEnum.ALEPHZERO,
  BlockchainEnum.SHAPE,
  BlockchainEnum.BERACHAIN,
  BlockchainEnum.TELOS,
  BlockchainEnum.MATCH,
  BlockchainEnum.ABSTRACT,
  BlockchainEnum.HEDERAEVM,
  BlockchainEnum.VICTION,
  BlockchainEnum.ZKCANDY,
  BlockchainEnum.GOAT,
  BlockchainEnum.SETTLUS,
] as const

export type EVMBlockchain = (typeof evmBlockchains)[number]

export function isEVMBlockchain(blockchain: string): blockchain is EVMBlockchain {
  return evmBlockchains.includes(blockchain as EVMBlockchain)
}

export const L1BlockchainByBlockchainDictionary = {
  [BlockchainEnum.ETHEREUM]: BlockchainLayer1Enum.ETHEREUM,
  [BlockchainEnum.POLYGON]: BlockchainLayer1Enum.ETHEREUM,
  [BlockchainEnum.MANTLE]: BlockchainLayer1Enum.ETHEREUM,
  [BlockchainEnum.RARI]: BlockchainLayer1Enum.ETHEREUM,
  [BlockchainEnum.IMMUTABLEX]: BlockchainLayer1Enum.ETHEREUM,
  [BlockchainEnum.ZKSYNC]: BlockchainLayer1Enum.ETHEREUM,
  [BlockchainEnum.ASTARZKEVM]: BlockchainLayer1Enum.ETHEREUM,
  [BlockchainEnum.ARBITRUM]: BlockchainLayer1Enum.ETHEREUM,
  [BlockchainEnum.LIGHTLINK]: BlockchainLayer1Enum.ETHEREUM,
  [BlockchainEnum.CELO]: BlockchainLayer1Enum.ETHEREUM,
  [BlockchainEnum.KROMA]: BlockchainLayer1Enum.ETHEREUM,
  [BlockchainEnum.CHILIZ]: BlockchainLayer1Enum.ETHEREUM,
  [BlockchainEnum.BASE]: BlockchainLayer1Enum.ETHEREUM,
  [BlockchainEnum.MOONBEAM]: BlockchainLayer1Enum.ETHEREUM,
  [BlockchainEnum.PALM]: BlockchainLayer1Enum.ETHEREUM,
  [BlockchainEnum.ETHERLINK]: BlockchainLayer1Enum.ETHEREUM,
  [BlockchainEnum.LISK]: BlockchainLayer1Enum.ETHEREUM,
  [BlockchainEnum.OASYS]: BlockchainLayer1Enum.ETHEREUM,
  [BlockchainEnum.SAAKURU]: BlockchainLayer1Enum.ETHEREUM,
  [BlockchainEnum.FLOW]: BlockchainLayer1Enum.FLOW,
  [BlockchainEnum.SOLANA]: BlockchainLayer1Enum.SOLANA,
  [BlockchainEnum.ECLIPSE]: BlockchainLayer1Enum.SOLANA,
  [BlockchainEnum.APTOS]: BlockchainLayer1Enum.APTOS,
  [BlockchainEnum.ALEPHZERO]: BlockchainLayer1Enum.ETHEREUM,
  [BlockchainEnum.SHAPE]: BlockchainLayer1Enum.ETHEREUM,
  [BlockchainEnum.BERACHAIN]: BlockchainLayer1Enum.ETHEREUM,
  [BlockchainEnum.TELOS]: BlockchainLayer1Enum.ETHEREUM,
  [BlockchainEnum.MATCH]: BlockchainLayer1Enum.ETHEREUM,
  [BlockchainEnum.ABSTRACT]: BlockchainLayer1Enum.ETHEREUM,
  [BlockchainEnum.HEDERAEVM]: BlockchainLayer1Enum.ETHEREUM,
  [BlockchainEnum.ZKCANDY]: BlockchainLayer1Enum.ETHEREUM,
  [BlockchainEnum.VICTION]: BlockchainLayer1Enum.ETHEREUM,
  [BlockchainEnum.GOAT]: BlockchainLayer1Enum.ETHEREUM,
  [BlockchainEnum.SETTLUS]: BlockchainLayer1Enum.ETHEREUM,
} as const satisfies Record<BlockchainEnum, BlockchainLayer1Enum>

export type L1BlockchainByBlockchain = typeof L1BlockchainByBlockchainDictionary

export interface BlockchainByL1Blockchain extends Record<BlockchainLayer1Enum, BlockchainEnum> {
  [BlockchainLayer1Enum.ETHEREUM]: EVMBlockchain
  [BlockchainLayer1Enum.FLOW]: BlockchainEnum.FLOW
  [BlockchainLayer1Enum.SOLANA]: BlockchainEnum.SOLANA
  [BlockchainLayer1Enum.APTOS]: BlockchainEnum.APTOS
}

export type WithLayer1Blockchain<
  T extends BlockchainLayer1Enum = BlockchainLayer1Enum,
  Base extends string = string,
> = `${T}:${Base}`

export type WithBlockchain<T extends BlockchainEnum = BlockchainEnum, Base extends string = string> = `${T}:${Base}`
