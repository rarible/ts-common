// INTERNAL:
// This re-exports needed only for internal modules
// since we're using full-esm and theses modules are CJS

import WalletModule = require("ethereumjs-wallet")
import Web3Module = require("web3")

export const Wallet = WalletModule.default
export const Web3 = Web3Module.default ?? Web3Module
