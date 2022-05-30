import request from "./request";
import {
  INftOwnerRequest,
  INftListResponse,
  IMintRequest,
  ITransferRequest,
  INftModel,
} from "./types/NFTType";

export const getNftByOwner = async ({
  skip,
  limit,
  search,
}: INftOwnerRequest): Promise<INftListResponse> => {
  const response = await request.get<INftListResponse>(
    `/nft/search-owner?skip=${skip}&limit=${limit}&search=${search}`
  );
  return response.data;
};

export const mint = async (data: IMintRequest): Promise<INftModel> => {
  const bodyFormData = new FormData();
  bodyFormData.append("image", data.image as File);
  const requestOptions = { headers: { "Content-Type": "multipart/form-data" } };
  const response = await request.post<any, INftModel>(
    "/nft/mint",
    bodyFormData,
    requestOptions
  );
  return response.data;
};

export const transfer = async (data: ITransferRequest): Promise<INftModel> => {
  const response = await request.put<ITransferRequest, INftModel>(
    "/nft/send-nft",
    data
  );
  return response.data;
};
