import { useState } from "react";
import { FaTimesCircle } from "react-icons/fa";
import { IModal } from "./index";

interface TransferModalProps {
  setShowModal: React.Dispatch<React.SetStateAction<IModal>>;
  transfer: any;
  image: string;
  nftId: number;
}

function TransferModal({
  setShowModal,
  transfer,
  image,
  nftId,
}: TransferModalProps) {
  const [wallet, setWallet] = useState<string>("");

  return (
    <div
      className="h-screen  top-0 bottom-0 right-0 left-0 fixed z-50 "
      style={{ background: "#00000017" }}
    >
      <div className="justify-center items-center flex overflow-x-hidden overflow-y-auto fixed inset-0 z-50 mx-2">
        <div className="w-auto my-6 mx-auto">
          <div className="border-0 rounded-lg shadow-lg  flex flex-col w-full bg-white outline-none focus:outline-none p-2">
            <div className="flex items-start justify-between p-5 border-b border-slate-200 gap-5">
              <h3 className="text-xl font-semibold">
                Do you want to transfer this NFT ?
              </h3>
              <button
                className=" text-red-500 text-2xl"
                onClick={() =>
                  setShowModal((prev) => ({ ...prev, open: false }))
                }
              >
                <FaTimesCircle></FaTimesCircle>
              </button>
            </div>
            <div className="mx-auto">
              <h1 className="my-2 text-center">
                <span className="font-semibold">ID : {nftId} </span>
              </h1>
              <img
                alt="new-nft"
                src={`https://gateway.pinata.cloud/ipfs/${image}`}
                className="rounded-lg h-60 w-60"
              ></img>
            </div>

            <br></br>
            <input
              type="text"
              className="form-control px-3 py-1.5 w-full text-base font-normal text-gray-700 bg-white bg-clip-padding border border-solid border-gray-300 rounded transition ease-in-out m-0 focus:text-gray-700 focus:bg-white focus:border-gray-600 focus:outline-none"
              placeholder="transfer to address"
              onChange={(e) => setWallet(e.target.value.trim())}
            />
            <div className="text-center border-t border-slate-200">
              <button
                disabled={wallet.length < 42}
                className="px-2 py-1 my-3 border border-green-500 rounded hover:bg-green-500 hover:text-white transition"
                onClick={async () => {
                  setWallet("");
                  setShowModal((prev) => ({ ...prev, open: false }));
                  await transfer(nftId, wallet);
                }}
              >
                Confirm Transfer
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default TransferModal;
