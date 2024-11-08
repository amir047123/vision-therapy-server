const UserFaq = require("../models/userFaq.model");

exports.createUserFaqService = async (data) => {
  const userFaq = await UserFaq.create(data);
  return userFaq;
};
exports.deleteUserFaqService = async (id) => {
  const userFaq = await UserFaq.deleteOne({ _id: id });
  return userFaq;
};

exports.updateUserFaqService = async (id, data) => {
  const userFaq = await UserFaq.updateOne({ _id: id }, data);
  return userFaq;
};
exports.getUserFaqByIdService = async (id) => {
  const userFaq = await UserFaq.findOne({ _id: id });
  return userFaq;
};
