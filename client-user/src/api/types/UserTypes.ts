export interface IUserModel {
  username: string;
  wallet: string;
}

export interface ILogin {
  username: string;
  password: string;
}

export interface ILoginResponse {
  account: {
    username: string;
    wallet: string;
  };
  token: {
    accessToken: string;
    tokenType: string;
    expiresIn: number;
  };
}

export interface IRegister {
  username: string;
  password: string;
}
