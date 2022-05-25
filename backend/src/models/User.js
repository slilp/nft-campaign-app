const mongoose = require("mongoose");
const { Schema } = mongoose;
const AutoIncrement = require("mongoose-sequence")(mongoose);

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

schema.plugin(AutoIncrement, { inc_field: "derivationId" });

module.exports = mongoose.model("user", schema);
