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
    const adminInfo = await userServices.findOne({ derivationId: 0 });
    const upload = await ipfsServices(req.file.buffer);

    const mintResult = await blockchainServices.mint(
      0,
      process.env.IPFS_PATH + `/${upload?.IpfsHash}`
    );

    const createResult = await nftServices.create({
      owner: adminInfo.wallet,
      nftId: mintResult?.id,
      urlImage: upload?.IpfsHash,
    });

    return res.json(createResult);
  },
  sendNft: async (req, res) => {
    const userInfo = await userServices.findById(req.user);
    const nftInfo = await nftServices.findByOwnerAndId(
      userInfo.wallet,
      req.body.nftId
    );
    if (!nftInfo)
      return res.status(400).json({
        message: "invalid nft id",
      });

    const sendResult = await blockchainServices.transfer(
      userInfo.derivationId,
      userInfo.wallet,
      req.body.nftId,
      req.body.to
    );

    const createTransaction = await transactionServices.create({
      hash: sendResult?.transactionHash,
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
    const adminInfo = await userServices.findOne({ derivationId: 0 });
    const nftInfo = await nftServices.findByOwnerAndId(
      adminInfo.wallet,
      req.body.nftId
    );
    if (!nftInfo)
      return res.status(400).json({
        message: "invalid nft id",
      });

    const sendResult = await blockchainServices.transfer(
      adminInfo.derivationId,
      adminInfo.wallet,
      req.body.nftId,
      req.body.to
    );

    const createTransaction = await transactionServices.create({
      hash: sendResult?.transactionHash,
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
