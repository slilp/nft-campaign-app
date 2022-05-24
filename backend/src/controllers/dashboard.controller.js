const {
  userServices,
  nftServices,
  transactionServices,
} = require("../services");

module.exports = {
  stat: async (req, res) => {
    const totalUser = await userServices.countAll();
    const totalNft = await nftServices.countAll();
    return res.json({ totalUser, totalNft });
  },
};
