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

    // create wallet
    const blockchainResponse = await blockchainServices.createWallet();

    const result = await userServices.create({
      username: req.body.username,
      password: pass,
      wallet: blockchainResponse,
    });

    delete result.password;
    return res.json(result);
  },
  login: async (req, res) => {
    let user = await studentServices.findByUsername(req.body.username);

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
    delete result.password;

    return res.json({
      account: user,
      token: {
        accessToken: accessToken,
        tokenType: "bearer",
        expiresIn: 3600,
      },
    });
  },
  userTransactions: async (req, res) => {
    const { skip = 0, limit = 15 } = req.query;
    const result = await transactionServices.findUserTransactions(req.user, {
      skip: +skip,
      limit: +limit,
    });
    return res.json(result);
  },
  userNft: async (req, res) => {
    const userInfo = await userServices.findById(req.user);
    const result = await nftServices.findByOwner(userInfo.wallet);
    return res.json(result);
  },
};
