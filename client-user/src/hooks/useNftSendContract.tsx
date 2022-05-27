import { useNftContract } from "./useContract";
import useTransaction from "./useTransaction.js";

const useNftSendContract = () => {
  const { sendTransaction } = useTransaction();
  const nftContract = useNftContract();

  const transferNft = async (nftId: number, to: string) => {
    return await sendTransaction(
      nftContract,
      "transferFrom",
      [nftId, to],
      null,
      false
    );
  };

  return {
    transferNft,
  };
};

export default useNftSendContract;
