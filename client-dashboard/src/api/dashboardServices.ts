import request from "./request";
import { IDashboardResponse } from "./types/DashboardType";

export const getStat = async (): Promise<IDashboardResponse> => {
  const response = await request.get<IDashboardResponse>("/dashboard/stat");
  return response.data;
};

export const getStatUser = async (
  skip: number = 0,
  limit: number = 15
): Promise<IDashboardResponse> => {
  const response = await request.get<IDashboardResponse>(
    `/dashboard/stat-user?skip=${skip}&limit=${limit}`
  );
  return response.data;
};
