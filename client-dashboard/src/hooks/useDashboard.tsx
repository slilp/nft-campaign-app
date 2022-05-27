import { useState } from "react";
import { getStat } from "../api/dashboardServices";

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

  return { fetchStatData, loading };
}

export default useDashboard;
