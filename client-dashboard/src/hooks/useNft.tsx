import { useState, useEffect } from "react";
import { mint, transfer, getNftByOwner } from "../api/nftServices";
import { INftListResponse } from "../api/types/NFTType";

interface UseNftProps {
  refresh: boolean;
  owner: string;
  skip: number;
}

function useNft({ refresh, owner, skip }: UseNftProps) {
  const [loading, setLoading] = useState<boolean>(false);
  const [nftList, setNftList] = useState<INftListResponse>({
    totalCount: 0,
    nfts: [],
  });

  useEffect(() => {
    fetchNftData(skip, owner);
  }, [refresh, owner, skip]);

  const transferNft = async (nftId: number, to: string) => {
    setLoading(true);
    try {
      const response = await transfer({
        nftId,
        to,
      });
      setLoading(false);
      return response;
    } catch (error) {
      setLoading(false);
    }
  };
  const mintNft = async (image: File) => {
    setLoading(true);
    try {
      const response = await mint({
        image,
      });
      setLoading(false);
      return response;
    } catch (error) {
      setLoading(false);
    }
  };

  const fetchNftData = async (skip: number, search: string) => {
    try {
      const response = await getNftByOwner({
        skip: skip * 5,
        limit: 5,
        search,
      });
      setNftList(response);
    } catch (error) {}
  };

  return { transferNft, mintNft, nftList, loading };
}

export default useNft;
