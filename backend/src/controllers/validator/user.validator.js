const { body } = require("express-validator");

module.exports = {
  registerValidationRules: [
    body("username").isEmail(),
    body("password").notEmpty(),
  ],
  loginValidationRules: [
    body("username").isEmail(),
    body("password").notEmpty(),
  ],
  sendNftValidationRules: [body("nftId").isNumeric(), body("to").notEmpty()],
};
