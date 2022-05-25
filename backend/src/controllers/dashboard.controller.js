const {
  userServices,
  nftServices,
  transactionServices,
} = require("../services");

module.exports = {
  stat: async (req, res) => {
    const result = await Promise.all([
      userServices.countAll(),
      nftServices.countAll(),
    ]);
    return res.json({ totalUser: result[0], totalNft: result[1] });
  },
};
