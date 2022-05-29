import { useState, useEffect } from "react";
import { getNftByOwner } from "../api/nftServices";
import { INftListResponse } from "../api/types/NFTType";

interface UseNftProps {
  refresh: boolean;
  owner: string;
  skip: number;
}

function useNft({ refresh, owner, skip }: UseNftProps) {
  const [nftList, setNftList] = useState<INftListResponse>({
    totalCount: 0,
    nfts: [],
  });

  useEffect(() => {
    fetchNftData(skip, owner);
  }, [refresh, owner, skip]);

  const fetchNftData = async (skip: number, search: string) => {
    try {
      const response = await getNftByOwner({
        skip: skip * 15,
        limit: 15,
      });
      setNftList(response);
    } catch (error) {}
  };

  return { nftList };
}

export default useNft;
