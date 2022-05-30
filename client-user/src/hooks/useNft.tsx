import { useState, useEffect } from "react";
import { getNftByOwner } from "../api/nftServices";
import { INftListResponse } from "../api/types/NFTType";
import { useWeb3React } from "@web3-react/core";
import useNftSendContract from "../hooks/useNftSendContract";

interface UseNftProps {
  refresh: boolean;
  skip: number;
}

function useNft({ refresh, skip }: UseNftProps) {
  const [nftList, setNftList] = useState<INftListResponse>({
    totalCount: 0,
    nfts: [],
  });
  const { active, account } = useWeb3React();
  const { getNft } = useNftSendContract();

  useEffect(() => {
    fetchNftData(skip);
  }, [refresh, skip, account]);

  const fetchNftData = async (skip: number) => {
    try {
      if (active) {
        const response = await getNft(skip);
        setNftList(response);
      } else {
        const response = await getNftByOwner({
          skip: skip * 15,
          limit: 15,
        });
        setNftList(response);
      }
    } catch (error) {}
  };

  return { nftList };
}

export default useNft;
