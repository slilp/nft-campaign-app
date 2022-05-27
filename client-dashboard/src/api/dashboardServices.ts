import request from "./request";
import { IDashboardResponse } from "./types/DashboardType";

export const getStat = async (): Promise<IDashboardResponse> => {
  const response = await request.get<IDashboardResponse>("/dashboard/stat");
  return response.data;
};
