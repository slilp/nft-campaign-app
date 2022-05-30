import { FaCubes, FaWallet } from "react-icons/fa";
import useAuth from "../../../hooks/useAuth";

function Navbar() {
  const { wallet, logout } = useAuth();

  const transformAddress = (adr: string) =>
    adr.substring(0, 4) + "..." + adr.substring(adr.length - 4, adr.length);

  return (
    <div className="container mx-auto p-4">
      <div className="flex items-center gap-1 justify-between">
        <div className="flex gap-2 text-lg font-bold items-center">
          <span className="text-xl">
            <FaCubes></FaCubes>
          </span>
          <span className=" text-pink-500">COLLECT</span>
          <span className=" text-red-500">NFTs</span>
        </div>
        <div className="mt-3">
          {wallet !== "" && (
            <button
              style={{ minWidth: "175px" }}
              onClick={() => {
                navigator.clipboard.writeText(wallet);
              }}
              className="bg-red-400 hover:bg-red-500 transition text-white rounded-lg flex items-center justify-center gap-5 p-3"
            >
              <span>
                <FaWallet></FaWallet>
              </span>
              <span>{transformAddress(wallet + "")}</span>
            </button>
          )}

          <div className="text-right">
            <button onClick={logout} className="text-gray-500">
              Log out
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Navbar;
