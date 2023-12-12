import { CustomError } from "@rarible/utils/build/error/custom"

export const L1Blockchains = ["ETHEREUM", "FLOW", "TEZOS", "SOLANA"] as const
export type L1Blockchain = (typeof L1Blockchains)[number]

/**
 * @depreacted
 * please use L1Blockchains instead
 * it will be removed in 0.11.0
 */

export const blockchainsLayer1 = L1Blockchains

/**
 * @deprecated
 * please use literals instead of enums e.g. "ETHEREUM" instead of BlockchainLayer1Enum.ETHEREUM
 * it will be removed in 0.11.0
 */

export enum BlockchainLayer1Enum {
  ETHEREUM = "ETHEREUM",
  FLOW = "FLOW",
  TEZOS = "TEZOS",
  SOLANA = "SOLANA",
}

export const evmBlockchains = ["ETHEREUM", "POLYGON", "MANTLE"] as const
export type EVMBlockchain = (typeof evmBlockchains)[number]

export function isEVMBlockchain(blockchain: Blockchain): blockchain is EVMBlockchain {
  return evmBlockchains.includes(blockchain as EVMBlockchain)
}

export const evmLikeBlockchains = [...evmBlockchains, "IMMUTABLEX"] as const
export type EVMLikeBlockchain = (typeof evmLikeBlockchains)[number]

export function isEVMLikeBlockchain(blockchain: Blockchain): blockchain is EVMLikeBlockchain {
  return evmLikeBlockchains.includes(blockchain as EVMLikeBlockchain)
}

export const blockchains = [...evmLikeBlockchains, "FLOW", "TEZOS", "SOLANA"] as const
export type Blockchain = (typeof blockchains)[number]

/**
 * @deprecated
 * please use literals instead of enums e.g. "POLYGON" instead of BlockchainEnum.POLYGON
 * it will be removed in 0.11.0
 */

export enum BlockchainEnum {
  ETHEREUM = "ETHEREUM",
  FLOW = "FLOW",
  TEZOS = "TEZOS",
  POLYGON = "POLYGON",
  IMMUTABLEX = "IMMUTABLEX",
  SOLANA = "SOLANA",
  MANTLE = "MANTLE",
}

export function isWithL1Blockchain(value: string): value is WithLayer1Blockchain {
  for (const blockchain of L1Blockchains) {
    if (value.startsWith(`${blockchain}:`)) return true
  }
  return false
}

/**
 * @deprecated
 * please use `isWithL1Blockchain` instead of `isBlockchainSpecified`
 */

export const isBlockchainSpecified = isWithL1Blockchain

export function isWithBlockchain(value: string): value is WithBlockchain {
  for (const blockchain of blockchains) {
    if (value.startsWith(`${blockchain}:`)) return true
  }
  return false
}

/**
 * @deprecated
 * please use `isWithBlockchain` instead of `isRealBlockchainSpecified`
 */

export const isRealBlockchainSpecified = isWithBlockchain

export type WithLayer1Blockchain<T extends L1Blockchain = L1Blockchain> = `${T}:${string}` & {
  __WITH_BLOCKCHAIN__: true
}

export function withL1Blockchain(blockchain: L1Blockchain, raw: string): WithLayer1Blockchain {
  return `${blockchain}:${raw}` as WithLayer1Blockchain
}

/**
 * @deprecated
 * please use `withL1Blockchain` instead of `withLayer1Blockchain`
 */

export const withLayer1Blockchain = withL1Blockchain

export type WithBlockchain<T extends Blockchain = Blockchain> = `${T}:${string}` & {
  __WITH_BLOCKCHAIN__: true
}

export function withBlockchain<T extends Blockchain>(blockchain: T, raw: string): WithBlockchain<T> {
  return `${blockchain}:${raw}` as WithBlockchain<T>
}

export function toL1Blockchain(blockchain: Blockchain): L1Blockchain {
  if (isEVMLikeBlockchain(blockchain)) return "ETHEREUM"
  return blockchain
}

/**
 * @deprecated
 * please use `toL1Blockchain` instead of `toLayerOneBlockchain`
 */

export const toLayerOneBlockchain = toL1Blockchain

export function parseBlockchain(value: WithBlockchain): [Blockchain, string] {
  if (isWithBlockchain(value)) {
    const sliceIndex = value.indexOf(":")
    const blockchain = value.substring(0, sliceIndex)
    const rest = value.substring(sliceIndex + 1)
    return [blockchain as Blockchain, rest]
  }
  throw new BlockchainParseError(value)
}

export class BlockchainParseError extends CustomError {
  constructor(value: string) {
    super(`Can't parse blockchain from value ${value}`)
  }
}
