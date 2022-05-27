import { useState } from "react";
import { getTransaction } from "../api/transactionServices";

function useDashboard() {
  const [loading, setLoading] = useState<boolean>(false);

  const fetchStatData = async () => {
    setLoading(true);
    try {
      const response = await getTransaction();
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
