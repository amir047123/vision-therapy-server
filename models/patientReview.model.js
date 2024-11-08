const mongoose = require("mongoose");

const patientReviewSchema = mongoose.Schema(
  {
    sectionName: { type: String, default: "PatientReview Section" },
    videoUrl: { type: String },
    videoTitle: { type: String },
    patientReviewrsName: { type: String },
    videoDes: { type: String },
  },

  { timestamps: true }
);

const PatientReview = mongoose.model("PatientReview", patientReviewSchema);
module.exports = PatientReview;
