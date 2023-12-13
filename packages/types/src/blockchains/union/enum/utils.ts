import { CustomError } from "@rarible/utils"
import type {
  BlockchainEnum,
  BlockchainLayer1Enum,
  L1BlockchainByBlockchain,
  WithBlockchain,
  WithLayer1Blockchain,
} from "./domain"
import { L1BlockchainByBlockchainDictionary, blockchains, blockchainsLayer1 } from "./domain"

export const withLayer1BlockchainRegExp = new RegExp(`^(${blockchainsLayer1.join("|")}):(.*?)$`)
export function isBlockchainSpecified(value: string): value is WithLayer1Blockchain<BlockchainLayer1Enum, string> {
  return withLayer1BlockchainRegExp.test(value)
}

export function withLayer1Blockchain<T extends BlockchainLayer1Enum, B extends string>(
  blockchain: T,
  raw: B,
): WithLayer1Blockchain<T, B> {
  return `${blockchain}:${raw}`
}

export const withBlockchainRegExp = new RegExp(`^(${blockchains.join("|")}):(.*?)$`)
export function isRealBlockchainSpecified(value: string): value is WithBlockchain<BlockchainEnum, string> {
  return withBlockchainRegExp.test(value)
}

export function withBlockchain<T extends BlockchainEnum, Base extends string>(
  blockchain: T,
  raw: Base,
): WithBlockchain<T, Base> {
  return `${blockchain}:${raw}`
}

export function toLayerOneBlockchain<T extends BlockchainEnum>(blockchain: T): L1BlockchainByBlockchain[T] {
  const converted = L1BlockchainByBlockchainDictionary[blockchain]
  if (converted) return converted
  throw new Error(`Unknown blockchain - ${blockchain}`)
}

type InferBlockchainData<T extends WithBlockchain<any, any>> = T extends WithBlockchain<infer C, infer B>
  ? [C, B]
  : never

export function parseBlockchain<T extends WithBlockchain>(value: T): InferBlockchainData<T> {
  const safe = parseBlockchainSafe(value)
  if (!safe) throw new BlockchainParseError(value)
  return safe
}

export function parseBlockchainSafe<T extends WithBlockchain>(value: T): InferBlockchainData<T> | undefined {
  const match = withBlockchainRegExp.exec(value)
  if (!match) return undefined
  return [match[1], match[2]] as InferBlockchainData<T>
}

export class BlockchainParseError extends CustomError {
  constructor(value: string) {
    super(`Can't parse blockchain from value ${value}`)
  }
}
