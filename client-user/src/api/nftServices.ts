import request from "./request";
import { INftListResponse, ITransferRequest } from "./types/NFTType";

export const getNftByOwner = async (): Promise<INftListResponse> => {
  const response = await request.get<INftListResponse>("/user/nft");
  return response.data;
};

export const transfer = async (
  data: ITransferRequest
): Promise<INftListResponse> => {
  const response = await request.post<ITransferRequest, INftListResponse>(
    "/user/send-nft",
    data
  );
  return response.data;
};
