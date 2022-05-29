import React, { useState, useRef } from "react";
import { FaCube, FaTimesCircle, FaRocket } from "react-icons/fa";
import Loading from "../../components/Loading";
import useTransactionNft from "../../hooks/useTransactionNft";

interface MintingProps {
  setRefresh: React.Dispatch<React.SetStateAction<boolean>>;
}

function Minting({ setRefresh }: MintingProps) {
  const { mintNft, loading } = useTransactionNft();
  const uploadImgRef = useRef<any>(null);
  const [images, setImages] = useState<string>("");
  const [fileImage, setFileImage] = useState<File>();

  const handleChange = (e: any) => {
    if (e.target.files.length) {
      setImages(URL.createObjectURL(e.target.files[0]));
      setFileImage(e.target.files[0]);
    }
  };

  const handleDelete = () => {
    setImages("");
    setFileImage(undefined);
  };

  const onClickMint = async () => {
    await mintNft(fileImage);
    setRefresh((prev) => !prev);
    handleDelete();
  };

  return (
    <div>
      <div className="flex gap-4 items-center text-2xl mb-4 col-span-2">
        <h1>
          <FaCube></FaCube>
        </h1>
        <h1>
          Minting <span className="text-sm">(jpg,png,svg,jpeg)</span>
        </h1>
      </div>
      <br></br>
      {images !== "" ? (
        <div className="col-span-1">
          <div style={{ minHeight: "18rem" }} className="w-72 mx-auto lg:mx-0">
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
            <button
              onClick={onClickMint}
              className="px-4 py-2 text-white bg-green-500 rounded hover:opacity-80 w-60"
            >
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
      {loading && <Loading />}
    </div>
  );
}

export default Minting;
