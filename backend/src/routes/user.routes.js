const express = require("express");
const router = express.Router();
const { userControllers, nftControllers } = require("../controllers");
const { userValidators } = require("../controllers/validator");
const validate = require("../middlewares/validator");
const { jwtAuthentication } = require("../middlewares/auth");
const { asyncHandler } = require("../utils");

router.post(
  "/register",
  userValidators.registerValidationRules,
  validate,
  asyncHandler(userControllers.register)
);

router.post(
  "/login",
  userValidators.loginValidationRules,
  validate,
  asyncHandler(userControllers.login)
);

router.put(
  "/send-nft",
  userValidators.sendNftValidationRules,
  validate,
  [jwtAuthentication],
  asyncHandler(nftControllers.sendNft)
);

router.get(
  "/transaction",
  [jwtAuthentication],
  validate,
  asyncHandler(userControllers.userTransactions)
);

router.get(
  "/nft",
  [jwtAuthentication],
  validate,
  asyncHandler(userControllers.userNft)
);

router.get(
  "",
  [jwtAuthentication],
  validate,
  asyncHandler(userControllers.userInfo)
);

module.exports = router;
