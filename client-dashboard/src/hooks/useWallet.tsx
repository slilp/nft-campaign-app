import { useState, useEffect } from "react";
import { StaticJsonRpcProvider } from "@ethersproject/providers";
import { formatEther } from "@ethersproject/units";
interface UseWalletProps {
  refresh: boolean;
  wallet: string;
}

function useWallet({ refresh, wallet }: UseWalletProps) {
  const [balance, setBalance] = useState<number>(0);
  const provider = new StaticJsonRpcProvider(process.env.REACT_APP_RPC);

  useEffect(() => {
    getBalance(wallet);
  }, [refresh, wallet]);

  const getBalance = async (address: string) => {
    try {
      const response = await provider.getBalance(address);
      setBalance(+formatEther(response));
    } catch (error) {}
  };

  return { balance };
}

export default useWallet;
