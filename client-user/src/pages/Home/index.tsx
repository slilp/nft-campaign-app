import { useState, useEffect } from "react";
import { INftModel } from "../../api/types/NFTType";
import Navbar from "../../components/Layout/Navbar";
import useNft from "../../hooks/useNft";
import TransferModal from "./TransferModal";
import Loading from "../../components/Loading";
import useNftSendContract from "../../hooks/useNftSendContract";
import { FaCubes } from "react-icons/fa";
export interface IModal {
  open: boolean;
  nftId?: number;
  urlImage?: string;
}

function Home() {
  const [page, setPage] = useState<number>(0);
  const [refresh, setRefresh] = useState<boolean>(false);
  const { loading, transferNft } = useNftSendContract();
  const [data, setData] = useState<INftModel[]>([]);
  const [showModal, setShowModal] = useState<IModal>({
    open: false,
  });
  const { nftList } = useNft({ refresh, skip: page });

  useEffect(() => {
    if (page === 0) {
      setData(nftList.nfts);
    } else {
      setData((prev) => [...prev, ...nftList.nfts]);
    }
  }, [nftList]);

  const transfer = async (nftId: number, wallet: string) => {
    await transferNft(nftId, wallet);
    setShowModal((prev) => ({ ...prev, open: false }));
    setPage(0);
    setRefresh((prev) => !prev);
  };

  return (
    <div className="container mx-auto ">
      <Navbar></Navbar>
      <div className="p-4">
        <h1 className="text-3xl font-bold">My NFTs</h1>
        <hr className="my-5"></hr>
        <div className="grid lg:grid-cols-4 md:grid-cols-2 grid-cols-1  gap-5 mt-5">
          {data.map((item) => (
            <div
              key={`nft-id-${item.nftId}`}
              className="p-3 bg-gray-100 rounded-lg mx-auto"
            >
              <h1 className="my-2 text-center">
                <span className="font-semibold">ID : {item.nftId} </span>
              </h1>
              <img
                onClick={() =>
                  window.open(
                    `https://gateway.pinata.cloud/ipfs/${item.urlImage}`,
                    "_blank"
                  )
                }
                alt="new-nft"
                src={`https://gateway.pinata.cloud/ipfs/${item.urlImage}`}
                className="rounded-lg h-60 w-60 cursor-pointer"
              ></img>
              <div className="text-center mt-2">
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
        {data.length === 0 && (
          <div className="text-3xl h-72 justify-center flex flex-col items-center gap-5 text-gray-400 font-semibold">
            <h1 className="text-7xl">
              <FaCubes></FaCubes>
            </h1>
            <h1>NO NFTs</h1>
          </div>
        )}
        {data.length < nftList.totalCount && (
          <div className="text-center">
            <button
              className="px-2 py-1 my-5 border border-red-500 rounded hover:opacity-80 "
              onClick={() => setPage((prev) => prev + 1)}
            >
              Load more
            </button>
          </div>
        )}
        {showModal.open ? (
          <TransferModal
            transfer={transfer}
            setShowModal={setShowModal}
            image={showModal.urlImage || ""}
            nftId={showModal.nftId || 0}
          />
        ) : null}
        {loading && <Loading />}
      </div>
    </div>
  );
}

export default Home;
