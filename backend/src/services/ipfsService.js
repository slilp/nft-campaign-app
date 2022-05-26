const pinataSDK = require("@pinata/sdk");
const { Duplex } = require("stream");
const { v4: uuidv4 } = require("uuid");
const pinata = pinataSDK(
  process.env.PINATA_API_KEY,
  process.env.PINATA_SECRET_API_KEY
);

function bufferToStream(buffer) {
  let tmp = new Duplex();
  tmp.push(buffer);
  tmp.push(null);
  return tmp;
}

module.exports = async (upload) => {
  const uuid = uuidv4();
  const options = {
    pinataMetadata: {
      name: `nft-${uuid}`,
    },
    pinataOptions: {
      cidVersion: 0,
    },
  };
  const stream = bufferToStream(upload);
  stream.path = `nft-${uuid}`;
  return await pinata.pinFileToIPFS(stream, options);
};
