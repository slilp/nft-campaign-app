const mongoose = require("mongoose");
const { Schema } = mongoose;

const schema = new Schema(
  {
    username: { type: String, unique: true },
    password: String,
    wallet: String,
    transactions: [{ type: mongoose.Types.ObjectId, ref: "transaction" }],
  },
  {
    timestamps: false,
  }
);

module.exports = mongoose.model("user", schema);
