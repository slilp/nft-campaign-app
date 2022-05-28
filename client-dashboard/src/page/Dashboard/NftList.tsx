import React, { useEffect, useState, useRef } from "react";
import { IModal } from "./Nft";
import { INftModelResponse } from "../../api/types/NFTType";
import { IQuerySelection } from "./Nft";
import useNft from "../../hooks/useNft";

interface NftListProps {
  setShowModal: React.Dispatch<React.SetStateAction<IModal>>;
  refresh: boolean;
  setSearch: React.Dispatch<React.SetStateAction<IQuerySelection>>;
  search: IQuerySelection;
}

function NftList({ refresh, setShowModal, search, setSearch }: NftListProps) {
  const [data, setData] = useState<INftModelResponse[]>([]);
  const { nftList } = useNft({
    refresh,
    owner: !search.typeWallet
      ? "0xbf67533f4d1dc11e9b655ae96af81146f2ba0136"
      : search.selectedWallet || "-",
    skip: search.page,
  });

  useEffect(() => {
    if (search.page === 0) {
      setData(nftList.nfts);
    } else {
      setData((prev) => [...prev, ...nftList.nfts]);
    }
  }, [nftList]);

  const transformShortAddress = (adr: string) =>
    adr.substring(0, 6) + "..." + adr.substring(adr.length - 6, adr.length);

  return (
    <>
      <div className="grid lg:grid-cols-4 md:grid-cols-2 grid-cols-1  gap-5 mt-5">
        {data.map((item) => (
          <div className="p-3 bg-gray-100 rounded-lg mx-auto">
            <h1 className="my-2 text-center">
              <span className="font-semibold">ID : {item.nftId} </span>
            </h1>
            <img
              alt="new-nft"
              src={`https://gateway.pinata.cloud/ipfs/${item.urlImage}`}
              className="rounded-lg h-60 w-60"
            ></img>
            <h1 className="my-2">
              <span className="font-semibold">Owner </span> :{" "}
              {transformShortAddress(item.owner)}
            </h1>
            <div className="text-center">
              <button
                className="px-2 py-1 border border-red-500 rounded hover:opacity-80"
                onClick={() =>
                  setShowModal((prev) => ({
                    nftId: item.nftId,
                    urlImage: item.urlImage,
                    open: true,
                  }))
                }
              >
                Transfer
              </button>
            </div>
          </div>
        ))}
      </div>
      {data.length < nftList.totalCount && (
        <div className="text-center">
          <button
            className="px-2 py-1 my-5 border border-red-500 rounded hover:opacity-80 "
            onClick={() =>
              setSearch((prev) => ({ ...prev, page: prev.page + 1 }))
            }
          >
            Load more
          </button>
        </div>
      )}
    </>
  );
}

export default NftList;
