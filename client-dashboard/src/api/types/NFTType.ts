export interface ITransferRequest {
  nftId: number;
  to: string;
}

export interface IMintRequest {
  image: File;
}

export interface INftOwnerRequest {
  search?: string;
  skip?: number;
  limit?: number;
}

export interface INftListResponse {
  totalCount: number;
  nfts: {
    nftId: number;
    owner: string;
    urlImage: string;
  }[];
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
