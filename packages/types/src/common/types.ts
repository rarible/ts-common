export type Maybe<T> = T | undefined

/**
 * String that represent any number value and can be passed to BigNumber constructor
 * can be used with any bn implementation such as bn.js, bignumber.js
 */
export type BigNumberLike = string & {
  __IS_BIG_NUMBER__: true
}
