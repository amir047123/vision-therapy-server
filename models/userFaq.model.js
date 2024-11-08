const mongoose = require("mongoose");

const userFaqSchema = mongoose.Schema(
  {
    sectionName: { type: String, default: "UserFaq Section" },
    question: { type: String },
    answer: { type: String },
  },

  { timestamps: true }
);

const UserFaq = mongoose.model("UserFaq", userFaqSchema);
module.exports = UserFaq;
