import request from "./publicRequest";
import requestAuth from "./request";
import {
  ILogin,
  IRegister,
  IUserModel,
  ILoginResponse,
} from "./types/UserTypes";

export const login = async (req: ILogin): Promise<ILoginResponse> => {
  const response = await request.post<ILogin, ILoginResponse>(
    "/user/login",
    req
  );
  return response.data;
};

export const register = async (req: IRegister): Promise<IUserModel> => {
  const response = await request.post<IRegister, IUserModel>(
    "/user/register",
    req
  );
  return response.data;
};

export const info = async (): Promise<IUserModel> => {
  const response = await requestAuth.get<IUserModel>("/user");
  return response.data;
};
