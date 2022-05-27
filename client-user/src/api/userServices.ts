import request from "./publicRequest";
import { ILogin, IRegister, IUserModel } from "./types/UserTypes";

export const login = async (req: ILogin): Promise<IUserModel> => {
  const response = await request.post<ILogin, IUserModel>("/user/login", req);
  return response.data;
};

export const register = async (req: IRegister): Promise<IUserModel> => {
  const response = await request.post<IRegister, IUserModel>(
    "/user/register",
    req
  );
  return response.data;
};
