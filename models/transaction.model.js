const mongoose = require("mongoose");

const transactionSchema = mongoose.Schema(
  {
    doctorData: { type: Object },
    package: { type: Object },
    doctorId: { type: String },
    doctorId: { type: String },
    amount: { type: String },
    shippingAddress: { type: Object },
    transactionId: { type: String },
  },
  { timestamps: true }
);

const Transaction = mongoose.model("Transaction", transactionSchema);
module.exports = Transaction;
