const { Wallet, utils } = require("ethers");
require("dotenv").config();

const blockchainServices = {
  createWallet: async (runningId) => {
    const wallet = Wallet.fromMnemonic(
      process.env.MNEMONIC,
      `m/44'/60'/0'/0/${runningId}`
    );

    return await wallet.getAddress();
  },
  mint: async (to, info) => {},
  transfer: async (nft, from, to) => {},
};

module.exports = blockchainServices;
