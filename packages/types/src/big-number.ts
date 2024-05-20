import type { BigNumberLike } from "./common/big-number.js"
import { toBigNumberLike } from "./common/big-number.js"

/**
 * @deprecated will be replaced in 0.11.0.
 * Please use `import { BigNumberLike } from "@rarible/types"`
 */

export type BigNumber = BigNumberLike

/**
 * @deprecated will be replaced in 0.11.0.
 * Please use `import { toBigNumberLike } from "@rarible/types"`
 */

export const toBigNumber = toBigNumberLike

/**
 * @deprecated will be removed in 0.11.0
 */
export const ZERO_NUMBER = toBigNumber("0")
