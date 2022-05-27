import { useState } from "react";
import { mint, transfer, getNftByOwner } from "../api/nftServices";

function useNft() {
  const [loading, setLoading] = useState<boolean>(false);

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

  const fetchNftData = async (skip: number, limit: number, search: string) => {
    setLoading(true);
    try {
      const response = await getNftByOwner({
        skip,
        limit,
        search,
      });
      setLoading(false);
      return response;
    } catch (error) {
      setLoading(false);
    }
  };

  return { transferNft, mintNft, fetchNftData, loading };
}

export default useNft;
