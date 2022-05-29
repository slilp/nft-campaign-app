const ACCESS_TOKEN = "access_token";
const WALLET_CONNECT = "connector";
export const setAuth = (value: string) =>
  localStorage.setItem(ACCESS_TOKEN, value);
export const getAuth = () => localStorage.getItem(ACCESS_TOKEN);
export const removeAuth = () => localStorage.removeItem(ACCESS_TOKEN);
export const setAuthWallet = (value: string) =>
  localStorage.setItem(WALLET_CONNECT, value);
export const getAuthWallet = () => localStorage.getItem(WALLET_CONNECT);
export const removeAuthWallet = () => localStorage.removeItem(WALLET_CONNECT);
