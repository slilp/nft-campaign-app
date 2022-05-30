import { useState } from "react";
import { useWeb3React } from "@web3-react/core";
import { toast } from "react-toastify";
import { useNftContract } from "./useContract";
import useTransaction from "./useTransaction";
import { transfer } from "../api/nftServices";
import { INftListResponse } from "../api/types/NFTType";

const useNftSendContract = () => {
  const { active, account } = useWeb3React();
  const [loading, setLoading] = useState<boolean>(false);
  const { sendTransaction } = useTransaction();
  const nftContract = useNftContract();

  const transferNft = async (nftId: number, to: string) => {
    try {
      if (active) {
        setLoading(true);
        await sendTransaction(
          nftContract,
          "transferFrom",
          [account, to, nftId],
          null,
          false
        );

        setLoading(false);
      } else {
        setLoading(true);
        await transfer({ nftId, to });
        toast.success("Success : Transfer NFT", {
          position: toast.POSITION.BOTTOM_RIGHT,
        });
        setLoading(false);
      }
    } catch (error) {
      setLoading(false);
      toast.success("Error : Transfer NFT", {
        position: toast.POSITION.BOTTOM_RIGHT,
      });
    }
  };

  const getNft = async (skip: number) => {
    const balance = await sendTransaction(
      nftContract,
      "balanceOf",
      [account],
      null,
      false
    );
    const response: INftListResponse = {
      totalCount: balance.toNumber(),
      nfts: [],
    };
    for (let i = skip; i < balance.toNumber(); i++) {
      const id = await sendTransaction(
        nftContract,
        "tokenOfOwnerByIndex",
        [account, i + ""],
        null,
        false
      );
      const nftInfo = await sendTransaction(
        nftContract,
        "tokenURI",
        ["4"],
        null,
        false
      );
      const urlImage = nftInfo.split("/");
      response.nfts.push({
        nftId: id.toNumber(),
        urlImage: urlImage[urlImage.length - 1],
        owner: account + "",
      });
    }

    return response;
  };

  return {
    loading,
    getNft,
    transferNft,
  };
};

export default useNftSendContract;
