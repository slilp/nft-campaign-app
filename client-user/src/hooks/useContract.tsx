import { useMemo } from "react";
import { useWeb3React } from "@web3-react/core";
import { getNftContract } from "../utils/contractHelper";

export const useNftContract = () => {
  const address = process.env.REACT_APP_TOKEN_ADDRESS + "";
  const { library, account } = useWeb3React();
  return useMemo(
    () =>
      getNftContract(
        address,
        account ? library.getSigner(account).connectUnchecked() : null
      ),
    [library, account]
  );
};
