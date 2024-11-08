const User = require("../models/user.model");

exports.createSignUpService = async (data) => {
  let result = await User.create(data);
  return result;
};
exports.getUserService = async (page, size, filter) => {
  let result;
  if (filter) {
    result = await User.find({
      email: { $eq: filter },
    })
      .skip(page * size)
      .limit(size);
  } else {
    result = await User.find({})
      .skip(page * size)
      .limit(size);
  }
  const total = await User.countDocuments({});
  return { result, total };
};

exports.findUserByEmail = async (email) => {
  return await User.findOne({ email });
};

exports.getUserByIdService = async (id) => {
  const result = await User.findOne({ _id: id });
  return result;
};
exports.getUserByEmailService = async (email) => {
  const result = await User.findOne({ email: email }).select("-password ");

  return result;
};
exports.deleteUserService = async (id) => {
  const result = await User.deleteOne({ _id: id });
  return result;
};
exports.updateUserService = async (id, data) => {
  const result = await User.updateOne({ _id: id }, data);
  return result;
};
exports.getUserPasswordService = async (id) => {
  const result = await User.findOne({ _id: id }).select("password");
  return result;
};
