export type FlowTransactionHash = string & {
  __IS_FLOW_TRANSACTION_HASH__: true
}

const regexp = /^[a-f0-9]{64}$/

export function toFlowTransactionHash(raw: string) {
  if (regexp.test(raw)) {
    return raw as FlowTransactionHash
  }
  throw new InvalidFlowTransactionHashError(raw)
}

export class InvalidFlowTransactionHashError extends Error {
  readonly name = "InvalidFlowTransactionHashError"
  constructor(value: string) {
    super(`Not valid flow transaction hash ${value}`)
  }
}
