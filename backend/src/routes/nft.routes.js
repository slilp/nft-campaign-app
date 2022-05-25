const express = require("express");
const router = express.Router();
const { nftControllers } = require("../controllers");
const { apiKeyAuthentication } = require("../middlewares/auth");
const { nftValidators } = require("../controllers/validator");
const validate = require("../middlewares/validator");
const upload = require("../middlewares/upload");
const { asyncHandler } = require("../utils");

router.post(
  "/mint",
  [apiKeyAuthentication],
  upload.single("image"),
  asyncHandler(nftControllers.mintNft)
);

router.put(
  "/send-nft",
  [apiKeyAuthentication],
  nftValidators.sendNftValidationRules,
  validate,
  asyncHandler(nftControllers.adminSendNft)
);

router.get(
  "/search-owner",
  [apiKeyAuthentication],
  asyncHandler(nftControllers.searchByOwner)
);

module.exports = router;
