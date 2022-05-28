import { FaWallet, FaUserAlt, FaCubes } from "react-icons/fa";
import useDashboard from "../../hooks/useDashboard";
import useWallet from "../../hooks/useWallet";

interface StatProps {
  refresh: boolean;
}

function Stat({ refresh }: StatProps) {
  const { stat } = useDashboard({ refresh });
  const { balance } = useWallet({
    refresh,
    wallet: "0xbf67533f4d1dc11e9b655ae96af81146f2ba0136",
  });

  const transformAddress = (adr: string) =>
    adr.substring(0, 12) + "..." + adr.substring(adr.length - 12, adr.length);

  const transformShortAddress = (adr: string) =>
    adr.substring(0, 6) + "..." + adr.substring(adr.length - 6, adr.length);

  return (
    <div className="grid lg:grid-cols-4 grid-cols-1 gap-4">
      <div className="flex min-h-48 bg-red-400 rounded-lg md:col-span-1 p-3 text-white gap-10 w-full md:w-1/2 lg:w-full">
        <div className="flex items-center">
          <h1 className="text-5xl mx-auto">
            <FaWallet></FaWallet>
          </h1>
        </div>
        <div className="flex flex-col justify-center flex-wrap">
          <h1 className="text-white text-lg">Root wallet</h1>
          <h1 className="text-white text-md">
            {transformAddress("0xbf67533f4d1dc11e9b655ae96af81146f2ba0136")}
          </h1>
          <hr className="my-2"></hr>
          <h1 className="text-white text-md">Balance :</h1>
          <h1 className="text-white text-3xl ">{balance.toFixed(4)} BNB</h1>
          <br></br>
          <button
            onClick={() =>
              window.open(
                "https://bscscan.com/address/0xbf67533f4d1dc11e9b655ae96af81146f2ba0136",
                "_blank"
              )
            }
            className="bg-red-500 hover:bg-red-700 text-white font-bold py-2 px-4 rounded-lg transition-all"
          >
            GO TO EXPLORER
          </button>
        </div>
      </div>
      <div className="bg-gray-100 rounded-lg md:col-span-3 grid md:grid-cols-3 grid-cols-1">
        <div className="flex-1 md:border-r-2 my-5 border-gray-300 text-center">
          <div className="text-white h-10 w-10 rounded-full bg-yellow-300 flex items-center justify-center mx-auto">
            <h1 className="text-xl">
              <FaUserAlt></FaUserAlt>
            </h1>
          </div>
          <br></br>
          <h1 className="text-lg">Total user</h1>
          <br></br>
          <h1 className="text-3xl font-semibold">{stat?.totalUser}</h1>
        </div>
        <div className="flex-1 md:border-r-2 my-5  border-gray-300 text-center">
          <div className="text-white h-10 w-10 rounded-full bg-blue-300 flex items-center justify-center mx-auto">
            <h1 className="text-xl">
              <FaCubes></FaCubes>
            </h1>
          </div>
          <br></br>
          <h1 className="text-lg">Total NFT</h1>
          <br></br>
          <h1 className="text-3xl font-semibold">{stat?.totalNft}</h1>
        </div>
        <div className="flex-1 text-center my-5">
          <div className="text-white h-10 w-10 rounded-full bg-yellow-500 flex items-center justify-center mx-auto">
            <h1>
              <FaUserAlt></FaUserAlt>
            </h1>
          </div>
          <br></br>
          <h1 className="text-lg">Total user</h1>
          <br></br>
          <h1 className="text-3xl font-semibold">30</h1>
        </div>
      </div>
    </div>
  );
}

export default Stat;
