import { useState } from "react";
import { StaticJsonRpcProvider } from "@ethersproject/providers";

function useWallet() {
  const [loading, setLoading] = useState<boolean>(false);
  const RPC_URL = "https://polygon-rpc.com";
  const provider = new StaticJsonRpcProvider(RPC_URL);

  const getBalance = async (address: string) => {
    setLoading(true);
    try {
      const response = await provider.getBalance(address);
      return response;
    } catch (error) {
      setLoading(false);
    }
  };

  return { getBalance, loading };
}

export default useWallet;
