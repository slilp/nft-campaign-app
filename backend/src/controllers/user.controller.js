const {
  userServices,
  blockchainServices,
  transactionServices,
  nftServices,
} = require("../services");
const { bcryptPassword, tokenGenerator } = require("../utils");

module.exports = {
  register: async (req, res) => {
    const user = await userServices.findByUsername(req.body.username);
    if (user)
      return res.status(401).json({
        message: "existing username",
      });

    const pass = await bcryptPassword.hashPassword(req.body.password);

    const result = await userServices.create({
      username: req.body.username,
      password: pass,
    });

    const address = await blockchainServices.createWallet(result?.derivationId);

    const updateResult = await userServices.update(result?._id, {
      wallet: address,
    });

    return res.json({
      username: updateResult?.username,
      wallet: address,
    });
  },
  login: async (req, res) => {
    let user = await userServices.findByUsername(req.body.username);

    if (!user)
      return res.status(401).json({
        message: "invalid username or password",
      });

    const isCorrectPassword = await bcryptPassword.verifyPassword(
      req.body.password,
      user.password
    );

    if (!isCorrectPassword)
      return res.status(400).json({
        message: "invalid username or password",
      });

    const accessToken = tokenGenerator.accessTokenGenerator(user._id);
    const { _id, username, wallet } = user;

    return res.json({
      account: { id: _id, username, wallet },
      token: {
        accessToken: accessToken,
        tokenType: "bearer",
        expiresIn: 3600,
      },
    });
  },
  userInfo: async (req, res) => {
    const result = await userServices.findById(req.user);
    return res.json(result);
  },
  userTransactions: async (req, res) => {
    const { skip = 0, limit = 15 } = req.query;
    const result = await Promise.all([
      transactionServices.findUserTransactions(req.user, {
        skip: +skip,
        limit: +limit,
      }),
      transactionServices.countUserTransaction(req.user),
    ]);
    return res.json({ transactions: result[0], totalCount: result[1] });
  },
  userNft: async (req, res) => {
    const userInfo = await userServices.findById(req.user);
    const { skip = 0, limit = 15 } = req.query;
    const result = await Promise.all([
      nftServices.findByFilter(userInfo.wallet, {
        skip: +skip,
        limit: +limit,
      }),
      nftServices.countFindByFilter(userInfo.wallet),
    ]);

    return res.json({ nfts: result[0], totalCount: result[1] });
  },
};
