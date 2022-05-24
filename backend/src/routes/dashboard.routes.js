const express = require("express");
const router = express.Router();
const { dashboardControllers } = require("../controllers");
const { apiKeyAuthentication } = require("../middlewares/auth");
const { asyncHandler } = require("../utils");

router.get(
  "/stat",
  [apiKeyAuthentication],
  asyncHandler(dashboardControllers.stat)
);

module.exports = router;
