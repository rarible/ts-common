import type { BigNumberLike } from "./common/big-number"
import { toBigNumberLike } from "./common/big-number"

/**
 * @deprecated will be removed in future.
 * Please use `import { BigNumberLike } from "@rarible/types"`
 */

export type BigNumber = BigNumberLike

/**
 * @deprecated will be removed in future
 * Please use `import { toBigNumberLike } from "@rarible/types"`
 */

export const toBigNumber = toBigNumberLike

/**
 * @deprecated will be removed in future
 */
export const ZERO_NUMBER = toBigNumber("0")
