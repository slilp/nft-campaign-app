import React, { useEffect } from "react";
import "./App.css";
import { FaWallet } from "react-icons/fa";
import useDashboard from "./hooks/useDashboard";

function App() {
  const { fetchStatData } = useDashboard();
  useEffect(() => {
    fetchStatData();
  }, []);
  return (
    <div>
      <div className="md:container mx-auto">
        <div className="h-10"></div>
        <h1 className="text-2xl font-bold">Welcome to Dashboard</h1>
        <h1 className="text-md text-gray-400 mb-2">Manage your all NFT</h1>
        <hr></hr>
        <div className="h-5"></div>
        <h1 className="text-xl font-semibold mb-2">Wallet status</h1>

        <div className="h-5"></div>
        <div className="grid grid-cols-3 gap-4">
          <div className=" bg-slate-100 rounded-lg"></div>
          <div className="h-36 bg-slate-500 rounded-lg">
            <h1 className="text-gray-300 text-8xl ">
              <FaWallet></FaWallet>
            </h1>
          </div>
          <div className="h-36  bg-slate-100 rounded-lg"></div>
        </div>
        <div className="h-5"></div>

        <h1 className="text-xl font-semibold mb-2">User</h1>
        <div className="grid grid-cols-2 gap-4">
          <div className="h-36  bg-slate-100 rounded-lg"></div>
          <div className="h-36 bg-slate-500 rounded-lg"></div>
        </div>
        <div className="h-5"></div>

        <div className="h-5"></div>

        <h1 className="text-xl font-semibold mb-2">NFT Management</h1>
        <div className="grid grid-cols-2 gap-4">
          <div className="h-36  bg-slate-100 rounded-lg">Latest minting</div>
          <div className="h-36 bg-slate-500 rounded-lg"></div>
        </div>
        <div className="h-5"></div>

        <h1 className="text-xl font-semibold mb-2">Wallet status</h1>
        <div className="grid grid-cols-2 gap-4">
          <div className="h-36  bg-slate-100 rounded-lg"></div>
          <div className="h-36 bg-slate-500 rounded-lg"></div>
        </div>
      </div>
    </div>
  );
}

export default App;
