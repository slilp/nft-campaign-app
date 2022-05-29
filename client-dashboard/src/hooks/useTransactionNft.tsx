import { useState } from "react";
import { mint, transfer } from "../api/nftServices";
import { toast } from "react-toastify";

function useTransactionNft() {
  const [loading, setLoading] = useState<boolean>(false);

  const transferNft = async (nftId: number, to: string) => {
    setLoading(true);
    try {
      await transfer({
        nftId,
        to,
      });
      setLoading(false);
      toast.success("Success : Transfer NFT", {
        position: toast.POSITION.BOTTOM_RIGHT,
      });
    } catch (error) {
      setLoading(false);
    }
  };
  const mintNft = async (image: File | undefined) => {
    setLoading(true);
    try {
      await mint({
        image,
      });
      setLoading(false);
      toast.success("Success : Minting new NFT", {
        position: toast.POSITION.BOTTOM_RIGHT,
      });
    } catch (error) {
      setLoading(false);
    }
  };

  return { transferNft, mintNft, loading };
}

export default useTransactionNft;
