const PatientReview = require("../models/patientReview.model");

exports.createPatientReviewService = async (data) => {
  const patientReview = await PatientReview.create(data);
  return patientReview;
};
exports.deletePatientReviewService = async (id) => {
  const patientReview = await PatientReview.deleteOne({ _id: id });
  return patientReview;
};

exports.updatePatientReviewService = async (id, data) => {
  const patientReview = await PatientReview.updateOne({ _id: id }, data);
  return patientReview;
};
exports.getPatientReviewByIdService = async (id) => {
  const patientReview = await PatientReview.findOne({ _id: id });
  return patientReview;
};
