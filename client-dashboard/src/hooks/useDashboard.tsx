import { useEffect, useState } from "react";
import { getStat } from "../api/dashboardServices";
import { IDashboardResponse } from "../api/types/DashboardType";

function useDashboard({ refresh }: { refresh: boolean }) {
  const [stat, setStat] = useState<IDashboardResponse>();

  useEffect(() => {
    fetchStatData();
  }, [refresh]);

  const fetchStatData = async () => {
    try {
      const response = await getStat();
      setStat(response);
    } catch (error) {}
  };

  return { stat };
}

export default useDashboard;
