import { useState } from "react";
import { getStat, getStatUser } from "../api/dashboardServices";

function useDashboard() {
  const [loading, setLoading] = useState<boolean>(false);

  const fetchStatData = async () => {
    setLoading(true);
    try {
      const response = await getStat();
      console.log(response);
      setLoading(false);
      return response;
    } catch (error) {
      setLoading(false);
    }
  };

  const fetchStatWalletData = async (skip: number = 0, limit: number = 15) => {
    setLoading(true);
    try {
      const response = await getStatUser(skip, limit);
      console.log(response);
      setLoading(false);
      return response;
    } catch (error) {
      setLoading(false);
    }
  };

  return { fetchStatData, fetchStatWalletData, loading };
}

export default useDashboard;
