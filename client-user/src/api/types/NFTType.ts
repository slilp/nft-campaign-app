export interface ITransferRequest {
  nftId: number;
  to: string;
}

export interface INftOwnerRequest {
  skip?: number;
  limit?: number;
}
export interface INftListResponse {
  totalCount: number;
  nfts: INftModel[];
}

export interface INftModel {
  nftId: number;
  owner: string;
  urlImage: string;
}

export interface INftListResponse {
  totalCount: number;
  nfts: INftModel[];
}

export interface INftModel {
  nftId: number;
  owner: string;
  urlImage: string;
}
