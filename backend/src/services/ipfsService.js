const axios = require("axios");
const FormData = require("form-data");
const pinataSDK = require("@pinata/sdk");
const { Readable } = require("stream");
const pinata = pinataSDK(
  process.env.PINATA_API_KEY,
  process.env.PINATA_SECRET_API_KEY
);

module.exports = async (id, upload) => {
  const options = {
    pinataMetadata: {
      name: "test",
      keyvalues: {
        customKey: "customValue",
        customKey2: "customValue2",
      },
    },
    pinataOptions: {
      cidVersion: 0,
    },
  };
  const stream = Readable.from(upload.toString());
  stream.path = "test.png";
  try {
    const response = await pinata.pinFileToIPFS(stream, options);
    console.log(JSON.stringify(response));
    return response;
  } catch (error) {
    console.log(JSON.stringify(error));
    throw error;
  }
};
