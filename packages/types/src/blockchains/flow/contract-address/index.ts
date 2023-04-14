export type FlowContractAddress = string & {
  __IS_FLOW_CONTRACT_ADDRESS__: true
}

// example: A.0x01658d9b94068f3c.CommonNFT
const regexp = new RegExp(/^A\.0*x*[0-9a-f]{16}\.[0-9A-Za-z_]{3,}/)

export function toFlowContractAddress(value: string): FlowContractAddress {
  if (regexp.test(value)) {
    return value as FlowContractAddress
  } else {
    throw new Error(`not an flow contract address: ${value}`)
  }
}

export function toFlowContractAddressSafe(raw: string): FlowContractAddress | undefined {
  try {
    return toFlowContractAddress(raw)
  } catch (err) {
    return undefined
  }
}
