import React, {
  createContext,
  ReactNode,
  useContext,
  useEffect,
  useMemo,
  useState,
} from "react";
import { useWeb3React } from "@web3-react/core";
import { useNavigate } from "react-router-dom";
import { login, register, info } from "../api/userServices";
import { toast } from "react-toastify";
import {
  setAuth,
  removeAuth,
  getAuth,
  getAuthWallet,
  setAuthWallet,
} from "../utils/authHelper";

interface AuthContextType {
  wallet: string;
  loginUser: (email: string, password: string) => void;
  signUp: (email: string, password: string) => void;
  logout: () => void;
  loading: boolean;
}

const AuthContext = createContext<AuthContextType>({} as AuthContextType);

export function AuthProvider({
  children,
}: {
  children: ReactNode;
}): JSX.Element {
  const [wallet, setWallet] = useState<string>("");
  const [loading, setLoading] = useState<boolean>(false);

  const navigate = useNavigate();
  const { account, deactivate } = useWeb3React();

  const initialSession = async () => {
    try {
      const response = await info();
      setWallet(response.wallet);
      setLoading(false);
    } catch (error) {
      setLoading(false);
    }
  };

  useEffect(() => {
    setLoading(true);
    if (getAuthWallet() === "false" && getAuth()) {
      initialSession();
    } else if (getAuthWallet() === "true") {
      setWallet(account + "");
      setLoading(false);
    }
  }, [account]);

  const loginUser = async (username: string, password: string) => {
    try {
      const response = await login({ username, password });
      setWallet(response.account.wallet);
      setAuth(response.token.accessToken);
      setAuthWallet("false");
    } catch (error) {
      toast.error("Invalid username or password", {
        position: toast.POSITION.BOTTOM_RIGHT,
      });
    }
  };

  const signUp = async (username: string, password: string) => {
    try {
      const response = await register({ username, password });
      navigate("/login", { replace: true });
      toast.success("Success creating new user", {
        position: toast.POSITION.BOTTOM_RIGHT,
      });
    } catch (error) {
      toast.error("Error please try again", {
        position: toast.POSITION.BOTTOM_RIGHT,
      });
    }
  };

  const logout = () => {
    deactivate();
    setWallet("");
    removeAuth();
    setAuthWallet("false");
  };

  const memoedValue = useMemo(
    () => ({
      wallet,
      loginUser,
      signUp,
      logout,
      loading,
    }),
    [wallet]
  );

  return (
    <AuthContext.Provider value={memoedValue}>{children}</AuthContext.Provider>
  );
}

export default function useAuth() {
  return useContext(AuthContext);
}
