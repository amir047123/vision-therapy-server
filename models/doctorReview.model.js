const mongoose = require("mongoose");

const doctorReviewSchema = mongoose.Schema(
  {
    sectionName: { type: String, default: "Doctor Review" },
    doctorName: { type: String },
    doctorImg: { type: String },
    specialist: { type: String },
    doctorReview: { type: String },
  },
  { timestamps: true }
);

const DoctorReview = mongoose.model("DoctorReview", doctorReviewSchema);
module.exports = DoctorReview;
