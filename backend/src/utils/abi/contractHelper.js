const { Contract } = require("@ethersproject/contracts");
const nftAbi = require("./MyNFT.json");
const ethers = require("ethers");

const getContract = (abi, address, acc) => {
  var provider = new ethers.providers.JsonRpcProvider(process.env.RPC);
  const account = ethers.utils.HDNode.fromMnemonic(
    process.env.MNEMONIC
  ).derivePath(`m/44'/60'/0'/0/${acc}`);

  const signer = new ethers.Wallet(account, provider);
  return new Contract(address, abi, signer);
};

module.exports.getNFTContract = (acc) => {
  return getContract(nftAbi, process.env.NFT_ADDRESS, acc);
};

module.exports.sendTransaction = async (
  contract,
  method,
  args,
  overrides = null
) => {
  var provider = new ethers.providers.JsonRpcProvider(process.env.RPC);
  const raw = await contract[method](...args, {
    gasPrice: ethers.utils.parseUnits("50", "gwei"),
    ...overrides,
  });
  if (raw.hash) {
    const tx = await raw.wait();
    return tx;
  } else {
    return raw;
  }
};
