import type { BlockchainLayer1Enum } from "../union/enum/domain.js"

export type Layer1ful<T extends BlockchainLayer1Enum> = string & {
  __BLOCKCHAIN__: T
}

export interface IStringValidator<T extends string> {
  validate(value: string): value is T
}

export interface ILayer1fulValidator<T extends BlockchainLayer1Enum, Base extends string>
  extends IStringValidator<Base> {
  blockchain: T
}

export function createLayer1fulValidator<T extends BlockchainLayer1Enum, Base extends string>(
  blockchain: T,
  fn: (x: string) => x is Base,
): ILayer1fulValidator<T, Base> {
  return {
    validate: fn,
    blockchain,
  }
}
