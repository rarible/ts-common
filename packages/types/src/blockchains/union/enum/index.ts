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
}

export const evmBlockchains = [BlockchainEnum.POLYGON, BlockchainEnum.IMMUTABLEX, BlockchainEnum.POLYGON]
export type EVMBlockchain = (typeof evmBlockchains)[number]

export function isEVMBlockchain(blockchain: BlockchainEnum): blockchain is EVMBlockchain {
  return evmBlockchains.includes(blockchain)
}

export const blockchains = Object.values(BlockchainEnum)

export function isBlockchainSpecified(value: string): value is WithLayer1Blockchain {
  for (const blockchain of blockchainsLayer1) {
    if (value.startsWith(`${blockchain}:`)) {
      return true
    }
  }
  return false
}

export function isRealBlockchainSpecified(value: string): value is WithBlockchain {
  for (const blockchain of blockchains) {
    if (value.startsWith(`${blockchain}:`)) {
      return true
    }
  }
  return false
}

export type WithLayer1Blockchain = string & {
  __WITH_BLOCKCHAIN__: true
}

export function withLayer1Blockchain(blockchain: BlockchainLayer1Enum, raw: string): WithLayer1Blockchain {
  return `${blockchain}:${raw}` as WithLayer1Blockchain
}

export type WithBlockchain = string & {
  __WITH_BLOCKCHAIN__: true
}

export function withBlockchain(blockchain: BlockchainEnum, raw: string): WithBlockchain {
  return `${blockchain}:${raw}` as WithBlockchain
}

export function toLayerOneBlockchain(blockchain: BlockchainEnum): BlockchainLayer1Enum {
  if (isEVMBlockchain(blockchain)) return BlockchainLayer1Enum.ETHEREUM
  return blockchain
}

export function parseBlockchain(value: WithBlockchain): [BlockchainEnum, string] {
  if (isRealBlockchainSpecified(value)) {
    const sliceIndex = value.indexOf(":")
    const blockchain = value.substring(0, sliceIndex)
    const rest = value.substring(sliceIndex + 1)
    return [blockchain as BlockchainEnum, rest]
  }
  throw new BlockchainParseError(value)
}

export class BlockchainParseError extends Error {
  readonly name = "BlockchainParseError"
  constructor(value: string) {
    super(`Can't parse blockchain from value ${value}`)
  }
}
