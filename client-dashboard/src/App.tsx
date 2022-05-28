import React, { useEffect, useState, useRef } from "react";
import "./App.css";
import {
  FaWallet,
  FaUserAlt,
  FaCubes,
  FaCube,
  FaUserFriends,
  FaExternalLinkAlt,
  FaTimesCircle,
  FaRocket,
} from "react-icons/fa";
import useDashboard from "./hooks/useDashboard";
import { IDashboardResponse } from "./api/types/DashboardType";
function App() {
  const [stat, setStat] = useState<IDashboardResponse>();
  const [typeWallet, setTypeWallet] = useState<boolean>(false);
  const { fetchStatData } = useDashboard();
  const uploadImgRef = useRef<any>(null);
  const [images, setImages] = useState<string>("");

  const initialData = async () => {
    const statResponse = await fetchStatData();
    setStat(statResponse);
  };
  useEffect(() => {
    initialData();
  }, []);

  const transformAddress = (adr: string) =>
    adr.substring(0, 12) + "..." + adr.substring(adr.length - 12, adr.length);

  const transformShortAddress = (adr: string) =>
    adr.substring(0, 6) + "..." + adr.substring(adr.length - 6, adr.length);

  const handleChange = (e: any) => {
    if (e.target.files.length) {
      setImages(URL.createObjectURL(e.target.files[0]));
    }
  };

  const handleDelete = () => {
    setImages("");
  };

  return (
    <div>
      <div className="container mx-auto px-4">
        {JSON.stringify(stat)}
        <div className="h-10"></div>
        <h1 className="font-extrabold text-transparent text-4xl bg-clip-text bg-gradient-to-r from-red-400 to-red-900">
          Welcome to Dashboard
        </h1>
        <h1 className="text-md text-gray-400 mb-2">Manage your all NFT</h1>
        <hr></hr>
        <div className="h-8"></div>
        <div className="grid lg:grid-cols-4 grid-cols-1 gap-4">
          <div className="flex min-h-48 bg-red-400 rounded-lg md:col-span-1 p-3 text-white gap-10 w-full md:w-1/2 lg:w-full">
            <div className="flex items-center">
              <h1 className="text-5xl mx-auto">
                <FaWallet></FaWallet>
              </h1>
            </div>
            <div className="flex flex-col justify-center">
              <h1 className="text-white text-lg">Root wallet</h1>
              <h1 className="text-white text-md">
                {transformAddress("0xbf67533f4d1dc11e9b655ae96af81146f2ba0136")}
              </h1>
              <hr className="my-2"></hr>
              <h1 className="text-white text-md">Balance :</h1>
              <h1 className="text-white text-3xl">1.35 BNB</h1>
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
              <h1 className="text-3xl font-semibold">30</h1>
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
              <h1 className="text-3xl font-semibold">30</h1>
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
        <div className="h-8"></div>
        <div className="grid  lg:grid-cols-3 grid-cols-1 gap-5">
          <div>
            <div className="flex gap-4 items-center text-2xl mb-4 col-span-2">
              <h1>
                <FaCube></FaCube>
              </h1>
              <h1>
                New NFT <span className="text-sm">(jpg,png,svg,jpeg)</span>
              </h1>
            </div>
            <br></br>
            {images !== "" ? (
              <div className="col-span-1">
                <div
                  style={{ minHeight: "18rem" }}
                  className="w-72 mx-auto lg:mx-0"
                >
                  <div className="relative w-72">
                    <img
                      alt="new-nft"
                      src={images}
                      className="h-72 w-72 rounded-lg"
                    ></img>
                    <div
                      onClick={handleDelete}
                      className="text-3xl cursor-pointer bg-red-500 rounded-full text-white absolute -top-1 -right-1"
                    >
                      <FaTimesCircle></FaTimesCircle>
                    </div>
                  </div>

                  <br></br>
                  <button className="px-4 py-2 text-white bg-green-500 rounded hover:opacity-80 w-60">
                    Mint
                  </button>
                </div>
              </div>
            ) : (
              <div>
                <div
                  onClick={() => uploadImgRef.current.click()}
                  className="h-72 w-72 border-4 border-dashed hover:bg-gray-100 hover:border-gray-300 cursor-pointer mx-auto lg:mx-0"
                >
                  <div className="flex flex-col items-center justify-center h-full">
                    <h1 className="text-3xl text-gray-400 group-hover:text-gray-600">
                      <FaRocket></FaRocket>
                    </h1>
                    <p className="pt-1 text-sm tracking-wider text-gray-400 group-hover:text-gray-600">
                      Select an image
                    </p>
                  </div>
                  <input
                    type="file"
                    accept="image/png, image/gif, image/jpeg"
                    ref={uploadImgRef}
                    style={{ display: "none" }}
                    onChange={handleChange}
                  />{" "}
                </div>
              </div>
            )}
          </div>
          <div className="col-span-2">
            <div className="flex gap-4 items-center text-2xl">
              <h1>
                <FaCube></FaCube>
              </h1>
              <h1>NFT</h1>
            </div>
            <br></br>
            <div className="flex gap-5">
              <button
                className={
                  !typeWallet
                    ? "px-4 py-2 text-white bg-red-500 rounded hover:opacity-80 w-48"
                    : "px-4 py-2  border-2 border-red-500 rounded hover:opacity-80 w-48"
                }
                onClick={() => setTypeWallet(false)}
              >
                Root wallet
              </button>
              <button
                onClick={() => setTypeWallet(true)}
                className={
                  typeWallet
                    ? "px-4 py-2 text-white bg-red-500 rounded hover:opacity-80 w-48"
                    : "px-4 py-2  border-2 border-red-500 rounded hover:opacity-80 w-48"
                }
              >
                User wallet
              </button>
            </div>
            {typeWallet && (
              <div className="input-group relative flex  my-3 md:w-3/4 ">
                <input
                  type="search"
                  className="form-control relative flex-auto min-w-0 block px-3 py-1.5 text-base font-normal text-gray-700 bg-white bg-clip-padding border border-solid border-gray-300 rounded transition ease-in-out m-0 focus:text-gray-700 focus:bg-white focus:border-gray-600 focus:outline-none"
                  placeholder="search wallet address"
                />
                <button
                  className="btn inline-block  px-6 py-2.5 bg-red-500 text-white font-medium text-xs leading-tight uppercase rounded shadow-md hover:bg-red-700 hover:shadow-lg transition duration-150 ease-in-out items-center"
                  type="button"
                >
                  <svg
                    aria-hidden="true"
                    focusable="false"
                    data-prefix="fas"
                    data-icon="search"
                    className="w-4"
                    role="img"
                    xmlns="http://www.w3.org/2000/svg"
                    viewBox="0 0 512 512"
                  >
                    <path
                      fill="currentColor"
                      d="M505 442.7L405.3 343c-4.5-4.5-10.6-7-17-7H372c27.6-35.3 44-79.7 44-128C416 93.1 322.9 0 208 0S0 93.1 0 208s93.1 208 208 208c48.3 0 92.7-16.4 128-44v16.3c0 6.4 2.5 12.5 7 17l99.7 99.7c9.4 9.4 24.6 9.4 33.9 0l28.3-28.3c9.4-9.4 9.4-24.6.1-34zM208 336c-70.7 0-128-57.2-128-128 0-70.7 57.2-128 128-128 70.7 0 128 57.2 128 128 0 70.7-57.2 128-128 128z"
                    />
                  </svg>
                </button>
              </div>
            )}

            <div className="grid lg:grid-cols-4 md:grid-cols-2 grid-cols-1  gap-5 mt-5">
              <div className="p-3 bg-gray-100 rounded-lg mx-auto">
                <img
                  alt="new-nft"
                  src={images}
                  className="rounded-lg h-60 w-60"
                ></img>
                <h1 className="my-2">
                  <span className="font-semibold">Owner </span> :{" "}
                  {transformShortAddress(
                    "0xbf67533f4d1dc11e9b655ae96af81146f2ba0136"
                  )}
                </h1>
                <div className="text-center">
                  <button className="px-2 py-1 border border-red-500 rounded hover:opacity-80">
                    Transfer
                  </button>
                </div>
              </div>
              <div className="p-3 bg-gray-100 rounded-lg mx-auto">
                <img
                  alt="new-nft"
                  src={images}
                  className="rounded-lg h-60 w-60"
                ></img>
                <h1 className="my-2">
                  <span className="font-semibold">Owner </span> :{" "}
                  {transformShortAddress(
                    "0xbf67533f4d1dc11e9b655ae96af81146f2ba0136"
                  )}
                </h1>
                <div className="text-center">
                  <button className="px-2 py-1 border border-red-500 rounded hover:opacity-80">
                    Transfer
                  </button>
                </div>
              </div>
              <div className="p-3 bg-gray-100 rounded-lg mx-auto">
                <img
                  alt="new-nft"
                  src={images}
                  className="rounded-lg h-60 w-60"
                ></img>
                <h1 className="my-2">
                  <span className="font-semibold">Owner </span> :{" "}
                  {transformShortAddress(
                    "0xbf67533f4d1dc11e9b655ae96af81146f2ba0136"
                  )}
                </h1>
                <div className="text-center">
                  <button className="px-2 py-1 border border-red-500 rounded hover:opacity-80">
                    Transfer
                  </button>
                </div>
              </div>
              <div className="p-3 bg-gray-100 rounded-lg mx-auto">
                <img
                  alt="new-nft"
                  src={images}
                  className="rounded-lg h-60 w-60"
                ></img>
                <h1 className="my-2">
                  <span className="font-semibold">Owner </span> :{" "}
                  {transformShortAddress(
                    "0xbf67533f4d1dc11e9b655ae96af81146f2ba0136"
                  )}
                </h1>
                <div className="text-center">
                  <button className="px-2 py-1 border border-red-500 rounded hover:opacity-80">
                    Transfer
                  </button>
                </div>
              </div>
            </div>
          </div>
        </div>
        <div className="h-8"></div>

        {/* <div className="grid  lg:grid-cols-2 grid-cols-1 gap-5">
          <div>
            <div className="flex gap-4 items-center text-2xl mb-4">
              <h1>
                <FaUserFriends></FaUserFriends>
              </h1>
              <h1>User Wallet</h1>
            </div>
            <div className="md:w-3/4">
              <div className="input-group relative flex  mb-4">
                <input
                  type="search"
                  className="form-control relative flex-auto min-w-0 block px-3 py-1.5 text-base font-normal text-gray-700 bg-white bg-clip-padding border border-solid border-gray-300 rounded transition ease-in-out m-0 focus:text-gray-700 focus:bg-white focus:border-gray-600 focus:outline-none"
                  placeholder="username"
                />
                <button
                  className="btn inline-block  px-6 py-2.5 bg-red-500 text-white font-medium text-xs leading-tight uppercase rounded shadow-md hover:bg-red-700 hover:shadow-lg transition duration-150 ease-in-out items-center"
                  type="button"
                >
                  <svg
                    aria-hidden="true"
                    focusable="false"
                    data-prefix="fas"
                    data-icon="search"
                    className="w-4"
                    role="img"
                    xmlns="http://www.w3.org/2000/svg"
                    viewBox="0 0 512 512"
                  >
                    <path
                      fill="currentColor"
                      d="M505 442.7L405.3 343c-4.5-4.5-10.6-7-17-7H372c27.6-35.3 44-79.7 44-128C416 93.1 322.9 0 208 0S0 93.1 0 208s93.1 208 208 208c48.3 0 92.7-16.4 128-44v16.3c0 6.4 2.5 12.5 7 17l99.7 99.7c9.4 9.4 24.6 9.4 33.9 0l28.3-28.3c9.4-9.4 9.4-24.6.1-34zM208 336c-70.7 0-128-57.2-128-128 0-70.7 57.2-128 128-128 70.7 0 128 57.2 128 128 0 70.7-57.2 128-128 128z"
                    />
                  </svg>
                </button>
              </div>
            </div>
            <div className=" overflow-x-auto">
              <table className="table-auto text-center">
                <thead>
                  <tr>
                    <th className="px-4">Username</th>
                    <th className="px-4">Wallet</th>
                    <th className="px-4">Balance</th>
                  </tr>
                </thead>
                <tbody>
                  {Array(10)
                    .fill(0)
                    .map(() => (
                      <tr>
                        <td className="px-4">slil.puangpoom@gmail.com</td>
                        <td className="px-4">
                          <div className="flex gap-2">
                            {transformShortAddress(
                              "0xbf67533f4d1dc11e9b655ae96af81146f2ba0136"
                            )}
                            <span className="text-sm cursor-pointer text-gray-500">
                              <FaExternalLinkAlt></FaExternalLinkAlt>
                            </span>
                          </div>
                        </td>
                        <td className="px-4">0.23</td>
                      </tr>
                    ))}
                </tbody>
              </table>
            </div>
            <br></br>
            <nav>
              <ul className="inline-flex -space-x-px">
                <li>
                  <a
                    href="#"
                    className="py-2 px-3 leading-tight hover:bg-gray-100 hover:text-gray-700 rounded-md"
                  >
                    1
                  </a>
                </li>
                <li>
                  <a
                    href="#"
                    className="py-2 px-3 leading-tight bg-white border border-gray-300 hover:bg-gray-100 hover:text-gray-700 rounded-md"
                  >
                    2
                  </a>
                </li>
                <li>
                  <a
                    href="#"
                    aria-current="page"
                    className="py-2 px-3 leading-tight hover:bg-gray-100 hover:text-gray-700 rounded-md"
                  >
                    3
                  </a>
                </li>
                <li>
                  <a
                    href="#"
                    className="py-2 px-3 leading-tight hover:bg-gray-100 hover:text-gray-700 rounded-md"
                  >
                    4
                  </a>
                </li>
                <li>
                  <a
                    href="#"
                    className="py-2 px-3 leading-tight hover:bg-gray-100 hover:text-gray-700 rounded-md"
                  >
                    5
                  </a>
                </li>
              </ul>
            </nav>
          </div>
        </div> */}
      </div>
    </div>
  );
}

export default App;
