const express = require("express");
const router = express.Router();
const userRoute = require("./user.routes");
const nftRoute = require("./nft.routes");
const dashboardRoute = require("./dashboard.routes");

router.use("/user", userRoute);
router.use("/nft", nftRoute);
router.use("/dashboard", dashboardRoute);

module.exports = router;
