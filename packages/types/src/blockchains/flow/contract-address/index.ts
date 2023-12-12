export type FlowContractAddress = string & {
  __IS_FLOW_CONTRACT_ADDRESS__: true
}

// example: A.0x01658d9b94068f3c.CommonNFT
export const flowContractRegExp = new RegExp(/^A\.0*x*[0-9a-f]{16}\.[0-9A-Za-z_]{3,}/)

export function toFlowContractAddress(value: string): FlowContractAddress {
  const safe = toFlowContractAddressSafe(value)
  if (!safe) throw new Error(`not an flow contract address: ${value}`)
  return safe
}

export function toFlowContractAddressSafe(raw: string): FlowContractAddress | undefined {
  if (isFlowContractAddress(raw)) return raw
  return undefined
}

export function isFlowContractAddress(raw: string): raw is FlowContractAddress {
  return flowContractRegExp.test(raw)
}

export function randomFlowContractAddress(contractName: string = generateRandomContractName()): string {
  // Function to generate a random hexadecimal character
  function getRandomHexChar(): string {
    const hexChars = "0123456789abcdef"
    return hexChars[Math.floor(Math.random() * hexChars.length)]
  }

  // Generate a 16-character hexadecimal string
  let hexString = ""
  for (let i = 0; i < 16; i++) {
    hexString += getRandomHexChar()
  }

  // Construct the full contract address
  return toFlowContractAddress(`A.0x${hexString}.${contractName}`)
}

function generateRandomContractName(): string {
  // Function to generate a random alphanumeric character
  function getRandomAlphaNumChar(): string {
    const alphaNumChars = "0123456789ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz"
    return alphaNumChars[Math.floor(Math.random() * alphaNumChars.length)]
  }

  // Generate a random contract name of a variable length between 3 and 10 characters
  let contractName = ""
  const contractNameLength = Math.floor(Math.random() * 8) + 3 // Length between 3 and 10
  for (let i = 0; i < contractNameLength; i++) {
    contractName += getRandomAlphaNumChar()
  }

  return contractName
}
