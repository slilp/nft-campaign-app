import { useEffect } from "react";
import { useWeb3React } from "@web3-react/core";
import { toast } from "react-toastify";
import { FaWallet } from "react-icons/fa";
import useAuth from "../../../hooks/useAuth";
import { setAuthWallet } from "../../../utils/authHelper";

function Navbar() {
  const { active, account, activate, deactivate } = useWeb3React();

  async function disconnect() {
    try {
      deactivate();
      setAuthWallet("false");
    } catch (ex) {
      toast.error(JSON.stringify(ex), {
        position: toast.POSITION.BOTTOM_RIGHT,
      });
    }
  }

  const transformAddress = (adr: string) =>
    adr.substring(0, 4) + "..." + adr.substring(adr.length - 4, adr.length);

  return (
    <div className="container mx-auto p-4">
      <div className="flex items-center gap-1 justify-between">
        <h1>THIS IS LOGO</h1>
        <div className="mb-0">
          <div>GG</div>
          {active && (
            <button
              onClick={disconnect}
              style={{ minWidth: "175px" }}
              className="pb-2 d-flex justify-content-center align-items-center gap-2 text-white fw-bold"
            >
              <span>
                <FaWallet></FaWallet>
              </span>
              <span>{transformAddress(account + "")}</span>
            </button>
          )}
        </div>
      </div>
    </div>
  );
}

export default Navbar;
