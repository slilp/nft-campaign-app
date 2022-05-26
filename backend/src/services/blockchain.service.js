const { Wallet, utils } = require("ethers");
const {
  getNFTContract,
  sendTransaction,
} = require("../utils/abi/contractHelper");
require("dotenv").config();

const blockchainServices = {
  createWallet: async (runningId) => {
    const wallet = Wallet.fromMnemonic(
      process.env.MNEMONIC,
      `m/44'/60'/0'/0/${runningId}`
    );

    return await wallet.getAddress();
  },
  mint: async (derivationId, uri) => {
    const contract = await getNFTContract(derivationId);
    const mintTransaction = await sendTransaction(contract, "mint", [uri]);
    return mintTransaction;
  },
  transfer: async (derivationId, from, nft, to) => {
    const contract = await getNFTContract(derivationId);
    const transferTransaction = await sendTransaction(contract, "transfer", [
      from,
      to,
      nft,
    ]);
    return transferTransaction;
  },
};

module.exports = blockchainServices;
