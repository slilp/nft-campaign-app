const mongoose = require("mongoose");
const { Schema } = mongoose;

const schema = new Schema(
  {
    timestamp: { type: Date, default: Date.now },
    to: String,
    from: { type: mongoose.Types.ObjectId, ref: "user" },
    nft: { type: mongoose.Types.ObjectId, ref: "nft" },
  },
  {
    timestamps: false,
  }
);

module.exports = mongoose.model("transaction", schema);
