const mongoose = require("mongoose");
const { Schema } = mongoose;

const schema = new Schema(
  {
    nftId: Number,
    owner: String,
    urlImage: String,
  },
  {
    timestamps: false,
  }
);

module.exports = mongoose.model("nft", schema);
