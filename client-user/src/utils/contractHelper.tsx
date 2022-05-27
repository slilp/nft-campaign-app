import { Contract } from "@ethersproject/contracts";
import type { Signer } from "@ethersproject/abstract-signer";
import type { Provider } from "@ethersproject/providers";
import nftAbi from "../utils/abi/MyNFT.json";
import { simpleRpcProvider } from "../utils/provider";

export const getContract = (
  abi: any,
  address: string,
  signer: Signer | Provider
) => {
  const signerOrProvider = signer ?? simpleRpcProvider;
  return new Contract(address, abi, signerOrProvider);
};

export const getNftContract = (address: string, signer: Signer | Provider) => {
  return getContract(nftAbi, address, signer);
};
