import type { WithBlockchain } from "../blockchains"
import { isRealBlockchainSpecified } from "../blockchains"

export type ActivityId = WithBlockchain & {
  __IS_ACTIVITY_ID__: true
}

export function toActivityId(value: string): ActivityId {
  if (!isRealBlockchainSpecified(value)) {
    throw new Error(`Not an ActivityId: ${value}`)
  }
  return value as ActivityId
}
