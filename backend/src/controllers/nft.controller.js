const {
  blockchainServices,
  nftServices,
  transactionServices,
  userServices,
  ipfsServices,
} = require("../services");

module.exports = {
  mintNft: async (req, res) => {
    if (!req.file) {
      res.status(401).json({ error: "NOT FOUND IMAGE UPLOAD" });
    }
    const upload = await ipfsServices("test", req.file.buffer);

    const nftInfo = await blockchainServices.mint();

    const createResult = await nftServices.create({
      owner: "0x20d446C0FeD64779A0b93B5664C4F2E9d50D23D3",
      nftId: 1,
      urlImage: "npfs",
    });

    return res.json(createResult);
  },
  sendNft: async (req, res) => {
    // send nft
    const userInfo = await userServices.findById(req.user);
    const nftInfo = await nftServices.findByOwnerAndId(
      userInfo.wallet,
      req.body.nftId
    );
    if (!nftInfo)
      return res.status(400).json({
        message: "invalid nft id",
      });

    const blockchainResult = await blockchainServices.transfer();

    const createTransaction = await transactionServices.create({
      hash: "myhash",
      to: req.body.to,
      from: req.user,
      nft: nftInfo._id,
    });

    const updateOwner = await nftServices.update(nftInfo._id, {
      owner: req.body.to,
    });

    return res.json({
      hash: createTransaction.hash,
      nft: updateOwner,
    });
  },
  adminSendNft: async (req, res) => {
    const userInfo = await userServices.findById("628e31d98485e55a85b5a16a");
    const nftInfo = await nftServices.findByOwnerAndId(
      userInfo.wallet,
      req.body.nftId
    );
    if (!nftInfo)
      return res.status(400).json({
        message: "invalid nft id",
      });

    const blockchainResult = await blockchainServices.transfer();

    const createTransaction = await transactionServices.create({
      hash: "myhash",
      to: req.body.to,
      from: req.user,
      nft: nftInfo._id,
    });

    const updateOwner = await nftServices.update(nftInfo._id, {
      owner: req.body.to,
    });

    return res.json({
      hash: createTransaction.hash,
      nft: updateOwner,
    });
  },
  searchByOwner: async (req, res) => {
    const { skip = 0, limit = 15, search } = req.query;
    const result = await Promise.all([
      nftServices.countFindByFilter(search),
      nftServices.findByFilter(search, {
        skip: +skip,
        limit: +limit,
      }),
    ]);

    return res.json({ nfts: result[1], totalCount: result[0] });
  },
};
