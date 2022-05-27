export interface IDashboardResponse {
  totalUser: number;
  totalNft: string;
  wallet: [
    {
      wallet: string;
    }
  ];
}

export interface IDashboardUserResponse {
  wallet: [
    {
      wallet: string;
    }
  ];
}
