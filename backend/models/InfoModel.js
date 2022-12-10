const mongoose = require("mongoose");

const infoSchema = mongoose.Schema(
  {
    user: {
      type: mongoose.Schema.Types.ObjectId,
      required: true,
      ref: "User",
    },
    name: {
      type: String,
      required: [true, "Please add a name value"],
    },
    email: {
      type: String,
      required: [true, "Please add an email"],
    },
    phone: {
      type: String,
      required: [true, "Please add a phone  nnumber"],
    },
    address: {
      type: String,
      required: [true, "Please add an address"],
    },
    bank: {
      type: String,
      required: [true, "Please add a bank name"],
    },
    account: {
      type: String,
      required: [true, "Please add an account number"],
    },
    acc_name: {
      type: String,
      required: [true, "Please add a name value"],
    },
  },
  {
    timestamps: true,
  }
);

module.exports = mongoose.model("Info", infoSchema);
