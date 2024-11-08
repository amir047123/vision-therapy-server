const DoctorFaq = require("../models/doctorFaq.model");

exports.createDoctorFaqService = async (data) => {
  const doctorFaq = await DoctorFaq.create(data);
  return doctorFaq;
};
exports.deleteDoctorFaqService = async (id) => {
  const doctorFaq = await DoctorFaq.deleteOne({ _id: id });
  return doctorFaq;
};

exports.updateDoctorFaqService = async (id, data) => {
  const doctorFaq = await DoctorFaq.updateOne({ _id: id }, data);
  return doctorFaq;
};
exports.getDoctorFaqByIdService = async (id) => {
  const doctorFaq = await DoctorFaq.findOne({ _id: id });
  return doctorFaq;
};
