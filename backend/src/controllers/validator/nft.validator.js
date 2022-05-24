const { body } = require("express-validator");

module.exports = {
  sendNftValidationRules: [
    body("nftId").notEmpty(),
    body("username").isEmail(),
  ],
};
