export type EVMTransactionHash = string & {
  __IS_EVM_TRANSACTION_HASH__: true
}

const regexp = /^0x([A-Fa-f0-9]{64})$/

export function toEVMTransactionHash(raw: string): EVMTransactionHash {
  if (regexp.test(raw)) {
    return raw as EVMTransactionHash
  }
  throw new InvalidEVMTransactionHashError(raw)
}

export class InvalidEVMTransactionHashError extends Error {
  readonly name = "InvalidEVMTransactionHashError"
  constructor(value: string) {
    super(`Not valid evm transaction hash ${value}`)
  }
}
