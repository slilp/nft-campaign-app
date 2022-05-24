const {
  blockchainServices,
  nftServices,
  transactionServices,
} = require("../services");

module.exports = {
  mintNft: async (req, res) => {
    // mint nft
    const nftInfo = await blockchainServices.mint();

    const createResult = await nftServices.create({
      owner: "CONTANT_MAIN_WALLET",
      nftId: nftInfo?.id,
      urlImage: "npfs",
    });

    return res.json(createResult);
  },
  sendNft: async (req, res) => {
    // send nft
    const nftInfo = await nftServices.findById(req.body.nftId);
    if (!nftInfo)
      return res.status(400).json({
        message: "invalid nft id",
      });

    const blockchainResult = await blockchainServices.transfer();

    const createResult = await transactionServices.create({
      to: req.body.to,
      from: req.user,
      nft: req.body.nftId,
    });

    const updateOwner = await nftServices.update(req.body.nftId, {
      owner: req.body.to,
    });

    return res.json(createResult);
  },
  adminSendNft: async (req, res) => {
    // send nft
    const nftInfo = await nftServices.findById(req.body.nftId);
    if (!nftInfo)
      return res.status(400).json({
        message: "invalid nft id",
      });

    const blockchainResult = await blockchainServices.transfer();

    const createResult = await transactionServices.create({
      to: req.body.to,
      from: "ADMIN_ACCOUNT",
      nft: req.body.nftId,
    });

    const updateOwner = await nftServices.update(req.body.nftId, {
      owner: req.body.to,
    });

    return res.json(createResult);
  },
  searchByOwner: async (req, res) => {
    const { skip = 0, limit = 15, search } = req.query;
    const totalCount = await nftServices.countFindByFilter({
      ownerFilter: search,
    });
    if (totalCount === 0)
      return res.status(404).json({ message: "NOT FOUND DATA" });

    const result = await nftServices.findByFilter(
      {
        ownerFilter: search,
      },
      {
        skip: +skip,
        limit: +limit,
      }
    );
    return res.json({ result, totalCount });
  },
};
