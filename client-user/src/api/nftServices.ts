import request from "./request";
import {
  INftListResponse,
  INftModel,
  ITransferRequest,
  INftOwnerRequest,
} from "./types/NFTType";

export const getNftByOwner = async ({
  skip,
  limit,
}: INftOwnerRequest): Promise<INftListResponse> => {
  const response = await request.get<INftListResponse>(
    `/user/nft?skip=${skip}&limit=${limit}`
  );
  return response.data;
};

export const transfer = async (data: ITransferRequest): Promise<INftModel> => {
  const response = await request.put<ITransferRequest, INftModel>(
    "/user/send-nft",
    data
  );
  return response.data;
};
