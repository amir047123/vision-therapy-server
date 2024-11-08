const mongoose = require("mongoose");

const packageSchema = mongoose.Schema(
  {
    userName: { type: String },
    userId: { type: String },
    userEmail: { type: String },

    referralName: { type: String },
    referralId: { type: String },
    referralEmail: { type: String },

    packageName: { type: String },
    paymentType: { type: String },
    packagePrice: { type: Number },
    anaglyphPrice: { type: Number },
    totalPrice: { type: Number },

    totalDay: { type: Number },
    Anaglyph: { type: String },
    address: { type: Object },
    issueDate: { type: String },
    expireDate: { type: String },

    paidStatus: { type: Boolean },
    tran_id: { type: String },
    

  },
  { timestamps: true }
);

const Package = mongoose.model("Package", packageSchema);
module.exports = Package;
