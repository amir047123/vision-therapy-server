const DoctorReview = require("../models/doctorReview.model");

exports.createDoctorReviewService = async (data) => {
  const doctorReview = await DoctorReview.create(data);
  return doctorReview;
};
exports.deleteDoctorReviewService = async (id) => {
  const doctorReview = await DoctorReview.deleteOne({ _id: id });
  return doctorReview;
};

exports.updateDoctorReviewService = async (id, data) => {
  const doctorReview = await DoctorReview.updateOne({ _id: id }, data);
  return doctorReview;
};
exports.getDoctorReviewByIdService = async (id) => {
  const doctorReview = await DoctorReview.findOne({ _id: id });
  return doctorReview;
};
