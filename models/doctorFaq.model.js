const mongoose = require("mongoose");

const doctorFaqSchema = mongoose.Schema(
  {
    sectionName: { type: String, default: "DoctorFaq Section" },
    question: { type: String },
    answer: { type: String },
  },

  { timestamps: true }
);

const DoctorFaq = mongoose.model("DoctorFaq", doctorFaqSchema);
module.exports = DoctorFaq;
