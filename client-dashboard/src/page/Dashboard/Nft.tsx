import React, { useEffect, useState } from "react";
import { FaCube } from "react-icons/fa";

import TransferModal from "./TransferModal";
import NftList from "./NftList";

interface NftProps {
  refresh: boolean;
}

export interface IModal {
  open: boolean;
  nftId?: number;
  urlImage?: string;
}

export interface IQuerySelection {
  typeWallet: boolean;
  selectedWallet?: string;
  page: number;
}

function Nft({ refresh }: NftProps) {
  const [search, setSearch] = useState<IQuerySelection>({
    typeWallet: false,
    selectedWallet: "-",
    page: 0,
  });
  const [searchText, setSearchText] = useState<string>("");
  const [showModal, setShowModal] = useState<IModal>({
    open: false,
  });

  useEffect(() => {
    setSearch({
      typeWallet: false,
      selectedWallet: "-",
      page: 0,
    });
    setSearchText("");
  }, [refresh]);

  return (
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
            !search.typeWallet
              ? "px-4 py-2 text-white bg-red-500 rounded hover:opacity-80 w-48"
              : "px-4 py-2  border-2 border-red-500 rounded hover:opacity-80 w-48"
          }
          onClick={() => {
            setSearchText("");
            setSearch({
              typeWallet: false,
              selectedWallet: "-",
              page: 0,
            });
          }}
        >
          Root wallet
        </button>
        <button
          onClick={() => {
            setSearch({
              typeWallet: true,
              selectedWallet: "-",
              page: 0,
            });
            setSearchText("");
          }}
          className={
            search.typeWallet
              ? "px-4 py-2 text-white bg-red-500 rounded hover:opacity-80 w-48"
              : "px-4 py-2  border-2 border-red-500 rounded hover:opacity-80 w-48"
          }
        >
          User wallet
        </button>
      </div>
      {search.typeWallet && (
        <div className="input-group relative flex  my-3 md:w-3/4 ">
          <input
            type="search"
            className="form-control relative flex-auto min-w-0 block px-3 py-1.5 text-base font-normal text-gray-700 bg-white bg-clip-padding border border-solid border-gray-300 rounded transition ease-in-out m-0 focus:text-gray-700 focus:bg-white focus:border-gray-600 focus:outline-none"
            placeholder="search wallet address"
            value={searchText}
            onChange={(e) => setSearchText(e.target.value.trim())}
          />
          <button
            className="btn inline-block  px-6 py-2.5 bg-red-500 text-white font-medium text-xs leading-tight uppercase rounded shadow-md hover:bg-red-700 hover:shadow-lg transition duration-150 ease-in-out items-center"
            type="button"
            onClick={() =>
              setSearch((prev) => ({
                ...prev,
                selectedWallet: searchText,
                page: 0,
              }))
            }
          >
            <svg
              aria-hidden="true"
              focusable="false"
              data-prefix="fas"
              data-icon="search"
              className="w-4"
              role="img"
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

      <NftList
        refresh
        setShowModal={setShowModal}
        setSearch={setSearch}
        search={search}
      />
      {showModal.open ? (
        <TransferModal
          setShowModal={setShowModal}
          image={showModal.urlImage || ""}
          nftId={showModal.nftId || 0}
        />
      ) : null}
    </div>
  );
}

export default Nft;
