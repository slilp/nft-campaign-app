import request from "./request";
import {
  INftOwnerRequest,
  INftListResponse,
  IMintRequest,
  ITransferRequest,
} from "./types/NFTType";

export const getNftByOwner = async ({
  skip,
  limit,
  search,
}: INftOwnerRequest): Promise<INftListResponse> => {
  const response = await request.get<INftListResponse>("/nft/search-owner");
  return response.data;
};

export const mint = async (data: IMintRequest): Promise<INftListResponse> => {
  const response = await request.post<IMintRequest, INftListResponse>(
    "/nft/mint",
    data
  );
  return response.data;
};

export const transfer = async (
  data: ITransferRequest
): Promise<INftListResponse> => {
  const response = await request.post<ITransferRequest, INftListResponse>(
    "/nft/send-nft",
    data
  );
  return response.data;
};
