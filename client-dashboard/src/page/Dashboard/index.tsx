import { useState } from "react";
import Stat from "./Stat";
import Minting from "./Minting";
import Nft from "./Nft";

function Dashboard() {
  const [refresh, setRefresh] = useState<boolean>(false);

  return (
    <div>
      <div className="container mx-auto px-4">
        <div className="h-10"></div>
        <h1 className="font-extrabold text-transparent text-4xl bg-clip-text bg-gradient-to-r from-red-400 to-red-900">
          Welcome to Dashboard
        </h1>
        <h1 className="text-md text-gray-400 mb-2">Manage your all NFT</h1>
        <hr></hr>
        <div className="h-8"></div>
        <Stat refresh={refresh} />
        <div className="h-8"></div>
        <div className="grid  lg:grid-cols-3 grid-cols-1 gap-5">
          <Minting setRefresh={setRefresh} />
          <Nft refresh={refresh} setRefresh={setRefresh} />
        </div>
        <div className="h-8"></div>
      </div>
    </div>
  );
}

export default Dashboard;
